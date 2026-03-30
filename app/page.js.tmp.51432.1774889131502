'use client';

import { useState } from 'react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <a href="#" className="nav-logo">
          <img
            src="https://www.workingvoices.com/app/uploads/2024/09/footer-logo.png"
            alt="Working Voices"
          />
        </a>
        <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          <li><a href="#threat" onClick={() => setMenuOpen(false)}>The Threat</a></li>
          <li><a href="#programme" onClick={() => setMenuOpen(false)}>Programme</a></li>
          <li><a href="#why" onClick={() => setMenuOpen(false)}>Why It Works</a></li>
          <li><a href="#scenario" onClick={() => setMenuOpen(false)}>Real-World Attacks</a></li>
          <li><a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>Book a Talk</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid-bg"></div>
        <div className="hero-glow"></div>
        <div className="hero-content">
          <div className="hero-badge">AI Threat Defence Training</div>
          <h1>
            Your people are your<br />
            <span>greatest vulnerability</span>
          </h1>
          <p className="hero-sub">
            AI-generated deepfakes, voice clones, and hyper-personalised phishing are bypassing
            every technical safeguard you have. The only defence left is a trained human mind.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">Book the Accelerator Talk &rarr;</a>
            <a href="#programme" className="btn-secondary">Explore the Programme</a>
          </div>
        </div>
        <div className="hero-stats-bar">
          <div className="hero-stat">
            <div className="hero-stat-number">$25.6M</div>
            <div className="hero-stat-label">Stolen in a single deepfake call</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">3,000%</div>
            <div className="hero-stat-label">Rise in deepfake fraud attempts</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">21 sec</div>
            <div className="hero-stat-label">To click a malicious link</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">68%</div>
            <div className="hero-stat-label">Of breaches involve human error</div>
          </div>
        </div>
      </section>

      {/* THREAT LANDSCAPE */}
      <section className="section section-gray" id="threat">
        <div className="section-header">
          <span className="section-label">The Threat Landscape</span>
          <h2>AI Has Changed the Rules of Fraud</h2>
          <p>
            Criminals no longer need technical sophistication. With consumer-grade AI tools, they
            can impersonate your CEO on a video call, clone a colleague&apos;s voice from a podcast,
            or craft a phishing email indistinguishable from the real thing.
          </p>
        </div>
        <div className="threat-grid">
          <div className="threat-card">
            <div className="threat-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 7l-7 5 7 5V7z"></path>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
            </div>
            <h3>Deepfake Video Calls</h3>
            <p>
              Real-time face and voice manipulation lets attackers impersonate executives
              on live video conferences, authorising fraudulent transfers.
            </p>
            <div className="threat-card-stat">
              <div className="stat-number">$25.6M</div>
              <div className="stat-desc">
                Stolen from engineering firm Arup via a single deepfake video call
                impersonating the CFO. &mdash; CNN, 2024
              </div>
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
            <h3>AI Voice Cloning</h3>
            <p>
              A few seconds of publicly available audio is enough to clone someone&apos;s voice with
              near-perfect accuracy, enabling convincing phone-based fraud.
            </p>
            <div className="threat-card-stat">
              <div className="stat-number">1,600%</div>
              <div className="stat-desc">
                Surge in deepfake-enabled voice phishing attacks in Q1 2025 vs Q4 2024.
                &mdash; Keepnet Labs
              </div>
            </div>
          </div>
          <div className="threat-card">
            <div className="threat-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h3>AI-Generated Phishing</h3>
            <p>
              Generative AI creates perfectly written, hyper-personalised phishing emails
              in seconds &mdash; with dramatically higher success rates than human-crafted attacks.
            </p>
            <div className="threat-card-stat">
              <div className="stat-number">54%</div>
              <div className="stat-desc">
                Click-through rate on AI-generated phishing emails, vs 12% for conventional
                phishing. &mdash; Brightside AI, 2024
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <div className="stats-banner">
        <div className="stats-banner-inner">
          <div className="stat-item">
            <div className="stat-number">&pound;14.4B</div>
            <div className="stat-label">Annual cost of fraud in England &amp; Wales</div>
            <div className="stat-source">UK Home Office, 2024</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">Every 5 min</div>
            <div className="stat-label">A deepfake attack is attempted globally</div>
            <div className="stat-source">Entrust, 2024</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">$40B</div>
            <div className="stat-label">Predicted AI fraud losses by 2027</div>
            <div className="stat-source">Deloitte</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">80%</div>
            <div className="stat-label">Of companies have no deepfake defence protocols</div>
            <div className="stat-source">Keepnet Labs</div>
          </div>
        </div>
      </div>

      {/* THREE-STAGE PROGRAMME */}
      <section className="section" id="programme">
        <div className="section-header">
          <span className="section-label">The Programme</span>
          <h2>Three Stages to Organisational Resilience</h2>
          <p>
            A structured approach that moves from awareness to action to ongoing vigilance &mdash;
            building genuine psychological self-defence across your workforce.
          </p>
        </div>
        <div className="stages-grid">
          <div className="stage-card">
            <div className="stage-number">1</div>
            <h3>The Accelerator Talk</h3>
            <div className="stage-audience">100 &ndash; 200+ attendees</div>
            <p>
              A high-impact presentation featuring live demonstrations of AI-generated
              impersonation. Audiences see a convincing deepfake of a trusted figure &mdash;
              then experience the reveal. This is the moment that creates urgency.
            </p>
            <ul>
              <li>Live deepfake demonstration</li>
              <li>Real-world case studies of AI fraud</li>
              <li>The psychology of why people fall for it</li>
              <li>Designed to be talked about afterwards</li>
            </ul>
          </div>
          <div className="stage-card">
            <div className="stage-number">2</div>
            <h3>Intensive Training</h3>
            <div className="stage-audience">Small groups &bull; Half or full day</div>
            <p>
              Hands-on workshops exploring how the human mind processes information,
              creates trust, and becomes vulnerable to manipulation under pressure.
            </p>
            <ul>
              <li>How urgency and authority bypass rational thinking</li>
              <li>Recognising emotional manipulation tactics</li>
              <li>Verification protocols that actually work</li>
              <li>Building intellectual humility as a defence</li>
            </ul>
          </div>
          <div className="stage-card">
            <div className="stage-number">3</div>
            <h3>Simulated Testing</h3>
            <div className="stage-audience">Ongoing &bull; Organisation-wide</div>
            <p>
              Controlled, bespoke deepfake attacks deployed across the organisation
              over the following months. Those who are caught out receive targeted
              refresher training.
            </p>
            <ul>
              <li>Custom deepfakes tailored to your organisation</li>
              <li>Unannounced simulated attacks over time</li>
              <li>Measurable results and vulnerability reports</li>
              <li>Refresher training for those who need it</li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHY IT WORKS */}
      <section className="section section-gray" id="why">
        <div className="why-grid">
          <div className="why-content">
            <span className="section-label">The Approach</span>
            <h2>Psychological Self-Defence</h2>
            <p>
              Traditional cybersecurity training tells people what to watch for. But
              AI-generated attacks don&apos;t look like attacks. They look like Tuesday.
            </p>
            <p>
              Our programme is built on a different principle: training the human mind
              to stay emotionally present under pressure, to question authority with
              intellectual humility, and to build verification reflexes that become second nature.
            </p>
            <p>
              Because when urgency, authority, and realism combine, technical awareness
              isn&apos;t enough. You need psychological resilience.
            </p>
            <p style={{ marginTop: '24px' }}>
              <strong>People who can identify deepfake videos are barely better than a coin flip</strong> &mdash;
              just 24.5% accuracy. The answer isn&apos;t better eyes. It&apos;s better thinking.
            </p>
          </div>
          <div className="why-visual">
            <div className="why-visual-card">
              <div className="quote-mark">&ldquo;</div>
              <blockquote>
                The idea is to keep people emotionally present, taking responsibility
                with intellectual humility and being nimble enough to avoid these attacks.
              </blockquote>
              <cite>Nick Smallman &mdash; Founder, Working Voices</cite>
            </div>
          </div>
        </div>
      </section>

      {/* REAL-WORLD SCENARIO */}
      <section className="section section-dark scenario-section" id="scenario">
        <div className="scenario-inner">
          <div className="section-header">
            <span className="section-label">Anatomy of an Attack</span>
            <h2>How a &pound;25 Million Deepfake Fraud Unfolds</h2>
            <p>
              In January 2024, an employee at engineering firm Arup joined what appeared to be a
              routine video call with senior colleagues. Every face, every voice was AI-generated.
            </p>
          </div>
          <div className="scenario-timeline">
            <div className="scenario-step">
              <div className="step-tag">Week 1&ndash;2: Reconnaissance</div>
              <h4>The attackers gather intelligence</h4>
              <p>
                Publicly available LinkedIn profiles, conference videos, podcast appearances,
                and company announcements are scraped to build detailed profiles of key executives.
                This is spear-phishing at its most targeted.
              </p>
            </div>
            <div className="scenario-step">
              <div className="step-tag">Week 3: Building trust</div>
              <h4>Legitimate-looking emails arrive</h4>
              <p>
                The target receives credible emails that appear to come from senior leadership,
                establishing context for an upcoming &ldquo;confidential&rdquo; financial discussion.
                Nothing seems unusual.
              </p>
            </div>
            <div className="scenario-step">
              <div className="step-tag">The attack: Live deepfake call</div>
              <h4>A video conference with AI-generated colleagues</h4>
              <p>
                The employee joins a video call where the CFO and multiple colleagues appear to
                be present. Real-time face and voice manipulation makes the impersonation
                convincing. A &pound;20 million transfer is authorised.
              </p>
            </div>
            <div className="scenario-step">
              <div className="step-tag">Aftermath</div>
              <h4>$25.6 million lost before detection</h4>
              <p>
                Multiple transfers were made across 15 transactions before the fraud was
                discovered. The employee had followed what appeared to be legitimate
                instructions from trusted superiors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="section section-dark">
        <div className="section-header">
          <span className="section-label">Who This Is For</span>
          <h2>Built for Organisations Under Threat</h2>
          <p>
            Particularly relevant for defence, finance, professional services, and any
            organisation where a single fraudulent authorisation could cause catastrophic loss.
          </p>
        </div>
        <div className="proof-grid">
          <div className="proof-card">
            <div className="proof-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3>Defence &amp; Government</h3>
            <p>
              Where information security is paramount and state-sponsored actors use
              increasingly sophisticated AI tools for social engineering.
            </p>
          </div>
          <div className="proof-card">
            <div className="proof-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <h3>Financial Services</h3>
            <p>
              $2.77 billion in Business Email Compromise losses reported to the FBI in
              2024 alone. Finance teams are the primary target for AI-enabled fraud.
            </p>
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
            <h3>Enterprise &amp; Professional Services</h3>
            <p>
              Any organisation where executives are public-facing, decisions move fast,
              and a single compromised employee can authorise significant transactions.
            </p>
          </div>
        </div>
      </section>

      {/* ADDITIONAL STATS ROW */}
      <div className="stats-banner">
        <div className="stats-banner-inner">
          <div className="stat-item">
            <div className="stat-number">85%</div>
            <div className="stat-label">Of organisations experienced a social engineering attack in 2024</div>
            <div className="stat-source">PhishLabs</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5 min</div>
            <div className="stat-label">For AI to create a phishing campaign vs 16 hours for a human</div>
            <div className="stat-source">IBM X-Force</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">49%</div>
            <div className="stat-label">Of businesses globally have experienced a deepfake incident</div>
            <div className="stat-source">Keepnet Labs</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">&pound;5.2B</div>
            <div className="stat-label">Annual cost of fraud against UK businesses</div>
            <div className="stat-source">UK Home Office</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <h2>Protect Your Organisation</h2>
        <p>
          Book the Accelerator Talk for your leadership team and see how AI-generated
          attacks could target your people &mdash; before a real attacker does.
        </p>
        <a href="mailto:emea@workingvoices.com?subject=AI%20Threat%20Training%20Enquiry" className="btn-white">
          Get in Touch &rarr;
        </a>
        <p style={{ marginTop: '24px', fontSize: '14px', opacity: 0.8 }}>
          emea@workingvoices.com &nbsp;|&nbsp; +44 203 865 5325
        </p>
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
            <a href="https://www.workingvoices.com" target="_blank" rel="noopener noreferrer">
              workingvoices.com
            </a>
            <a href="https://www.linkedin.com/company/working-voices/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
          <div className="footer-contact">
            <a href="mailto:emea@workingvoices.com">emea@workingvoices.com</a>
            <a href="tel:+442038655325">+44 203 865 5325</a>
          </div>
        </div>
      </footer>
    </>
  );
}
