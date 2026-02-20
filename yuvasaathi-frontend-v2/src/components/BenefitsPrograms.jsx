import React, { useState } from "react";
import { GraduationCap, Briefcase, Users, Home, HeartPulse, ChevronRight, ExternalLink } from "lucide-react";

// 🚨 SIMPLE MODAL COMPONENT (Temporary replacement for external Dialog)
const SimpleModal = ({ open, onOpenChange, title, description, children }) => {
    if (!open) return null;

    // --- FONT UPDATE: Added Poppins, Roboto to modal
    const modalFont = { fontFamily: 'Poppins, Roboto, sans-serif' };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in" 
            onClick={onOpenChange}
        >
            <div 
                className="bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 animate-in zoom-in-95 slide-in-from-bottom-2"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                style={modalFont} // Apply font style here
            >
                {/* Modal Header */}
                <div className="p-5 border-b sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-extrabold text-[hsl(220,70%,50%)]">{title}</h2>
                    <p className="text-sm mt-1 text-gray-500">{description}</p>
                </div>
                
                {/* Modal Body */}
                <div className="p-5">
                    {children}
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t flex justify-end sticky bottom-0 bg-white z-10">
                    <button 
                        onClick={onOpenChange} 
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                    >
                        Close Details
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Scheme Data (Categorized) ---
const programs = [
    {
        title: "Education & Scholarship",
        subtitle: "Student Programs",
        count: "10+",
        icon: GraduationCap,
        colorClass: "text-[hsl(220,70%,50%)]", 
        // Light blue background for the icon section
        bgClass: "bg-[hsl(220,70%,95%)]", 
        description: "Financial and academic support for students from KG to PG across all communities.",
        redirectLink: "https://pmsonline.bihar.gov.in/", 
        details: [
            { name: "Bihar Student Credit Card Yojana", benefit: "Loan up to ₹4 Lakh for higher education." },
            { name: "Mukhyamantri Balika Poshak Yojana", benefit: "Financial aid for school uniforms." },
            { name: "Mukhyamantri Medhavriti Yojana", benefit: "Scholarship for meritorious SC/ST/EBC students." },
            { name: "Kushal Yuva Program (KYP)", benefit: "Free soft skills and computer training." },
        ],
    },
    {
        title: "Employment & Self-Employment",
        subtitle: "Job & Business Support",
        count: "8+",
        icon: Briefcase,
        colorClass: "text-[hsl(120,60%,40%)]", 
        // Light green background for the icon section
        bgClass: "bg-[hsl(120,60%,95%)]", 
        description: "Incentives and loans to promote entrepreneurship and provide job opportunities for the youth.",
        redirectLink: "https://udyami.bihar.gov.in/", 
        details: [
            { name: "Mukhyamantri Udyami Yojana", benefit: "Up to ₹10 Lakh for setting up a new business." },
            { name: "Mukhyamantri Nishchay Swayam Sahayata Bhatta Yojna", benefit: "₹1000/month for unemployed youth (20-25 yrs)." },
            { name: "Mukhyamantri Shramshakti Yojana (Minority)", benefit: "Vocational training and self-employment loans." },
            { name: "Mukhyamantri Prakhand Parivahan Yojana", benefit: "Subsidy for purchasing buses for transport." },
        ],
    },
    {
        title: "Social & Welfare",
        subtitle: "Empowerment Programs",
        count: "15+",
        icon: Users,
        colorClass: "text-[hsl(30,80%,55%)]", 
        // Light orange background for the icon section
        bgClass: "bg-[hsl(30,80%,95%)]", 
        description: "Schemes for the social and economic upliftment of disadvantaged groups, women, and the elderly.",
        redirectLink: "https://state.bihar.gov.in/socialwelfare/", 
        details: [
            { name: "Mukhyamantri Kanya Utthan Yojana", benefit: "Financial assistance from birth to graduation for girls." },
            { name: "Satat Jeevikoparjan Yojana (SJY)", benefit: "Livelihood support for ultra-poor households." },
            { name: "Civil Seva Protsahan Yojana", benefit: "Financial incentive for clearing UPSC/BPSC Prelims (BC/EBC)." },
            { name: "Social Security Pension Schemes", benefit: "Pension for elderly, widows, and persons with disabilities." },
        ],
    },
    {
        title: "Agriculture & Rural Dev.",
        subtitle: "Farming & Infrastructure",
        count: "20+",
        icon: Home, 
        colorClass: "text-[hsl(60,70%,45%)]", 
        // Light yellow-green background for the icon section
        bgClass: "bg-[hsl(60,70%,95%)]", 
        description: "Support for farmers, crop insurance, and development of rural infrastructure like water and roads.",
        redirectLink: "https://dbt.bihar.gov.in/wp/SchemeList.aspx", 
        details: [
            { name: "Bihar Rajya Fasal Sahayata Yojana", benefit: "Crop assistance/insurance for farmers." },
            { name: "Bihar Diesel Anudan Scheme", benefit: "Subsidy for diesel used in irrigation." },
            { name: "Mukhyamantri Gramin Peyjal Nishchay Yojana", benefit: "Providing pure drinking water to rural households." },
            { name: "Makhana Vikas Yojana", benefit: "Subsidy and training for Makhana cultivation." },
        ],
    },
    {
        title: "Health & Public Services",
        subtitle: "Public Health Mission",
        count: "5+",
        icon: HeartPulse,
        colorClass: "text-[hsl(350,70%,50%)]", 
        // Light red background for the icon section
        bgClass: "bg-[hsl(350,70%,95%)]", 
        description: "Government initiatives for public health, medical assistance, and essential service delivery.",
        redirectLink: "https://state.bihar.gov.in/health/", 
        details: [
            { name: "Chief Minister Kishori Health Program", benefit: "Financial aid for adolescent girls' health." },
            { name: "Bihar Sampoorn Tikaran Yojna", benefit: "Comprehensive immunization coverage." },
            { name: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PMJAY)", benefit: "₹5 Lakh health cover for eligible families." },
            { name: "Mukhyamantri Vahan Chalak Kalyan Yojana", benefit: "Welfare scheme for drivers (Health Insurance/Pension)." },
        ],
    },
    {
        title: "Housing & Shelter",
        subtitle: "Residential Schemes",
        count: "3+",
        icon: Home,
        colorClass: "text-[hsl(10,80%,60%)]", 
        // Light red-orange background for the icon section
        bgClass: "bg-[hsl(10,80%,95%)]", 
        description: "Schemes to provide safe and secure housing facilities, especially for rural and poor families.",
        redirectLink: "https://www.myscheme.gov.in/search/state/Bihar?q=housing", 
        details: [
            { name: "Mukhyamantri Gramin Awas Yojana", benefit: "Financial aid for building/reconstructing houses in rural areas." },
            { name: "Pradhan Mantri Awas Yojana - Gramin (PMAY-G)", benefit: "Central and State assistance for 'Pucca' houses." },
            { name: "Mukhyamantri Shehri Awas Yojana", benefit: "Housing assistance for eligible urban poor families." },
        ],
    },
];
// --- End of Scheme Data ---


const RedirectLink = ({ url, label }) => (
    <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-flex items-center text-[hsl(220,70%,50%)] hover:text-[hsl(220,70%,50%)/0.8] transition-colors font-semibold mt-4 text-sm"
        // --- FONT UPDATE: Added Poppins, Roboto
        style={{ fontFamily: 'Roboto, Poppins, sans-serif' }}
    >
        {label} <ExternalLink size={16} className="ml-1" />
    </a>
);

// Card Component with Font and Animation Updates
const SchemeCard = ({ item, index, onClick }) => {
    const Icon = item.icon;

    // We'll create a hover background effect using a light opacity on the main color
    const hoverAccentBgClass = item.colorClass.replace('text-', 'bg-') + '/0.15';
    const accentBorderClass = item.colorClass.replace('text-', 'border-');
    const accentColorClass = item.colorClass;

    return (
        <div
            key={index}
            onClick={() => onClick(item)}
            // --- ANIMATION REMOVAL & FONT UPDATE: Removed slide-in/fade-in classes and added font style
            className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 cursor-pointer transition-all duration-500 shadow-sm 
                        hover:shadow-lg hover:ring-2 hover:ring-offset-2 hover:ring-[hsl(220,70%,50%)/0.3] hover:scale-[1.02] hover:-translate-y-0.5"
            // Removed inline style animationDelay
            style={{ fontFamily: 'Poppins, Roboto, sans-serif' }}
        >
            {/* Count Badge - Top Right Corner */}
            <div className="absolute top-0 right-0 bg-gradient-to-br from-green-500 to-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-bl-lg shadow-md z-10 transition-transform group-hover:scale-105">
                {item.count}
            </div>

            <div className="flex">
                {/* Icon Section - Left Side with unique, visible light color background */}
                <div className={`w-20 flex flex-col items-center justify-center py-4 ${item.bgClass} border-r-2 ${accentBorderClass} transition-all duration-300 group-hover:${hoverAccentBgClass}`}>
                    <Icon size={32} className={`transition-transform duration-300 group-hover:scale-110 ${accentColorClass}`} strokeWidth={2.5} />
                    <span className="text-[10px] font-medium mt-1 opacity-70 text-gray-600">Schemes</span>
                </div>

                {/* Content Section - Right Side */}
                <div className="flex-1 py-3 pr-14 pl-4"> 
                    <h4 className="text-lg font-bold text-gray-900 mb-0.5 group-hover:text-[hsl(220,70%,50%)] transition-colors leading-tight">
                        {item.title}
                    </h4>
                    <p className="text-xs font-semibold text-gray-500 mb-2">
                        {item.subtitle}
                    </p>
                    <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-2">
                        {item.description}
                    </p>
                    <div className="mt-2 text-xs flex items-center text-[hsl(220,70%,50%)] font-semibold group-hover:underline">
                        View List <ChevronRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </div>
            
            {/* Bottom Accent Line - Animated */}
            <div className={`h-0.5 w-full ${accentBorderClass.replace('border-', 'bg-')} group-hover:h-1 transition-all duration-300`} />
        </div>
    );
};


const Index = () => {
    const [selectedProgram, setSelectedProgram] = useState(null);

    const handleCardClick = (program) => {
        setSelectedProgram(program);
    };

    const handleCloseDialog = () => {
        setSelectedProgram(null);
    };

    // --- FONT UPDATE: Global font applied
    const globalFont = { fontFamily: 'Poppins, Roboto, sans-serif' };

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8" style={globalFont}>
            <div className="max-w-7xl mx-auto">
                {/* Updated Header Animation & Title Color */}
                <header className="text-center mb-10">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-3 tracking-tight">
                        {/* --- TITLE COLOR & ANIMATION REMOVAL: Removed gradient and inline animation */}
                        <span className="inline-block">
                            Bihar Government Schemes & Programs
                        </span>
                    </h3>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto">
                        Empowering Bihar through comprehensive development initiatives
                    </p>
                </header>
                
                <hr className="my-8 border-t border-dashed border-gray-300" />

                {/* Schemes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {programs.map((item, index) => (
                        <SchemeCard 
                            key={index} 
                            item={item} 
                            index={index} 
                            onClick={handleCardClick} 
                        />
                    ))}
                </div>

                <footer className="mt-16 text-center text-sm text-gray-500">
                    <p>Schemes Data compiled from official Government of Bihar portals and public domain information.</p>
                </footer>
            </div>
            
            {/* Schemes Detail Modal (SimpleModal) - FULLY FUNCTIONAL */}
            <SimpleModal 
                open={!!selectedProgram} 
                onOpenChange={handleCloseDialog}
                title={selectedProgram ? `${selectedProgram.title} Schemes` : ""}
                description={selectedProgram ? `Complete list of major schemes under the ${selectedProgram.title} category.` : ""}
            >
                {selectedProgram && (
                    <>
                        <ul className="space-y-4">
                            {selectedProgram.details.map((scheme, i) => (
                                <li key={i} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border-l-4 border-[hsl(220,70%,50%)/0.5] hover:bg-gray-100 transition-colors">
                                    <ChevronRight size={18} className="mt-1 flex-shrink-0 text-[hsl(220,70%,50%)]" />
                                    <div>
                                        <p className="font-semibold text-base text-gray-900">
                                            {scheme.name}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            **Benefit:** {scheme.benefit}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-end pt-4 border-t mt-4">
                            <RedirectLink 
                                url={selectedProgram.redirectLink}
                                label="Visit Official Portal for More Information"
                            />
                        </div>
                    </>
                )}
            </SimpleModal>
        </div>
    );
};

export default Index;