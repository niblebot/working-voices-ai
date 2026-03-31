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
          <li><a href="#live-learning" onClick={() => setMenuOpen(false)}>Our Approach</a></li>
          <li><a href="#scenario" onClick={() => setMenuOpen(false)}>Real-World Attacks</a></li>
          <li><a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>Book a Talk</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        {/* Full-width image panel sits behind everything */}
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

      {/* ── NEW: WHY LIVE LEARNING ── */}
      <section className="section section-yellow" id="live-learning">
        <div className="section-header">
          <span className="section-label" style={{ color: '#03101B' }}>Why Live Sessions</span>
          <h2 style={{ color: '#03101B' }}>Human Interaction You Can&apos;t Download</h2>
          <p style={{ color: '#505050' }}>
            eLearning can teach facts. It cannot change behaviour under pressure.
            That requires a very different kind of training.
          </p>
        </div>
        <div className="live-grid">
          <div className="live-card">
            <div className="live-card-icon">
              {/* Brain / thinking icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.44-4.16z"/>
                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.44-4.16z"/>
              </svg>
            </div>
            <h3>Behaviour Changes in the Room</h3>
            <p>
              Psychological self-defence isn&apos;t a concept you learn &mdash; it&apos;s a reflex you
              build. Live facilitation creates the emotional context needed for real
              behavioural change. eLearning creates awareness. We create resilience.
            </p>
          </div>
          <div className="live-card">
            <div className="live-card-icon">
              {/* People/group icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3>Shared Experience Builds Culture</h3>
            <p>
              When a team goes through a deepfake reveal together, it becomes a shared
              reference point &mdash; a moment they talk about. That cultural memory is what
              keeps people vigilant long after the training ends.
            </p>
          </div>
          <div className="live-card">
            <div className="live-card-icon">
              {/* Zap / energy icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <h3>Emotional Impact Drives Retention</h3>
            <p>
              We remember what shocks us. A live demonstration where your own colleague
              &mdash; or your own voice &mdash; appears as a deepfake creates the kind of
              visceral understanding that no video module ever could.
            </p>
          </div>
          <div className="live-card">
            <div className="live-card-icon">
              {/* Refresh / adaptive icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10"/>
                <polyline points="23 20 23 14 17 14"/>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
              </svg>
            </div>
            <h3>Tailored to Your Organisation</h3>
            <p>
              A skilled facilitator reads the room, adapts to your industry&apos;s specific
              threat profile, and answers the questions your people are actually asking.
              No algorithm does that.
            </p>
          </div>
          <div className="live-card">
            <div className="live-card-icon">
              {/* Target icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            <h3>Practice Under Pressure</h3>
            <p>
              Role-play scenarios, live simulations, and group challenges let people
              practise the &ldquo;pause and verify&rdquo; habit in a safe environment &mdash;
              so it becomes instinctive when it matters most.
            </p>
          </div>
          <div className="live-card">
            <div className="live-card-icon">
              {/* Trending up icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
            </div>
            <h3>Measurable Results</h3>
            <p>
              Our simulated deepfake testing phase provides hard data on vulnerability
              before and after training &mdash; giving your board concrete evidence that
              the investment is working.
            </p>
          </div>
        </div>
      </section>

      {/* ── NEW: UNDERSTANDING YOUR VULNERABILITY ── */}
      <section className="section section-dark" id="vulnerability">
        <div className="vuln-layout">
          <div className="vuln-intro">
            <span className="section-label">Understanding Your Own Vulnerability</span>
            <h2>Why Smart People Get Fooled</h2>
            <p>
              The uncomfortable truth about AI-generated attacks is that intelligence is no protection.
              Fraudsters don&apos;t exploit ignorance &mdash; they exploit the very cognitive shortcuts
              that make high-performing people effective.
            </p>
            <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.6)' }}>
              Understanding your own psychological architecture is the first step to defending it.
            </p>
          </div>
          <div className="vuln-biases">
            <div className="bias-card">
              <div className="bias-number">01</div>
              <h4>Authority Bias</h4>
              <p>When a request appears to come from the CEO, our brain downregulates scepticism.
              AI attackers exploit this by creating flawless impersonations of senior leadership,
              deliberately triggering deference before rational thought kicks in.</p>
            </div>
            <div className="bias-card">
              <div className="bias-number">02</div>
              <h4>Urgency &amp; Scarcity</h4>
              <p>Phrases like &ldquo;this must be done today&rdquo; or &ldquo;don&apos;t discuss this with anyone yet&rdquo;
              deliberately bypass deliberate thinking. Urgency narrows attention, suppresses
              doubt, and dramatically increases compliance.</p>
            </div>
            <div className="bias-card">
              <div className="bias-number">03</div>
              <h4>Familiarity &amp; Trust</h4>
              <p>Attackers study their targets for weeks before striking &mdash; referencing real
              projects, known colleagues, and recent events. Familiarity creates comfort.
              Comfort suspends verification. That&apos;s the attack vector.</p>
            </div>
            <div className="bias-card">
              <div className="bias-number">04</div>
              <h4>Confirmation Bias</h4>
              <p>Once we believe something is legitimate &mdash; a credible email, a familiar face
              on a call &mdash; we unconsciously filter out signals that contradict it. Our
              training builds the habit of actively seeking disconfirming evidence.</p>
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
            <p>
              <strong>The goal isn&apos;t to make your people paranoid.</strong> It&apos;s to give them
              the intellectual humility to pause, the emotional presence to notice when
              something feels off, and the confidence to verify &mdash; even when under pressure
              from apparent authority.
            </p>
          </div>
        </div>
      </section>

      {/* WHY IT WORKS */}
      <section className="section section-gray" id="why">
        <div className="why-grid">
          <div className="why-content">
            <span className="section-label">The Working Voices Difference</span>
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
        <a href="mailto:robert@workingvoices.com?subject=AI%20Threat%20Training%20Enquiry" className="btn-white">
          Get in Touch &rarr;
        </a>
        <p style={{ marginTop: '24px', fontSize: '14px', opacity: 0.8 }}>
          robert@workingvoices.com &nbsp;|&nbsp; +44 203 865 5325
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
            <a href="mailto:robert@workingvoices.com">robert@workingvoices.com</a>
            <a href="tel:+442038655325">+44 203 865 5325</a>
          </div>
        </div>
      </footer>
    </>
  );
}
