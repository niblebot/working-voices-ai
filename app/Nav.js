'use client';

import { useState } from 'react';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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
        <li><a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>Get in Touch</a></li>
      </ul>
    </nav>
  );
}
