'use client';

import { useMemo, useState } from 'react';

const VIDEO_REAL = '/testyourself/Real-nick1.mp4';
const VIDEO_FAKE = '/testyourself/AI-nick1.mp4';
const AUDIO_REAL = '/testyourself/real-audio.mp3';
const AUDIO_FAKE = '/testyourself/fake-audio.mp3';

function randomOrder() {
  return Math.random() < 0.5 ? ['real', 'fake'] : ['fake', 'real'];
}

function ClipCard({ kind, src, type, label, isPicked, isRevealed, onPick }) {
  const isRealCard = kind === 'real';

  return (
    <div
      className={
        'ty-card' +
        (isPicked ? ' ty-card-picked' : '') +
        (isRevealed ? (isRealCard ? ' ty-card-real' : ' ty-card-fake') : '')
      }
    >
      <div className="ty-card-label">{label}</div>

      {type === 'video' ? (
        <video className="ty-media" src={src} controls playsInline preload="metadata" />
      ) : (
        <audio className="ty-media-audio" src={src} controls preload="metadata" />
      )}

      {isRevealed && (
        <div className={'ty-badge ' + (isRealCard ? 'ty-badge-real' : 'ty-badge-fake')}>
          {isRealCard ? 'Real' : 'AI-generated'}
        </div>
      )}

      <button
        type="button"
        className={'ty-pick-btn' + (isPicked ? ' ty-pick-btn-active' : '')}
        onClick={() => onPick(kind)}
        disabled={isRevealed}
      >
        {isPicked ? 'Selected ✓' : 'I think this is real'}
      </button>
    </div>
  );
}

export default function QuizClient({ hasAudio }) {
  const videoOrder = useMemo(randomOrder, []);
  const audioOrder = useMemo(randomOrder, []);

  const [videoPick, setVideoPick] = useState(null);
  const [audioPick, setAudioPick] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [stats, setStats] = useState(null);
  const [headcount, setHeadcount] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadStatus, setLeadStatus] = useState('idle');

  const canReveal = videoPick !== null && (!hasAudio || audioPick !== null);
  const totalRounds = hasAudio ? 2 : 1;
  const correctCount =
    (videoPick === 'real' ? 1 : 0) + (hasAudio && audioPick === 'real' ? 1 : 0);

  async function handleReveal() {
    setRevealed(true);
    setStats('loading');

    const attempts = [{ itemType: 'video', correct: videoPick === 'real' }];
    if (hasAudio) attempts.push({ itemType: 'audio', correct: audioPick === 'real' });

    try {
      await Promise.all(
        attempts.map((a) =>
          fetch('/api/quiz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(a),
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
            Below are real and AI-generated clips of the same person. Watch each one, pick
            the one you think is real, then hit reveal to see how you did.
          </p>
        </div>
      </section>

      {/* VIDEO ROUND */}
      <section className="section" id="video-round">
        <div className="section-header">
          <span className="section-label">Round 1 — Video</span>
          <h2>Which clip is real?</h2>
        </div>
        <div className="ty-grid">
          {videoOrder.map((kind, i) => (
            <ClipCard
              key={kind}
              kind={kind}
              type="video"
              src={kind === 'real' ? VIDEO_REAL : VIDEO_FAKE}
              label={i === 0 ? 'Clip A' : 'Clip B'}
              isPicked={videoPick === kind}
              isRevealed={revealed}
              onPick={setVideoPick}
            />
          ))}
        </div>
      </section>

      {/* AUDIO ROUND */}
      <section className="section section-gray" id="audio-round">
        <div className="section-header">
          <span className="section-label">Round 2 — Audio</span>
          <h2>Which voice is real?</h2>
        </div>
        {hasAudio ? (
          <div className="ty-grid">
            {audioOrder.map((kind, i) => (
              <ClipCard
                key={kind}
                kind={kind}
                type="audio"
                src={kind === 'real' ? AUDIO_REAL : AUDIO_FAKE}
                label={i === 0 ? 'Clip A' : 'Clip B'}
                isPicked={audioPick === kind}
                isRevealed={revealed}
                onPick={setAudioPick}
              />
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
      <section className="cta-section">
        <h2>Want to see this used against your organisation?</h2>
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
      </section>
    </div>
  );
}
