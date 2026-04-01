'use client';

import { useState, useEffect } from 'react';

const FIELD_LABELS = {
  hero_badge: 'Hero — Badge text',
  hero_h1_line1: 'Hero — Headline line 1',
  hero_h1_line2: 'Hero — Headline line 2 (blue)',
  hero_sub: 'Hero — Subheading',
  hero_btn_primary: 'Hero — Primary button',
  hero_btn_secondary: 'Hero — Secondary button',
  stat1_number: 'Stat 1 — Number',
  stat1_label: 'Stat 1 — Label',
  stat2_number: 'Stat 2 — Number',
  stat2_label: 'Stat 2 — Label',
  stat3_number: 'Stat 3 — Number',
  stat3_label: 'Stat 3 — Label',
  stat4_number: 'Stat 4 — Number',
  stat4_label: 'Stat 4 — Label',
  threat_label: 'Threat section — Label',
  threat_h2: 'Threat section — Heading',
  threat_intro: 'Threat section — Intro text',
  programme_label: 'Programme — Label',
  programme_h2: 'Programme — Heading',
  programme_intro: 'Programme — Intro text',
  stage1_title: 'Stage 1 — Title',
  stage1_audience: 'Stage 1 — Audience',
  stage1_body: 'Stage 1 — Body',
  stage2_title: 'Stage 2 — Title',
  stage2_audience: 'Stage 2 — Audience',
  stage2_body: 'Stage 2 — Body',
  stage3_title: 'Stage 3 — Title',
  stage3_audience: 'Stage 3 — Audience',
  stage3_body: 'Stage 3 — Body',
  live_label: 'Live Learning — Label',
  live_h2: 'Live Learning — Heading',
  live_intro: 'Live Learning — Intro text',
  vuln_label: 'Vulnerability — Label',
  vuln_h2: 'Vulnerability — Heading',
  vuln_intro: 'Vulnerability — Intro text',
  why_label: 'Why It Works — Label',
  why_h2: 'Why It Works — Heading',
  why_p1: 'Why It Works — Paragraph 1',
  why_p2: 'Why It Works — Paragraph 2',
  why_p3: 'Why It Works — Paragraph 3',
  why_quote: 'Why It Works — Quote',
  why_cite: 'Why It Works — Quote attribution',
  scenario_label: 'Scenario — Label',
  scenario_h2: 'Scenario — Heading',
  scenario_intro: 'Scenario — Intro text',
  cta_h2: 'CTA — Heading',
  cta_body: 'CTA — Body text',
  cta_btn: 'CTA — Button text',
  cta_email: 'CTA — Email address',
};

