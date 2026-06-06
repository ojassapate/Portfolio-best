import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function Hero({ data, editMode, onUpdate }) {
  const gridRef = useRef(null);
  const glowRef = useRef(null);
  const eyebrowRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const titleRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollRef = useRef(null);
  const typed = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 });

    // Grid fade in
    tl.to(gridRef.current, { opacity: 1, duration: 2, ease: 'power2.out' }, 0)
      .to(glowRef.current, { opacity: 1, duration: 1.5, ease: 'power2.out' }, 0.3)

    // Eyebrow
      .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.3)

    // Name lines
      .to(line1Ref.current, { translateY: 0, opacity: 1, duration: 1, ease: 'power4.out' }, 0.5)
      .to(line2Ref.current, { translateY: 0, opacity: 1, duration: 1, ease: 'power4.out' }, 0.65)

    // Title
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.85)

    // CTA
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 1.0)

    // Scroll indicator
      .to(scrollRef.current, { opacity: 1, duration: 0.6 }, 1.2);

    // Scroll line pulse
    gsap.to('.scroll-line', {
      scaleY: 1.3, duration: 0.9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2,
    });

    // Floating glow parallax
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPct = (clientX / window.innerWidth - 0.5) * 60;
      const yPct = (clientY / window.innerHeight - 0.5) * 60;
      gsap.to(glowRef.current, { x: xPct, y: yPct, duration: 1.5, ease: 'power1.out' });
    };
    window.addEventListener('mousemove', onMouseMove);

    // Typewriter only when not editing
    let timeout;
    if (!editMode && typed.current) {
      const texts = [data.title, 'UAV & Robotics Developer', 'CAD Designer & Prototyper', 'Mechatronics Engineer'];
      let ti = 0, ci = 0, deleting = false;
      const tick = () => {
        if (!typed.current) return;
        const current = texts[ti];
        if (!deleting) {
          typed.current.textContent = current.slice(0, ci + 1);
          ci++;
          if (ci === current.length) { deleting = true; timeout = setTimeout(tick, 2200); return; }
        } else {
          typed.current.textContent = current.slice(0, ci - 1);
          ci--;
          if (ci === 0) { deleting = false; ti = (ti + 1) % texts.length; }
        }
        timeout = setTimeout(tick, deleting ? 38 : 75);
      };
      timeout = setTimeout(tick, 2000);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      clearTimeout(timeout);
    };
  }, [editMode]);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero-grid" ref={gridRef} />
      <div className="hero-glow" ref={glowRef} />
      <div className="hero-content">
        <div className="hero-eyebrow" ref={eyebrowRef}>
          {data.location} &nbsp;·&nbsp; {data.title}
        </div>

        <h1 className="hero-name">
          {editMode ? (
            <input
              type="text"
              value={data.name}
              onChange={e => onUpdate('personal.name', e.target.value)}
              className="edit-input"
              style={{ fontFamily: 'Anton, sans-serif', fontSize: 'inherit', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.02em' }}
            />
          ) : (
            <>
              <span className="hero-name-line" ref={line1Ref}>
                {data.name.split(' ').slice(0, 2).join(' ')}
              </span>
              <span className="hero-name-line highlight" ref={line2Ref}>
                {data.name.split(' ').slice(2).join(' ')}
              </span>
            </>
          )}
        </h1>

        <div className="hero-title" ref={titleRef}>
          {editMode ? (
            <input type="text" value={data.title} onChange={e => onUpdate('personal.title', e.target.value)}
              className="edit-input" style={{ textAlign: 'center' }} />
          ) : (
            <><span ref={typed}>{data.title}</span><span className="cursor" /></>
          )}
        </div>

        <div className="hero-cta" ref={ctaRef}>
          <a href="#projects" className="btn btn-primary" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
            View Projects
          </a>
          <a href="#contact" className="btn btn-outline" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Get In Touch
          </a>
        </div>
      </div>

      <div className="hero-scroll" ref={scrollRef} onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
