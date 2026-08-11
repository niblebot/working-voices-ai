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
  // Dedicated pool for the first video round — all Nick Smallman clips.
  video1: {
    reals: [
      '/testyourself/nick real 1.mp4',
      '/testyourself/nick real 2.mp4',
    ],
    fakes: [
      '/testyourself/nick fake 1.mp4',
      '/testyourself/nick fake 2.mp4',
      '/testyourself/nick fake 3.mp4',
      '/testyourself/nick fake 4.mp4',
      '/testyourself/Nick fake 5.mp4',
    ],
  },
  // Dedicated pool for the second video round — all Andy Day clips.
  video2: {
    reals: [
      '/testyourself/Andy real 1.mp4',
      '/testyourself/Andy real 2.mp4',
      '/testyourself/Andy real 3.mp4',
    ],
    fakes: [
      '/testyourself/Andy Fake 1.mp4',
      '/testyourself/Andy fake 2.mp4',
      '/testyourself/Andy fake 3.mp4',
      '/testyourself/Andy fake 4.mp4',
      '/testyourself/Andy fake 5.mp4',
    ],
  },
};

// Maps a pool key to the media kind it renders as (audio vs video), since
// the two video rounds now draw from separate pools but still share copy
// and player behavior keyed off "video".
function kindOf(poolKey) {
  return poolKey === 'audio' ? 'audio' : 'video';
}

const ROUND_ORDER = ['audio', 'video1', 'video2']; // voice, then two video rounds (each with its own pool)
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
  'Ready When You Are',
  'Trusted By',
];

// Same 8 logos already confirmed as real clients on the homepage — kept in
// sync manually rather than imported, since this page's content isn't
// wired to the CMS content.js the homepage pulls from.
const TRUSTED_BY_LOGOS = [
  { src: '/logos/nasa.svg', alt: 'NASA' },
  { src: '/logos/microsoft.svg', alt: 'Microsoft' },
  { src: '/logos/jpmorgan.svg', alt: 'J.P. Morgan' },
  { src: '/logos/barclays.svg', alt: 'Barclays' },
  { src: '/logos/sony.svg', alt: 'Sony' },
  { src: '/logos/rolex.svg', alt: 'Rolex' },
  { src: '/logos/blackrock.svg', alt: 'BlackRock' },
  { src: '/logos/nomura.svg', alt: 'Nomura' },
];