const TEXTAREA_KEYS = new Set([
  'hero_sub', 'threat_intro', 'programme_intro',
  'stage1_body', 'stage2_body', 'stage3_body',
  'live_intro', 'vuln_intro', 'vuln_p2',
  'why_p1', 'why_p2', 'why_p3', 'why_quote',
  'scenario_intro', 'cta_body',
]);

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [content, setContent] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError('');
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      loadContent();
    } else {
      setLoginError('Incorrect password');
    }
  }

  async function loadContent() {
    setLoading(true);
    const res = await fetch('/api/content');
    const data = await res.json();
    setContent(data);
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  }

  function handleChange(key, value) {
    setContent(prev => ({ ...prev, [key]: value }));
  }

  if (!authed) {
    return (
      <div style={styles.loginWrap}>
        <div style={styles.loginBox}>
          <img
            src="https://www.workingvoices.com/app/uploads/2024/09/footer-logo.png"
            alt="Working Voices"
            style={{ height: 28, marginBottom: 32 }}
          />
          <h1 style={styles.loginTitle}>Content Editor</h1>
          <p style={styles.loginSub}>Enter your admin password to continue</p>
          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              style={styles.input}
              autoFocus
            />
            {loginError && <p style={styles.error}>{loginError}</p>}
            <button type="submit" style={styles.btnPrimary}>Log in</button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div style={styles.loadingWrap}>Loading content…</div>;
  }

  const sections = groupFields();

  return (
    <div style={styles.adminWrap}>
      <div style={styles.adminHeader}>
        <img
          src="https://www.workingvoices.com/app/uploads/2024/09/footer-logo.png"
          alt="Working Voices"
          style={{ height: 24 }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {saved && <span style={styles.savedBadge}>Saved!</span>}
          <a href="/" target="_blank" style={styles.previewLink}>View site ↗</a>
          <button onClick={handleSave} disabled={saving} style={styles.btnPrimary}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>

      <div style={styles.adminBody}>
        {sections.map(({ section, keys }) => (
          <div key={section} style={styles.sectionBlock}>
            <h2 style={styles.sectionTitle}>{section}</h2>
            {keys.map(key => (
              <div key={key} style={styles.fieldWrap}>
                <label style={styles.label}>{FIELD_LABELS[key]}</label>
                {TEXTAREA_KEYS.has(key) ? (
                  <textarea
                    value={content[key] || ''}
                    onChange={e => handleChange(key, e.target.value)}
                    style={styles.textarea}
                    rows={4}
                  />
                ) : (
                  <input
                    type="text"
                    value={content[key] || ''}
                    onChange={e => handleChange(key, e.target.value)}
                    style={styles.input}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={styles.adminFooter}>
        {saved && <span style={styles.savedBadge}>Saved!</span>}
        <button onClick={handleSave} disabled={saving} style={styles.btnPrimary}>
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  );
}

function groupFields() {
  const groups = [
    { section: 'Hero', prefix: 'hero_' },
    { section: 'Hero Stats', prefix: 'stat' },
    { section: 'Threat Landscape', prefix: 'threat_' },
    { section: 'Programme', prefix: 'programme_' },
    { section: 'Stage 1', prefix: 'stage1_' },
    { section: 'Stage 2', prefix: 'stage2_' },
    { section: 'Stage 3', prefix: 'stage3_' },
    { section: 'Why Live Learning', prefix: 'live_' },
    { section: 'Why Smart People Get Fooled', prefix: 'vuln_' },
    { section: 'Why It Works', prefix: 'why_' },
    { section: 'Anatomy of an Attack', prefix: 'scenario_' },
    { section: 'Call to Action', prefix: 'cta_' },
  ];

  return groups.map(({ section, prefix }) => ({
    section,
    keys: Object.keys(FIELD_LABELS).filter(k => k.startsWith(prefix)),
  })).filter(g => g.keys.length > 0);
}

const styles = {
  loginWrap: {
    minHeight: '100vh',
    background: '#03101B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'system-ui, sans-serif',
  },
  loginBox: {
    background: '#fff',
    borderRadius: 16,
    padding: '48px 40px',
    width: '100%',
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 8,
    color: '#03101B',
  },
  loginSub: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  loadingWrap: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'system-ui, sans-serif',
    color: '#666',
  },
  adminWrap: {
    minHeight: '100vh',
    background: '#f5f7fa',
    fontFamily: 'system-ui, sans-serif',
  },
  adminHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    background: '#03101B',
    padding: '16px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  },
  adminBody: {
    maxWidth: 760,
    margin: '0 auto',
    padding: '40px 24px 120px',
  },
  adminFooter: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: '#fff',
    borderTop: '1px solid #e8ecf1',
    padding: '16px 32px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 16,
  },
  sectionBlock: {
    background: '#fff',
    borderRadius: 12,
    padding: '28px 32px',
    marginBottom: 24,
    border: '1px solid #e8ecf1',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#03101B',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottom: '2px solid #1677F8',
  },
  fieldWrap: {
    marginBottom: 20,
  },
  label: {
    display: 'block',
    fontSize: 12,
    fontWeight: 600,
    color: '#505050',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #dde1e8',
    borderRadius: 8,
    fontSize: 14,
    color: '#03101B',
    background: '#fff',
    boxSizing: 'border-box',
    outline: 'none',
  },
  textarea: {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #dde1e8',
    borderRadius: 8,
    fontSize: 14,
    color: '#03101B',
    background: '#fff',
    boxSizing: 'border-box',
    resize: 'vertical',
    outline: 'none',
    lineHeight: 1.6,
    fontFamily: 'system-ui, sans-serif',
  },
  btnPrimary: {
    background: '#1677F8',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '10px 24px',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    width: '100%',
  },
  error: {
    color: '#e74c3c',
    fontSize: 13,
    marginBottom: 12,
    marginTop: -4,
  },
  savedBadge: {
    background: '#22c55e',
    color: '#fff',
    borderRadius: 6,
    padding: '4px 12px',
    fontSize: 13,
    fontWeight: 600,
  },
  previewLink: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    textDecoration: 'none',
  },
};
