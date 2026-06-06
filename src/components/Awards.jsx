import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EMOJI_OPTIONS = ['🏆','🥇','🎯','⭐','🌟','🎖️','🏅','💡','🚀','🤖','✈️','⚙️','🔬','🛠️','🎓'];

export function Awards({ awards, editMode, onUpdateNested, onAdd, onRemove }) {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 82%', once: true };
      gsap.to(labelRef.current, { opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: st });
      gsap.to(cardsRef.current.filter(Boolean), {
        opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.13, ease: 'back.out(1.4)',
        scrollTrigger: { ...st, start: 'top 78%' },
      });
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        const icon = card.querySelector('.award-icon');
        if (icon) {
          gsap.fromTo(icon, { scale: 0, rotate: -20 }, {
            scale: 1, rotate: 0, duration: 0.55, delay: i * 0.13 + 0.2, ease: 'back.out(2)',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [awards.length]);

  return (
    <section id="awards" ref={sectionRef}>
      <div className="container">
        <div className="section-label" ref={labelRef}>Recognition</div>
        <h2 className="section-title">
          <span className="section-title-inner" style={{ transform: 'none' }}>Awards</span>
        </h2>
        <div className="awards-grid">
          {awards.map((award, i) => (
            <div key={award.id || i} className="award-card" ref={el => cardsRef.current[i] = el} style={{ position: 'relative' }}>
              {editMode && (
                <button onClick={() => onRemove(i)} style={{
                  position: 'absolute', top: 8, right: 8,
                  background: '#c0392b', border: 'none', color: 'white',
                  padding: '2px 8px', cursor: 'pointer', fontSize: '12px', fontWeight: 700,
                }}>✕</button>
              )}
              <div className="award-icon">
                {editMode ? (
                  <select
                    value={award.icon}
                    onChange={e => onUpdateNested('awards', i, 'icon', e.target.value)}
                    style={{ background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '20px', padding: '2px 4px', cursor: 'pointer' }}
                  >
                    {EMOJI_OPTIONS.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                ) : award.icon}
              </div>
              <div className="award-title">
                {editMode ? (
                  <input type="text" defaultValue={award.title}
                    onChange={e => onUpdateNested('awards', i, 'title', e.target.value)}
                    className="edit-input"
                    style={{ fontFamily: 'Anton, sans-serif', fontSize: 'inherit', letterSpacing: '0.02em' }}
                    placeholder="Award title"
                  />
                ) : award.title}
              </div>
              <div className="award-org">
                {editMode ? (
                  <input type="text" defaultValue={award.org}
                    onChange={e => onUpdateNested('awards', i, 'org', e.target.value)}
                    className="edit-input" style={{ color: 'var(--orange)', fontSize: '13px', fontWeight: 700 }}
                    placeholder="Organization"
                  />
                ) : award.org}
              </div>
              <p className="award-desc">
                {editMode ? (
                  <textarea defaultValue={award.desc}
                    onChange={e => onUpdateNested('awards', i, 'desc', e.target.value)}
                    className="edit-textarea" style={{ minHeight: '60px', fontSize: '13px' }}
                    placeholder="Award description"
                  />
                ) : award.desc}
              </p>
            </div>
          ))}
          {editMode && (
            <button onClick={onAdd} style={{
              border: '2px dashed rgba(255,172,64,0.4)', background: 'rgba(255,172,64,0.05)',
              color: 'var(--orange)', cursor: 'pointer', padding: '32px 20px',
              fontFamily: 'Roboto Flex, sans-serif', fontWeight: 700, fontSize: '13px',
              letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex',
              alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,172,64,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,172,64,0.05)'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Award
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
