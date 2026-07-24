'use client';

import { useEffect, useRef, useState } from 'react';

// Pools of clips per round type. Real and fakes don't need to match by
// subject — add any real or fake clip to the relevant pool and it becomes
// eligible to be drawn. Each page load randomly draws one real + two fakes
// per round from these pools, so the exact set changes on every refresh.
const POOLS = {
  audio: {
    reals: [
      '/testyourself/real - in skin.mp4',
      '/testyourself/real - mouth.mp4',
      '/testyourself/real - people.mp4',
      '/testyourself/real - tom .mp4',
      '/testyourself/real - will smith.mp4',
    ],
    fakes: [
      '/testyourself/Fake - will smith.mp4',
      '/testyourself/fake  - best to do.mp4',
      '/testyourself/fake  - signature.mp4',
    ],
  },
  video: {
    reals: [
      '/testyourself/real - comfotable.mp4',
      '/testyourself/real -will smith.mp4',
      '/testyourself/Real - social media.mp4',
    ],
    fakes: [
      '/testyourself/fake - will smith video.mp4',
      '/testyourself/Fake - bread pitt.mp4',
      '/testyourself/fake mouth.mp4',
    ],
  },
};

const ROUND_ORDER = ['audio', 'video', 'video']; // voice first, then two video rounds
const FAKES_PER_ROUND = 2;
const DECISION_SECONDS = 5;
const GAP_MS = 1500; // pause between clips within a round
const OPTION_LABELS = ['First', 'Second', 'Third', 'Fourth'];
const RING_RADIUS = 54;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function shuffled(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildStages() {
  const activeTypes = ROUND_ORDER.filter((type) => POOLS[type].reals.length > 0);

  // Draw distinct real clips across rounds of the same type (e.g. the two
  // video rounds), so the same real clip doesn't show up twice in one visit.
  const realsByType = {};
  for (const type of new Set(activeTypes)) {
    const countNeeded = activeTypes.filter((t) => t === type).length;
    realsByType[type] = shuffled(POOLS[type].reals).slice(0, countNeeded);
  }
  const usedCount = {};

  return activeTypes.map((type, i) => {
    const pool = POOLS[type];
    const drawIndex = usedCount[type] || 0;
    usedCount[type] = drawIndex + 1;
    const real = realsByType[type][drawIndex % realsByType[type].length];
    const fakes = shuffled(pool.fakes).slice(0, Math.min(FAKES_PER_ROUND, pool.fakes.length));
    const id = `${type}-${i}`;
    return { key: id, type, round: { id, real, fakes } };
  });
}

function shuffledOptions(round) {
  const options = [{ kind: 'real', src: round.real }, ...round.fakes.map((src) => ({ kind: 'fake', src }))];
  return shuffled(options);
}

function RoundTracker({ total, current }) {
  return (
    <div className="ty-tracker">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={'ty-tracker-pill' + (i < current ? ' done' : i === current ? ' active' : '')}>
          {i + 1}
        </div>
      ))}
    </div>
  );
}

function CountdownRing({ secondsLeft }) {
  const frac = Math.max(0, secondsLeft) / DECISION_SECONDS;
  const offset = RING_CIRCUMFERENCE * (1 - frac);
  return (
    <div className="ty-ring-box">
      <svg width="128" height="128" viewBox="0 0 128 128">
        <circle className="ty-ring-track" cx="64" cy="64" r={RING_RADIUS} />
        <circle
          className={'ty-ring-fill' + (secondsLeft <= 2 ? ' urgent' : '')}
          cx="64"
          cy="64"
          r={RING_RADIUS}
          style={{ strokeDasharray: RING_CIRCUMFERENCE, strokeDashoffset: offset }}
        />
      </svg>
      <div className="ty-ring-num">{Math.ceil(secondsLeft)}</div>
    </div>
  );
}

