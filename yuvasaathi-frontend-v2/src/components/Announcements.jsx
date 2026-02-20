import React, { useRef, useState, useEffect } from "react";
import {
    Briefcase, Zap, Bell, Users, Building, CheckCircle, Truck, ChevronDown, ChevronUp
} from "lucide-react";

// =================================================================
// 0. CUSTOM HOOK FOR REPEATING SCROLL DETECTION (Required for paragraph animation)
// =================================================================

/**
 * Custom hook to detect when an element is in the viewport, triggering repeated animation.
 * @param {object} ref - React ref object attached to the target element.
 * @param {number} threshold - Percentage of the target element visible to trigger the callback.
 * @returns {boolean} isInView - True if the element is currently visible.
 */
const useInView = (ref, threshold = 0.1) => {
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Set isInView to the current intersection state for repeating animation
                setIsInView(entry.isIntersecting);
            },
            { threshold: threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        // Cleanup function
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, threshold]);

    return isInView;
};


// =================================================================
// 1. DATA DEFINITIONS
// =================================================================

// Bihar Stats Data (Reduced size/weight implemented)
const statData = [
    { icon: Users, title: "Total Certified Learners", value: "25,00,000", color: "#1E9A4B" },
    { icon: Building, title: "Operational Centers", value: "3,500", color: "#FF9800" },
    { icon: CheckCircle, title: "Total Admissions", value: "35,00,000", color: "#1B365D" },
    { icon: Truck, title: "Placement Drives Held", value: "450+", color: "#E67E22" },
];

// Announcement Data
const announcementsData = [
    // Updated order and structure based on the request (only the first 6 are unique)
    { type: "event", date: "26th September 2025", title: "New Job Fair Registration Open.", desc: "All registered candidates are advised to check the new job fair dates in Patna.", isNew: true },
    { type: "job", date: "19th September 2025", title: "PMKVY Skill Training Slot Allocation", desc: "New training slots available for ITI and basic digital literacy courses.", isNew: false },
    { type: "skill", date: "26th August 2025", title: "eBSDM/KYP/Patrahar-182/2023-1950 Date-25.08.2025", desc: "Official memo regarding the change in certification process for KYP.", isNew: true },
    { type: "event", date: "10th August 2025", title: "Private Sector Job Drive in Gaya", desc: "Recruitment drive for 500+ vacancies in manufacturing sector.", isNew: false },
    { type: "job", date: "13th June 2025", title: "Orientation on BS-CFA for Learning Coordinators", desc: "Event held at Niyojan Bhavan for BS-CFA program leads.", isNew: false },
    { type: "event", date: "1st June 2025", title: "Bihar Day Celebrations & Skill Showcase", desc: "State-level event highlighting successful trainees and entrepreneurs.", isNew: true },
    
    // Duplicated for scrolling effect (using the original data)
    { type: "event", date: "26th September 2025", title: "New Job Fair Registration Open.", desc: "All registered candidates are advised to check the new job fair dates in Patna.", isNew: true },
    { type: "job", date: "19th September 2025", title: "PMKVY Skill Training Slot Allocation", desc: "New training slots available for ITI and basic digital literacy courses.", isNew: false },
    { type: "skill", date: "26th August 2025", title: "eBSDM/KYP/Patrahar-182/2023-1950 Date-25.08.2025", desc: "Official memo regarding the change in certification process for KYP.", isNew: true },
    { type: "event", date: "10th August 2025", title: "Private Sector Job Drive in Gaya", desc: "Recruitment drive for 500+ vacancies in manufacturing sector.", isNew: false },
    { type: "job", date: "13th June 2025", title: "Orientation on BS-CFA for Learning Coordinators", desc: "Event held at Niyojan Bhavan for BS-CFA program leads.", isNew: false },
    { type: "event", date: "1st June 2025", title: "Bihar Day Celebrations & Skill Showcase", desc: "State-level event highlighting successful trainees and entrepreneurs.", isNew: true },
];

const scrollingAnnouncements = [...announcementsData]; // Use the full set

