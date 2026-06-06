import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { portfolioData } from './data/portfolio.js';
import { useEditMode } from './hooks/useEditMode.js';
import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';
import { About } from './components/About.jsx';
import { Skills } from './components/Skills.jsx';
import { Experience } from './components/Experience.jsx';
import { Projects } from './components/Projects.jsx';
import { Education } from './components/Education.jsx';
import { Awards } from './components/Awards.jsx';
import { Contact } from './components/Contact.jsx';
import { AnimatedBackground } from './components/AnimatedBackground.jsx';

gsap.registerPlugin(ScrollTrigger);

function PasswordModal({ onVerify, onSuccess, onCancel }) {
  // Password is validated server-side when saving
  const [val, setVal] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const overlayRef = useRef(null);
  const boxRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.to(boxRef.current, { y: 0, scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' });
    setTimeout(() => inputRef.current?.focus(), 400);
  }, []);

  const dismiss = () => {
    if (loading) return;
    gsap.to(boxRef.current, { y: 24, scale: 0.95, opacity: 0, duration: 0.25 });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, delay: 0.1, onComplete: onCancel });
  };

  const submit = async () => {
    if (loading) return;
    if (val.trim().length > 0) {
      setLoading(true);
      const isValid = await onVerify(val);
      setLoading(false);
      if (isValid) {
        sessionStorage.setItem('portfolio_edit_auth', '1');
        sessionStorage.setItem('portfolio_edit_pw', val);
        gsap.to(boxRef.current, { scale: 1.04, duration: 0.1, yoyo: true, repeat: 1, onComplete: () => {
          gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: () => onSuccess(val) });
        }});
      } else {
        setError(true);
        setShake(true);
        setVal('');
        setTimeout(() => setShake(false), 600);
      }
    } else {
      setError(true);
      setShake(true);
      setVal('');
      setTimeout(() => setShake(false), 600);
    }
  };

  const onKey = (e) => {
    if (e.key === 'Enter') submit();
    if (e.key === 'Escape') dismiss();
  };

  return (
    <div
      ref={overlayRef}
      onKeyDown={onKey}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.82)',
        zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: 0, padding: '16px',
      }}
      onClick={e => e.target === e.currentTarget && dismiss()}
    >
      <div
        ref={boxRef}
        style={{
          background: 'var(--bg2)', border: '1px solid var(--border)',
          borderTop: '3px solid var(--orange)',
          padding: 'clamp(28px,4vw,44px)', width: '100%', maxWidth: '400px',
          transform: 'translateY(32px) scale(0.95)', opacity: 0,
          animation: shake ? 'shake 0.5s ease' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
          <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '22px', letterSpacing: '0.04em' }}>
            Edit Mode
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.65, marginBottom: '20px' }}>
          Enter the password to unlock edit mode.
        </p>
        <input
          ref={inputRef}
          type="password"
          placeholder="Password"
          value={val}
          onChange={e => { setVal(e.target.value); setError(false); }}
          disabled={loading}
          style={{
            width: '100%', padding: '12px 14px',
            background: error ? 'rgba(192,57,43,0.08)' : 'var(--bg3)',
            border: `2px solid ${error ? '#c0392b' : 'rgba(255,172,64,0.3)'}`,
            color: 'var(--text)', fontFamily: 'Roboto Flex, sans-serif', fontSize: '15px',
            outline: 'none', marginBottom: '8px',
          }}
        />
        {error && (
          <div style={{ color: '#e74c3c', fontSize: '12px', marginBottom: '12px', letterSpacing: '0.05em' }}>
            Incorrect password. Try again.
          </div>
        )}
        <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
          <button onClick={dismiss} disabled={loading} style={{
            flex: 1, padding: '11px', background: 'transparent', border: '1px solid var(--border)',
            color: 'var(--text-muted)', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Roboto Flex, sans-serif',
            fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            transition: 'border-color 0.2s', opacity: loading ? 0.6 : 1,
          }}>Cancel</button>
          <button onClick={submit} disabled={loading} style={{
            flex: 1, padding: '11px', background: 'var(--orange)', border: 'none',
            color: '#141414', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Roboto Flex, sans-serif',
            fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            transition: 'background 0.2s', opacity: loading ? 0.8 : 1,
          }}>{loading ? 'Verifying...' : 'Unlock'}</button>
        </div>
      </div>
      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-6px)}
          80%{transform:translateX(6px)}
        }
      `}</style>
    </div>
  );
}

function EditBanner({ editMode, onToggle, saveStatus }) {
  return (
    <div className="edit-banner">
      {editMode && (
        <div className="edit-mode-badge">✎ Edit Mode Active</div>
      )}
      {saveStatus === 'saving' && (
        <div className="edit-mode-badge" style={{ background: 'rgba(52,152,219,0.15)', borderColor: 'rgba(52,152,219,0.4)', color: '#3498db' }}>⏳ Saving...</div>
      )}
      {saveStatus === 'saved' && (
        <div className="edit-mode-badge" style={{ background: 'rgba(46,204,113,0.15)', borderColor: 'rgba(46,204,113,0.4)', color: '#2ecc71' }}>✓ Saved!</div>
      )}
      {saveStatus === 'error' && (
        <div className="edit-mode-badge" style={{ background: 'rgba(231,76,60,0.15)', borderColor: 'rgba(231,76,60,0.4)', color: '#e74c3c' }}>✗ Save failed — check password</div>
      )}
      <button className={`edit-toggle ${editMode ? 'active' : ''}`} onClick={onToggle} disabled={saveStatus === 'saving'}>
        {editMode ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Save & Done
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
            Edit Portfolio
          </>
        )}
      </button>
    </div>
  );
}

function Footer({ name }) {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} <span>{name}</span>. Built with passion for engineering.</p>
    </footer>
  );
}

export default function App() {
  const { editMode, toggleEditMode, data, updateField, updateNestedArray, addItem, removeItem, loading, saveStatus, saveData, verifyPassword } = useEditMode(portfolioData);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editPassword, setEditPassword] = useState('');

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  // Restore password from session if returning
  useEffect(() => {
    const storedPw = sessionStorage.getItem('portfolio_edit_pw');
    if (storedPw) setEditPassword(storedPw);
  }, []);

  const handleEditToggle = async () => {
    if (editMode) {
      // Save data to API when exiting edit mode
      const pw = editPassword || sessionStorage.getItem('portfolio_edit_pw') || '';
      const success = await saveData(pw);
      if (success) {
        toggleEditMode();
      } else {
        // Clear password and auth if save failed so they are prompted again
        sessionStorage.removeItem('portfolio_edit_auth');
        sessionStorage.removeItem('portfolio_edit_pw');
        setEditPassword('');
        // Show the password modal again so they can enter the correct password and try saving
        setShowPasswordModal(true);
      }
      return;
    }
    if (sessionStorage.getItem('portfolio_edit_auth') === '1') {
      toggleEditMode();
    } else {
      setShowPasswordModal(true);
    }
  };

  const handlePasswordSuccess = (password) => {
    setEditPassword(password);
    setShowPasswordModal(false);
    toggleEditMode();
  };

  const handleUpdateNested = (arrayPath, index, field, value) => {
    updateNestedArray(arrayPath, index, field, value);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg1)', color: 'var(--text)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px', height: '40px', border: '3px solid var(--border)',
            borderTop: '3px solid var(--orange)', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite', margin: '0 auto 16px',
          }} />
          <div style={{ fontFamily: 'Roboto Flex, sans-serif', fontSize: '14px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Loading Portfolio...
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <>
      <AnimatedBackground />
      <Navbar name={data.personal.name} />
      <main>
        <Hero data={data.personal} editMode={editMode} onUpdate={updateField} />
        <About data={data} editMode={editMode} onUpdate={updateField} />
        <Skills
          skills={data.skills}
          editMode={editMode}
          onUpdateNested={handleUpdateNested}
          onAdd={() => addItem('skills', { category: 'New Category', tags: ['Tag 1'] })}
          onRemove={(i) => removeItem('skills', i)}
        />
        <Experience
          experience={data.experience}
          editMode={editMode}
          onUpdateNested={handleUpdateNested}
          onAdd={() => addItem('experience', {
            role: 'New Role', company: 'Company Name',
            period: '2025 – Present', location: 'Location',
            bullets: ['Describe your responsibilities here'],
          })}
          onRemove={(i) => removeItem('experience', i)}
        />
        <Projects
          projects={data.projects}
          editMode={editMode}
          onUpdateNested={handleUpdateNested}
          onAdd={() => addItem('projects', {
            title: 'New Project', status: 'Ongoing',
            description: 'Describe your project here.',
            tags: ['Tag'], features: ['Feature 1'], media: [],
          })}
          onRemove={(i) => removeItem('projects', i)}
        />
        <Education
          education={data.education}
          certifications={data.certifications}
          editMode={editMode}
          onUpdateNested={handleUpdateNested}
          onAddEdu={() => addItem('education', {
            degree: 'Degree Name', school: 'University',
            location: 'Location', year: '2025', gpa: '',
          })}
          onRemoveEdu={(i) => removeItem('education', i)}
          onAddCert={() => addItem('certifications', n => `New Certification ${n + 1}`)}
          onRemoveCert={(i) => removeItem('certifications', i)}
          onUpdateCert={(i, v) => updateNestedArray('certifications', i, null, v)}
          data={data}
          updateField={updateField}
        />
        <Awards
          awards={data.awards}
          editMode={editMode}
          onUpdateNested={handleUpdateNested}
          onAdd={() => addItem('awards', {
            title: 'Award Title', org: 'Organization',
            desc: 'Describe this award.', icon: '🏅',
          })}
          onRemove={(i) => removeItem('awards', i)}
        />
        <Contact personal={data.personal} editMode={editMode} onUpdate={updateField} />
      </main>
      <Footer name={data.personal.name} />
      <EditBanner editMode={editMode} onToggle={handleEditToggle} saveStatus={saveStatus} />
      {showPasswordModal && (
        <PasswordModal
          onVerify={verifyPassword}
          onSuccess={handlePasswordSuccess}
          onCancel={() => setShowPasswordModal(false)}
        />
      )}
    </>
  );
}