function TrustedByMarquee() {
  // Duplicated once so the track can loop seamlessly: animating exactly
  // -50% moves the first copy fully offscreen right as the second copy
  // (identical) lands in its place, invisibly resetting to 0%.
  const logos = [...TRUSTED_BY_LOGOS, ...TRUSTED_BY_LOGOS];
  return (
    <div className="ty-logos-marquee">
      <div className="ty-logos-track">
        {logos.map((logo, i) => (
          <div className="ty-logos-item" key={i} aria-hidden={i >= TRUSTED_BY_LOGOS.length}>
            <img src={logo.src} alt={logo.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}

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
  const activePoolKeys = ROUND_ORDER.filter((poolKey) => POOLS[poolKey].reals.length > 0);
  const usedCount = {};

  return activePoolKeys.map((poolKey, i) => {
    const pool = POOLS[poolKey];
    const type = kindOf(poolKey);
    const real = shuffled(pool.reals)[0];
    const fakes = shuffled(pool.fakes).slice(0, Math.min(FAKES_PER_ROUND, pool.fakes.length));
    const id = `${poolKey}-${i}`;
    // Position among rounds of the same rendered type (0 = first video
    // round, 1 = second, etc.) so the copy can make clear a repeat-looking
    // round is actually new, instead of every video round reading identically.
    const orderWithinType = usedCount[type] || 0;
    usedCount[type] = orderWithinType + 1;
    return { key: id, type, round: { id, real, fakes }, orderWithinType };
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
  const startedRef = useRef(false);
  const intervalRef = useRef(null);
  const preClipIntervalRef = useRef(null);
  const nextIndexRef = useRef(0);
  const choicesRef = useRef(null);
  const preclipRef = useRef(null);
  const playerRef = useRef(null);

  // Each clip after the first advances automatically (via onEnded), with no
  // user gesture of its own — mobile Safari silently refuses to play that,
  // which is why it used to freeze on clip 2. Fixed below by mounting every
  // clip's element up front and priming them all inside the Play tap.
  //
  // Also enforces "only the active clip may ever be unpaused" as a hard
  // invariant every time the stage changes, actively pausing every other
  // clip — a cheap safety net against two clips ever audibly overlapping,
  // regardless of what caused a stray one to still be playing.
  useEffect(() => {
    if (typeof stage !== 'number') return;
    mediaRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === stage) {
        el.play().catch(() => {});
      } else if (!el.paused) {
        el.pause();
      }
    });
  }, [stage]);

  // Safety net for a clip that silently never fires "ended" — no error, just
  // stuck, which looks exactly like a broken button even though nothing is
  // actually disabled. A flat timeout here was wrong: the video clips are
  // several MB each, and a slower connection can legitimately take a while
  // to buffer through one without ever being genuinely stuck — a fixed
  // deadline forced a premature advance mid-playback on real (if slow)
  // clips. This instead tracks actual progress via "timeupdate" and only
  // steps in if there's been zero progress for a stretch, i.e. truly
  // stalled, not just slow.
  useEffect(() => {
    if (typeof stage !== 'number') return undefined;
    const el = mediaRefs.current[stage];
    if (!el) return undefined;
    let stallTimer = setTimeout(() => handleEnded(), 8000);
    function resetStallTimer() {
      clearTimeout(stallTimer);
      stallTimer = setTimeout(() => handleEnded(), 8000);
    }
    el.addEventListener('timeupdate', resetStallTimer);
    return () => {
      clearTimeout(stallTimer);
      el.removeEventListener('timeupdate', resetStallTimer);
    };
  }, [stage]);

  // The clips can take the choice buttons out of view (especially after
  // scrolling away to watch), so bring them into view the moment they appear.
  useEffect(() => {
    if (stage !== 'choosing') return;
    scrollToRef(choicesRef, { block: 'center' });
  }, [stage]);

  // The 4:5 portrait clips are taller than the "get ready" countdown ring
  // that was centered a moment earlier, so once real playback actually
  // starts the frame can end up cropped by the viewport (bottom cut off,
  // or the top scrolled past) until the user scrolls manually. Re-center
  // on the whole player every time a new clip starts playing for real.
  useEffect(() => {
    if (typeof stage !== 'number') return;
    scrollToRef(playerRef, { block: 'center' });
  }, [stage]);

  // The round only gets centered once, when it first appears — but the
  // countdown ring is extra content that shows up later (once Play is
  // tapped), taller than what was there when that first scroll happened.
  // Without this, the ring can render below the fold, cut off.
  useEffect(() => {
    if (stage !== 'countdown') return;
    scrollToRef(preclipRef, { block: 'center' });
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
  //
  // Pausing needs to wait for the play() promise to actually settle (or a
  // short timeout, whichever comes first) rather than firing instantly —
  // iOS Safari seems to need genuine confirmation that playback started
  // before it'll trust a later, gesture-less play() call to include sound,
  // which is what silently broke audio on mobile. Bounding it to 300ms
  // keeps the earlier "two clips visibly overlapping" glitch from coming
  // back, since every clip here is muted and hidden the whole time anyway.
  function handleStart() {
    // Guards against a second, stray invocation of this same tap — e.g. an
    // auto-scroll landing the page under a delayed/duplicate click right as
    // this button leaves the screen — which would otherwise prime and start
    // the round twice, producing two overlapping, audible clips.
    if (startedRef.current) return;
    startedRef.current = true;
    mediaRefs.current.forEach((el) => {
      if (!el) return;
      el.muted = true;
      el.volume = 0;
      const playPromise = Promise.resolve(el.play()).catch(() => {});
      Promise.race([playPromise, new Promise((resolve) => setTimeout(resolve, 300))]).then(() => {
        el.pause();
        el.currentTime = 0;
        el.muted = false;
        el.volume = 1;
      });
    });
    nextIndexRef.current = 0;
    setStage('countdown');
  }

  const MediaTag = type === 'video' ? 'video' : 'audio';
  const mediaProps = type === 'video' ? { playsInline: true } : {};

  return (
    <div className="ty-locked-player" ref={playerRef}>
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
            onError={stage === i ? handleEnded : undefined}
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
        <div ref={preclipRef} className="ty-preclip-countdown">
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
  const [journeyStage, setJourneyStage] = useState('hook'); // 'hook' | index into stages | 'transition' | 'reveal' | 'timedout'
  const [results, setResults] = useState([]);
  const [leadEmail, setLeadEmail] = useState('');
  const [leadStatus, setLeadStatus] = useState('idle');
  // Which round index timed out, so "try again" can re-enter just that
  // round instead of refreshing the page and losing every round already
  // completed — refreshing used to be the only option and wiped everything.
  const [timedOutAtIndex, setTimedOutAtIndex] = useState(null);
  const [timedOutRealIndex, setTimedOutRealIndex] = useState(null);
  // Which round is coming up after the brief "transition" interstitial —
  // needed since the interstitial isn't itself a round index.
  const [pendingRoundIndex, setPendingRoundIndex] = useState(null);
  // Live "X people have taken this, Y% ..." stats for the Reveal screen —
  // null until the fetch resolves, at which point it's either not ready
  // yet (too few real sessions logged) or has real numbers to show.
  const [sessionStats, setSessionStats] = useState(null);
  const activeSectionRef = useRef(null);
  const roundPlayerRef = useRef(null);
  // Set when someone uses the quiet "skip" link rather than actually
  // playing the rounds — so that jump to Reveal never logs a fake 0/3
  // session into the real live-counter stats.
  const skippedQuizRef = useRef(false);

  // Each journey stage (a round, timed-out, reveal) swaps in below whatever
  // the user was already looking at, so without this the page just sits
  // still and it looks like the button/choice did nothing.
  //
  // Rounds specifically scroll to the player itself, not the section: on
  // shorter screens the round's own heading/tracker/paragraph are tall
  // enough that aligning the section's top edge to the viewport top left
  // the actual video player (further down, after all that text) below the
  // fold — the opposite of "did nothing", but still meant scrolling
  // further to reach the one interactive part.
  useEffect(() => {
    if (journeyStage === 'hook') return;
    if (typeof journeyStage === 'number') {
      scrollToRef(roundPlayerRef, { block: 'center' });
    } else {
      scrollToRef(activeSectionRef, { block: 'start' });
    }
  }, [journeyStage]);

  // Post-reveal sections (Reveal, Big Mistake, Video, E-learning, Demo) get
  // a PowerPoint-style dot/next nav so it's obvious there's more below the
  // fold, instead of reading as one long scroll.
  const revealRef = useRef(null);
  const bigMistakeRef = useRef(null);
  const videoSectionRef = useRef(null);
  const demoRef = useRef(null);
  const trustedByRef = useRef(null);
  const postRevealRefs = [revealRef, bigMistakeRef, videoSectionRef, demoRef, trustedByRef];
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

  // Brief pause on the transition interstitial before moving into the
  // round it was leading into. Long enough to actually read the line, not
  // just flash past it.
  useEffect(() => {
    if (journeyStage !== 'transition') return undefined;
    const t = setTimeout(() => setJourneyStage(pendingRoundIndex), 3500);
    return () => clearTimeout(t);
  }, [journeyStage, pendingRoundIndex]);

  // Log this completed session once (not on every re-render while still on
  // 'reveal'), then fetch the live aggregate for the "X people have taken
  // this" copy — same "don't show a tiny, misleading sample" gate as the
  // per-round stats already used elsewhere on the site.
  useEffect(() => {
    if (journeyStage !== 'reveal') return;
    if (!skippedQuizRef.current) {
      const finalCorrectCount = results.filter((r) => r.correct).length;
      fetch('/api/quiz-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correctCount: finalCorrectCount, totalRounds: stages.length }),
      }).catch(() => {});
    }
    fetch('/api/quiz-session')
      .then((res) => res.json())
      .then((data) => setSessionStats(data))
      .catch(() => {});
  }, [journeyStage]);

  function handleStart() {
    setJourneyStage(stages.length > 0 ? 0 : 'reveal');
  }

  // Quiet escape hatch straight to the results/demo sections — mainly so
  // the page can be checked quickly without playing through the rounds
  // every time, not something surfaced as a real option on the page.
  function handleSkipQuiz() {
    skippedQuizRef.current = true;
    setJourneyStage('reveal');
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
    if (next >= stages.length) {
      setJourneyStage('reveal');
      return;
    }
    // The one moment that needs its own beat: leaving the voice round for
    // the first video round. Later round-to-round moves (both video) keep
    // going straight through — they already have their own distinguishing
    // copy on the round screen itself.
    const nextStage = stages[next];
    if (nextStage.type === 'video' && nextStage.orderWithinType === 0) {
      setPendingRoundIndex(next);
      setJourneyStage('transition');
      return;
    }
    setJourneyStage(next);
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
  const isPerfectScore = correctCount === totalRounds;

  // Live counter once there's a real sample to quote; otherwise the same
  // static copy this page always had, rather than a misleadingly tiny stat.
  const revealMessage = sessionStats?.ready
    ? isPerfectScore
      ? `${sessionStats.total} people have taken this test, and only ${sessionStats.perfectPct}% spotted every deepfake. That makes you rare, but it's also a game of chance, and luck can turn against you.`
      : `${sessionStats.total} people have taken this test, and ${sessionStats.failPct}% failed to spot the deepfake. You're not alone.`
    : isPerfectScore
    ? "Perfect score — good instincts. But don't get comfortable: that was a tiny sample, and in the real world the odds don't always favour you. It only takes one moment of misplaced trust."
    : 'Getting it wrong means your brain did exactly what it\'s built to do, which is to trust a calm and confident request. That is the instinct criminals are exploiting.';

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
            person from three choices. You'll only have seconds to decide. Exactly like in
            real life.
          </p>
          {journeyStage === 'hook' && (
            <>
              <button
                type="button"
                className="ty-cta-btn"
                onClick={handleStart}
                disabled={stages.length === 0}
              >
                Start the challenge →
              </button>
              <button type="button" className="ty-secondary-btn ty-skip-link" onClick={handleSkipQuiz}>
                Skip the challenge
              </button>
            </>
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
          <div ref={roundPlayerRef}>
            <TimedRoundPlayer
              key={activeStage.round.id}
              round={activeStage.round}
              type={activeStage.type}
              onComplete={handleStageComplete}
              onTimeout={handleStageTimeout}
            />
          </div>
        </section>
      )}

      {/* TRANSITION — a brief beat before the first video round, so it
          doesn't read as a sudden, unexplained repeat of the voice round */}
      {journeyStage === 'transition' && (
        <section ref={activeSectionRef} className="section section-dark ty-glow-section">
          <div className="hero-glow"></div>
          <div className="section-header">
            <RoundTracker total={totalRounds} current={pendingRoundIndex} />
            <span className="section-label">Next Up</span>
            <h2>Now let's test your visual skills.</h2>
          </div>
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
              criminal doesn't wait for you to think it over.
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
            {results.length > 0 && (
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
            )}
            <p>{revealMessage}</p>
            <p>
              Even if your organisation has the best firewall money can buy, it will not
              protect you. Criminals instead will use social engineering (hacking your
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
            <h2>People assume this is a cyber problem. It's not, it's about the psychology of your key employees.</h2>
            <p>
              Around 68% of breaches involve a human being, not a breached firewall. It's a
              human problem, and it needs a human solution.
            </p>
          </div>
        </section>
      )}

      {/* SEE IT FOR YOURSELF — Andy's tips; Nick's slot swaps in once recorded */}
      {journeyStage === 'reveal' && (
        <section ref={videoSectionRef} className="section section-dark ty-glow-section">
          <div className="hero-glow"></div>
          <div className="section-header">
            <span className="section-label">See It For Yourself</span>
            <h2>A quick word from the team</h2>
            <p>A couple of quick tips before you book your demo.</p>
          </div>
          <div className="ty-trainer-grid">
            <div className="ty-trainer-card">
              <div className="ty-trainer-video-wrap">
                <iframe
                  src="https://player.vimeo.com/video/1216952510?h=619051678f&badge=0&autopause=0&loop=0&player_id=0&app_id=58479"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  allowFullScreen
                  title="Andy Day — tip 1"
                ></iframe>
              </div>
              <span className="ty-trainer-video-label">What you'll learn</span>
              <div className="ty-trainer-caption">
                <strong>Andy Day</strong>
                <span>Lead Trainer</span>
              </div>
            </div>
            <div className="ty-trainer-card">
              <div className="ty-trainer-video-wrap">
                <iframe
                  src="https://player.vimeo.com/video/1217347088?h=3b63c0be21&badge=0&autopause=0&loop=0&player_id=0&app_id=58479"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  allowFullScreen
                  title="Nick Smallman — tip"
                ></iframe>
              </div>
              <span className="ty-trainer-video-label">How you'll learn</span>
              <div className="ty-trainer-caption">
                <strong>Nick Smallman</strong>
                <span>Founder and CEO of Working Voices</span>
              </div>
            </div>
          </div>
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

      {/* TRUSTED BY — same logos/copy as the homepage's About section */}
      {journeyStage === 'reveal' && (
        <section ref={trustedByRef} className="section section-dark ty-glow-section">
          <div className="hero-glow"></div>
          <div className="section-header">
            <p>We deliver training to over 100 of the world's largest companies including:</p>
          </div>
          <TrustedByMarquee />
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
