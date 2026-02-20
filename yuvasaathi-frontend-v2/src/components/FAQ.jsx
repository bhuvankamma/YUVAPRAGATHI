import React, { useState } from 'react';
import { ChevronDown, HelpCircle, LayoutDashboard, Briefcase, GraduationCap } from 'lucide-react'; 
import Lottie from 'react-lottie-player';
import * as LottieData from '../assets/faq-animation.json';

// --- Configuration Data ---
const FAQ_CONTENT = [
    {
        title: "Account & Profile Management",
        icon: LayoutDashboard,
        items: [
            { question: "How do I update my profile information?", answer: "Go to your User Dashboard and select 'Edit Profile'. Ensure all sections, especially skills and contact details, are current." },
            { question: "I forgot my password. How can I reset it?", answer: "Click on the 'Login' link, then select 'Forgot Password' and follow the prompts to receive a reset link via email." },
            { question: "What is the benefit of verifying my profile?", answer: "Verified profiles are prioritized by employers and government schemes, increasing your visibility for jobs and program eligibility." },
        ]
    },
    {
        title: "Jobs & Opportunities",
        icon: Briefcase,
        items: [
            { question: "How are job listings curated?", answer: "We partner with verified employers and government bodies. All listings are screened to ensure compliance with fair employment practices." },
            { question: "Can I apply for multiple jobs?", answer: "Yes, you can apply for any job you meet the eligibility criteria for. Keep track of all your applications in your dashboard." },
            { question: "What should I do if a job post seems suspicious?", answer: "Immediately report the listing using the 'Report this Job' link on the job detail page. We investigate all suspicious activity promptly." },
        ]
    },
    {
        title: "Skills & Assessments",
        icon: GraduationCap,
        items: [
            { question: "Where can I find learning resources?", answer: "Visit the 'Learning Resources' page linked in the main menu to access free courses, certifications, and educational materials." },
            { question: "How do the skill assessments work?", answer: "Assessments are standardized tests designed by industry experts to evaluate your proficiency. A high score can be shared with potential employers." },
            { question: "Are the training programs free?", answer: "Many of the skill development programs offered through government schemes are free or heavily subsidized. Check the 'Scheme Section' for details." },
        ]
    }
];

// --- Component: FAQ Accordion Item ---
const AccordionItem = ({ item, isOpen, onClick, isDarkMode }) => {
    const headerClass = isOpen ? "bg-blue-600 text-white" : isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-200" : "bg-white hover:bg-gray-100 text-gray-800";
    const contentClass = isDarkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-700";
    const iconClass = isOpen ? "transform rotate-180" : "";

    return (
        <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
                className={`flex justify-between items-center w-full p-5 text-left font-semibold transition-all duration-300 ${headerClass}`}
                onClick={onClick}
                aria-expanded={isOpen}
            >
                {item.question}
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${iconClass}`} />
            </button>
            <div
                className={`overflow-hidden transition-max-height duration-500 ease-in-out ${contentClass}`}
                style={{ maxHeight: isOpen ? '500px' : '0' }}
            >
                <div className="p-5 pt-0">
                    <p>{item.answer}</p>
                </div>
            </div>
        </div>
    );
};

// --- Main Component: FAQ Page ---
const FAQ = ({ isDarkMode }) => {
    // State to manage the open/closed status of each FAQ item
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const containerClass = isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900";
    const titleClass = isDarkMode ? "text-blue-400" : "text-blue-700";
    const subTitleClass = isDarkMode ? "text-gray-300" : "text-gray-600";
    const sectionTitleClass = isDarkMode ? "text-green-400 border-gray-700" : "text-green-700 border-gray-200";

    return (
        <div className={`min-h-screen py-8 md:py-12 px-4 transition-colors duration-500 ${containerClass}`}>
            <div className="container mx-auto max-w-5xl">
                
                {/* Header Section with Lottie Animation */}
                <div className="flex flex-col md:flex-row items-center justify-between pb-8 md:pb-12 border-b border-gray-200 dark:border-gray-700 mb-8">
                    <div className="md:w-1/2 mb-6 md:mb-0">
                        <h1 className={`text-4xl md:text-5xl font-extrabold mb-3 tracking-tight ${titleClass}`}>
                            <span className="block text-2xl font-light mb-1">Got Questions?</span>
                            Frequently Asked Questions (FAQ)
                        </h1>
                        <p className={`text-sm md:text-base ${subTitleClass} leading-relaxed`}>
                            Your guide to navigating the YuvaSaathi portal, schemes, job listings, and skill programs. Find quick answers to common queries here.
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 h-40 md:h-60 flex justify-center items-center">
                         <Lottie
                            loop
                            animationData={LottieData} // <<--- USING LOCAL DATA
                            play
                            style={{ width: '100%', height: '100%', maxWidth: '300px' }}
                            rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
                            speed={0.8}
                        />
                    </div>
                </div>
                
                {/* Accordion Sections */}
                {FAQ_CONTENT.map((section, sectionIndex) => (
                    <div key={section.title} className="mb-10">
                        <div className={`flex items-center space-x-3 pb-3 mb-4 border-b ${sectionTitleClass}`}>
                            <section.icon className="w-6 h-6" />
                            <h2 className={`text-2xl font-bold`}>{section.title}</h2>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-xl">
                            {section.items.map((item, itemIndex) => {
                                const fullIndex = `${sectionIndex}-${itemIndex}`;
                                return (
                                    <AccordionItem
                                        key={fullIndex}
                                        item={item}
                                        isOpen={openIndex === fullIndex}
                                        onClick={() => toggleAccordion(fullIndex)}
                                        isDarkMode={isDarkMode}
                                    />
                                );
                            })}
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
    );
};

export default FAQ;