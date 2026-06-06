import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AddBtn({ onClick, label, inline }) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      background: 'rgba(255,172,64,0.08)', border: '2px dashed rgba(255,172,64,0.4)',
      color: 'var(--orange)', padding: inline ? '8px 14px' : '12px 20px', cursor: 'pointer',
      fontFamily: 'Roboto Flex, sans-serif', fontWeight: 700,
      fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
      transition: 'all 0.2s', marginTop: '10px',
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,172,64,0.15)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,172,64,0.08)'}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
      {label}
    </button>
  );
}

export function Education({ education, certifications, editMode, onUpdateNested, onAddEdu, onRemoveEdu, onAddCert, onRemoveCert, data, updateField }) {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const eduCardsRef = useRef([]);
  const certItemsRef = useRef([]);
  const certLabelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 82%', once: true };
      gsap.to(labelRef.current, { opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: st });
      gsap.to(eduCardsRef.current.filter(Boolean), {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { ...st, start: 'top 78%' },
      });
      gsap.fromTo(certLabelRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: certLabelRef.current, start: 'top 88%', once: true } }
      );
      gsap.to(certItemsRef.current.filter(Boolean), {
        opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: certLabelRef.current, start: 'top 84%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [education.length, certifications.length]);

  return (
    <section id="education" ref={sectionRef} style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div className="section-label" ref={labelRef}>Academic Background</div>
        <h2 className="section-title">
          <span className="section-title-inner" style={{ transform: 'none' }}>Education</span>
        </h2>

        <div className="edu-grid">
          {education.map((edu, i) => (
            <div key={edu.id || i} className="edu-card" ref={el => eduCardsRef.current[i] = el} style={{ position: 'relative' }}>
              {editMode && (
                <button onClick={() => onRemoveEdu(i)} style={{
                  position: 'absolute', top: 8, right: 8,
                  background: '#c0392b', border: 'none', color: 'white',
                  padding: '2px 8px', cursor: 'pointer', fontSize: '12px', fontWeight: 700,
                }}>✕</button>
              )}
              <div className="edu-degree">
                {editMode ? (
                  <input type="text" defaultValue={edu.degree}
                    onChange={e => onUpdateNested('education', i, 'degree', e.target.value)}
                    className="edit-input" style={{ fontFamily: 'Anton, sans-serif', fontSize: 'inherit' }}
                    placeholder="Degree Name"
                  />
                ) : edu.degree}
              </div>
              <div className="edu-school">
                {editMode ? (
                  <input type="text" defaultValue={edu.school}
                    onChange={e => onUpdateNested('education', i, 'school', e.target.value)}
                    className="edit-input" style={{ color: 'var(--orange)', fontSize: '14px', fontWeight: 700 }}
                    placeholder="University / School"
                  />
                ) : edu.school}
              </div>
              <div className="edu-year">
                {editMode ? (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input type="text" defaultValue={edu.location}
                      onChange={e => onUpdateNested('education', i, 'location', e.target.value)}
                      className="edit-input" style={{ fontSize: '12px', flex: 1 }} placeholder="Location"
                    />
                    <input type="text" defaultValue={edu.year}
                      onChange={e => onUpdateNested('education', i, 'year', e.target.value)}
                      className="edit-input" style={{ fontSize: '12px', flex: 1 }} placeholder="Year"
                    />
                  </div>
                ) : `${edu.location} · ${edu.year}`}
              </div>
              {(editMode || edu.gpa) && (
                <div style={{ marginTop: '8px' }}>
                  {editMode ? (
                    <input type="text" defaultValue={edu.gpa}
                      onChange={e => onUpdateNested('education', i, 'gpa', e.target.value)}
                      className="edit-input" style={{ fontSize: '13px', color: 'var(--orange)' }}
                      placeholder="GPA (optional)"
                    />
                  ) : (
                    <div style={{ color: 'var(--orange)', fontSize: '14px', fontWeight: 700 }}>GPA: {edu.gpa}</div>
                  )}
                </div>
              )}
            </div>
          ))}
          {editMode && (
            <button onClick={onAddEdu} style={{
              border: '2px dashed rgba(255,172,64,0.4)', background: 'rgba(255,172,64,0.05)',
              color: 'var(--orange)', cursor: 'pointer', padding: '28px',
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
              Add Education
            </button>
          )}
        </div>

        <div ref={certLabelRef}>
          <div style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(22px,3vw,28px)', letterSpacing: '0.04em', marginBottom: '20px', color: 'var(--orange)' }}>
            Certifications
          </div>
          <div className="cert-grid">
            {certifications.map((cert, i) => (
              <div key={i} className="cert-item" ref={el => certItemsRef.current[i] = el}>
                <span className="cert-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 11 12 14 22 4"/>
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                  </svg>
                </span>
                {editMode ? (
                  <div style={{ flex: 1, display: 'flex', gap: 6, alignItems: 'center' }}>
                    <input type="text" defaultValue={cert}
                      onChange={e => {
                        if (updateField) {
                          const certs = [...certifications];
                          certs[i] = e.target.value;
                          updateField('certifications', certs);
                        }
                      }}
                      className="edit-input" style={{ fontSize: '13px', flex: 1 }} placeholder="Certification name"
                    />
                    <button onClick={() => onRemoveCert(i)} style={{
                      background: '#c0392b', border: 'none', color: 'white',
                      width: 20, height: 20, cursor: 'pointer', fontSize: '13px', flexShrink: 0,
                    }}>×</button>
                  </div>
                ) : (
                  <span className="cert-name">{cert}</span>
                )}
              </div>
            ))}
            {editMode && <AddBtn onClick={onAddCert} label="Add Certification" inline />}
          </div>
        </div>
      </div>
    </section>
  );
}