// Expanded Paragraph Content - ADDED 4 NEW ITEMS HERE
const slidingParagraphsData = [
    { title: "Welcome to Yuva Pragati Platform", content: "This digital gateway is Bihar's commitment to youth empowerment. Discover certified training programs and direct placement opportunities across the state. Your future begins here." },
    { title: "Skill Development Mandate", content: "Our core mission is to bridge the skill gap by providing world-class, government-certified training. Focus areas include IT, manufacturing, and service sectors essential for economic growth." },
    { title: "Job Placement Assurance", content: "We facilitate direct interviews and job fairs with verified industry partners. Ensure your profile is updated to access personalized job recommendations aligned with your training." },
    { title: "Bihar's Vision for Youth", content: "Aligned with the Saat Nishchay, Yuva Saathi aims to make every youth self-reliant through education and skill. We are building a skilled nation, one learner at a time." },
    { title: "Explore Top Courses", content: "Find courses in fields like software development, retail management, logistics, and electronics. All programs lead to recognized certifications, boosting your employability." },
    { title: "A Decade of Excellence", content: "Celebrating ten years of dedicated service, we continue to evolve our curriculum to meet dynamic industry demands. Join a legacy of successful professionals." },
    { title: "Training Center Network", content: "With thousands of operational centers across all 38 districts, quality skill training is accessible right in your locality. Find your nearest centre today." },
    { title: "Digital Literacy Push", content: "Emphasizing digital empowerment, our programs ensure every youth is equipped with essential computer and internet skills vital for the modern job market." },
    
    // --- NEW CONTENT ADDED BELOW ---
    { title: "KYP Program Overview", content: "The Bihar Skill Development Mission (BSDM) provides the Bihar Skill Development Program (KYP), offering essential computer, communication, and soft skills training to empower youth for better employment prospects across various sectors." },
    { title: "Financial Aid Schemes", content: "Learn about the student credit card scheme, self-help allowance, and other government financial support initiatives available to ease the financial burden of education and skill training for eligible students in Bihar." },
    { title: "Industry Partnership Focus", content: "We collaborate with over 200 leading national and multinational companies to ensure our training content is current and relevant, guaranteeing trainees gain skills directly sought by the industry." },
    { title: "Quality Certification Process", content: "All courses lead to a nationally recognized certification, achieved through standardized testing and assessment conducted by accredited bodies, ensuring the quality and validity of your skills." },
    // --- END NEW CONTENT ---
];

// Static News & Events Content
const newsAndEventsContent = {
    title: "News & Events",
    detail: "13th June 2025: Orientation on BS-CFA for Learning Coordinators - LF & Center Coordinator / Owner of BS-CFA SDC held on 13.06.2025 at Niyojan Bhavan."
};


// =================================================================
// 2. SIDEBAR COMPONENTS (Stats & Announcements)
// =================================================================

// Helper Component for Stats Box 
const StatBox = ({ icon: Icon, title, value, color }) => (
    <div 
        style={{ 
            backgroundColor: color, color: 'white', borderRadius: '6px', 
            padding: '8px 12px', marginBottom: '6px', 
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', textAlign: 'left',
            // --- FONT UPDATE: Verdana for sidebar/stats ---
            fontFamily: 'Verdana, Roboto, Arial, sans-serif'
        }}
    >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3px' }}>
            <Icon size={16} style={{ marginRight: '6px' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>{title}</span>
        </div>
        <div style={{ fontSize: '1.3rem', fontWeight: 600 }}>{value}</div>
    </div>
);

// Component for Bihar Statistics
const BiharStatsSection = () => {
    return (
        <div style={{ padding: '0 0 20px 0' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '15px', color: '#1B365D', fontFamily: 'Poppins, Roboto, sans-serif' }}>
                Key Figures
            </h3>
            {statData.map((stat, index) => (
                <StatBox key={index} {...stat} />
            ))}
        </div>
    );
};

// Component for News & Events
const NewsEventsSection = () => {
    return (
        <div 
            style={{ 
                backgroundColor: '#1B365D', // Changed color for visual separation
                borderRadius: '8px', color: 'white',
                padding: '15px 20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                marginBottom: '20px',
                fontFamily: 'Verdana, Roboto, Arial, sans-serif'
            }}
        >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '15px' }}>
                {newsAndEventsContent.title}
            </h3>
            <p style={{ fontSize: '0.8rem', lineHeight: 1.5, opacity: 0.9 }}>
                {newsAndEventsContent.detail}
            </p>
        </div>
    );
};

