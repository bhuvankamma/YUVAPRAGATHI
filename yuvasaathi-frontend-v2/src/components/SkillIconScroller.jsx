// src/components/SkillIconScroller.jsx
import React from "react";
import {
    TrendingUp,
    Briefcase,
    BookOpen,
    Zap,
    Compass,
    IndianRupee,
    Truck,
    Users,
    Shield,
    Settings,
    Search,
    CheckCircle,
    MonitorPlay,
    Award,
    Star,
    Send,
    ArrowUp,
} from "lucide-react";

// --- Existing Data ---
const baseSkillDevPortals = [
    { name: "Skill India Mission", url: "https://www.skillindia.gov.in/", Icon: TrendingUp, desc: "National Skill Development Programs" },
    { name: "NCS Portal", url: "https://www.ncs.gov.in/", Icon: Briefcase, desc: "National Career Service" },
    { name: "PMKVY Scheme", url: "https://skillmissionbihar.org/", Icon: BookOpen, desc: "Skill Training & Certification" },
    { name: "Digital India", url: "https://www.digitalindia.gov.in/", Icon: Zap, desc: "Digital Government Services" },
    { name: "Bihar Skill Mission", url: "https://skillmissionbihar.org/", Icon: Compass, desc: "Bihar State Development Mission" },
    { name: "Saat Nishchay", url: "https://www.7nishchay-yuvaupmission.bihar.gov.in/", Icon: IndianRupee, desc: "Economic Resolution & Youth Power" },
    { name: "Mukhyamantri Udyami Yojna", url: "https://udyami.bihar.gov.in/", Icon: Truck, desc: "Entrepreneurship Promotion Scheme" },
    { name: "Student Credit Card", url: "https://www.7nishchay-yuvaupmission.bihar.gov.in/", Icon: Users, desc: "Education Loan Assistance" },
    { name: "Privacy Policy", url: "/privacy-policy", Icon: Shield, desc: "Data Protection & Security" },
    { name: "Grievance Redressal", url: "/grievance-policy", Icon: Settings, desc: "Official Support & Complaints" },
];

const skillDevPortals = [
    ...baseSkillDevPortals,
    // Note: Removed the map duplicate function for simplicity, 
    // as it creates console warnings when not using `p.name` as key.
    // Use an external CSS file for the marquee animation instead of inline <style> block for cleaner code.
    // For this example, I'll keep the duplicate data structure and just fix the key.
    ...baseSkillDevPortals.map((p, i) => ({ ...p, key: `dup-${i + baseSkillDevPortals.length}` })),
];

// --- Yuva Saathi Journey Steps (UPDATED) ---
const youthSaathiSteps = [
    { 
        title: "Find Course", 
        desc: "Use the filter and search tools to find a course that matches your interest and qualifications.", 
        Icon: Search,
        href: "/skills" // Navigates to skills section
    },
    { 
        title: "Register & Apply", 
        desc: "Complete registration and apply for your desired skill training center.", 
        Icon: CheckCircle,
        href: "/register" // Navigates to register page
    },
    { 
        title: "Start Training", 
        desc: "Begin your hands-on skill development journey at the training center.", 
        Icon: MonitorPlay,
        href: "/skills" // Navigates to skills section
    },
    // REMOVED: Get Certified
    // { title: "Get Certified", desc: "Complete assessments and earn a recognized certification.", Icon: Award },
    { 
        title: "Search Jobs", 
        desc: "Access personalized job recommendations from verified employers.", 
        Icon: Star,
        href: "/jobs" // Navigates to Jobs page
    },
    { 
        title: "Get Placed", 
        desc: "Secure placement and start your career for a better livelihood.", 
        Icon: Send,
        href: "#" // Placeholder for final placement link
    },
];

// --- Yuva Saathi Journey Component (FIXED FOR MOBILE/TABLET) ---
const YouthSaathiJourney = () => (
    <div className="container mx-auto px-4 mt-12 mb-8" style={{ background: "#ffffff" }}>
        <h2
            className="text-2xl md:text-3xl font-extrabold text-center mb-10"
            style={{
                color: "#1b365d",
                fontFamily: "Georgia, 'Times New Roman', serif",
                letterSpacing: "0.5px",
            }}
        >
            Yuva Pragati Journey: Towards Empowerment
        </h2>
        <p className="text-center text-gray-700 text-lg mb-12">
            **5 steps** towards better livelihood and skill development.
        </p>

        <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 justify-items-center">
            {youthSaathiSteps.map((step, index) => (
                // Use <a> tag for navigation, apply hover/focus styles for interaction
                <a 
                    key={index} 
                    href={step.href} 
                    className="flex flex-col items-center w-full max-w-[150px] text-center no-underline cursor-pointer transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg rounded-xl p-2" // Added styling for clickability
                    style={{ textDecoration: "none" }} // Ensure no underline
                >
                    <div
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            backgroundColor: "#ff9800",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 4px 10px rgba(255, 152, 0, 0.4)",
                            marginBottom: "16px", // Reduced margin for mobile
                        }}
                    >
                        <step.Icon size={40} style={{ color: "#ffffff" }} />
                    </div>
                    <div
                        style={{
                            fontSize: "1rem", // Slightly smaller font for mobile
                            fontWeight: 700,
                            color: "#1b365d",
                            marginBottom: "4px", // Reduced margin
                        }}
                    >
                        {step.title}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 px-1">
                        {step.desc}
                    </p>
                </a>
            ))}
        </div>
        
    </div>
);

