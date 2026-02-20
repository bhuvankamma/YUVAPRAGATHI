// src/components/LearningResourcesPage.jsx
import React from 'react';
import LegalPageLayout from './LegalPageLayout'; 
import { Briefcase, BookOpen, Layers, Laptop, MessageCircle, DollarSign, ArrowRight } from 'lucide-react';

// --- Resource Data (No change needed here, as the content is correct) ---
const learningResources = [
    { 
        title: "Skill Development Modules", 
        description: "Access curated content on trade skills, technical training, and industry best practices. Links to PMKVY and Sector Skill Councils.", 
        icon: BookOpen, 
        color: "bg-blue-100 text-blue-800 border-blue-500", 
        link: "/learning/skills"
    },
    { 
        title: "Interview Preparation Guides", 
        description: "Master soft skills, behavioral questions, and resume writing. Includes mock interview simulations and video tutorials.", 
        icon: Briefcase, 
        color: "bg-green-100 text-green-800 border-green-500", 
        link: "/learning/interviews"
    },
    { 
        title: "Bihar Government Schemes", 
        description: "Detailed guides on eligibility, application process, and benefits for state-specific schemes like Saat Nishchay and Udyami Yojna.", 
        icon: Layers, 
        color: "bg-teal-100 text-teal-800 border-teal-500", 
        link: "/learning/schemes"
    },
    { 
        title: "Digital & Financial Literacy", 
        description: "Learn about UPI, Digital Safety, using DigiLocker, and basic financial planning essential for modern employment.", 
        icon: Laptop, 
        color: "bg-yellow-100 text-yellow-800 border-yellow-500", 
        link: "/learning/digital"
    },
    { 
        title: "Career Counselling Webinars", 
        description: "Schedule access to live and archived webinars conducted by industry experts and government career advisors.", 
        icon: MessageCircle, 
        color: "bg-purple-100 text-purple-800 border-purple-500", 
        link: "/learning/webinars"
    },
    { 
        title: "Entrepreneurship Funding", 
        description: "Information on seed funding, grants, and loan assistance programs available to young entrepreneurs in the state.", 
        icon: DollarSign, 
        color: "bg-red-100 text-red-800 border-red-500", 
        link: "/learning/funding"
    },
];

// --- Resource Card Component (FIXED for No-Navigation) ---
const ResourceCard = ({ title, description, icon: Icon, color, link }) => {

    // 🚨 FIX APPLIED: Using a div instead of an <a> tag and adding an onClick handler to prevent navigation.
    const handleClick = (e) => {
        e.preventDefault();
        console.log(`Navigation prevented for: ${title}`);
        // Optionally, you could show an alert or a message here:
        // alert(`The content for "${title}" is currently unavailable.`);
    };

    return (
        <div 
            onClick={handleClick} 
            // The visual styles are applied to the div, making it look and feel like a clickable link
            className={`p-6 rounded-xl shadow-lg border-b-4 ${color} transition-all duration-330 hover:shadow-2xl hover:scale-[1.02] dark:bg-slate-800/80 dark:border-b-4 dark:hover:bg-slate-700/80 group flex flex-col justify-between cursor-pointer`} // Added cursor-pointer
            role="button" // Accessibility role to indicate it's interactive
            tabIndex={0} // Makes it focusable
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleClick(e);
                }
            }}
        >
            <div className="flex items-start space-x-4 mb-4">
                <div className={`p-3 rounded-full ${color.replace('100', '200').replace('-800', '-900')}`}>
                    <Icon size={28} className={`${color.split(' ')[1]} group-hover:rotate-6 transition-transform duration-500`} />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-50 leading-tight group-hover:underline">
                    {title}
                </h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow mb-4">
                {description}
            </p>
            
            <div className="flex items-center text-sm font-semibold mt-2">
                <span className={`${color.split(' ')[1]} flex items-center`}>
                    Explore Content 
                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
            </div>
        </div>
    );
};

// --- Main Page Component (FIXED Title) ---
const LearningResourcesPage = () => {
    return (
        <LegalPageLayout
            // 🚨 FIX APPLIED: Ensuring the title is concise "Digital Learning Resources"
            title="Digital Learning Resources"
            subtitle="Your gateway to free skill development, career guidance, and government scheme awareness."
            lastUpdated="November 1, 2025"
        >
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 border-l-4 border-teal-500 pl-4 py-2 bg-teal-50/50 dark:bg-slate-800/50">
                The Yuva Saathi platform provides curated, high-quality digital resources to empower users. Click on any module below to begin your learning journey.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningResources.map((resource, index) => (
                    // ResourceCard now prevents navigation internally
                    <ResourceCard key={index} {...resource} />
                ))}
            </div>

            <div className="mt-12 p-6 bg-gray-100 dark:bg-slate-700 rounded-xl shadow-inner">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Feedback Welcome</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                    If you encounter any broken links or wish to suggest new content, please use the <a href="/contact-us" className="text-teal-600 font-semibold hover:underline">Grievance Redressal link</a> provided in the footer.
                </p>
            </div>

        </LegalPageLayout>
    );
};

export default LearningResourcesPage;