// Component for Scrolling Announcements
const AnnouncementScroller = () => {
    const getIcon = (type) => {
        switch (type) {
            case 'job': return <Briefcase size={16} style={{ color: '#fff' }} />;
            case 'skill': return <Zap size={16} style={{ color: '#fff' }} />;
            case 'event': default: return <Bell size={16} style={{ color: '#fff' }} />;
        }
    };

    return (
        <div style={{ padding: '0 0 20px 0' }}>
            {/* --- NEW HEADING: Announcements & Notifications --- */}
            <h3 style={{ fontSize: '1.0rem', fontWeight: 700, marginBottom: '10px', color: '#1B365D', fontFamily: 'Poppins, Roboto, sans-serif' }}>
                Announcements & Notifications
            </h3>

            {/* --- Announcement Box (Scrolling Content) --- */}
            <div 
                style={{ 
                    backgroundColor: '#1E9A4B', borderRadius: '8px', color: 'white',
                    marginBottom: '20px', padding: '15px 20px', height: '350px',
                    overflow: 'hidden', position: 'relative', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
            >
                <style>{`
                    @keyframes verticalMarquee { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
                    .announcement-list-vertical {
                        display: flex; flex-direction: column;
                        animation: verticalMarquee 60s linear infinite; 
                        height: auto; 
                        padding-top: 10px;
                    }
                    .announcement-item-vertical {
                        padding-bottom: 12px; margin-bottom: 12px;
                        border-bottom: 1px dashed rgba(255, 255, 255, 0.3);
                        flex-shrink: 0; width: 100%; 
                        /* --- FONT UPDATE: Verdana for sidebar/announcements --- */
                        font-family: Verdana, Roboto, Arial, sans-serif;
                    }
                    .announcement-item-vertical:last-child { border-bottom: none; }
                `}</style>

                <div className="announcement-list-vertical">
                    {scrollingAnnouncements.map((item, index) => (
                        <div key={index} className="announcement-item-vertical">
                            <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '5px', fontWeight: 400 }}>
                                {item.date}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ marginRight: '8px', paddingTop: '2px' }}>
                                    {getIcon(item.type)}
                                </span>
                                <span style={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.4 }}>
                                    {item.title}
                                    {item.isNew && (
                                        <span 
                                            style={{ 
                                                fontSize: '0.6rem', backgroundColor: '#ff9800', 
                                                padding: '1px 5px', borderRadius: '3px', 
                                                marginLeft: '6px', verticalAlign: 'top', fontWeight: 700
                                            }}
                                        >
                                            NEW
                                        </span>
                                    )}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


// =================================================================
// 3. MAIN CONTENT COMPONENTS (Collapsible Paragraphs)
// =================================================================

/**
 * Component for a single collapsible paragraph item (Accordion functionality)
 */
const CollapsibleParagraph = ({ title, content, delay }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div 
            className="paragraph-item-animated"
            style={{ 
                marginBottom: '10px', 
                border: '1px solid #e0e0e0', 
                borderRadius: '4px',
                overflow: 'hidden',
                animationDelay: `${delay}s`,
                // --- FONT UPDATE: Poppins/Roboto for main content titles ---
                fontFamily: 'Poppins, Roboto, sans-serif'
            }}
        >
            <div 
                onClick={toggleOpen} 
                style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '12px 15px', 
                    cursor: 'pointer', 
                    backgroundColor: '#f7f7f7',
                    borderBottom: isOpen ? '1px solid #e0e0e0' : 'none',
                    fontWeight: 600, 
                    color: '#1B365D',
                    fontSize: '0.9rem',
                }}
            >
                {title}
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            
            <div 
                style={{
                    maxHeight: isOpen ? '500px' : '0', // Adjust max-height for smooth transition
                    transition: 'max-height 0.4s ease-in-out',
                    overflow: 'hidden',
                    padding: isOpen ? '15px' : '0 15px',
                    // --- FONT UPDATE: Roboto for paragraph content ---
                    fontFamily: 'Roboto, Poppins, sans-serif'
                }}
            >
                <p style={{ 
                    fontSize: '0.85rem', 
                    lineHeight: 1.5, 
                    color: '#333',
                    // Remove top/bottom padding when closed
                    padding: isOpen ? '0' : '0', 
                    opacity: isOpen ? 1 : 0,
                    transition: 'opacity 0.2s ease-in-out'
                }}>
                    {content}
                </p>
            </div>
        </div>
    );
};