function TimedRoundPlayer({ round, type, onComplete, onTimeout }) {
  const [options] = useState(() => shuffledOptions(round));
  const [stage, setStage] = useState('idle'); // 'idle' | number | 'gap' | 'choosing'
  const [secondsLeft, setSecondsLeft] = useState(DECISION_SECONDS);
  const mediaRef = useRef(null);
  const answeredRef = useRef(false);
  const intervalRef = useRef(null);
  const nextIndexRef = useRef(0);

  useEffect(() => {
    const el = mediaRef.current;
    if (!el || typeof stage !== 'number') return;
    el.src = encodeURI(options[stage].src);
    el.load();
    el.play().catch(() => {});
  }, [stage, options]);

  // Brief pause between clips so they don't blend together, and so the
  // "Clip X of Y" counter has a clear moment to be seen.
  useEffect(() => {
    if (stage !== 'gap') return undefined;
    const t = setTimeout(() => setStage(nextIndexRef.current), GAP_MS);
    return () => clearTimeout(t);
  }, [stage]);

  // Ticks every 100ms (not 1s) so the countdown ring drains smoothly.
  useEffect(() => {
    if (stage !== 'choosing') return undefined;
    setSecondsLeft(DECISION_SECONDS);
    const start = Date.now();
    intervalRef.current = setInterval(() => {
      setSecondsLeft(Math.max(0, DECISION_SECONDS - (Date.now() - start) / 1000));
    }, 100);
    return () => clearInterval(intervalRef.current);
  }, [stage]);

  // Separate from the interval above so the parent's state updates never
  // fire from inside a setState updater function.
  useEffect(() => {
    if (stage !== 'choosing' || secondsLeft > 0 || answeredRef.current) return;
    answeredRef.current = true;
    clearInterval(intervalRef.current);
    onTimeout();
  }, [secondsLeft, stage, onTimeout]);

  function handleEnded() {
    setStage((s) => {
      if (typeof s !== 'number') return s;
      const next = s + 1;
      if (next < options.length) {
        nextIndexRef.current = next;
        return 'gap';
      }
      return 'choosing';
    });
  }

  function handleChoice(kind) {
    if (answeredRef.current) return;
    answeredRef.current = true;
    clearInterval(intervalRef.current);
    onComplete(kind === 'real');
  }

  const MediaTag = type === 'video' ? 'video' : 'audio';
  const mediaProps = type === 'video' ? { playsInline: true } : {};

  return (
    <div className="ty-locked-player">
      <div className={'ty-locked-media-wrap' + (type === 'audio' ? ' ty-locked-media-wrap-audio' : '')}>
        {stage === 'idle' && (
          <button type="button" className="ty-play-btn" onClick={() => setStage(0)}>
            <span className="ty-play-icon">▶</span> Play
          </button>
        )}
        {typeof stage === 'number' && (
          <MediaTag
            ref={mediaRef}
            className={type === 'video' ? 'ty-media' : 'ty-media-audio'}
            onEnded={handleEnded}
            onContextMenu={(e) => e.preventDefault()}
            {...mediaProps}
          />
        )}
        {typeof stage === 'number' && (
          <div className="ty-clip-counter">
            Clip {stage + 1} of {options.length}
          </div>
        )}
        {stage === 'gap' && (
          <div className="ty-clip-counter ty-clip-counter-next">
            Next: Clip {nextIndexRef.current + 1} of {options.length}
          </div>
        )}
      </div>

      {stage === 'choosing' && (
        <>
          <div className="ty-timer-row">
            <p className="ty-locked-prompt">Which one was real?</p>
            <CountdownRing secondsLeft={secondsLeft} />
          </div>
          <div className="ty-locked-choices" style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
            {options.map((opt, i) => (
              <button key={i} type="button" className="ty-pick-btn" onClick={() => handleChoice(opt.kind)}>
                {OPTION_LABELS[i] ?? `Option ${i + 1}`}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function QuizClient() {
  // Drawn once per page load, so the exact clip set changes on every refresh.
  const [stages] = useState(buildStages);
  const [journeyStage, setJourneyStage] = useState('hook'); // 'hook' | index into stages | 'reveal' | 'timedout'
  const [results, setResults] = useState([]);
  const [leadEmail, setLeadEmail] = useState('');
  const [leadStatus, setLeadStatus] = useState('idle');

  function handleStart() {
    setJourneyStage(stages.length > 0 ? 0 : 'reveal');
  }

  function logAttempt(correct) {
    const stage = stages[journeyStage];
    // Fire-and-forget — doesn't block the journey moving on.
    fetch('/api/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemType: stage.type, correct }),
    }).catch(() => {});
  }

  function handleStageComplete(correct) {
    logAttempt(correct);
    setResults((prev) => [...prev, correct]);
    const next = journeyStage + 1;
    setJourneyStage(next < stages.length ? next : 'reveal');
  }

  function handleStageTimeout() {
    logAttempt(false);
    setJourneyStage('timedout');
  }

  async function handleLeadSubmit(e) {
    e.preventDefault();
    setLeadStatus('submitting');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: leadEmail, headcount: null }),
      });
      setLeadStatus(res.ok ? 'done' : 'error');
    } catch {
      setLeadStatus('error');
    }
  }

  const correctCount = results.filter(Boolean).length;
  const totalRounds = stages.length;
  const activeStage = typeof journeyStage === 'number' ? stages[journeyStage] : null;

  return (
    <div className="ty-page">
      {/* 01 HOOK */}
      <section className="section section-dark ty-header ty-glow-section">
        <div className="hero-grid-bg"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="ty-hook-grid">
          <div className="section-header ty-hook-content">
            <span className="section-label">Test Yourself</span>
            <h2 className="ty-kinetic-heading">
              <span className="ty-k-line1">Could you</span>
              <span className="ty-k-line2">spot a</span>
              <span className="ty-k-line3">deepfake?</span>
            </h2>
            <p>Perhaps you believe you'd always spot a deepfake. Almost everyone thinks&nbsp;that.</p>
            <p>
              You're about to test that claim. Your job is to correctly identify the real
              person from three choices. You'll only have seconds to decide, and no chance to
              go back. Exactly like in real{' '}life.
            </p>
            {journeyStage === 'hook' && (
              <button
                type="button"
                className="ty-cta-btn"
                onClick={handleStart}
                disabled={stages.length === 0}
              >
                Start the challenge →
              </button>
            )}
          </div>
          <div className="ty-hook-visual">
            <img
              className="ty-hook-visual-img"
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=75&fit=crop"
              alt=""
              aria-hidden="true"
            />
            <div className="ty-hook-visual-tag">01 · The setup</div>
          </div>
        </div>
      </section>

      {/* 02/03 ROUNDS — one at a time */}
      {activeStage && (
        <section key={activeStage.key} className="section section-dark ty-glow-section">
          <div className="hero-glow"></div>
          <div className="hero-glow hero-glow-2"></div>
          <div className="section-header">
            <RoundTracker total={totalRounds} current={journeyStage} />
            <span className="ty-tracker-label">
              Round {journeyStage + 1} of {totalRounds} · {activeStage.type === 'audio' ? 'Voice' : 'Video'}
            </span>
            <h2 style={{ marginTop: 20 }}>
              {activeStage.type === 'audio'
                ? 'Real voice, or clone?'
                : 'Now watch closely. Which one is real?'}
            </h2>
            <p>
              {activeStage.type === 'audio'
                ? `You'll hear ${activeStage.round.fakes.length + 1} short voice clips of the same person. One is real. You have five seconds to choose.`
                : `Watch ${activeStage.round.fakes.length + 1} video clips. One is the real person. Five seconds. Choose fast.`}
            </p>
          </div>
          <TimedRoundPlayer
            key={activeStage.round.id}
            round={activeStage.round}
            type={activeStage.type}
            onComplete={handleStageComplete}
            onTimeout={handleStageTimeout}
          />
        </section>
      )}

      {/* TIMED OUT — dead stop, no continuing */}
      {journeyStage === 'timedout' && (
        <section className="section section-dark ty-glow-section">
          <div className="hero-glow"></div>
          <div className="section-header">
            <div className="ty-timedout-icon">⏱</div>
            <span className="section-label">Too Slow</span>
            <h2>Time's up.</h2>
            <p>
              That's not bad luck — hesitation is exactly how these attacks work. A real
              scammer doesn't wait for you to think it over.
            </p>
            <p>Refresh the page to try again.</p>
          </div>
        </section>
      )}

      {/* 04 THE REVEAL */}
      {journeyStage === 'reveal' && (
        <section className="section section-dark ty-glow-section">
          <div className="hero-glow"></div>
          <div className="hero-glow hero-glow-2"></div>
          <img
            className="ty-reveal-bg-image"
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&q=70&fit=crop"
            alt=""
            aria-hidden="true"
          />
          <div className="section-header">
            <span className="section-label">The Reveal</span>
            <h2>So, how did you do?</h2>
            <p className="ty-result-banner">
              {correctCount} / {totalRounds}
            </p>
            <p>
              Getting it wrong means your brain did exactly what it's built to do, which is
              to trust a calm and confident request. That is the instinct scammers are
              exploiting.
            </p>
            <p>
              Even if your organisation has the best firewall money can buy, it will not
              protect you. Hackers instead will use social engineering (hacking your
              employee's psychology).
            </p>
          </div>
        </section>
      )}

      {/* 06 THE BIG MISTAKE */}
      {journeyStage === 'reveal' && (
        <section className="section section-dark ty-glow-section">
          <div className="hero-glow"></div>
          <div className="section-header">
            <span className="section-label">The Big Mistake</span>
            <h2>Everyone treats this as a cyber problem — it's not, it's psychological.</h2>
            <p>
              Around 68% of breaches involve a human being, not a breached firewall. This is
              a human problem, that needs a human solution.
            </p>
          </div>
        </section>
      )}

      {/* SEE IT FOR YOURSELF — promo video */}
      {journeyStage === 'reveal' && (
        <section className="section section-video">
          <div className="section-header">
            <span className="section-label" style={{ color: 'var(--blue)' }}>See It For Yourself</span>
            <h2 style={{ color: 'var(--white)' }}>What you just experienced, taken further</h2>
          </div>
          <div className="video-embed-wrap">
            <iframe
              src="https://player.vimeo.com/video/1207793504?h=49d7baa53a&badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              allowFullScreen
              title="Working Voices deepfake demonstration"
            ></iframe>
          </div>
        </section>
      )}

      {/* 07 THE CASE AGAINST E-LEARNING */}
      {journeyStage === 'reveal' && (
        <section className="section section-dark ty-glow-section">
          <div className="hero-glow"></div>
          <div className="section-header">
            <span className="section-label">The Case Against E-Learning</span>
            <h2>Why a training video is ineffective</h2>
            <p>
              eLearning can inform but struggles to change behaviours. Only 1 in 5 people
              finish the average online course, and according to the{' '}
              <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4492928/" target="_blank" rel="noopener noreferrer">
                Ebbinghaus forgetting curve
              </a>{' '}
              up to 90% of what they learn is forgotten within a week. That's where we come
              in.
            </p>
          </div>
          <img
            className="ty-elearning-image"
            src="https://images.unsplash.com/photo-1713947503867-3b27964f042b?w=1200&q=80&fit=crop"
            alt="A bored employee slumped over their laptop at their desk"
          />
        </section>
      )}

      {/* 08 TRY A DEMO */}
      {journeyStage === 'reveal' && (
        <section className="cta-section ty-glow-section" style={{ background: 'var(--navy)' }}>
          <div className="hero-glow"></div>
          <div className="hero-glow hero-glow-2"></div>
          <div className="ty-demo-frame">
            <span className="section-label">Ready When You Are</span>
            <h2 style={{ color: 'var(--white)', marginTop: 12 }}>The solution for your organisation</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)' }}>
              Book a 15-minute live demo with our CEO Nick Smallman and lead trainer Andy
              Day. You'll learn:
            </p>
            <ul className="ty-value-list">
              <li>How criminals use social engineering to scam you and your company.</li>
              <li>Critical tactics your company can use to protect itself.</li>
              <li>The most effective way to receive this kind of training.</li>
            </ul>
            {leadStatus === 'done' ? (
              <p className="ty-lead-done">Thanks — we'll be in touch to set up your demo.</p>
            ) : (
              <form onSubmit={handleLeadSubmit} className="ty-lead-form">
                <input
                  type="email"
                  required
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="ty-input"
                />
                <button type="submit" className="ty-cta-btn" disabled={leadStatus === 'submitting'}>
                  {leadStatus === 'submitting' ? 'Sending…' : 'Book a demo'}
                </button>
              </form>
            )}
            {leadStatus === 'error' && (
              <p className="ty-lead-error">Something went wrong — please try again.</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
