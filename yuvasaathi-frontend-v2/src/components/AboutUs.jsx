import React from 'react';
// Import 'motion' and 'useInView' from framer-motion for animations
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react'; // Import useRef for useInView

// Assuming 'lottie-react' is installed for Lottie animations
import Lottie from 'lottie-react'; 

// Lottie Animation Imports
import aboutAnimation from '../assets/about-animation.json.json';
import missionAnimation from '../assets/ourmission-animation-json.json';

// Image Imports (Paths remain the same)
import card from '../assets/card.webp'
import MAR from '../assets/MAR.jpeg'
import MUY from '../assets/MUY.jpeg'
import SN from '../assets/SN.jpeg'
import skill from '../assets/skill.png'
import parivahan from '../assets/parivahan.jpg'
import krishi from '../assets/krishi.jpg'
import sp from '../assets/sp.jpg'
import satat from '../assets/satat.jpg'
import ab from '../assets/ab.jpg'
import db from '../assets/db.png'
import hr from '../assets/hr.webp'
import jh from '../assets/jh.png'
import ep from '../assets/ep.jpg'
import dbb from '../assets/dbb.jpeg'

// =======================================================
// ** IMPORTANT: You must ensure 'font-poppins' and 'font-roboto' are defined in your global CSS (e.g., index.css)
// or Tailwind config for these classes to work with the imported Google Fonts.
// Example global CSS:
// @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Roboto:wght@400;700&display=swap');
// 
// @layer base {
//   .font-poppins { font-family: 'Poppins', sans-serif; }
//   .font-roboto { font-family: 'Roboto', sans-serif; }
// }
// =======================================================

const welfareSchemes = [
    {
        id: 1,
        title: 'Mukhyamantri Udyami Yojana',
        description: 'Promoting entrepreneurship among youth, women, and SC/ST categories with financial support.',
        image: MUY,
        link: 'https://udyami.bihar.gov.in/',
    },
    {
        id: 2,
        title: 'Saat Nishchay Part-2',
        description: 'Seven resolves for a developed Bihar, focusing on youth, infrastructure, and good governance.',
        image: SN,
        link: 'https://www.nabard.org/auth/writereaddata/careernotices/0905225815policy-initiatives.pdf?utm_source=chatgpt.com',
    },
    {
        id: 3,
        title: 'Bihar Student Credit Card Scheme',
        description: 'Providing financial assistance up to ₹4 lakhs for higher education to aspiring students.',
        image: card,
        link: 'https://www.7nishchay-yuvaupmission.bihar.gov.in/?utm_source=chatgpt.com',
    },
    {
        id: 4,
        title: 'Bihar Skill Development Mission',
        description: 'Enhancing skills for employment.',
        image: skill,
        link: 'http://bsdm.bihar.gov.in/',
    },
    {
        id: 5,
        title: 'Mukhyamantri Alpsankhyak Rojgar Rin Yojana',
        description: 'Providing loans to minority communities for self-employment and small businesses.',
        image: MAR,
        link: 'https://state.bihar.gov.in/minoritywelfare/CitizenHome.html',
    },
];

const governmentInitiatives = [
    {
        id: 1,
        title: 'Digital Bihar',
        description: 'A comprehensive plan to digitize government services and promote digital literacy.',
        image: dbb,
        link: 'https://state.bihar.gov.in/main/CitizenHome.html',
    },
    {
        id: 2,
        title: 'Health Sector Reforms',
        description: 'Improving healthcare infrastructure and access to quality medical services for all citizens.',
        image: hr,
        link: 'https://state.bihar.gov.in/health/',
    },
    {
        id: 3,
        title: 'Agricultural Roadmap',
        description: 'Modernizing agriculture to increase productivity and farmer income.',
        image: ab,
        link: 'https://onlinedbtagriservice.bihar.gov.in/RoadMap/krishirodamapmis/about.html',
    },
    {
        id: 4,
        title: 'Education Policy',
        description: 'Enhancing the quality of education from primary to higher levels across the state.',
        image: ep,
        link: 'https://bseidc.in/',
    },
    {
        id: 5,
        title: 'Jal-Jeevan-Hariyali Mission',
        description: 'A campaign focused on environmental conservation and water management.',
        image: jh,
        link: 'https://jaljeevanhariyali.bihar.gov.in/',
    },
    {
        id: 6,
        title: 'Urban Development',
        description: 'Focusing on smart city initiatives and improving urban infrastructure.',
        image: db,
        link: 'https://state.bihar.gov.in/urban',
    },
];

