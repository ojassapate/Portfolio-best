import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function About({ data, editMode, onUpdate }) {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const tagsRef = useRef([]);
  const langsRef = useRef([]);
  const infoRef = useRef(null);
  const statsRef = useRef([]);
  const infoItemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 82%', once: true };

      gsap.to(labelRef.current, {
        opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: st,
      });

      gsap.fromTo(textRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: st }
      );

      gsap.to(tagsRef.current.filter(Boolean), {
        opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out',
        scrollTrigger: { ...st, start: 'top 76%' },
      });

      gsap.to(langsRef.current.filter(Boolean), {
        opacity: 1, scale: 1, duration: 0.55, stagger: 0.1, ease: 'back.out(1.7)',
        scrollTrigger: { ...st, start: 'top 74%' },
      });

      gsap.fromTo(infoRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: st }
      );

      gsap.to(infoItemsRef.current.filter(Boolean), {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.09, ease: 'power2.out',
        scrollTrigger: { ...st, start: 'top 76%' },
      });

      statsRef.current.filter(Boolean).forEach((el, i) => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.6, delay: i * 0.13, ease: 'back.out(1.4)',
          scrollTrigger: { ...st, start: 'top 70%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { n: '5+', label: 'Projects' },
    { n: '3+', label: 'Internships' },
    { n: '6+', label: 'Certifications' },
  ];

  const infoItems = [
    { label: 'Name', value: data.personal.name, key: 'personal.name', type: 'text' },
    { label: 'Location', value: data.personal.location, key: 'personal.location', type: 'text' },
    { label: 'Email', value: data.personal.email, key: 'personal.email', type: 'email' },
    { label: 'Phone', value: data.personal.phone, key: 'personal.phone', type: 'tel' },
    { label: 'Degree', value: data.education[0]?.degree, key: null },
    { label: 'University', value: data.education[0]?.school, key: null },
  ];

  return (
    <section id="about" ref={sectionRef} style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div className="section-label" ref={labelRef}>Who I Am</div>
        <div className="about-grid">
          {/* Left */}
          <div ref={textRef}>
            <h2 className="section-title" style={{ marginBottom: 'clamp(20px,3vw,32px)' }}>
              <span className="section-title-inner" style={{ transform: 'none' }}>About Me</span>
            </h2>

            {editMode ? (
              <textarea
                defaultValue={data.summary}
                onChange={e => onUpdate('summary', e.target.value)}
                className="edit-textarea"
              />
            ) : (
              <p className="about-text">{data.summary}</p>
            )}

            <div className="soft-tags" style={{ marginTop: '20px' }}>
              {data.softSkills.map((s, i) => (
                <span key={i} className="soft-tag" ref={el => tagsRef.current[i] = el}>{s}</span>
              ))}
            </div>

            <div className="lang-row" style={{ marginTop: '28px' }}>
              {data.languages.map((l, i) => (
                <div key={i} className="lang-item" ref={el => langsRef.current[i] = el}>
                  <div className="lang-name">{l}</div>
                  <div className="lang-sub">Language</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div ref={infoRef}>
            <div className="info-grid">
              {infoItems.map((item, i) => (
                <div
                  key={i}
                  className="info-item"
                  ref={el => infoItemsRef.current[i] = el}
                  style={i >= 4 ? { gridColumn: '1 / -1' } : {}}
                >
                  <label>{item.label}</label>
                  {editMode && item.key ? (
                    <input
                      type={item.type}
                      defaultValue={item.value}
                      onChange={e => onUpdate(item.key, e.target.value)}
                      className="edit-input"
                      style={{ fontSize: '14px' }}
                    />
                  ) : (
                    <span>{item.value}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="stat-row">
              {stats.map((s, i) => (
                <div key={s.label} className="stat-box" ref={el => statsRef.current[i] = el}>
                  <div className="stat-num">{s.n}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