// --- Main Component ---
const SkillIconScroller = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section
            aria-label="Skill & Job Section"
            className="w-full relative z-10"
            style={{
                background: "#ffffff",
                paddingTop: "36px",
                paddingBottom: "36px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
        >
            <YouthSaathiJourney />

            <div className="container mx-auto px-4">
                <hr style={{ borderTop: "1px solid #e0e0e0", margin: "40px 0" }} />
            </div>

            <div
                className="w-full relative py-6"
                style={{
                    background: "linear-gradient(to top, #fff7ed 0%, #ffffff 100%)",
                }}
            >
                <div className="container mx-auto px-4 relative mb-6">
                    <h2
                        className="text-xl md:text-2xl font-extrabold text-center mb-6"
                        style={{
                            color: "#1b365d",
                            fontFamily: "Georgia, 'Times New Roman', serif",
                        }}
                    >
                        Connect to the{" "}
                        <span style={{ color: "#e67e22" }}>Ecosystem</span>: Key Schemes & Digital Gateways
                    </h2>
                </div>

                <div
                    className="w-full overflow-hidden py-4"
                    style={{
                        borderTop: "1px solid rgba(0,0,0,0.06)",
                        borderBottom: "1px solid rgba(0,0,0,0.06)",
                    }}
                >
                    <style>{`
                        @keyframes marqueeScrollSlow {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }

                        .scroller-content-pro-new {
                            display: flex;
                            width: 200%;
                            animation: marqueeScrollSlow 55s linear infinite;
                            align-items: center;
                            gap: 14px;
                        }

                        .scroller-item-pro-new {
                            flex-shrink: 0;
                            /* FIX: Changed from fixed width to a slightly smaller fixed width 
                                and added a media query for better mobile handling. */
                            width: 160px; 
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            text-align: center;
                            gap: 6px;
                        }

                        .scroller-content-pro-new:hover {
                            animation-play-state: paused;
                        }

                        @media (max-width: 640px) {
                            .scroller-item-pro-new { width: 120px; } /* Smaller item width for tiny screens */
                            /* Speed up marquee scroll slightly for smaller screens since there are fewer pixels to scroll */
                            .scroller-content-pro-new { animation-duration: 45s; } 
                        }
                    `}</style>

                    <div className="scroller-content-pro-new px-4">
                        {skillDevPortals.map((portal, index) => {
                            const Icon = portal.Icon;
                            return (
                                <a
                                    key={portal.key || index}
                                    href={portal.url}
                                    target={portal.url.startsWith("/") ? "_self" : "_blank"}
                                    rel={portal.url.startsWith("/") ? undefined : "noopener noreferrer"}
                                    title={portal.desc}
                                    className="scroller-item-pro-new rounded-md transition-all duration-300 hover:translate-y-[-3px]"
                                    style={{ textDecoration: "none" }}
                                >
                                    <div
                                        style={{
                                            width: 64,
                                            height: 64,
                                            borderRadius: 9999,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background: "#ffffff",
                                            border: "3px solid #fff",
                                            boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                                        }}
                                    >
                                        <Icon size={30} style={{ color: "#1b365d" }} />
                                    </div>
                                    <div style={{ marginTop: 6 }}>
                                        <div
                                            style={{
                                                fontSize: 13,
                                                fontWeight: 600,
                                                color: "#1b365d",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                /* FIX: Reduced max-width for smaller screens in the name element */
                                                maxWidth: 140, 
                                            }}
                                        >
                                            {portal.name}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: 11,
                                                color: "#333",
                                                opacity: 0.85,
                                                marginTop: 4,
                                            }}
                                        >
                                            {portal.desc}
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className="fixed bottom-8 left-8 p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none z-50"
                style={{ backgroundColor: "#ff9800", color: "white" }}
                aria-label="Scroll to top"
            >
                <ArrowUp size={24} />
            </button>
        </section>
    );
};

export default SkillIconScroller;