const moreWelfareSchemes = [
    {
        id: 1,
        title: 'Mukhyamantri Gram Parivahan Yojana',
        description: 'Providing financial assistance to purchase vehicles to connect remote villages.',
        image: parivahan,
        link: 'https://state.bihar.gov.in/transport/', // temporary placeholder for missing link
    },
    {
        id: 2,
        title: 'Bihar Krishi Input Anudan Yojana',
        description: 'Financial aid to farmers for crop damage due to natural calamities.',
        image: krishi,
        link: 'https://dbtagriculture.bihar.gov.in/',
    },
    {
        id: 3,
        title: 'Post Matric Scholarship Scheme',
        description: 'Scholarships for students from Backward and Extremely Backward Classes for higher education.',
        image: sp,
        link: 'https://pmsonline.bihar.gov.in/',
    },
    {
        id: 4,
        title: 'Satat Jeevikoparjan Yojana',
        description: 'Livelihood support for ultra-poor households through skill-building and financial aid.',
        image: satat,
        link: 'https://brlps.in/Schemes',
    },
];

// Animation variants for the intro text
const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            duration: 0.8, 
            ease: "easeOut" 
        } 
    }
};

// Animation variants for the cards (staggered fade-in)
const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
        opacity: 1, 
        scale: 1, 
        transition: { 
            type: "spring", 
            stiffness: 100,
            damping: 15,
        } 
    }
};

