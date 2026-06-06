import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export function AnimatedBackground() {
  const [init, setInit] = useState(false);

  // Initialize the tsParticles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#06b6d4", // Neon Cyan
        },
        links: {
          color: "#f59e0b", // Copper Gold
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1.5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  return (
    <div className="animated-background" style={{ 
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
      zIndex: -1, overflow: 'hidden', background: 'var(--bg)' 
    }}>
      {/* Underlying glow orbs for depth */}
      <div className="bg-orb-1" style={{ position: 'absolute', pointerEvents: 'none' }} />
      <div className="bg-orb-2" style={{ position: 'absolute', pointerEvents: 'none' }} />
      <div className="bg-orb-3" style={{ position: 'absolute', pointerEvents: 'none' }} />
      
      {/* Particle Network Layer */}
      {init && (
        <Particles
          id="tsparticles"
          options={options}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      )}
    </div>
  );
}
