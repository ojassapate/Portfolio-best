import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileUpload } from './FileUpload';

gsap.registerPlugin(ScrollTrigger);

function AddBtn({ onClick, label }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '6px',
      background: 'rgba(255,172,64,0.08)', border: '2px dashed rgba(255,172,64,0.4)',
      color: 'var(--orange)', padding: '32px 24px', cursor: 'pointer',
      fontFamily: 'Roboto Flex, sans-serif', fontWeight: 700,
      fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase',
      transition: 'all 0.2s', justifyContent: 'center', width: '100%', height: '100%', minHeight: '180px',
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,172,64,0.15)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,172,64,0.08)'}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
      {label}
    </button>
  );
}

function Modal({ project, projectIndex, editMode, onUpdateNested, onClose }) {
  const overlayRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' });
    gsap.to(boxRef.current, { y: 0, scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.5)' });
    const onKey = (e) => e.key === 'Escape' && handleClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleClose = () => {
    gsap.to(boxRef.current, { y: 30, scale: 0.95, opacity: 0, duration: 0.25, ease: 'power2.in' });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, delay: 0.1, onComplete: onClose });
  };

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={e => e.target === overlayRef.current && handleClose()}>
      <div className="modal-box" ref={boxRef}>
        <button className="modal-close" onClick={handleClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {editMode ? (
          <select
            value={project.status}
            onChange={e => onUpdateNested('projects', projectIndex, 'status', e.target.value)}
            style={{ background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--orange)', fontSize: '11px', padding: '3px 8px', letterSpacing: '0.1em', cursor: 'pointer', marginBottom: '12px' }}
          >
            <option>Ongoing</option>
            <option>Completed</option>
            <option>Paused</option>
          </select>
        ) : (
          <div className="project-status">{project.status}</div>
        )}

        {editMode ? (
          <input type="text" value={project.title}
            onChange={e => onUpdateNested('projects', projectIndex, 'title', e.target.value)}
            className="edit-input"
            style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(22px,4vw,32px)', marginBottom: '16px', letterSpacing: '0.02em', lineHeight: 1.1, width: '100%' }}
            placeholder="Project Title"
          />
        ) : (
          <h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(22px,4vw,32px)', marginBottom: '16px', letterSpacing: '0.02em', lineHeight: 1.1 }}>
            {project.title}
          </h2>
        )}

        {editMode ? (
          <textarea value={project.description}
            onChange={e => onUpdateNested('projects', projectIndex, 'description', e.target.value)}
            className="edit-textarea" style={{ minHeight: '100px', fontSize: 'clamp(14px,1.6vw,15px)', marginBottom: '20px', width: '100%' }}
            placeholder="Project description"
          />
        ) : (
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '20px', fontSize: 'clamp(14px,1.6vw,15px)' }}>
            {project.description}
          </p>
        )}

        {editMode ? (
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 700, marginBottom: '10px' }}>
              Key Features (Edit)
            </div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {project.features?.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--orange)' }}>→</span>
                  <input type="text" value={f}
                    onChange={e => {
                      const feats = [...project.features];
                      feats[i] = e.target.value;
                      onUpdateNested('projects', projectIndex, 'features', feats);
                    }}
                    className="edit-input" style={{ flex: 1, fontSize: '14px' }}
                  />
                  <button onClick={() => { const feats = project.features.filter((_, idx) => idx !== i); onUpdateNested('projects', projectIndex, 'features', feats); }}
                    style={{ background: '#c0392b', border: 'none', color: 'white', padding: '4px 8px', cursor: 'pointer', fontSize: '12px' }}>✕</button>
                </li>
              ))}
            </ul>
            <button onClick={() => onUpdateNested('projects', projectIndex, 'features', [...(project.features || []), 'New Feature'])}
              style={{ background: 'rgba(255,172,64,0.1)', border: '1px dashed rgba(255,172,64,0.4)', color: 'var(--orange)', padding: '6px 12px', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}>
              + Add Feature
            </button>
          </div>
        ) : (
          project.features?.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 700, marginBottom: '10px' }}>
                Key Features
              </div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {project.features.map((f, i) => (
                  <li key={i} style={{ padding: '5px 0 5px 16px', position: 'relative', color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6 }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--orange)' }}>→</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )
        )}

        <div className="project-tags" style={{ marginBottom: '24px' }}>
          {project.tags.map((t, j) => (
            editMode ? (
              <span key={j} style={{ display: 'inline-flex', alignItems: 'center', gap: 2, marginRight: 8 }}>
                <input type="text" value={t}
                  onChange={e => {
                    const tags = [...project.tags];
                    tags[j] = e.target.value;
                    onUpdateNested('projects', projectIndex, 'tags', tags);
                  }}
                  className="edit-input" style={{ width: '70px', fontSize: '10px', padding: '2px 4px' }}
                />
                <button onClick={() => { const tags = project.tags.filter((_,idx)=>idx!==j); onUpdateNested('projects',projectIndex,'tags',tags); }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#c0392b', border: 'none', color: 'white', width: 14, height: 14, cursor: 'pointer', fontSize: '11px', padding: 0 }}>×</button>
              </span>
            ) : <span key={t} className="project-tag">{t}</span>
          ))}
          {editMode && (
            <button onClick={() => onUpdateNested('projects', projectIndex, 'tags', [...project.tags, 'Tag'])}
              style={{ background: 'rgba(255,172,64,0.1)', border: '1px dashed rgba(255,172,64,0.4)', color: 'var(--orange)', padding: '2px 7px', cursor: 'pointer', fontSize: '10px', fontWeight: 700 }}>
              + Tag
            </button>
          )}
        </div>

        {editMode ? (
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 700, marginBottom: '10px' }}>
              Project Media / Images
            </div>
            <FileUpload
              files={project.media || []}
              onFilesChange={(newMedia) => onUpdateNested('projects', projectIndex, 'media', newMedia)}
            />
          </div>
        ) : (
          project.media?.length > 0 && (
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 700, marginBottom: '10px' }}>
                Project Media
              </div>
              <div className="project-modal-media-gallery" style={{ display: 'grid', gap: '16px' }}>
                {project.media.map((m, idx) => (
                  <div key={idx} className="project-modal-media-item" style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {m.type?.startsWith('video') ? (
                      <video src={m.url} controls muted autoPlay loop style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
                    ) : (
                      <img src={m.url} alt={project.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export function Projects({ projects, editMode, onUpdateNested, onAdd, onRemove }) {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 82%', once: true };
      gsap.to(labelRef.current, { opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: st });
      gsap.to(cardsRef.current.filter(Boolean), {
        opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { ...st, start: 'top 78%' },
      });
      if (!editMode) {
        cardsRef.current.filter(Boolean).forEach(card => {
          const onMove = (e) => {
            const rect = card.getBoundingClientRect();
            const cx = (e.clientX - rect.left) / rect.width - 0.5;
            const cy = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(card, { rotateY: cx * 6, rotateX: -cy * 6, duration: 0.35, ease: 'power2.out', transformPerspective: 700 });
          };
          const onLeave = () => gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power2.out' });
          card.addEventListener('mousemove', onMove);
          card.addEventListener('mouseleave', onLeave);
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [projects.length, editMode]);

  return (
    <section id="projects" ref={sectionRef}>
      <div className="container">
        <div className="section-label" ref={labelRef}>What I've Built</div>
        <h2 className="section-title">
          <span className="section-title-inner" style={{ transform: 'none' }}>Projects</span>
        </h2>
        <div className="projects-grid">
          {projects.map((proj, i) => (
            <div
              key={proj.id || i}
              className="project-card"
              ref={el => cardsRef.current[i] = el}
              onClick={() => setActiveProjectIndex(i)}
              style={{ cursor: 'pointer' }}
            >
              <div className="project-media">
                {editMode && (
                  <div className="edit-media-overlay">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      Edit Media & Details
                    </span>
                  </div>
                )}
                {proj.media?.length > 0 ? (
                  proj.media[0].type?.startsWith('video') ? (
                    <video src={proj.media[0].url} muted autoPlay loop playsInline />
                  ) : (
                    <img src={proj.media[0].url} alt={proj.title} />
                  )
                ) : (
                  <div className="project-media-placeholder">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.5" opacity="0.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                    <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>No media</span>
                  </div>
                )}
              </div>
              <div className="project-body">
                {editMode && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <select
                      value={proj.status}
                      onChange={e => onUpdateNested('projects', i, 'status', e.target.value)}
                      style={{ background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--orange)', fontSize: '11px', padding: '3px 8px', letterSpacing: '0.1em', cursor: 'pointer' }}
                      onClick={e => e.stopPropagation()}
                    >
                      <option>Ongoing</option>
                      <option>Completed</option>
                      <option>Paused</option>
                    </select>
                    <button onClick={e => { e.stopPropagation(); onRemove(i); }} style={{
                      background: '#c0392b', border: 'none', color: 'white',
                      padding: '3px 10px', cursor: 'pointer', fontWeight: 700, fontSize: '12px',
                    }}>✕ Remove</button>
                  </div>
                )}
                {!editMode && <div className="project-status">{proj.status}</div>}
                <div className="project-title">
                  {editMode ? (
                    <input type="text" value={proj.title}
                      onChange={e => onUpdateNested('projects', i, 'title', e.target.value)}
                      className="edit-input"
                      style={{ fontFamily: 'Anton, sans-serif', fontSize: 'inherit', letterSpacing: '0.02em' }}
                      onClick={e => e.stopPropagation()} placeholder="Project Title"
                    />
                  ) : proj.title}
                </div>
                {editMode ? (
                  <textarea value={proj.description}
                    onChange={e => onUpdateNested('projects', i, 'description', e.target.value)}
                    className="edit-textarea" style={{ minHeight: '70px', fontSize: '13px' }}
                    onClick={e => e.stopPropagation()} placeholder="Project description"
                  />
                ) : (
                  <p className="project-desc">{proj.description}</p>
                )}
                <div className="project-tags">
                  {proj.tags.map((t, j) => (
                    editMode ? (
                      <span key={j} style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                        <input type="text" value={t}
                          onChange={e => {
                            const tags = [...proj.tags];
                            tags[j] = e.target.value;
                            onUpdateNested('projects', i, 'tags', tags);
                          }}
                          className="edit-input" style={{ width: '70px', fontSize: '10px', padding: '2px 4px' }}
                          onClick={e => e.stopPropagation()}
                        />
                        <button onClick={e => { e.stopPropagation(); const tags = proj.tags.filter((_,idx)=>idx!==j); onUpdateNested('projects',i,'tags',tags); }}
                          style={{ background: '#c0392b', border: 'none', color: 'white', width: 14, height: 14, cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                      </span>
                    ) : <span key={t} className="project-tag">{t}</span>
                  ))}
                  {editMode && (
                    <button onClick={e => { e.stopPropagation(); onUpdateNested('projects', i, 'tags', [...proj.tags, 'Tag']); }}
                      style={{ background: 'rgba(255,172,64,0.1)', border: '1px dashed rgba(255,172,64,0.4)', color: 'var(--orange)', padding: '2px 7px', cursor: 'pointer', fontSize: '10px', fontWeight: 700 }}>
                      + Tag
                    </button>
                  )}
                </div>
                {!editMode && (
                  <div style={{ marginTop: '14px', fontSize: '12px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    View Details
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                )}
              </div>
            </div>
          ))}
          {editMode && (
            <div style={{ border: '2px dashed rgba(255,172,64,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AddBtn onClick={onAdd} label="Add Project" />
            </div>
          )}
        </div>
      </div>
      {activeProjectIndex !== null && (
        <Modal
          project={projects[activeProjectIndex]}
          projectIndex={activeProjectIndex}
          editMode={editMode}
          onUpdateNested={onUpdateNested}
          onClose={() => setActiveProjectIndex(null)}
        />
      )}
    </section>
  );
}
