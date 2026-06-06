import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Contact({ personal, editMode, onUpdate }) {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const introRef = useRef(null);
  const contactItemsRef = useRef([]);
  const linksRef = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 82%', once: true };

      gsap.to(labelRef.current, {
        opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: st,
      });

      gsap.to(introRef.current, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { ...st, start: 'top 78%' },
      });

      gsap.to(contactItemsRef.current.filter(Boolean), {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { ...st, start: 'top 75%' },
      });

      gsap.to(linksRef.current.filter(Boolean), {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { ...st, start: 'top 75%' },
      });

      // Pulse effect on icons
      gsap.to('.contact-icon', {
        boxShadow: '0 0 20px rgba(255,172,64,0.2)',
        repeat: -1, yoyo: true, duration: 2, ease: 'sine.inOut',
        scrollTrigger: st,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const contactItems = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: 'Email', value: personal.email, href: `mailto:${personal.email}`, key: 'personal.email', type: 'email',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.94 6.94l1.41-1.41a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
        </svg>
      ),
      label: 'Phone', value: personal.phone, href: `tel:${personal.phone}`, key: 'personal.phone', type: 'tel',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: 'Location', value: personal.location, href: null,
    },
  ];

  const links = [
    {
      label: 'LinkedIn Profile',
      href: personal.linkedin,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
          <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
        </svg>
      ),
    },
    {
      label: 'GitHub Profile',
      href: personal.github,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
        </svg>
      ),
    },
    {
      label: 'Download Resume',
      href: personal.resume,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      ),
      download: true,
    },
  ];

  return (
    <section id="contact" ref={sectionRef} style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div className="section-label" ref={labelRef}>Get In Touch</div>
        <h2 className="section-title" ref={titleRef}>
          <span className="section-title-inner" style={{ transform: 'none' }}>Contact</span>
        </h2>
        <div className="contact-grid">
          <div>
            <p className="contact-intro" ref={introRef}>
              I'm always open to discussing new opportunities, collaborations, or just a conversation
              about engineering and robotics. Feel free to reach out!
            </p>
            <div>
              {contactItems.map((item, i) => (
                <div key={item.label} className="contact-item" ref={el => contactItemsRef.current[i] = el}>
                  <div className="contact-icon">{item.icon}</div>
                  <div>
                    <div className="contact-label">{item.label}</div>
                    {editMode && item.key ? (
                      <input type={item.type} defaultValue={item.value}
                        onChange={e => onUpdate(item.key, e.target.value)}
                        className="edit-input" style={{ fontSize: '15px' }} />
                    ) : item.href ? (
                      <a href={item.href} className="contact-value" style={{ color: 'var(--text)', textDecoration: 'none' }}
                        onMouseEnter={e => e.target.style.color = 'var(--orange)'}
                        onMouseLeave={e => e.target.style.color = 'var(--text)'}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="contact-value">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ marginBottom: '20px', fontFamily: 'Anton, sans-serif', fontSize: 'clamp(18px,2.5vw,22px)', letterSpacing: '0.04em', color: 'var(--orange)' }}>
              Connect With Me
            </div>
            <div className="links-grid">
              {links.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="link-item"
                  ref={el => linksRef.current[i] = el}
                  target={link.download ? '_blank' : '_blank'}
                  rel="noopener noreferrer"
                  download={link.download ? true : undefined}
                >
                  {link.icon}
                  {link.label}
                  <svg style={{ marginLeft: 'auto' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
