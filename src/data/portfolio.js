export const portfolioData = {
  personal: {
    name: "Ojas Vipin Sapate",
    nameFirst: "Ojas",
    nameLast: "Sapate",
    title: "Mechatronics Engineer",
    tagline: "Building innovative hardware + software systems — from UAVs to humanoid robots.",
    email: "ojassapate@gmail.com",
    phone: "+91 89564 88636",
    location: "Bengaluru, India",
    linkedin: "https://linkedin.com/in/ojas-sapate-555155345",
    github: "https://github.com/ojassapate",
    resume: "/resume.pdf",
  },

  summary: `Motivated Mechatronics Engineer passionate about mechanical design, robotics, and automation systems. Experienced in CAD modeling, simulation, UAV and robotics development, control systems, and IoT integration. Skilled at transforming conceptual designs into functional prototypes through cross-disciplinary collaboration, rapid prototyping, and data-driven design optimization. Strong interests in AI-enabled systems, product design, and manufacturing automation.`,

  experience: [
    {
      id: "exp1",
      role: "Design Head",
      company: "ISA Bangalore (REVA University)",
      period: "2026 – Present",
      location: "Bengaluru, India",
      bullets: [
        "Leading design, modeling, and prototyping for a humanoid robot project, optimizing mechanical structure and joint motion.",
        "Managing a multidisciplinary team in CAD design, simulation, and system integration.",
      ],
    },
    {
      id: "exp2",
      role: "Core Team Member",
      company: "International Society of Automation (ISA-B)",
      period: "2024 – Present",
      location: "Bengaluru, India",
      bullets: [
        "Coordinated and organized i-ACT25 automation events including sponsorships and AI-enabled sensor design competitions.",
        "Winner – i-ACT24 Ideathon for innovative automation concept.",
        "Promoted cross-disciplinary innovation through workshop coordination and participant mentorship.",
      ],
    },
    {
      id: "exp3",
      role: "Research Intern",
      company: "CEMILAC, DRDO",
      period: "07/2025 – 08/2025",
      location: "Bengaluru, India",
      bullets: [
        "Designed and implemented DAC/ADC control systems using NI LabVIEW and NI MAX for automation applications.",
        "Conducted system modeling using Laplace and Z Transforms to support control system design.",
        "Researched and documented flight control architectures and avionics systems.",
      ],
    },
    {
      id: "exp4",
      role: "Mentor",
      company: "ISA REVA Chapter",
      period: "2024 – 2024",
      location: "Bengaluru, India",
      bullets: [
        "Conducted a workshop on quadcopter development, covering aerodynamics, flight control, and motor tuning.",
        "Guided students in design, assembly, and testing of UAV prototypes.",
      ],
    },
    {
      id: "exp5",
      role: "Research Intern",
      company: "Drona Automation",
      period: "06/2024 – 07/2024",
      location: "Bengaluru, India",
      bullets: [
        "Designed an agricultural rover chassis and performed torque and motor selection analysis.",
        "Integrated RTK-GPS navigation and IoT-based localization for autonomous operation.",
        "Conducted prototyping and field performance testing for improved energy efficiency.",
      ],
    },
  ],

  education: [
    {
      id: "edu1",
      degree: "B.Tech in Mechatronics Engineering",
      school: "REVA University",
      location: "Bengaluru, India",
      year: "Expected 2027",
      gpa: "",
    },
  ],

  skills: [
    {
      category: "Design & Simulation",
      tags: ["Fusion 360", "CATIA V5/V6", "SolidWorks", "SolidEdge", "Blender", "MATLAB", "Simulink", "Simscape", "MSC ADAMS", "GD&T", "Autodesk 2D & 3D"],
    },
    {
      category: "Programming & Control",
      tags: ["Python", "Arduino IDE", "MATLAB", "NI LabVIEW", "NI MAX", "IoT Integration", "Embedded Systems", "ROS 2", "AI/ML Integration"],
    },
    {
      category: "Manufacturing & Prototyping",
      tags: ["CNC Programming", "Rapid Prototyping", "3D Printing", "Soldering", "Component Assembly", "Hardware Testing"],
    },
    {
      category: "Core Domains",
      tags: ["Robotics", "UAV Design", "Control Systems", "Mechatronics Modeling", "Product Design", "Thermal Design", "Data Analysis"],
    },
  ],

  projects: [
    {
      id: "proj1",
      title: "AI-Powered Surveillance RC Plane",
      status: "Ongoing",
      description: "Designed complete RC airframe in Fusion 360 and CATIA, focusing on aerodynamics, structural rigidity, and weight optimization. Integrated AI-based image recognition, Arduino control, and IoT telemetry for surveillance operations.",
      tags: ["Fusion 360", "CATIA", "Arduino", "AI/ML", "IoT", "EDF"],
      features: [
        "Complete airframe design with aerodynamic optimization",
        "Electric ducted fan (EDF) propulsion with GD&T-based optimization",
        "AI-based image recognition integration",
        "IoT telemetry for real-time surveillance",
      ],
      media: [],
    },
    {
      id: "proj2",
      title: "Twin-Motor EDF Optimization for UAVs",
      status: "Completed",
      description: "Designed and simulated a dual EDF thrust system for improved propulsion efficiency and air compression in unmanned aerial vehicles.",
      tags: ["CFD", "CATIA", "Simulation", "UAV", "EDF"],
      features: [
        "Dual EDF thrust system design",
        "Propulsion efficiency optimization",
        "Air compression simulation and analysis",
      ],
      media: [],
    },
    {
      id: "proj3",
      title: "Peltier Thermal Management System",
      status: "Completed",
      description: "Created a cooling system with a grooved water channel for enhanced surface area and heat dissipation. Optimized heat sink geometry and material for thermal performance.",
      tags: ["Thermal Design", "Fusion 360", "CFD", "ANSYS"],
      features: [
        "Grooved water channel for enhanced heat dissipation",
        "Heat sink geometry optimization",
        "Material selection for thermal performance",
      ],
      media: [],
    },
    {
      id: "proj4",
      title: "Biped Robot with Duck-Like Gait",
      status: "Completed",
      description: "Designed and controlled a two-legged robot using Arduino programming and servo-driven motion analysis for smooth, duck-like locomotion.",
      tags: ["Arduino", "Servo Control", "Robotics", "Motion Analysis"],
      features: [
        "Two-legged bipedal locomotion",
        "Servo-driven motion analysis",
        "Duck-like gait pattern programming",
      ],
      media: [],
    },
    {
      id: "proj5",
      title: "IoT-Based Real-Time Tracker",
      status: "Completed",
      description: "Developed a data-integrated tracking system with live configuration management for smart automation applications.",
      tags: ["IoT", "ESP32", "Real-Time", "Automation"],
      features: [
        "Real-time data integration",
        "Live configuration management",
        "Smart automation application",
      ],
      media: [],
    },
    {
      id: "proj6",
      title: "Quadcopter UAV",
      status: "Completed",
      description: "Designed and assembled UAV with optimized power distribution, PID tuning, and weight-to-thrust ratio for stable flight control.",
      tags: ["UAV", "PID Control", "Power Distribution", "Flight Control"],
      features: [
        "Optimized power distribution",
        "PID tuning for stable flight",
        "Weight-to-thrust ratio optimization",
      ],
      media: [],
    },
  ],

  certifications: [
    "3D Modeling with CATIA and Blender",
    "MATLAB Onramp and Simscape",
    "MSC ADAMS Simulation",
    "NI LabVIEW Fundamentals",
    "Computational Thinking Certification",
    "Autodesk 2D Drafting and Modeling",
  ],

  awards: [
    {
      id: "aw1",
      title: "1st Place – i-ACT24 Ideathon",
      org: "ISA-B",
      desc: "Winner of the innovative automation concept competition at the International Society of Automation Bangalore.",
      icon: "🏆",
    },
    {
      id: "aw2",
      title: "Organizer – i-ACT25 Innovation Event",
      org: "ISA-B",
      desc: "Led organization of the i-ACT25 automation and innovation event.",
      icon: "🎯",
    },
    {
      id: "aw3",
      title: "Recognition for Exemplary Teamwork",
      org: "Robotics & Automation",
      desc: "Recognized for exemplary teamwork and innovation in robotics and automation fields.",
      icon: "⭐",
    },
  ],

  languages: ["English", "Hindi", "Marathi"],

  softSkills: ["Leadership", "Team Collaboration", "Communication", "Critical Thinking", "Problem Solving", "Adaptability", "Design Thinking"],
};
