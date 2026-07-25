'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  // These anchors only exist on the homepage — on any other page (like
  // /testyourself) prefix them with "/" so the link takes you back there
  // first instead of silently doing nothing.
  const homePrefix = pathname === '/' ? '' : '/';

  return (
    <nav className="nav">
      <a href="/" className="nav-logo">
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
        <li><a href={`${homePrefix}#threat`} onClick={() => setMenuOpen(false)}>The Threat</a></li>
        <li><a href={`${homePrefix}#programme`} onClick={() => setMenuOpen(false)}>Programme</a></li>
        <li><a href={`${homePrefix}#live-learning`} onClick={() => setMenuOpen(false)}>Our Approach</a></li>
        <li><a href={`${homePrefix}#scenario`} onClick={() => setMenuOpen(false)}>Real-World Attacks</a></li>
        <li><a href={`${homePrefix}#contact`} className="nav-cta" onClick={() => setMenuOpen(false)}>Get in Touch</a></li>
      </ul>
    </nav>
  );
}
