import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiPython, SiArduino, SiBlender, SiRos,
  SiAutodesk,
} from 'react-icons/si';
import {
  FaCogs, FaMicrochip, FaCube, FaDraftingCompass,
  FaWrench, FaRobot, FaPrint, FaPlane, FaThermometerHalf,
  FaChartBar, FaNetworkWired, FaTools, FaMemory,
  FaBolt, FaIndustry, FaScrewdriver, FaBrain,
  FaPencilRuler, FaLayerGroup, FaCalculator,
} from 'react-icons/fa';
import { IoHardwareChip } from 'react-icons/io5';
import { MdPrecisionManufacturing, MdDesignServices } from 'react-icons/md';
import { TbDrone, TbCpu } from 'react-icons/tb';
import { BsGearWideConnected } from 'react-icons/bs';

gsap.registerPlugin(ScrollTrigger);

// ── Icon lookup map ──────────────────────────────────────────────
const ICON_MAP = {
  // Design & Simulation
  'Fusion 360': SiAutodesk,
  'CATIA V5/V6': FaDraftingCompass,
  'SolidWorks': FaCube,
  'SolidEdge': FaCogs,
  'Blender': SiBlender,
  'MATLAB': FaCalculator,
  'Simulink': BsGearWideConnected,
  'Simscape': FaLayerGroup,
  'MSC ADAMS': FaChartBar,
  'GD&T': FaPencilRuler,
  'Autodesk 2D & 3D': SiAutodesk,

  // Programming & Control
  'Python': SiPython,
  'Arduino IDE': SiArduino,
  'NI LabVIEW': FaNetworkWired,
  'NI MAX': TbCpu,
  'IoT Integration': IoHardwareChip,
  'Embedded Systems': FaMicrochip,
  'ROS 2': SiRos,
  'AI/ML Integration': FaBrain,

  // Manufacturing & Prototyping
  'CNC Programming': MdPrecisionManufacturing,
  'Rapid Prototyping': FaBolt,
  '3D Printing': FaPrint,
  'Soldering': FaScrewdriver,
  'Component Assembly': FaTools,
  'Hardware Testing': FaMemory,

  // Core Domains
  'Robotics': FaRobot,
  'UAV Design': TbDrone,
  'Control Systems': BsGearWideConnected,
  'Mechatronics Modeling': FaCogs,
  'Product Design': MdDesignServices,
  'Thermal Design': FaThermometerHalf,
  'Data Analysis': FaChartBar,
};

function getIcon(name) {
  return ICON_MAP[name] || FaWrench;
}

function AddBtn({ onClick, label }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '6px',
      background: 'rgba(255,172,64,0.08)', border: '2px dashed rgba(255,172,64,0.4)',
      color: 'var(--orange)', padding: '10px 18px', cursor: 'pointer',
      fontFamily: 'Roboto Flex, sans-serif', fontWeight: 700,
      fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
      transition: 'all 0.2s', width: '100%', justifyContent: 'center',
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

export function Skills({ skills, editMode, onUpdateNested, onAdd, onRemove }) {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const baseTrigger = { trigger: sectionRef.current, start: 'top 85%', once: true };

      gsap.to(labelRef.current, {
        opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: baseTrigger,
      });

      rowRefs.current.filter(Boolean).forEach((row, i) => {
        const title = row.querySelector('.skills-row-title');
        const items = row.querySelectorAll('.skill-item');

        if (title) {
          gsap.fromTo(title,
            { opacity: 0, x: -60 },
            {
              opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
              scrollTrigger: { trigger: row, start: 'top 80%', once: true },
              delay: i * 0.1,
            }
          );
        }
        if (items.length) {
          gsap.fromTo(items,
            { opacity: 0, y: 20 },
            {
              opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out',
              scrollTrigger: { trigger: row, start: 'top 80%', once: true },
              delay: 0.2 + i * 0.1,
            }
          );
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [skills.length, editMode]);

  return (
    <section id="skills" ref={sectionRef}>
      <div className="container">
        <div className="section-label" ref={labelRef}>My Stack</div>
        <h2 className="section-title">
          <span className="section-title-inner" style={{ transform: 'none' }}>Skills</span>
        </h2>

        <div className="skills-rows">
          {skills.map((group, i) => (
            <div
              key={i}
              className="skills-row"
              ref={el => rowRefs.current[i] = el}
            >
              <div className="skills-row-title">
                {editMode ? (
                  <input
                    type="text"
                    defaultValue={group.category}
                    onChange={e => onUpdateNested('skills', i, 'category', e.target.value)}
                    className="edit-input"
                    style={{ fontSize: 'inherit', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em', color: 'var(--text)' }}
                  />
                ) : group.category}

                {editMode && (
                  <button onClick={() => onRemove(i)} style={{
                    background: '#c0392b', border: 'none', color: 'white',
                    padding: '2px 8px', cursor: 'pointer', fontSize: '11px',
                    marginTop: '8px', fontWeight: 700,
                  }}>Remove</button>
                )}
              </div>

              <div className="skills-row-items">
                {group.tags.map((tag, j) => {
                  const IconComp = getIcon(tag);
                  return (
                    <span key={j} className="skill-item" style={{
                      background: 'rgba(15, 23, 42, 0.6)', // deeper glass
                      backdropFilter: 'blur(12px)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(6,182,212,0.2), inset 0 1px 0 rgba(255,255,255,0.1)';
                      e.currentTarget.style.border = '1px solid rgba(6,182,212,0.4)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)';
                      e.currentTarget.style.border = '1px solid var(--border)';
                    }}
                    >
                      {editMode ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <input
                            type="text"
                            defaultValue={tag}
                            onChange={e => {
                              const tags = [...group.tags];
                              tags[j] = e.target.value;
                              onUpdateNested('skills', i, 'tags', tags);
                            }}
                            className="edit-input"
                            style={{ width: '100px', fontSize: '12px', padding: '2px 6px', background: 'transparent', color: 'var(--text)' }}
                          />
                          <button
                            onClick={() => {
                              const tags = group.tags.filter((_, idx) => idx !== j);
                              onUpdateNested('skills', i, 'tags', tags);
                            }}
                            style={{ background: '#c0392b', border: 'none', color: 'white', width: 16, height: 16, cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                          >×</button>
                        </span>
                      ) : (
                        <>
                          <span className="skill-icon" style={{
                            filter: 'drop-shadow(0 0 8px rgba(6,182,212,0.4))',
                            color: 'var(--cyan)'
                          }}>
                            <IconComp />
                          </span>
                          <span className="skill-name" style={{
                            textTransform: 'uppercase',
                            fontSize: '12px',
                            fontWeight: '700',
                            letterSpacing: '0.05em',
                            color: 'var(--text)'
                          }}>{tag}</span>
                        </>
                      )}
                    </span>
                  );
                })}
                {editMode && (
                  <button
                    onClick={() => {
                      const tags = [...group.tags, 'New Tag'];
                      onUpdateNested('skills', i, 'tags', tags);
                    }}
                    style={{ background: 'rgba(255,172,64,0.1)', border: '1px dashed rgba(255,172,64,0.4)', color: 'var(--orange)', padding: '4px 12px', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}
                  >+ Tag</button>
                )}
              </div>
            </div>
          ))}
          {editMode && (
            <AddBtn onClick={onAdd} label="Add Skill Category" />
          )}
        </div>
      </div>
    </section>
  );
}
