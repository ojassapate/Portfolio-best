import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Awards', href: '#awards' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ name }) {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    gsap.to(navRef.current, {
      y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 1.2,
    });

    gsap.fromTo(linksRef.current,
      { y: -12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 1.5 }
    );
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0);

      const sections = NAV_LINKS.map(l => l.href.replace('#', ''));
      let found = '';
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && scrolled >= el.offsetTop - 120) { found = s; break; }
      }
      setActive(found);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <nav ref={navRef}>
        <div className="nav-inner">
          <div className="nav-logo">{name.split(' ')[0]}<span>.</span></div>
          <ul className="nav-links">
            {NAV_LINKS.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  ref={el => linksRef.current[i] = el}
                  onClick={e => scrollTo(e, l.href)}
                  className={active === l.href.replace('#', '') ? 'active' : ''}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button className="nav-menu-btn" onClick={() => setMenuOpen(v => !v)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={e => scrollTo(e, l.href)}>{l.label}</a>
          ))}
        </div>
      </nav>
    </>
  );
}
