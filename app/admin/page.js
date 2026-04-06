'use client';

import { useState, useEffect } from 'react';

const FIELD_LABELS = {
  // Hero
  hero_badge: 'Hero — Badge text',
  hero_h1_line1: 'Hero — Headline line 1',
  hero_h1_line2: 'Hero — Headline line 2 (blue)',
  hero_sub: 'Hero — Subheading',
  hero_btn_primary: 'Hero — Primary button',
  hero_btn_secondary: 'Hero — Secondary button',

  // Hero stats
  stat1_number: 'Stat 1 — Number',
  stat1_label: 'Stat 1 — Label',
  stat2_number: 'Stat 2 — Number',
  stat2_label: 'Stat 2 — Label',
  stat3_number: 'Stat 3 — Number',
  stat3_label: 'Stat 3 — Label',
  stat4_number: 'Stat 4 — Number',
  stat4_label: 'Stat 4 — Label',

  // Threat section
  threat_label: 'Threat section — Label',
  threat_h2: 'Threat section — Heading',
  threat_intro: 'Threat section — Intro text',

  // Threat cards
  threat_card1_title: 'Threat card 1 — Title',
  threat_card1_body: 'Threat card 1 — Body',
  threat_card1_stat: 'Threat card 1 — Stat number',
  threat_card1_stat_desc: 'Threat card 1 — Stat description',
  threat_card2_title: 'Threat card 2 — Title',
  threat_card2_body: 'Threat card 2 — Body',
  threat_card2_stat: 'Threat card 2 — Stat number',
  threat_card2_stat_desc: 'Threat card 2 — Stat description',
  threat_card3_title: 'Threat card 3 — Title',
  threat_card3_body: 'Threat card 3 — Body',
  threat_card3_stat: 'Threat card 3 — Stat number',
  threat_card3_stat_desc: 'Threat card 3 — Stat description',

  // Stats Banner 1
  banner1_stat1_number: 'Stats banner 1 — Stat 1 number',
  banner1_stat1_label: 'Stats banner 1 — Stat 1 label',
  banner1_stat1_source: 'Stats banner 1 — Stat 1 source',
  banner1_stat2_number: 'Stats banner 1 — Stat 2 number',
  banner1_stat2_label: 'Stats banner 1 — Stat 2 label',
  banner1_stat2_source: 'Stats banner 1 — Stat 2 source',
  banner1_stat3_number: 'Stats banner 1 — Stat 3 number',
  banner1_stat3_label: 'Stats banner 1 — Stat 3 label',
  banner1_stat3_source: 'Stats banner 1 — Stat 3 source',
  banner1_stat4_number: 'Stats banner 1 — Stat 4 number',
  banner1_stat4_label: 'Stats banner 1 — Stat 4 label',
  banner1_stat4_source: 'Stats banner 1 — Stat 4 source',

  // Programme
  programme_label: 'Programme — Label',
  programme_h2: 'Programme — Heading',
  programme_intro: 'Programme — Intro text',

  // Stage 1
  stage1_title: 'Stage 1 — Title',
  stage1_audience: 'Stage 1 — Audience',
  stage1_body: 'Stage 1 — Body',
  stage1_bullets: 'Stage 1 — Bullet points (one per line)',

  // Stage 2
  stage2_title: 'Stage 2 — Title',
  stage2_audience: 'Stage 2 — Audience',
  stage2_body: 'Stage 2 — Body',
  stage2_bullets: 'Stage 2 — Bullet points (one per line)',

  // Stage 3
  stage3_title: 'Stage 3 — Title',
  stage3_audience: 'Stage 3 — Audience',
  stage3_body: 'Stage 3 — Body',
  stage3_bullets: 'Stage 3 — Bullet points (one per line)',

  // Why live learning
  live_label: 'Live Learning — Label',
  live_h2: 'Live Learning — Heading',
  live_intro: 'Live Learning — Intro text',

  // Live cards
  live_card1_title: 'Live card 1 — Title',
  live_card1_body: 'Live card 1 — Body',
  live_card2_title: 'Live card 2 — Title',
  live_card2_body: 'Live card 2 — Body',
  live_card3_title: 'Live card 3 — Title',
  live_card3_body: 'Live card 3 — Body',
  live_card4_title: 'Live card 4 — Title',
  live_card4_body: 'Live card 4 — Body',
  live_card5_title: 'Live card 5 — Title',
  live_card5_body: 'Live card 5 — Body',
  live_card6_title: 'Live card 6 — Title',
  live_card6_body: 'Live card 6 — Body',

  // Vulnerability
  vuln_label: 'Vulnerability — Label',
  vuln_h2: 'Vulnerability — Heading',
  vuln_intro: 'Vulnerability — Intro text',
  vuln_p2: 'Vulnerability — Secondary paragraph',
  vuln_callout: 'Vulnerability — Callout text',

  // Bias cards
  bias1_title: 'Bias card 1 — Title',
  bias1_body: 'Bias card 1 — Body',
  bias2_title: 'Bias card 2 — Title',
  bias2_body: 'Bias card 2 — Body',
  bias3_title: 'Bias card 3 — Title',
  bias3_body: 'Bias card 3 — Body',
  bias4_title: 'Bias card 4 — Title',
  bias4_body: 'Bias card 4 — Body',

  // Why it works
  why_label: 'Why It Works — Label',
  why_h2: 'Why It Works — Heading',
  why_p1: 'Why It Works — Paragraph 1',
  why_p2: 'Why It Works — Paragraph 2',
  why_p3: 'Why It Works — Paragraph 3',
  why_stat_note: 'Why It Works — Stat note (bold)',
  why_quote: 'Why It Works — Quote',
  why_cite: 'Why It Works — Quote attribution',

  // Scenario header
  scenario_label: 'Scenario — Label',
  scenario_h2: 'Scenario — Heading',
  scenario_intro: 'Scenario — Intro text',

  // Scenario steps
  scenario_step1_tag: 'Scenario step 1 — Tag',
  scenario_step1_title: 'Scenario step 1 — Title',
  scenario_step1_body: 'Scenario step 1 — Body',
  scenario_step2_tag: 'Scenario step 2 — Tag',
  scenario_step2_title: 'Scenario step 2 — Title',
  scenario_step2_body: 'Scenario step 2 — Body',
  scenario_step3_tag: 'Scenario step 3 — Tag',
  scenario_step3_title: 'Scenario step 3 — Title',
  scenario_step3_body: 'Scenario step 3 — Body',
  scenario_step4_tag: 'Scenario step 4 — Tag',
  scenario_step4_title: 'Scenario step 4 — Title',
  scenario_step4_body: 'Scenario step 4 — Body',

  // Who this is for
  for_label: 'Who This Is For — Label',
  for_h2: 'Who This Is For — Heading',
  for_intro: 'Who This Is For — Intro text',
  for_card1_title: 'Who card 1 — Title',
  for_card1_body: 'Who card 1 — Body',
  for_card2_title: 'Who card 2 — Title',
  for_card2_body: 'Who card 2 — Body',
  for_card3_title: 'Who card 3 — Title',
  for_card3_body: 'Who card 3 — Body',

  // Stats Banner 2
  banner2_stat1_number: 'Stats banner 2 — Stat 1 number',
  banner2_stat1_label: 'Stats banner 2 — Stat 1 label',
  banner2_stat1_source: 'Stats banner 2 — Stat 1 source',
  banner2_stat2_number: 'Stats banner 2 — Stat 2 number',
  banner2_stat2_label: 'Stats banner 2 — Stat 2 label',
  banner2_stat2_source: 'Stats banner 2 — Stat 2 source',
  banner2_stat3_number: 'Stats banner 2 — Stat 3 number',
  banner2_stat3_label: 'Stats banner 2 — Stat 3 label',
  banner2_stat3_source: 'Stats banner 2 — Stat 3 source',
  banner2_stat4_number: 'Stats banner 2 — Stat 4 number',
  banner2_stat4_label: 'Stats banner 2 — Stat 4 label',
  banner2_stat4_source: 'Stats banner 2 — Stat 4 source',

  // CTA
  cta_h2: 'CTA — Heading',
  cta_body: 'CTA — Body text',
  cta_btn: 'CTA — Button text',
  cta_email: 'CTA — Email address',

  // About
  about_label: 'About — Label',
  about_h2: 'About — Heading',
  about_intro: 'About — Intro text',
};

