'use client';

import { useEffect, useRef, useState } from 'react';

// Pool of real/fake pairs. Add more entries here as new clips land —
// rounds are drawn straight from these arrays, no other code changes needed.
const VIDEO_POOL = [
  { id: 'nick-1', real: '/testyourself/Real-nick1.mp4', fake: '/testyourself/AI-nick1.mp4' },
];

const AUDIO_POOL = [];

function shuffledOrder() {
  return Math.random() < 0.5 ? ['real', 'fake'] : ['fake', 'real'];
}

function LockedPairPlayer({ round, type, pick, isRevealed, onPick }) {
  const [order] = useState(shuffledOrder);
  const [stage, setStage] = useState('idle'); // 'idle' | 0 | 1 | 'done'
  const mediaRef = useRef(null);

  useEffect(() => {
    const el = mediaRef.current;
    if (!el || (stage !== 0 && stage !== 1)) return;
    el.src = order[stage] === 'real' ? round.real : round.fake;
    el.load();
    el.play().catch(() => {});
  }, [stage, order, round]);

  function handleEnded() {
    setStage((s) => (s === 0 ? 1 : 'done'));
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
        {stage !== 'idle' && (
          <MediaTag
            ref={mediaRef}
            className={type === 'video' ? 'ty-media' : 'ty-media-audio'}
            onEnded={handleEnded}
            onContextMenu={(e) => e.preventDefault()}
            {...mediaProps}
          />
        )}
        {(stage === 0 || stage === 1) && <div className="ty-now-playing">Playing…</div>}
      </div>

      {stage === 'done' && (
        <>
          <p className="ty-locked-prompt">Which one was real?</p>
          <div className="ty-locked-choices">
            {[0, 1].map((posIndex) => {
              const kind = order[posIndex];
              const label = posIndex === 0 ? 'First clip' : 'Second clip';
              const isPicked = pick === kind;
              return (
                <div key={posIndex} className="ty-locked-choice">
                  {isRevealed && (
                    <div className={'ty-badge ' + (kind === 'real' ? 'ty-badge-real' : 'ty-badge-fake')}>
                      {kind === 'real' ? 'Real' : 'AI-generated'}
                    </div>
                  )}
                  <button
                    type="button"
                    className={'ty-pick-btn' + (isPicked ? ' ty-pick-btn-active' : '')}
                    onClick={() => onPick(kind)}
                    disabled={isRevealed}
                  >
                    {isPicked ? 'Selected ✓' : label}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default function QuizClient() {
  const [picks, setPicks] = useState({});
  const [revealed, setRevealed] = useState(false);
  const [stats, setStats] = useState(null);
  const [headcount, setHeadcount] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadStatus, setLeadStatus] = useState('idle');

  const allRounds = [
    ...VIDEO_POOL.map((r) => ({ ...r, type: 'video' })),
    ...AUDIO_POOL.map((r) => ({ ...r, type: 'audio' })),
  ];

  function setPick(roundId, kind) {
    setPicks((prev) => ({ ...prev, [roundId]: kind }));
  }

  const canReveal = allRounds.length > 0 && allRounds.every((r) => picks[r.id] != null);
  const totalRounds = allRounds.length;
  const correctCount = allRounds.filter((r) => picks[r.id] === 'real').length;

  async function handleReveal() {
    setRevealed(true);
    setStats('loading');

    try {
      await Promise.all(
        allRounds.map((r) =>
          fetch('/api/quiz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ itemType: r.type, correct: picks[r.id] === 'real' }),
          })
        )
      );
      const res = await fetch('/api/quiz');
      const data = await res.json();
      setStats(res.ok ? data : 'error');
    } catch {
      setStats('error');
    }
  }

  async function handleLeadSubmit(e) {
    e.preventDefault();
    setLeadStatus('submitting');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: leadEmail,
          headcount: headcount ? Number(headcount) : null,
        }),
      });
      setLeadStatus(res.ok ? 'done' : 'error');
    } catch {
      setLeadStatus('error');
    }
  }

  const vulnerableCount =
    stats && stats.ready && headcount
      ? Math.round(Number(headcount) * (stats.wrongPct / 100))
      : null;

  return (
    <div className="ty-page">
      {/* HEADER */}
      <section className="section section-dark ty-header">
        <div className="section-header">
          <span className="section-label">Test Yourself</span>
          <h2>How good are you at spotting a deepfake?</h2>
          <p>
            Below are real and AI-generated clips of the same person. Each one only plays
            once, so if you miss something — sound not turned up, got distracted, whatever —
            just refresh the page for a fresh set. Pick the one you think is real, then hit
            reveal to see how you did.
          </p>
        </div>
      </section>

      {/* VIDEO ROUNDS */}
      <section className="section" id="video-round">
        <div className="section-header">
          <span className="section-label">Video</span>
          <h2>Which clip is real?</h2>
        </div>
        <div className="ty-rounds-stack">
          {VIDEO_POOL.map((round, i) => (
            <div key={round.id} className="ty-round-block">
              {VIDEO_POOL.length > 1 && <div className="ty-round-index">Round {i + 1}</div>}
              <LockedPairPlayer
                round={round}
                type="video"
                pick={picks[round.id] ?? null}
                isRevealed={revealed}
                onPick={(kind) => setPick(round.id, kind)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* AUDIO ROUNDS */}
      <section className="section section-gray" id="audio-round">
        <div className="section-header">
          <span className="section-label">Audio</span>
          <h2>Which voice is real?</h2>
        </div>
        {AUDIO_POOL.length > 0 ? (
          <div className="ty-rounds-stack">
            {AUDIO_POOL.map((round, i) => (
              <div key={round.id} className="ty-round-block">
                {AUDIO_POOL.length > 1 && <div className="ty-round-index">Round {i + 1}</div>}
                <LockedPairPlayer
                  round={round}
                  type="audio"
                  pick={picks[round.id] ?? null}
                  isRevealed={revealed}
                  onPick={(kind) => setPick(round.id, kind)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="ty-placeholder">Audio round coming soon — check back shortly.</div>
        )}
      </section>

      {/* REVEAL */}
      <div className="ty-reveal-wrap">
        {!revealed ? (
          <button
            type="button"
            className="btn-primary"
            onClick={handleReveal}
            disabled={!canReveal}
          >
            Reveal my results
          </button>
        ) : (
          <div className="ty-result-banner">
            You got {correctCount} out of {totalRounds} right
          </div>
        )}
      </div>

      {/* AGGREGATE STATS + HEADCOUNT CALCULATOR */}
      {revealed && (
        <section className="section section-dark ty-stats-section">
          <div className="section-header">
            <span className="section-label">Across All Visitors</span>
            <h2>How does everyone else do?</h2>
          </div>

          {stats === 'loading' && <p className="ty-muted">Loading results…</p>}
          {stats === 'error' && (
            <p className="ty-muted">Couldn't load the aggregate stats — try refreshing.</p>
          )}
          {stats && stats !== 'loading' && stats !== 'error' && !stats.ready && (
            <p className="ty-muted">
              Not enough people have taken this test yet to show a reliable stat — check back
              soon.
            </p>
          )}

          {stats && stats.ready && (
            <>
              <div className="ty-stat-callout">
                <div className="ty-stat-number">{stats.wrongPct}%</div>
                <div className="ty-stat-label">
                  of {stats.total} visitors got at least one clip wrong
                </div>
              </div>

              <div className="ty-calculator">
                <label htmlFor="headcount">How many people work at your organisation?</label>
                <input
                  id="headcount"
                  type="number"
                  min="1"
                  value={headcount}
                  onChange={(e) => setHeadcount(e.target.value)}
                  placeholder="e.g. 500"
                  className="ty-input"
                />
                {vulnerableCount !== null && (
                  <p className="ty-calculator-result">
                    Based on that {stats.wrongPct}%, approximately{' '}
                    <strong>{vulnerableCount.toLocaleString()}</strong> people in your
                    organisation are potentially vulnerable to an attack like this.
                  </p>
                )}
              </div>
            </>
          )}
        </section>
      )}

      {/* AWARENESS VIDEO — placeholder pending final asset */}
      <section className="section">
        <div className="section-header">
          <span className="section-label">How They Do It</span>
          <h2>The tricks and techniques behind these attacks</h2>
        </div>
        <div className="ty-video-placeholder">
          Awareness video embed goes here — pending final asset/link from Scott.
        </div>
      </section>

      {/* LEAD CAPTURE */}
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
          <h2>Do you want to know more?</h2>
          <p>Book a 15-minute live demo and we'll walk through what this looks like at scale.</p>
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
    </div>
  );
}
