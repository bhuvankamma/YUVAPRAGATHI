import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// --- COLOR PALETTE ---
const COLORS = {
  primary: '#4F46E5',
  secondary: '#10B981',
  background: '#FFFFFF',
  text: '#1E293B',
  card: '#FFFFFF',
  shadowLight: 'rgba(255, 255, 255, 0.7)',
  shadowDark: 'rgba(174, 174, 192, 0.4)',
};

// --- MOCK DATA ---
const MOCK_CATEGORIES = ["All Categories", "IT & Software", "Healthcare", "Manufacturing", "Finance", "Construction"];
const EXTERNAL_LINKS = {
  "IT & Software": "https://www.freecodecamp.org/",
  "Healthcare": "https://www.coursera.org/browse/health/healthcare-management",
  "Manufacturing": "https://alison.com/courses/manufacturing",
  "Finance": "https://www.edx.org/learn/finance",
  "Construction": "https://skillup.org.in/construction-management-courses/",
  "default": "https://www.india.gov.in/topics/education-skills",
};

const INITIAL_SKILL_PROGRAMS = [
  { id: 1, title: "Advanced Full Stack with MERN", category: "IT & Software", description: "Master modern web development including Node.js, Express, React, and MongoDB.", certification: "Govt. IT Master Certification" },
  { id: 2, title: "Modern Nursing and Patient Care", category: "Healthcare", description: "Comprehensive training in patient management and essential healthcare administration.", certification: "Certified Healthcare Professional (CHP)" },
  { id: 3, title: "CNC Machining and Robotics", category: "Manufacturing", description: "Hands-on CNC programming and industrial robotics operation for automated production.", certification: "Industrial Automation Diploma" },
  { id: 4, title: "Financial Modeling and Analysis", category: "Finance", description: "Learn valuation and complex financial model creation in Excel.", certification: "Certified Financial Analyst (CFA Prep)" },
  { id: 5, title: "Site Supervision and Safety", category: "Construction", description: "Training for site supervisors in project management and safety procedures.", certification: "National Safety Certificate" },
  { id: 6, title: "Cloud Fundamentals (AWS/Azure)", category: "IT & Software", description: "Introduction to cloud architecture and deployment on major platforms.", certification: "Cloud Practitioner Badge" },
];

// --- COMPONENT: SkillCard ---
const SkillCard = ({ program, onEnrollClick, index }) => {
  const cardStyle = {
    backgroundColor: COLORS.card,
    borderRadius: '16px',
    padding: '1.25rem',
    boxShadow: `7px 7px 14px ${COLORS.shadowDark}, -7px -7px 14px ${COLORS.shadowLight}`,
    transition: 'all 0.4s ease',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '260px',
    border: '1px solid #E5E7EB',
  };

  const buttonStyle = {
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    border: 'none',
    background: `linear-gradient(45deg, ${COLORS.primary}, #6366F1)`,
    color: '#ffffff',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  return (
    <motion.div
      style={cardStyle}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02, boxShadow: `12px 12px 24px ${COLORS.shadowDark}` }}
    >
      <div style={{ flexGrow: 1 }}>
        <div
          style={{
            padding: '0.25rem 0.6rem',
            background: `linear-gradient(90deg, ${COLORS.secondary}20, ${COLORS.secondary}40)`,
            color: COLORS.secondary,
            fontSize: '0.8rem',
            fontWeight: '600',
            borderRadius: '6px',
            display: 'inline-block',
            marginBottom: '0.75rem',
          }}
        >
          {program.category}
        </div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: COLORS.text, marginBottom: '0.5rem' }}>
          {program.title}
        </h3>
        <p style={{ color: '#4B5563', fontSize: '0.9rem', marginBottom: '1rem' }}>
          {program.description}
        </p>
        <div style={{ color: COLORS.primary, fontWeight: '500', fontSize: '0.85rem' }}>
          🎓 {program.certification}
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid #F3F4F6',
          paddingTop: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'auto',
        }}
      >
        <button onClick={onEnrollClick} style={buttonStyle}>
          Enroll
        </button>
        <a
          href={EXTERNAL_LINKS[program.category] || EXTERNAL_LINKS.default}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: COLORS.secondary, fontSize: '0.85rem', fontWeight: '600', textDecoration: 'none' }}
        >
          Free Resources →
        </a>
      </div>
    </motion.div>
  );
};

// --- MAIN COMPONENT: SkillsSection ---
const SkillsSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(MOCK_CATEGORIES[0]);

  const filteredPrograms = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return INITIAL_SKILL_PROGRAMS.filter((p) => {
      const matchesCategory = selectedCategory === "All Categories" || p.category === selectedCategory;
      const matchesSearch = p.title.toLowerCase().includes(lowerSearch) || p.description.toLowerCase().includes(lowerSearch);
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleEnrollClick = () => navigate("/register");

  const ui = {
    section: {
      padding: '0 1.5rem 3rem',
      background: COLORS.background,
      minHeight: '100vh',
      fontFamily: "'Inter', sans-serif",
    },
    container: { maxWidth: '1250px', margin: '0 auto' },
    header: { fontSize: '2rem', fontWeight: '700', color: COLORS.text, textAlign: 'center', marginBottom: '0.75rem' },
    subheader: { fontSize: '1.05rem', color: '#4B5563', textAlign: 'center', marginBottom: '3rem' },
    controls: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', marginBottom: '3rem' },
    search: {
      width: '300px',
      padding: '0.8rem 1.2rem',
      borderRadius: '12px',
      border: '1px solid #E5E7EB',
      background: COLORS.card,
      boxShadow: `inset 2px 2px 5px ${COLORS.shadowDark}, inset -2px -2px 5px ${COLORS.shadowLight}`,
      fontSize: '1rem',
    },
    dropdown: {
      padding: '0.8rem 1.2rem',
      borderRadius: '12px',
      border: '1px solid #E5E7EB',
      background: COLORS.card,
      fontSize: '1rem',
    },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' },
  };

  return (
    <section style={ui.section}>
      <div style={ui.container}>
        {/* Animated Title */}
        <motion.h2
          style={ui.header}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Certified Skill Programs
        </motion.h2>

        {/* Animated Subtitle */}
        <motion.p
          style={ui.subheader}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Government-recognized learning paths to power your professional growth.
        </motion.p>

        {/* Filters */}
        <motion.div
          style={ui.controls}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <input
            type="text"
            placeholder="Search by title or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={ui.search}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={ui.dropdown}
          >
            {MOCK_CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </motion.div>

        {/* Grid */}
        <motion.div
          style={ui.grid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {filteredPrograms.map((p, i) => (
            <SkillCard key={p.id} program={p} onEnrollClick={handleEnrollClick} index={i} />
          ))}
        </motion.div>

        {filteredPrograms.length === 0 && (
          <motion.p
            style={{ textAlign: 'center', fontSize: '1.25rem', color: '#6B7280', marginTop: '2rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No matching programs found.
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
