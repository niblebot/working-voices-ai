'use client';

import { useEffect, useRef, useState } from 'react';

// Each round needs one real clip and one or more fakes. Add more fakes
// per round, or a VOICE_ROUND entry, as assets land — no other code
// changes needed. A round with no assets is simply skipped.
const VOICE_ROUND = null;

const VIDEO_ROUND = {
  id: 'video-1',
  real: '/testyourself/Real-nick1.mp4',
  fakes: ['/testyourself/AI-nick1.mp4'],
};

const STAGES = [
  ...(VOICE_ROUND ? [{ key: 'voice', type: 'audio', round: VOICE_ROUND }] : []),
  ...(VIDEO_ROUND ? [{ key: 'video', type: 'video', round: VIDEO_ROUND }] : []),
];

const DECISION_SECONDS = 5;
const OPTION_LABELS = ['First', 'Second', 'Third', 'Fourth'];

function shuffledOptions(round) {
  const options = [{ kind: 'real', src: round.real }, ...round.fakes.map((src) => ({ kind: 'fake', src }))];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

function TimedRoundPlayer({ round, type, onComplete }) {
  const [options] = useState(() => shuffledOptions(round));
  const [stage, setStage] = useState('idle'); // 'idle' | number | 'choosing'
  const [secondsLeft, setSecondsLeft] = useState(DECISION_SECONDS);
  const mediaRef = useRef(null);
  const answeredRef = useRef(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const el = mediaRef.current;
    if (!el || typeof stage !== 'number') return;
    el.src = options[stage].src;
    el.load();
    el.play().catch(() => {});
  }, [stage, options]);

  useEffect(() => {
    if (stage !== 'choosing') return undefined;
    setSecondsLeft(DECISION_SECONDS);
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [stage]);

  // Separate from the interval above so the parent's onComplete (which updates
  // QuizClient's state) never fires from inside a setState updater function.
  useEffect(() => {
    if (stage !== 'choosing' || secondsLeft > 0 || answeredRef.current) return;
    answeredRef.current = true;
    clearInterval(intervalRef.current);
    onComplete(false);
  }, [secondsLeft, stage, onComplete]);

  function handleEnded() {
    setStage((s) => (typeof s === 'number' && s + 1 < options.length ? s + 1 : 'choosing'));
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
          <div className="ty-now-playing">
            Playing {stage + 1} of {options.length}…
          </div>
        )}
      </div>

      {stage === 'choosing' && (
        <>
          <div className="ty-timer-row">
            <p className="ty-locked-prompt">Which one was real?</p>
            <div className={'ty-timer' + (secondsLeft <= 2 ? ' ty-timer-urgent' : '')}>{secondsLeft}s</div>
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
  const [journeyStage, setJourneyStage] = useState('hook'); // 'hook' | index into STAGES | 'reveal'
  const [results, setResults] = useState([]);
  const [leadEmail, setLeadEmail] = useState('');
  const [leadStatus, setLeadStatus] = useState('idle');

  function handleStart() {
    setJourneyStage(STAGES.length > 0 ? 0 : 'reveal');
  }

  function handleStageComplete(correct) {
    const stage = STAGES[journeyStage];
    setResults((prev) => [...prev, correct]);

    // Fire-and-forget — doesn't block the journey moving on.
    fetch('/api/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemType: stage.type, correct }),
    }).catch(() => {});

    const next = journeyStage + 1;
    setJourneyStage(next < STAGES.length ? next : 'reveal');
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
  const totalRounds = STAGES.length;
  const activeStage = typeof journeyStage === 'number' ? STAGES[journeyStage] : null;

  return (
    <div className="ty-page">
      {/* 01 HOOK */}
      <section className="section section-dark ty-header">
        <div className="section-header">
          <span className="section-label">Test Yourself</span>
          <h2>Could you spot a deepfake?</h2>
          <p>Perhaps you believe you'd always spot a deepfake. Almost everyone thinks that.</p>
          <p>
            You're about to test that claim. Your job is to correctly identify the real
            person from three choices. You'll only have seconds to decide, and no chance to
            go back. Exactly like in real life.
          </p>
          {journeyStage === 'hook' && (
            <button
              type="button"
              className="btn-primary"
              onClick={handleStart}
              disabled={STAGES.length === 0}
            >
              Start the challenge
            </button>
          )}
        </div>
      </section>

      {/* 02/03 ROUNDS — one at a time */}
      {activeStage && (
        <section
          key={activeStage.key}
          className={'section' + (activeStage.key === 'voice' ? ' section-gray' : '')}
        >
          <div className="section-header">
            <span className="section-label">
              Round {journeyStage + 1} · {activeStage.key === 'voice' ? 'Voice' : 'Video'}
            </span>
            <h2>
              {activeStage.key === 'voice'
                ? 'Real voice, or clone?'
                : 'Now watch closely. Which one is real?'}
            </h2>
            <p>
              {activeStage.key === 'voice'
                ? "You'll hear three short voice clips of the same person. One is real. Two are AI. You have five seconds to choose."
                : 'Three video clips. One is the real person. Five seconds. Choose fast.'}
            </p>
          </div>
          <TimedRoundPlayer
            key={activeStage.round.id}
            round={activeStage.round}
            type={activeStage.type}
            onComplete={handleStageComplete}
          />
        </section>
      )}

      {/* 04 THE REVEAL */}
      {journeyStage === 'reveal' && (
        <section className="section section-dark">
          <div className="section-header">
            <span className="section-label">The Reveal</span>
            <h2>So, how did you do?</h2>
            <p className="ty-result-banner">
              You got {correctCount} of {totalRounds} right.
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

      {/* AWARENESS VIDEO — placeholder, left as-is pending confirmation on where this section lands */}
      {journeyStage === 'reveal' && (
        <section className="section">
          <div className="section-header">
            <span className="section-label">How They Do It</span>
            <h2>The tricks and techniques behind these attacks</h2>
          </div>
          <div className="ty-video-placeholder">
            Awareness video embed goes here — pending final asset/link from Scott.
          </div>
        </section>
      )}

      {/* 06 THE BIG MISTAKE */}
      {journeyStage === 'reveal' && (
        <section className="section section-gray">
          <div className="section-header">
            <span className="section-label">The Big Mistake</span>
            <h2>Everyone treats this as a cyber problem. It's not, it's psychological.</h2>
            <p>
              Around 68% of breaches involve a human being, not a breached firewall. This is
              a human problem, that needs a human solution.
            </p>
          </div>
        </section>
      )}

      {/* 07 THE CASE AGAINST E-LEARNING */}
      {journeyStage === 'reveal' && (
        <section className="section">
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
        </section>
      )}

      {/* 08 TRY A DEMO */}
      {journeyStage === 'reveal' && (
        <section className="cta-section ty-broadcast">
          <div className="ty-broadcast-frame">
            <span className="ty-corner ty-corner-tl" />
            <span className="ty-corner ty-corner-tr" />
            <span className="ty-corner ty-corner-bl" />
            <span className="ty-corner ty-corner-br" />
            <div className="ty-broadcast-badge">
              <span className="ty-broadcast-dot" />
              Security Broadcast
            </div>
            <h2>The solution for your organisation</h2>
            <p>
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
                <button type="submit" className="btn-white" disabled={leadStatus === 'submitting'}>
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