// Component for Sliding Paragraphs (REPEATING ANIMATION LOGIC)
const SlidingParagraphs = ({ isVisible }) => {
    
    // Calculate the total number of items to adjust animation delays correctly
    const totalItems = slidingParagraphsData.length;

    return (
        <div 
            style={{ 
                padding: '20px', 
                backgroundColor: '#ffffff', 
                borderRadius: '6px',
                border: '1px solid #e0e0e0',
                marginBottom: '20px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                // --- FONT UPDATE: Poppins/Roboto/Verdana fallback for container ---
                fontFamily: 'Poppins, Roboto, Verdana, sans-serif',
                overflow: 'hidden'
            }}
        >
            <style>{`
                @keyframes slideDownToUp {
                    0% { opacity: 0; transform: translateY(50px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .paragraph-item-animated {
                    opacity: 0; 
                }
                .paragraph-item-animated:last-child {
                    margin-bottom: 0;
                }
                
                /* Animation delays applied only when visible for repeating effect */
                ${isVisible ? 
                    slidingParagraphsData.map((_, index) => (
                        `.paragraph-item-animated:nth-child(${index + 1}) { 
                            animation: slideDownToUp 0.6s ease-out forwards; 
                            animation-delay: ${(index + 1) * 0.1}s; 
                        }`
                    )).join('\n')
                : ''}
            `}</style>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1B365D', marginBottom: '20px', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>
                Key Initiatives & Information
            </h2>

            <div className="paragraph-container">
                {slidingParagraphsData.map((item, index) => (
                    // Use the new CollapsibleParagraph component
                    <CollapsibleParagraph 
                        key={index} 
                        title={item.title} 
                        content={item.content}
                        delay={(index + 1) * 0.1} // Pass animation delay
                    />
                ))}
            </div>
        </div>
    );
};


// =================================================================
// 4. MAIN EXPORT COMPONENT (Combines the requested sections)
// =================================================================

const AnnouncementsAndSlidingContent = () => {
    const sectionRef = useRef(null);
    // Use the hook to track visibility for repeating animation
    const isInView = useInView(sectionRef);

    return (
        <section
            aria-label="Content and Announcements Section"
            className="w-full relative z-10"
            ref={sectionRef} // Attach ref for scroll detection
            style={{
                background: "#ffffff",
                paddingTop: "36px",
                paddingBottom: "36px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                // --- Global Font Fallback: Use Poppins/Roboto/Verdana
                fontFamily: 'Poppins, Roboto, Verdana, sans-serif'
            }}
        >
            {/* --- Media Query Styles for Responsiveness --- */}
            <style>{`
                /* Styles for the main container on all screen sizes */
                .responsive-container {
                    display: flex;
                    flex-direction: column; /* Default: Stack vertically on mobile */
                    gap: 20px;
                    max-width: 1200px; 
                    margin: 0 auto;
                    padding: 0 20px; 
                }

                /* Styles for the two columns (content and sidebar) on all screen sizes */
                .content-column, .sidebar-column {
                    width: 100%; /* Default: Full width on mobile */
                }

                /* Media Query for Tablets and Desktops (e.g., min-width: 768px) */
                @media (min-width: 768px) {
                    .responsive-container {
                        flex-direction: row; /* Switch to side-by-side */
                        flex-wrap: nowrap;
                        align-items: flex-start; /* Align content to the top */
                    }
                    
                    /* Left Column (Sliding Paragraphs) */
                    .content-column {
                        flex: 3; /* Take up more space */
                        max-width: 70%;
                    }

                    /* Right Column (Sidebar: Stats and Announcements) */
                    .sidebar-column {
                        flex: 1; /* Take up less space */
                        min-width: 300px;
                        max-width: 350px;
                        order: 2; /* Keep it on the right */
                    }
                }
            `}</style>
            {/* --- End of Media Query Styles --- */}

            <div className="responsive-container">
                {/* Left Column (Collapsible Paragraphs) */}
                <div className="content-column">
                    {/* Pass the repeating visibility state to trigger the animation */}
                    <SlidingParagraphs isVisible={isInView} /> 
                </div>

                {/* Right Column (Sidebar: Announcements, News, then Stats) */}
                <div className="sidebar-column">
                    {/* 1. Announcements (Scrolling) with NEW Heading */}
                    <AnnouncementScroller />
                    
                    {/* 2. News & Events (Static) */}
                    <NewsEventsSection />

                    {/* 3. Stats (Fixed Numbers) */}
                    <BiharStatsSection />
                </div>
            </div>
        </section>
    );
};

export default AnnouncementsAndSlidingContent;