const TEXTAREA_KEYS = new Set([
  'hero_sub',
  'threat_intro', 'threat_card1_body', 'threat_card1_stat_desc',
  'threat_card2_body', 'threat_card2_stat_desc',
  'threat_card3_body', 'threat_card3_stat_desc',
  'programme_intro',
  'stage1_body', 'stage1_bullets', 'stage2_body', 'stage2_bullets', 'stage3_body', 'stage3_bullets',
  'live_intro',
  'live_card1_body', 'live_card2_body', 'live_card3_body',
  'live_card4_body', 'live_card5_body', 'live_card6_body',
  'vuln_intro', 'vuln_p2', 'vuln_callout',
  'bias1_body', 'bias2_body', 'bias3_body', 'bias4_body',
  'why_p1', 'why_p2', 'why_p3', 'why_stat_note', 'why_quote',
  'scenario_intro',
  'scenario_step1_body', 'scenario_step2_body', 'scenario_step3_body', 'scenario_step4_body',
  'for_intro', 'for_card1_body', 'for_card2_body', 'for_card3_body',
  'cta_body',
  'about_intro',
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
    { section: 'Stats Banner 1', prefix: 'banner1_' },
    { section: 'Programme', prefix: 'programme_' },
    { section: 'Stage 1', prefix: 'stage1_' },
    { section: 'Stage 2', prefix: 'stage2_' },
    { section: 'Stage 3', prefix: 'stage3_' },
    { section: 'Why Live Learning', prefix: 'live_' },
    { section: 'Vulnerability — Intro', prefix: 'vuln_' },
    { section: 'Vulnerability — Bias Cards', prefix: 'bias' },
    { section: 'Why It Works', prefix: 'why_' },
    { section: 'Anatomy of an Attack', prefix: 'scenario_' },
    { section: 'Who This Is For', prefix: 'for_' },
    { section: 'Stats Banner 2', prefix: 'banner2_' },
    { section: 'Call to Action', prefix: 'cta_' },
    { section: 'About Working Voices', prefix: 'about_' },
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
