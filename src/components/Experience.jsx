import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AddBtn({ onClick, label }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '6px',
      background: 'rgba(255,172,64,0.08)', border: '2px dashed rgba(255,172,64,0.4)',
      color: 'var(--orange)', padding: '14px 24px', cursor: 'pointer',
      fontFamily: 'Roboto Flex, sans-serif', fontWeight: 700,
      fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
      transition: 'all 0.2s', marginLeft: 'clamp(24px, 4vw, 40px)',
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,172,64,0.15)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,172,64,0.08)'}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
      {label}
    </button>
  );
}

export function Experience({ experience, editMode, onUpdateNested, onAdd, onRemove }) {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const lineRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 82%', once: true };
      gsap.to(labelRef.current, { opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: st });
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 1.4, ease: 'power3.inOut', scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true } }
      );
      itemsRef.current.filter(Boolean).forEach((el, i) => {
        gsap.to(el, {
          opacity: 1, x: 0, duration: 0.75, delay: i * 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        });
        const dot = el.querySelector('.tl-dot');
        if (dot) {
          gsap.fromTo(dot, { scale: 0 }, {
            scale: 1, duration: 0.4, delay: i * 0.15 + 0.2, ease: 'back.out(2)',
            scrollTrigger: { trigger: el, start: 'top 86%', once: true },
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [experience.length]);

  return (
    <section id="experience" ref={sectionRef} style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div className="section-label" ref={labelRef}>Work History</div>
        <h2 className="section-title">
          <span className="section-title-inner" style={{ transform: 'none' }}>Experience</span>
        </h2>
        <div className="timeline" style={{ position: 'relative' }}>
          <div ref={lineRef} style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px',
            background: 'linear-gradient(to bottom, var(--orange), rgba(255,172,64,0.1))',
          }} />
          {experience.map((exp, i) => (
            <div key={exp.id || i} className="timeline-item" ref={el => itemsRef.current[i] = el} style={{ position: 'relative' }}>
              <div className="tl-dot" style={{
                position: 'absolute', left: 'calc(clamp(-30px, -4.5vw, -46px) + 5px)',
                top: 8, width: 12, height: 12, borderRadius: '50%',
                background: 'var(--orange)', border: '2px solid var(--bg2)',
              }} />

              {editMode && (
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input type="text" defaultValue={exp.period}
                    onChange={e => onUpdateNested('experience', i, 'period', e.target.value)}
                    className="edit-input" style={{ fontSize: '11px', flex: 1, letterSpacing: '0.15em', color: 'var(--orange)' }}
                    placeholder="Period (e.g. 2024 – Present)"
                  />
                  <input type="text" defaultValue={exp.location}
                    onChange={e => onUpdateNested('experience', i, 'location', e.target.value)}
                    className="edit-input" style={{ fontSize: '11px', flex: 1 }}
                    placeholder="Location"
                  />
                  <button onClick={() => onRemove(i)} style={{
                    background: '#c0392b', border: 'none', color: 'white',
                    padding: '4px 10px', cursor: 'pointer', fontWeight: 700, fontSize: '13px', flexShrink: 0,
                  }} title="Remove experience">✕ Remove</button>
                </div>
              )}

              {!editMode && (
                <div className="timeline-date">{exp.period} · {exp.location}</div>
              )}

              <div className="timeline-role">
                {editMode ? (
                  <input type="text" defaultValue={exp.role}
                    onChange={e => onUpdateNested('experience', i, 'role', e.target.value)}
                    className="edit-input"
                    style={{ fontFamily: 'Anton, sans-serif', fontSize: 'inherit', letterSpacing: '0.02em' }}
                    placeholder="Role / Title"
                  />
                ) : exp.role}
              </div>
              <div className="timeline-company">
                {editMode ? (
                  <input type="text" defaultValue={exp.company}
                    onChange={e => onUpdateNested('experience', i, 'company', e.target.value)}
                    className="edit-input" style={{ fontSize: '14px' }} placeholder="Company / Organization"
                  />
                ) : exp.company}
              </div>
              <ul className="timeline-bullets">
                {exp.bullets.map((b, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                    {editMode ? (
                      <>
                        <input type="text" defaultValue={b}
                          onChange={e => {
                            const bullets = [...exp.bullets];
                            bullets[j] = e.target.value;
                            onUpdateNested('experience', i, 'bullets', bullets);
                          }}
                          className="edit-input" style={{ fontSize: '13px', flex: 1 }} placeholder="Bullet point"
                        />
                        <button onClick={() => {
                          const bullets = exp.bullets.filter((_, idx) => idx !== j);
                          onUpdateNested('experience', i, 'bullets', bullets);
                        }} style={{ background: '#c0392b', border: 'none', color: 'white', width: 20, height: 20, cursor: 'pointer', fontSize: '12px', flexShrink: 0 }}>×</button>
                      </>
                    ) : b}
                  </li>
                ))}
              </ul>
              {editMode && (
                <button onClick={() => {
                  const bullets = [...exp.bullets, 'New bullet point'];
                  onUpdateNested('experience', i, 'bullets', bullets);
                }} style={{
                  background: 'none', border: '1px dashed rgba(255,172,64,0.35)', color: 'var(--orange)',
                  padding: '5px 12px', cursor: 'pointer', fontSize: '11px', fontWeight: 700,
                  letterSpacing: '0.08em', marginTop: '8px',
                }}>+ Add bullet</button>
              )}
            </div>
          ))}
        </div>
        {editMode && <AddBtn onClick={onAdd} label="Add Experience" />}
      </div>
    </section>
  );
}