// =======================================================
// AboutUs Component
// =======================================================
const AboutUs = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 }); // Only animate when it comes into view

    // Helper component for animated cards
    const AnimatedCard = ({ children }) => (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-full p-6 bg-white rounded-2xl shadow-xl border-l-4 border-emerald-500 transform transition-transform duration-300 hover:shadow-2xl flex flex-col items-center text-center"
        >
            {children}
        </motion.div>
    );

    // Helper component for animated links
    const AnimatedLinkCard = ({ scheme, index }) => {
        const linkRef = useRef(null);
        const linkInView = useInView(linkRef, { once: true, amount: 0.5 });

        return (
            <motion.a 
                ref={linkRef}
                href={scheme.link} 
                key={scheme.id} 
                target="_blank" 
                rel="noreferrer" 
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={linkInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered delay
            >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col transform hover:scale-[1.03] transition-transform duration-300">
                    <img src={scheme.image} alt={scheme.title} className="w-full h-32 object-cover" />
                    <div className="p-4 flex-grow">
                        {/* Card Title - Poppins for headings */}
                        <h4 className="text-base font-bold text-gray-800 mb-1 font-poppins">{scheme.title}</h4> 
                        {/* Card Description - Roboto for body text */}
                        <p className="text-gray-600 text-sm font-roboto">{scheme.description}</p>
                    </div>
                </div>
            </motion.a>
        );
    };


    return (
        <section className="py-16 bg-gradient-to-br from-teal-50 to-emerald-100">
            <div className="container mx-auto px-4 max-w-7xl">
                
                {/* Main Title - Poppins Font */}
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl md:text-3xl font-extrabold text-center text-gray-900 mb-8 drop-shadow-md font-poppins"
                >
                    About Bihar Government & Yuva Pragati
                </motion.h2>

                {/* Introduction Text - Roboto Font with animation on mount */}
                <motion.div 
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-lg text-gray-700 leading-relaxed mb-16 max-w-3xl mx-auto text-center font-roboto"
                >
                    <p>
                        The **Bihar Government** is dedicated to the holistic development and empowerment of its citizens, especially the youth. Through initiatives like **"Yuva Pragati,"** we strive to create a vibrant ecosystem that supports career growth, skill enhancement, and overall well-being. Our commitment is reflected in various welfare schemes designed to provide opportunities and uplift every section of society.
                    </p>
                </motion.div>

                {/* Vision and Mission Section - Animated block on scroll */}
                <div ref={ref} className="mb-20">
                    <motion.h3 
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center font-poppins"
                    >
                        Our Core Principles: Vision and Mission
                    </motion.h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        
                        {/* Our Vision Card - AnimatedCard */}
                        <AnimatedCard>
                            {/* Poppins for heading */}
                            <h4 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 w-full font-poppins border-emerald-300">Vision</h4>
                            {/* Lottie animation container */}
                            <div className="w-full max-w-[12rem] mx-auto p-2"> 
                                <Lottie 
                                    animationData={aboutAnimation} 
                                    loop={true} 
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </div>
                            {/* Roboto for body text */}
                            <p className="text-gray-700 text-base mt-4 font-roboto">
                                To realize an **Empowered Bihar** by fostering a **skilled, knowledgeable, and financially independent** youth population, contributing significantly to the state's economic and social progress.
                            </p>
                        </AnimatedCard>
                        
                        {/* Our Mission Card - AnimatedCard */}
                        <AnimatedCard>
                            {/* Poppins for heading */}
                            <h4 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 w-full font-poppins border-teal-300">Mission</h4>
                            {/* Lottie animation container */}
                            <div className="w-full max-w-[12rem] mx-auto p-2"> 
                                <Lottie 
                                    animationData={missionAnimation} 
                                    loop={true} 
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </div>
                            {/* Roboto for body text */}
                            <p className="text-gray-700 text-base mt-4 font-roboto">
                                To serve as a **comprehensive, single-point digital platform** providing transparent and efficient access to all government schemes, job opportunities, and educational resources for the youth of Bihar.
                            </p>
                        </AnimatedCard>
                        
                    </div>
                </div>
                
                {/* --- */}

                {/* Section Heading - Poppins Font */}
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 font-poppins">💰 Key Welfare Schemes</h2>

                {/* Key Welfare Schemes Grid (lg:grid-cols-5) */}
                <div className="mb-12">
                    {/* Sub-Title - Poppins Font */}
                    <h3 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6 font-poppins">
                        Pillar Schemes
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {welfareSchemes.map((scheme, index) => (
                            <AnimatedLinkCard key={scheme.id} scheme={scheme} index={index} />
                        ))}
                    </div>
                </div>

                {/* --- */}

                {/* Section Heading - Poppins Font */}
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 font-poppins">🤝 Other Welfare Schemes</h2>

                {/* Other Welfare Schemes Grid (lg:grid-cols-4) */}
                <div className="mb-12">
                    {/* Sub-Title - Poppins Font */}
                    <h3 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6 font-poppins">
                        Supplementary Schemes
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {moreWelfareSchemes.map((scheme, index) => (
                            <AnimatedLinkCard key={scheme.id} scheme={scheme} index={index} />
                        ))}
                    </div>
                </div>

                {/* --- */}

                {/* Section Heading - Poppins Font */}
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 font-poppins">🌐 Other Government Initiatives</h2>

                {/* Government Initiatives Grid - Matches the lg:grid-cols-4 layout */}
                <div className="mb-12">
                    {/* Sub-Title - Poppins Font */}
                    <h3 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6 font-poppins">
                        Sectoral Focus
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {governmentInitiatives.map((initiative, index) => (
                            <AnimatedLinkCard key={initiative.id} scheme={initiative} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;