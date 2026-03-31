'use client';

import { useState } from 'react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <a href="#" className="nav-logo">
          <img src="https://www.workingvoices.com/app/uploads/2024/09/footer-logo.png" alt="Working Voices" />
        </a>
        <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          <li><a href="#threat" onClick={() => setMenuOpen(false)}>The Threat</a></li>
          <li><a href="#programme" onClick={() => setMenuOpen(false)}>Programme</a></li>
          <li><a href="#live-learning" onClick={() => setMenuOpen(false)}>Our Approach</a></li>
          <li><a href="#cases" onClick={() => setMenuOpen(false)}>Real Cases</a></li>
          <li><a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>Book a Talk</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid-bg"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="hero-content">
          <div className="hero-badge">Managing AI-GA &mdash; AI-Generated Attacks</div>
          <h1>
            The final defence<br />
            <span>is human</span>
          </h1>
          <p className="hero-sub">
            AI doesn&apos;t break the lock. It persuades a human to open the door.
            We train them not to.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">Book the Accelerator Talk &rarr;</a>
            <a href="#programme" className="btn-secondary">Explore the Programme</a>
          </div>
        </div>
        <div className="hero-stats-bar">
          <div className="hero-stat">
            <div className="hero-stat-number">73%</div>
            <div className="hero-stat-label">Of all cyber incidents are business email attacks</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">$55.5B</div>
            <div className="hero-stat-label">Lost to BEC globally over the past decade</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">43%</div>
            <div className="hero-stat-label">Of UK businesses breached in the last 12 months</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">83%</div>
            <div className="hero-stat-label">Of ransoms go unrecovered</div>
          </div>
        </div>
      </section>

      {/* THREAT LANDSCAPE */}
      <section className="section section-gray" id="threat">
        <div className="section-header">
          <span className="section-label">The Threat Landscape</span>
          <h2>AI Has Changed the Rules of Fraud</h2>
          <p>
            Criminals no longer need technical sophistication. With consumer-grade AI tools they
            can impersonate your CEO on a video call, clone a colleague&apos;s voice from a podcast,
            or craft a phishing email indistinguishable from the real thing.
          </p>
        </div>
        <div className="threat-grid">
          <div className="threat-card">
            <div className="threat-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
            </div>
            <h3>Deepfake Video Calls</h3>
            <p>Real-time face and voice manipulation lets attackers impersonate executives on live video conferences, authorising fraudulent transfers with no technical trace.</p>
            <div className="threat-card-stat">
              <div className="stat-number">$25M</div>
              <div className="stat-desc">Stolen from Arup via a deepfake video conference — every person on the call was an AI avatar. CNN, 2024</div>
            </div>
          </div>
          <div className="threat-card">
            <div className="threat-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3>Business Email Compromise</h3>
            <p>LLM-powered social engineering creates perfectly written, hyper-personalised emails. Attackers mine LinkedIn to build pretexts so specific, you stop questioning them.</p>
            <div className="threat-card-stat">
              <div className="stat-number">87%</div>
              <div className="stat-desc">Of businesses identify AI vulnerabilities as the fastest-growing cyber risk</div>
            </div>
          </div>
          <div className="threat-card">
            <div className="threat-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            </div>
            <h3>AI Voice Cloning</h3>
            <p>Seconds of publicly available audio are enough to clone an executive&apos;s voice. Phone-based fraud using synthetic voices is growing at an extraordinary rate.</p>
            <div className="threat-card-stat">
              <div className="stat-number">£195,000</div>
              <div className="stat-desc">Average cost of a major cyber-attack to UK businesses. DSIT Cyber Breaches Survey 2025</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 PHASES OF AN ATTACK */}
      <section className="section section-dark phases-section">
        <div className="section-header">
          <span className="section-label">How Attacks Work</span>
          <h2>The 4 Phases of an AI-Generated Attack</h2>
          <p>Every sophisticated attack follows a predictable structure. Understanding it is the first step to defeating it.</p>
        </div>
        <div className="phases-flow">
          <div className="phase-card">
            <div className="phase-num">01</div>
            <h4>Recon</h4>
            <p>LinkedIn, social media and org structure mining. They know your name, your boss, your projects.</p>
          </div>
          <div className="phase-arrow">&#9654;</div>
          <div className="phase-card">
            <div className="phase-num">02</div>
            <h4>Setup</h4>
            <p>Fake emails, deepfake voice &amp; video creation. Weeks of investment to build convincing identities.</p>
          </div>
          <div className="phase-arrow">&#9654;</div>
          <div className="phase-card">
            <div className="phase-num">03</div>
            <h4>Attack</h4>
            <p>Urgency + authority + secrecy pressure applied simultaneously to bypass rational thinking.</p>
          </div>
          <div className="phase-arrow">&#9654;</div>
          <div className="phase-card">
            <div className="phase-num">04</div>
            <h4>Extract</h4>
            <p>Funds wired and laundered via crypto within minutes. Recovery rate: 17%.</p>
          </div>
          <div className="phase-arrow phase-arrow-back">&#9664;</div>
          <div className="phase-card phase-card-defence">
            <div className="phase-num phase-num-defence">&#10003;</div>
            <h4>Defence</h4>
            <p>Psychological Self-Defence. The only intervention that works at the human layer.</p>
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <div className="stats-banner">
        <div className="stats-banner-inner">
          <div className="stat-item">
            <div className="stat-number">&pound;14.7B</div>
            <div className="stat-label">Estimated annual UK-wide cyber losses</div>
            <div className="stat-source">DSIT 2025</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">43%</div>
            <div className="stat-label">Of UK businesses breached in last 12 months (612,000 firms)</div>
            <div className="stat-source">DSIT Cyber Breaches Survey</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">65%</div>
            <div className="stat-label">Of large companies cite supply chains as their greatest cyber challenge</div>
            <div className="stat-source">PwC Digital Trust 2026</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">87%</div>
            <div className="stat-label">Of businesses say AI vulnerabilities are the fastest-growing risk</div>
            <div className="stat-source">PwC 2026</div>
          </div>
        </div>
      </div>

      {/* THREE-STAGE PROGRAMME */}
      <section className="section" id="programme">
        <div className="section-header">
          <span className="section-label">The Programme</span>
          <h2>Three Stages to Organisational Resilience</h2>
          <p>A structured approach that moves from awareness to action to ongoing vigilance — building genuine psychological self-defence across your workforce.</p>
        </div>
        <div className="stages-grid">
          <div className="stage-card">
            <div className="stage-number">1</div>
            <h3>The Accelerator Talk</h3>
            <div className="stage-audience">100 &ndash; 200+ attendees &bull; Keynote format</div>
            <p>A high-impact presentation featuring live demonstrations of AI-generated impersonation. Audiences see a convincing deepfake of a trusted figure — then experience the reveal. This is the moment that creates urgency.</p>
            <ul>
              <li>Live deepfake demonstration</li>
              <li>The Cyber Threat Landscape &amp; AI Arms Race</li>
              <li>The psychology of why smart people fall for it</li>
              <li>Designed to be talked about afterwards</li>
            </ul>
          </div>
          <div className="stage-card">
            <div className="stage-number">2</div>
            <h3>Intensive Training</h3>
            <div className="stage-audience">Small groups &bull; Half or full day</div>
            <p>Instructor-led workshops exploring how the human mind processes information, creates trust, and becomes vulnerable under pressure. Tailored to your sector, risk profile, and culture.</p>
            <ul>
              <li>Social Engineering &amp; Psychology of Deception</li>
              <li>Managing AI-GA (AI-Generated Attacks)</li>
              <li>Deepfake Attacks in Corporate Fraud</li>
              <li>Building a Human Firewall</li>
            </ul>
          </div>
          <div className="stage-card">
            <div className="stage-number">3</div>
            <h3>Simulated Testing</h3>
            <div className="stage-audience">Ongoing &bull; Organisation-wide</div>
            <p>Controlled, bespoke deepfake attacks deployed across the organisation over the following months. Those who are caught out receive targeted refresher training.</p>
            <ul>
              <li>Custom deepfakes tailored to your organisation</li>
              <li>Unannounced simulated attacks over time</li>
              <li>Measurable vulnerability reports</li>
              <li>Refresher training for those who need it</li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHY LIVE SESSIONS */}
      <section className="section section-yellow" id="live-learning">
        <div className="section-header">
          <span className="section-label" style={{ color: '#03101B' }}>Why Live Sessions</span>
          <h2 style={{ color: '#03101B' }}>Human Interaction You Can&apos;t Download</h2>
          <p style={{ color: '#505050' }}>eLearning can teach facts. It cannot change behaviour under pressure. That requires a very different kind of training.</p>
        </div>
        <div className="live-grid">
          <div className="live-card">
            <div className="live-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <h3>Instructor-Led Workshops</h3>
            <p>Virtual or in-the-room, tailored to your sector, risk profile, and organisational culture. A skilled facilitator reads the room and adapts in real time.</p>
          </div>
          <div className="live-card">
            <div className="live-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <h3>Keynote Talks at Scale</h3>
            <p>High-impact awareness delivery across your entire organisation in one session. A live deepfake reveal creates the visceral understanding no video module ever could.</p>
          </div>
          <div className="live-card">
            <div className="live-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.44-4.16z"/>
                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.44-4.16z"/>
              </svg>
            </div>
            <h3>Deeper Processing</h3>
            <p>Interactive experiences produce greater attention and memory consolidation via the amygdala. We remember what shocks us — and what we practise under pressure.</p>
          </div>
          <div className="live-card">
            <div className="live-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3>Social Learning</h3>
            <p>Learning with others reduces future complacency and builds shared accountability. When a team experiences a deepfake reveal together, it becomes a lasting shared reference point.</p>
          </div>
          <div className="live-card">
            <div className="live-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            <h3>Practice Under Pressure</h3>
            <p>Role-play scenarios and live simulations let people practise the &ldquo;pause and verify&rdquo; habit in a safe environment — so it becomes instinctive when it matters most.</p>
          </div>
          <div className="live-card live-card-highlight">
            <div className="live-stat-big">50%</div>
            <h3>Better Retention</h3>
            <p>Live, instructor-led training produces 50% better retention vs self-paced eLearning. Social challenge acts as a cognitive enhancer, directing resources toward moments that feel important.</p>
          </div>
        </div>
      </section>

      {/* UNDERSTANDING YOUR OWN VULNERABILITY */}
      <section className="section section-dark" id="vulnerability">
        <div className="vuln-layout">
          <div className="vuln-intro">
            <span className="section-label">Understanding Your Own Vulnerability</span>
            <h2>You Are at Your Most Dangerous to Your Organisation Due To:</h2>
            <p>Intelligence is no protection against AI-generated attacks. Fraudsters don&apos;t exploit ignorance — they exploit the very qualities that make high-performing people effective.</p>
            <div className="vuln-list">
              <div className="vuln-item">
                <div className="vuln-dot"></div>
                <span>Overconfidence</span>
              </div>
              <div className="vuln-item">
                <div className="vuln-dot"></div>
                <span>Lack of critical thinking</span>
              </div>
              <div className="vuln-item">
                <div className="vuln-dot"></div>
                <span>Conformity under pressure</span>
              </div>
              <div className="vuln-item">
                <div className="vuln-dot"></div>
                <span>Eagerness to please</span>
              </div>
              <div className="vuln-item">
                <div className="vuln-dot"></div>
                <span>Lack of sufficient protocol</span>
              </div>
              <div className="vuln-item">
                <div className="vuln-dot"></div>
                <span>Lack of sufficient mindset</span>
              </div>
            </div>
          </div>
          <div className="vuln-risks">
            <h3 style={{ color: 'white', marginBottom: '24px', fontSize: '22px' }}>Understanding the Risk</h3>
            <div className="risk-card">
              <div className="risk-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <p>Your organisation is under <strong>constant attack</strong></p>
            </div>
            <div className="risk-card">
              <div className="risk-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                </svg>
              </div>
              <p>The risk is <strong>expanding exponentially</strong></p>
            </div>
            <div className="risk-card">
              <div className="risk-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <p>AI attacks will be <strong>personalised to you</strong></p>
            </div>
            <div className="risk-card">
              <div className="risk-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                </svg>
              </div>
              <p>Your diligence is <strong>used against you</strong></p>
            </div>
            <div className="vuln-callout-inner" style={{ marginTop: '24px' }}>
              <div className="vuln-callout-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFDA8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <p>Recognising their inherent vulnerabilities is an <strong style={{ color: 'var(--yellow)' }}>essential defence</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* REAL-WORLD CASES */}
      <section className="section section-gray" id="cases">
        <div className="section-header">
          <span className="section-label">Real-World Impact</span>
          <h2>This Is Already Happening</h2>
          <p>These are not hypothetical scenarios. Each of these organisations believed they had adequate defences. Each lost millions because a human said yes.</p>
        </div>
        <div className="cases-grid">
          <div className="case-card case-card-primary">
            <div className="case-amount">$25M</div>
            <div className="case-company">Arup &mdash; 2024</div>
            <p>Deepfake video conference — every attendee was an AI avatar. The employee transferred funds believing they were following instructions from the CFO and senior colleagues.</p>
            <div className="case-tag">Deepfake Video Call</div>
          </div>
          <div className="case-card">
            <div className="case-amount">&euro;50M</div>
            <div className="case-company">FACC AG &mdash; 2016</div>
            <p>CEO impersonation email instructed a finance employee to transfer funds for a secret acquisition. The CEO was subsequently fired for security failures.</p>
            <div className="case-tag">CEO Impersonation</div>
          </div>
          <div className="case-card">
            <div className="case-amount">$37M</div>
            <div className="case-company">Toyota Boshoku &mdash; 2019</div>
            <p>Fraudulent executive emails instructed a finance executive to change bank account details for a parts supplier. None of the requests were verified through secondary channels.</p>
            <div className="case-tag">Business Email Compromise</div>
          </div>
          <div className="case-card">
            <div className="case-amount">$100M</div>
            <div className="case-company">Google &amp; Facebook</div>
            <p>Fake invoices from a fake manufacturer over two years. Two of the world&apos;s most sophisticated technology companies paid a Lithuanian fraudster $100M before noticing.</p>
            <div className="case-tag">Invoice Fraud</div>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="section section-dark">
        <div className="section-header">
          <span className="section-label">Who This Is For</span>
          <h2>Built for Organisations Under Threat</h2>
          <p>Particularly relevant for defence, finance, professional services, and any organisation where a single fraudulent authorisation could cause catastrophic loss.</p>
        </div>
        <div className="proof-grid">
          <div className="proof-card">
            <div className="proof-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3>Defence &amp; Government</h3>
            <p>Where information security is paramount and state-sponsored actors use increasingly sophisticated AI tools for targeted social engineering campaigns.</p>
          </div>
          <div className="proof-card">
            <div className="proof-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h3>Financial Services</h3>
            <p>73% of all 2024 cyber incidents were BEC attacks. Finance teams are the primary target — and the most consequential point of failure.</p>
          </div>
          <div className="proof-card">
            <div className="proof-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1677F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3>Enterprise &amp; Professional Services</h3>
            <p>Any organisation where executives are public-facing, decisions move fast, and a single compromised employee can authorise significant transactions.</p>
          </div>
        </div>
      </section>

      {/* ABOUT WORKING VOICES */}
      <section className="section section-gray about-section">
        <div className="about-grid">
          <div className="about-content">
            <span className="section-label">About Working Voices</span>
            <h2>28 Years Training the World&apos;s Leading Organisations</h2>
            <p>British professional skills consultancy established in 2000, headquartered at Berkeley Square, London. Specialists in Communication, Leadership &amp; Critical Thinking.</p>
            <div className="about-stats">
              <div className="about-stat">
                <div className="about-stat-num">47</div>
                <div className="about-stat-label">Expert trainers across UK, US, Asia &amp; Middle East</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-num">28</div>
                <div className="about-stat-label">Years of experience with the world&apos;s largest organisations</div>
              </div>
            </div>
            <p className="about-founder">Founder &amp; CEO: <strong>Nick Smallman</strong></p>
          </div>
          <div className="about-logos-wrap">
            <p className="logos-label">Trusted by</p>
            <div className="logos-grid">
              <div className="logo-item">NASA</div>
              <div className="logo-item">Barclays</div>
              <div className="logo-item">Microsoft</div>
              <div className="logo-item">Rolex</div>
              <div className="logo-item">BlackRock</div>
              <div className="logo-item">Nomura</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <h2>Train Your People.<br />Protect Your Assets.</h2>
        <p>Book the Accelerator Talk for your leadership team and see how AI-generated attacks could target your people — before a real attacker does.</p>
        <a href="mailto:robert@workingvoices.com?subject=Managing%20AI-GA%20Training%20Enquiry" className="btn-white">
          Speak to Robert &rarr;
        </a>
        <p style={{ marginTop: '24px', fontSize: '14px', opacity: 0.85 }}>
          Robert &mdash; Head of RFPs &nbsp;|&nbsp; robert@workingvoices.com &nbsp;|&nbsp; +44 203 865 5325
        </p>
        <p style={{ marginTop: '8px', fontSize: '13px', opacity: 0.5 }}>
          Working Voices &middot; Berkeley Square, London &middot; workingvoices.com
        </p>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src="https://www.workingvoices.com/app/uploads/2024/09/footer-logo.png" alt="Working Voices" />
            <p>&copy; {new Date().getFullYear()} Working Voices. All rights reserved.</p>
            <p style={{ marginTop: '4px', fontSize: '11px', opacity: 0.4 }}>
              Sources: DSIT Cyber Breaches Survey 2025 &middot; FBI IC3 2024 &middot; Egress Phishing Report 2024 &middot; PwC Global Digital Trust Insights 2026
            </p>
          </div>
          <div className="footer-links">
            <a href="https://www.workingvoices.com" target="_blank" rel="noopener noreferrer">workingvoices.com</a>
            <a href="https://www.linkedin.com/company/working-voices/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <div className="footer-contact">
            <a href="mailto:robert@workingvoices.com">robert@workingvoices.com</a>
            <a href="tel:+442038655325">+44 203 865 5325</a>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>London &middot; New York &middot; Hong Kong</span>
          </div>
        </div>
      </footer>
    </>
  );
}
