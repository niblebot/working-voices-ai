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
const PRE_CLIP_SECONDS = 3; // "get ready" beat shown before every clip, including the first
const OPTION_LABELS = ['First', 'Second', 'Third', 'Fourth'];
const RING_RADIUS = 54;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function scrollToRef(ref, opts) {
  // Deferred a frame — calling scrollIntoView synchronously inside the
  // effect that reacts to the state change it happened alongside is
  // unreliable (it can land mid-layout and silently no-op).
  requestAnimationFrame(() => {
    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    ref.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', ...opts });
  });
}

const POST_REVEAL_LABELS = [
  'The Reveal',
  'The Big Mistake',
  'See It For Yourself',
  'The Case Against E-Learning',
  'Ready When You Are',
];

function PostRevealNav({ refs, activeIndex, onNavigate }) {
  function goTo(i) {
    onNavigate(i);
    scrollToRef(refs[i], { block: 'start' });
  }
  return (
    <div className="ty-postreveal-nav">
      <div className="ty-postreveal-dots">
        {refs.map((ref, i) => (
          <button
            key={i}
            type="button"
            className={'ty-postreveal-dot' + (i === activeIndex ? ' active' : '')}
            aria-label={POST_REVEAL_LABELS[i] ?? `Section ${i + 1}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
      {activeIndex < refs.length - 1 && (
        <button
          type="button"
          className="ty-postreveal-next"
          aria-label={`Next: ${POST_REVEAL_LABELS[activeIndex + 1]}`}
          onClick={() => goTo(activeIndex + 1)}
        >
          ↓
        </button>
      )}
    </div>
  );
}

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
    // Position among rounds of the same type (0 = first video round, 1 =
    // second, etc.) so the copy can make clear a repeat-looking round is
    // actually new, instead of every video round reading identically.
    return { key: id, type, round: { id, real, fakes }, orderWithinType: drawIndex };
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

function CountdownRing({ secondsLeft, total = DECISION_SECONDS, urgent = true }) {
  const frac = Math.max(0, secondsLeft) / total;
  const offset = RING_CIRCUMFERENCE * (1 - frac);
  return (
    <div className="ty-ring-box">
      <svg width="128" height="128" viewBox="0 0 128 128">
        <circle className="ty-ring-track" cx="64" cy="64" r={RING_RADIUS} />
        <circle
          className={'ty-ring-fill' + (urgent && secondsLeft <= 2 ? ' urgent' : '')}
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
  const [stage, setStage] = useState('idle'); // 'idle' | 'countdown' | number | 'choosing'
  const [secondsLeft, setSecondsLeft] = useState(DECISION_SECONDS);
  const [preClipSecondsLeft, setPreClipSecondsLeft] = useState(PRE_CLIP_SECONDS);
  const mediaRefs = useRef([]);
  const answeredRef = useRef(false);
  const intervalRef = useRef(null);
  const preClipIntervalRef = useRef(null);
  const nextIndexRef = useRef(0);
  const choicesRef = useRef(null);

  // Each clip after the first advances automatically (via onEnded), with no
  // user gesture of its own — mobile Safari silently refuses to play that,
  // which is why it used to freeze on clip 2. Fixed below by mounting every
  // clip's element up front and priming them all inside the Play tap.
  useEffect(() => {
    if (typeof stage !== 'number') return;
    mediaRefs.current[stage]?.play().catch(() => {});
  }, [stage]);

  // The clips can take the choice buttons out of view (especially after
  // scrolling away to watch), so bring them into view the moment they appear.
  useEffect(() => {
    if (stage !== 'choosing') return;
    scrollToRef(choicesRef, { block: 'center' });
  }, [stage]);

  // A "get ready" beat before every clip (including the first) — clips
  // starting with no warning was disorienting. Smooth 100ms ticks, same
  // technique as the decision timer below, so the ring drains fluidly
  // instead of jumping between whole seconds.
  //
  // This stage is re-entered before every clip (unlike 'choosing', which
  // only happens once per round), which used to expose a race: advancing
  // was decided by a *second* effect reading preClipSecondsLeft, but that
  // state was still sitting at the previous cycle's 0 in the same render
  // where stage flips back to 'countdown' — so it could advance before
  // the reset to PRE_CLIP_SECONDS ever landed, skipping the countdown
  // for that clip. Deciding "done" inside the same interval callback that
  // owns the countdown avoids ever reading stale state from last time.
  useEffect(() => {
    if (stage !== 'countdown') return undefined;
    setPreClipSecondsLeft(PRE_CLIP_SECONDS);
    const start = Date.now();
    preClipIntervalRef.current = setInterval(() => {
      const remaining = Math.max(0, PRE_CLIP_SECONDS - (Date.now() - start) / 1000);
      setPreClipSecondsLeft(remaining);
      if (remaining <= 0) {
        clearInterval(preClipIntervalRef.current);
        setStage(nextIndexRef.current);
      }
    }, 100);
    return () => clearInterval(preClipIntervalRef.current);
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
    onTimeout(options.findIndex((o) => o.kind === 'real'));
  }, [secondsLeft, stage, onTimeout, options]);

  function handleEnded() {
    setStage((s) => {
      if (typeof s !== 'number') return s;
      const next = s + 1;
      if (next < options.length) {
        nextIndexRef.current = next;
        return 'countdown';
      }
      return 'choosing';
    });
  }

  function handleChoice(kind, index) {
    if (answeredRef.current) return;
    answeredRef.current = true;
    clearInterval(intervalRef.current);
    const realIndex = options.findIndex((o) => o.kind === 'real');
    onComplete({ correct: kind === 'real', pickedIndex: index, realIndex });
  }

  // The Play tap is the one real user gesture we get for the whole round —
  // every clip gets a muted play+pause "touch" here so mobile browsers
  // treat all of them as already-unlocked, since real playback for clip 0
  // now only starts after the "get ready" countdown, not inside this tap.
  function handleStart() {
    mediaRefs.current.forEach((el) => {
      if (!el) return;
      el.muted = true;
      el.play()
        .then(() => {
          el.pause();
          el.currentTime = 0;
          el.muted = false;
        })
        .catch(() => {});
    });
    nextIndexRef.current = 0;
    setStage('countdown');
  }

  const MediaTag = type === 'video' ? 'video' : 'audio';
  const mediaProps = type === 'video' ? { playsInline: true } : {};

  return (
    <div className="ty-locked-player">
      <div className={'ty-locked-media-wrap' + (type === 'audio' ? ' ty-locked-media-wrap-audio' : '')}>
        {stage === 'idle' && (
          <button type="button" className="ty-play-btn" onClick={handleStart}>
            <span className="ty-play-icon">▶</span> Play
          </button>
        )}
        {options.map((opt, i) => (
          <MediaTag
            key={i}
            ref={(el) => {
              mediaRefs.current[i] = el;
            }}
            src={encodeURI(opt.src)}
            preload="metadata"
            className={type === 'video' ? 'ty-media' : 'ty-media-audio'}
            style={{ display: stage === i ? undefined : 'none' }}
            onEnded={stage === i ? handleEnded : undefined}
            onContextMenu={(e) => e.preventDefault()}
            {...mediaProps}
          />
        ))}
        {typeof stage === 'number' && (
          <div className="ty-clip-counter">
            Clip {stage + 1} of {options.length}
          </div>
        )}
      </div>

      {stage === 'countdown' && (
        <div className="ty-preclip-countdown">
          <CountdownRing secondsLeft={preClipSecondsLeft} total={PRE_CLIP_SECONDS} urgent={false} />
          <p className="ty-preclip-label">
            {nextIndexRef.current === 0 ? 'Get ready' : `Clip ${nextIndexRef.current + 1} of ${options.length}`}
          </p>
        </div>
      )}

      {stage === 'choosing' && (
        <>
          <div className="ty-timer-row">
            <p className="ty-locked-prompt">Which one was real?</p>
            <CountdownRing secondsLeft={secondsLeft} />
          </div>
          <div
            ref={choicesRef}
            className="ty-locked-choices"
            style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}
          >
            {options.map((opt, i) => (
              <button key={i} type="button" className="ty-pick-btn" onClick={() => handleChoice(opt.kind, i)}>
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
  // Which round index timed out, so "try again" can re-enter just that
  // round instead of refreshing the page and losing every round already
  // completed — refreshing used to be the only option and wiped everything.
  const [timedOutAtIndex, setTimedOutAtIndex] = useState(null);
  const [timedOutRealIndex, setTimedOutRealIndex] = useState(null);
  const activeSectionRef = useRef(null);

  // Each journey stage (a round, timed-out, reveal) swaps in below whatever
  // the user was already looking at, so without this the page just sits
  // still and it looks like the button/choice did nothing.
  useEffect(() => {
    if (journeyStage === 'hook') return;
    scrollToRef(activeSectionRef, { block: 'start' });
  }, [journeyStage]);

  // Post-reveal sections (Reveal, Big Mistake, Video, E-learning, Demo) get
  // a PowerPoint-style dot/next nav so it's obvious there's more below the
  // fold, instead of reading as one long scroll.
  const revealRef = useRef(null);
  const bigMistakeRef = useRef(null);
  const videoSectionRef = useRef(null);
  const elearningRef = useRef(null);
  const demoRef = useRef(null);
  const postRevealRefs = [revealRef, bigMistakeRef, videoSectionRef, elearningRef, demoRef];
  const [activePostRevealIndex, setActivePostRevealIndex] = useState(0);

  useEffect(() => {
    if (journeyStage !== 'reveal') return undefined;
    const els = postRevealRefs.map((r) => r.current).filter(Boolean);
    if (els.length === 0) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        let best = null;
        for (const entry of entries) {
          if (entry.isIntersecting && (!best || entry.intersectionRatio > best.intersectionRatio)) {
            best = entry;
          }
        }
        if (best) {
          const idx = els.indexOf(best.target);
          if (idx !== -1) setActivePostRevealIndex(idx);
        }
      },
      { threshold: [0.3, 0.5, 0.7] }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [journeyStage]);

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

  function advanceFrom(index) {
    const next = index + 1;
    setJourneyStage(next < stages.length ? next : 'reveal');
  }

  function handleStageComplete({ correct, pickedIndex, realIndex }) {
    logAttempt(correct);
    setResults((prev) => [...prev, { type: stages[journeyStage].type, correct, pickedIndex, realIndex }]);
    advanceFrom(journeyStage);
  }

  function handleStageTimeout(realIndex) {
    logAttempt(false);
    setTimedOutAtIndex(journeyStage);
    setTimedOutRealIndex(realIndex);
    setJourneyStage('timedout');
  }

  function handleRetryRound() {
    setJourneyStage(timedOutAtIndex);
  }

  // Already logged as incorrect the moment it timed out — this just
  // records the round's result so the recap can explain it, and moves on.
  function handleContinueAfterTimeout() {
    setResults((prev) => [
      ...prev,
      { type: stages[timedOutAtIndex].type, correct: false, pickedIndex: null, realIndex: timedOutRealIndex },
    ]);
    advanceFrom(timedOutAtIndex);
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

  const correctCount = results.filter((r) => r.correct).length;
  const totalRounds = stages.length;
  const activeStage = typeof journeyStage === 'number' ? stages[journeyStage] : null;

  return (
    <div className="ty-page">
      {/* 01 HOOK */}
      <section className="section section-dark ty-header ty-glow-section ty-hook-hero">
        <img
          className="ty-hook-hero-img"
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=75&fit=crop"
          alt=""
          aria-hidden="true"
        />
        <div className="hero-grid-bg"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow hero-glow-2"></div>
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
      </section>

      {/* 02/03 ROUNDS — one at a time */}
      {activeStage && (
        <section key={activeStage.key} ref={activeSectionRef} className="section section-dark ty-glow-section">
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
                : activeStage.orderWithinType === 0
                ? 'Now watch closely. Which one is real?'
                : 'One more — a different person this time.'}
            </h2>
            <p>
              {activeStage.type === 'audio'
                ? `You'll hear ${activeStage.round.fakes.length + 1} short voice clips of the same person. One is real. You have five seconds to choose.`
                : activeStage.orderWithinType === 0
                ? `Watch ${activeStage.round.fakes.length + 1} video clips. One is the real person. Five seconds. Choose fast.`
                : `Same rules, a new set of clips. ${activeStage.round.fakes.length + 1} videos, one real person. Five seconds.`}
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

      {/* TIMED OUT */}
      {journeyStage === 'timedout' && (
        <section ref={activeSectionRef} className="section section-dark ty-glow-section">
          <div className="hero-glow"></div>
          <div className="section-header">
            <div className="ty-timedout-icon">⏱</div>
            <span className="section-label">Too Slow</span>
            <h2>Time's up.</h2>
            <p>
              That's not bad luck — hesitation is exactly how these attacks work. A real
              scammer doesn't wait for you to think it over.
            </p>
            <button type="button" className="ty-cta-btn" onClick={handleRetryRound}>
              Try this round again
            </button>
            <button type="button" className="ty-secondary-btn" onClick={handleContinueAfterTimeout}>
              Continue anyway (counts as incorrect)
            </button>
          </div>
        </section>
      )}

      {/* 04 THE REVEAL */}
      {journeyStage === 'reveal' && (
        <section
          ref={(el) => {
            activeSectionRef.current = el;
            revealRef.current = el;
          }}
          className="section section-dark ty-glow-section"
        >
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
            <div className="ty-result-banner">
              {correctCount} / {totalRounds}
            </div>
            <div className="ty-recap-list">
              {results.map((r, i) => (
                <div key={i} className={'ty-recap-row' + (r.correct ? ' correct' : '')}>
                  <span className="ty-recap-icon">{r.correct ? '✓' : '✕'}</span>
                  <span className="ty-recap-text">
                    Round {i + 1} ({r.type === 'audio' ? 'Voice' : 'Video'}) —{' '}
                    {r.correct
                      ? 'you spotted the real one.'
                      : r.pickedIndex === null
                      ? `you ran out of time. The real one was ${OPTION_LABELS[r.realIndex]}.`
                      : `you picked ${OPTION_LABELS[r.pickedIndex]}. The real one was ${OPTION_LABELS[r.realIndex]}.`}
                  </span>
                </div>
              ))}
            </div>
            {correctCount === totalRounds ? (
              <p>
                Perfect score — good instincts. But don't get comfortable: that was a tiny
                sample, and in the real world the odds don't always favour you. It only
                takes one moment of misplaced trust.
              </p>
            ) : (
              <p>
                Getting it wrong means your brain did exactly what it's built to do, which is
                to trust a calm and confident request. That is the instinct scammers are
                exploiting.
              </p>
            )}
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
        <section ref={bigMistakeRef} className="section section-dark ty-glow-section">
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
        <section ref={videoSectionRef} className="section section-video">
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
        <section ref={elearningRef} className="section section-dark ty-glow-section">
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
        <section ref={demoRef} className="cta-section ty-glow-section" style={{ background: 'var(--navy)' }}>
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

      {journeyStage === 'reveal' && (
        <PostRevealNav
          refs={postRevealRefs}
          activeIndex={activePostRevealIndex}
          onNavigate={setActivePostRevealIndex}
        />
      )}
    </div>
  );
}
