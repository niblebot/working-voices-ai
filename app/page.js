export const dynamic = 'force-dynamic';

import Nav from './Nav';
import { readContent } from '@/lib/getContent';

export default async function Home() {
  const c = await readContent();

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="hero">
        <div className="hero-image-panel">
          <div className="hero-img-wrap">
            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1400&q=80&fit=crop" alt="" aria-hidden="true" />
            <div className="hero-img-overlay"></div>
          </div>
        </div>
        <div className="hero-grid-bg"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="hero-content">
          <div className="hero-badge">{c.hero_badge}</div>
          <h1>
            {c.hero_h1_line1}<br />
            <span>{c.hero_h1_line2}</span>
          </h1>
          <p className="hero-sub">{c.hero_sub}</p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">{c.hero_btn_primary} &rarr;</a>
            <a href="#programme" className="btn-secondary">{c.hero_btn_secondary}</a>
          </div>
        </div>
        <div className="hero-stats-bar">
          <div className="hero-stat">
            <div className="hero-stat-number">{c.stat1_number}</div>
            <div className="hero-stat-label">{c.stat1_label}</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">{c.stat2_number}</div>
            <div className="hero-stat-label">{c.stat2_label}</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">{c.stat3_number}</div>
            <div className="hero-stat-label">{c.stat3_label}</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">{c.stat4_number}</div>
            <div className="hero-stat-label">{c.stat4_label}</div>
          </div>
        </div>
      </section>

      {/* THREAT LANDSCAPE */}
      <section className="section section-gray" id="threat">
        <div className="section-header">
          <span className="section-label">{c.threat_label}</span>
          <h2>{c.threat_h2}</h2>
          <p>{c.threat_intro}</p>
        </div>
        <div className="threat-grid">
          <div className="threat-card">
            <div className="threat-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 7l-7 5 7 5V7z"></path>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
            </div>
            <h3>{c.threat_card1_title}</h3>
            <p>{c.threat_card1_body}</p>
            <div className="threat-card-stat">
              <div className="stat-number">{c.threat_card1_stat}</div>
              <div className="stat-desc">{c.threat_card1_stat_desc}</div>
            </div>
          </div>
          <div className="threat-card">
            <div className="threat-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            </div>
            <h3>{c.threat_card2_title}</h3>
            <p>{c.threat_card2_body}</p>
            <div className="threat-card-stat">
              <div className="stat-number">{c.threat_card2_stat}</div>
              <div className="stat-desc">{c.threat_card2_stat_desc}</div>
            </div>
          </div>
          <div className="threat-card">
            <div className="threat-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h3>{c.threat_card3_title}</h3>
            <p>{c.threat_card3_body}</p>
            <div className="threat-card-stat">
              <div className="stat-number">{c.threat_card3_stat}</div>
              <div className="stat-desc">{c.threat_card3_stat_desc}</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BANNER 1 */}
      <div className="stats-banner">
        <div className="stats-banner-inner">
          <div className="stat-item">
            <div className="stat-number">{c.banner1_stat1_number}</div>
            <div className="stat-label">{c.banner1_stat1_label}</div>
            <div className="stat-source">{c.banner1_stat1_source}</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{c.banner1_stat2_number}</div>
            <div className="stat-label">{c.banner1_stat2_label}</div>
            <div className="stat-source">{c.banner1_stat2_source}</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{c.banner1_stat3_number}</div>
            <div className="stat-label">{c.banner1_stat3_label}</div>
            <div className="stat-source">{c.banner1_stat3_source}</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{c.banner1_stat4_number}</div>
            <div className="stat-label">{c.banner1_stat4_label}</div>
            <div className="stat-source">{c.banner1_stat4_source}</div>
          </div>
        </div>
      </div>

      {/* UNDERSTANDING YOUR VULNERABILITY */}
      <section className="section section-dark" id="vulnerability">
        <div className="vuln-layout">
          <div className="vuln-intro">
            <span className="section-label">{c.vuln_label}</span>
            <h2>{c.vuln_h2}</h2>
            <p>{c.vuln_intro}</p>
            <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.6)' }}>
              {c.vuln_p2}
            </p>
          </div>
          <div className="vuln-biases">
            <div className="bias-card">
              <div className="bias-number">01</div>
              <h4>{c.bias1_title}</h4>
              <p>{c.bias1_body}</p>
            </div>
            <div className="bias-card">
              <div className="bias-number">02</div>
              <h4>{c.bias2_title}</h4>
              <p>{c.bias2_body}</p>
            </div>
            <div className="bias-card">
              <div className="bias-number">03</div>
              <h4>{c.bias3_title}</h4>
              <p>{c.bias3_body}</p>
            </div>
            <div className="bias-card">
              <div className="bias-number">04</div>
              <h4>{c.bias4_title}</h4>
              <p>{c.bias4_body}</p>
            </div>
          </div>
        </div>
        <div className="vuln-callout">
          <div className="vuln-callout-inner">
            <div className="vuln-callout-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFDA8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <p>{c.vuln_callout}</p>
          </div>
        </div>
      </section>

      {/* THREE-STAGE PROGRAMME */}
      <section className="section" id="programme">
        <div className="section-header">
          <span className="section-label">{c.programme_label}</span>
          <h2>{c.programme_h2}</h2>
          <p>{c.programme_intro}</p>
        </div>
        <div className="stages-grid">
          <div className="stage-card">
            <div className="stage-number">1</div>
            <h3>{c.stage1_title}</h3>
            <div className="stage-audience">{c.stage1_audience}</div>
            <p>{c.stage1_body}</p>
            <ul>
              {(c.stage1_bullets || '').split('\n').filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
          <div className="stage-card">
            <div className="stage-number">2</div>
            <h3>{c.stage2_title}</h3>
            <div className="stage-audience">{c.stage2_audience}</div>
            <p>{c.stage2_body}</p>
            <ul>
              {(c.stage2_bullets || '').split('\n').filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
          <div className="stage-card">
            <div className="stage-number">3</div>
            <h3>{c.stage3_title}</h3>
            <div className="stage-audience">{c.stage3_audience}</div>
            <p>{c.stage3_body}</p>
            <ul>
              {(c.stage3_bullets || '').split('\n').filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* WHY LIVE LEARNING */}
      <section className="section section-yellow" id="live-learning">
        <div className="section-header">
          <span className="section-label" style={{ color: '#03101B' }}>{c.live_label}</span>
          <h2 style={{ color: '#03101B' }}>{c.live_h2}</h2>
          <p style={{ color: '#505050' }}>{c.live_intro}</p>
        </div>
        <div className="live-grid">
          <div className="live-card">
            <div className="live-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.44-4.16z"/>
                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.44-4.16z"/>
              </svg>
            </div>
            <h3>{c.live_card1_title}</h3>
            <p>{c.live_card1_body}</p>
          </div>
          <div className="live-card">
            <div className="live-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3>{c.live_card2_title}</h3>
            <p>{c.live_card2_body}</p>
          </div>
          <div className="live-card">
            <div className="live-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <h3>{c.live_card3_title}</h3>
            <p>{c.live_card3_body}</p>
          </div>
          <div className="live-card">
            <div className="live-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10"/>
                <polyline points="23 20 23 14 17 14"/>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
              </svg>
            </div>
            <h3>{c.live_card4_title}</h3>
            <p>{c.live_card4_body}</p>
          </div>
          <div className="live-card">
            <div className="live-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            <h3>{c.live_card5_title}</h3>
            <p>{c.live_card5_body}</p>
          </div>
          <div className="live-card">
            <div className="live-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
            </div>
            <h3>{c.live_card6_title}</h3>
            <p>{c.live_card6_body}</p>
          </div>
        </div>
      </section>

      {/* WHY IT WORKS */}
      <section className="section section-gray" id="why">
        <div className="why-grid">
          <div className="why-content">
            <span className="section-label">{c.why_label}</span>
            <h2>{c.why_h2}</h2>
            <p>{c.why_p1}</p>
            <p>{c.why_p2}</p>
            <p>{c.why_p3}</p>
            <p style={{ marginTop: '24px' }}>
              <strong>{c.why_stat_note}</strong>
            </p>
          </div>
          <div className="why-visual">
            <div className="why-visual-card">
              <div className="quote-mark">&ldquo;</div>
              <blockquote>{c.why_quote}</blockquote>
              <cite>{c.why_cite}</cite>
            </div>
          </div>
        </div>
      </section>

      {/* REAL-WORLD SCENARIO */}
      <section className="section section-dark scenario-section" id="scenario">
        <div className="scenario-inner">
          <div className="section-header">
            <span className="section-label">{c.scenario_label}</span>
            <h2>{c.scenario_h2}</h2>
            <p>{c.scenario_intro}</p>
          </div>
          <div className="scenario-timeline">
            <div className="scenario-step">
              <div className="step-tag">{c.scenario_step1_tag}</div>
              <h4>{c.scenario_step1_title}</h4>
              <p>{c.scenario_step1_body}</p>
            </div>
            <div className="scenario-step">
              <div className="step-tag">{c.scenario_step2_tag}</div>
              <h4>{c.scenario_step2_title}</h4>
              <p>{c.scenario_step2_body}</p>
            </div>
            <div className="scenario-step">
              <div className="step-tag">{c.scenario_step3_tag}</div>
              <h4>{c.scenario_step3_title}</h4>
              <p>{c.scenario_step3_body}</p>
            </div>
            <div className="scenario-step">
              <div className="step-tag">{c.scenario_step4_tag}</div>
              <h4>{c.scenario_step4_title}</h4>
              <p>{c.scenario_step4_body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="section section-dark">
        <div className="section-header">
          <span className="section-label">{c.for_label}</span>
          <h2>{c.for_h2}</h2>
          <p>{c.for_intro}</p>
        </div>
        <div className="proof-grid">
          <div className="proof-card">
            <div className="proof-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3>{c.for_card1_title}</h3>
            <p>{c.for_card1_body}</p>
          </div>
          <div className="proof-card">
            <div className="proof-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <h3>{c.for_card2_title}</h3>
            <p>{c.for_card2_body}</p>
          </div>
          <div className="proof-card">
            <div className="proof-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3>{c.for_card3_title}</h3>
            <p>{c.for_card3_body}</p>
          </div>
        </div>
      </section>

      {/* STATS BANNER 2 */}
      <div className="stats-banner">
        <div className="stats-banner-inner">
          <div className="stat-item">
            <div className="stat-number">{c.banner2_stat1_number}</div>
            <div className="stat-label">{c.banner2_stat1_label}</div>
            <div className="stat-source">{c.banner2_stat1_source}</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{c.banner2_stat2_number}</div>
            <div className="stat-label">{c.banner2_stat2_label}</div>
            <div className="stat-source">{c.banner2_stat2_source}</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{c.banner2_stat3_number}</div>
            <div className="stat-label">{c.banner2_stat3_label}</div>
            <div className="stat-source">{c.banner2_stat3_source}</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{c.banner2_stat4_number}</div>
            <div className="stat-label">{c.banner2_stat4_label}</div>
            <div className="stat-source">{c.banner2_stat4_source}</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <h2>{c.cta_h2}</h2>
        <p>{c.cta_body}</p>
        <a href={`mailto:${c.cta_email}?subject=AI%20Threat%20Training%20Enquiry`} className="btn-white">
          {c.cta_btn} &rarr;
        </a>
        <p style={{ marginTop: '24px', fontSize: '14px', opacity: 0.8 }}>
          {c.cta_email}
        </p>
      </section>

      {/* ABOUT WORKING VOICES */}
      <section className="section about-wv-section" id="about">
        <div className="section-header">
          <span className="section-label">{c.about_label}</span>
          <h2>{c.about_h2}</h2>
          <p className="about-wv-intro">{c.about_intro}</p>
        </div>
        <div className="client-logos-grid">
          <div className="client-logo-item">
            <img src="/logos/nasa.svg" alt="NASA" />
          </div>
          <div className="client-logo-item">
            <img src="/logos/microsoft.svg" alt="Microsoft" />
          </div>
          <div className="client-logo-item">
            <img src="/logos/jpmorgan.svg" alt="J.P. Morgan" />
          </div>
          <div className="client-logo-item">
            <img src="/logos/barclays.svg" alt="Barclays" />
          </div>
          <div className="client-logo-item">
            <img src="/logos/sony.svg" alt="Sony" />
          </div>
          <div className="client-logo-item">
            <img src="/logos/rolex.svg" alt="Rolex" />
          </div>
          <div className="client-logo-item">
            <img src="/logos/blackrock.svg" alt="BlackRock" />
          </div>
          <div className="client-logo-item">
            <img src="/logos/nomura.svg" alt="Nomura" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <img
              src="https://www.workingvoices.com/app/uploads/2024/09/footer-logo.png"
              alt="Working Voices"
            />
            <p>&copy; {new Date().getFullYear()} Working Voices. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <a href="https://www.workingvoices.com" target="_blank" rel="noopener noreferrer">workingvoices.com</a>
            <a href="https://www.linkedin.com/company/working-voices/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <div className="footer-contact">
            <a href={`mailto:${c.cta_email}`}>{c.cta_email}</a>
          </div>
        </div>
      </footer>
    </>
  );
}
