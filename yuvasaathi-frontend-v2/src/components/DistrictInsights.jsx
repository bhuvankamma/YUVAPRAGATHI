import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    MapPin, 
    User, 
    Briefcase, 
    ClipboardList, 
    TrendingUp, 
    Star,
    Users,
    CheckCircle,
    IndianRupee, 
    ChevronDown 
} from 'lucide-react'; // Added ChevronDown for the mobile dropdown

// --- FONT STYLE DEFINITION ---
// Use Poppins for main text, Roboto for fallback and consistency
const globalFont = { 
    fontFamily: 'Poppins, Roboto, sans-serif' 
};
// -----------------------------

// --- DATA STRUCTURE (UNCHANGED) ---

const DISTRICT_DATA = [
    {
        name: "Patna",
        isTopPerformer: true,
        placementRate: 87,
        youthRegistered: 285000,
        activeJobs: 5200,
        trainingCenters: 45,
        youthEngagement: 19.8,
        activeTrainees: 342000,
        certifiedYouth: 185250,
        avgSalary: 23700,
    },
    {
        name: "Gaya",
        isTopPerformer: false,
        placementRate: 75,
        youthRegistered: 195000,
        activeJobs: 3800,
        trainingCenters: 30,
        youthEngagement: 15.2,
        activeTrainees: 210000,
        certifiedYouth: 110000,
        avgSalary: 19500,
    },
    {
        name: "Bhagalpur",
        isTopPerformer: false,
        placementRate: 68,
        youthRegistered: 150000,
        activeJobs: 2900,
        trainingCenters: 22,
        youthEngagement: 12.5,
        activeTrainees: 165000,
        certifiedYouth: 85000,
        avgSalary: 18000,
    },
    {
        name: "Muzaffarpur",
        isTopPerformer: false,
        placementRate: 72,
        youthRegistered: 180000,
        activeJobs: 3500,
        trainingCenters: 28,
        youthEngagement: 14.1,
        activeTrainees: 195000,
        certifiedYouth: 100000,
        avgSalary: 20500,
    },
    {
        name: "Darbhanga",
        isTopPerformer: false,
        placementRate: 65,
        youthRegistered: 120000,
        activeJobs: 2100,
        trainingCenters: 18,
        youthEngagement: 10.9,
        activeTrainees: 130000,
        certifiedYouth: 65000,
        avgSalary: 17000,
    },
    {
        name: "Purnia",
        isTopPerformer: false,
        placementRate: 78,
        youthRegistered: 140000,
        activeJobs: 2500,
        trainingCenters: 20,
        youthEngagement: 16.5,
        activeTrainees: 155000,
        certifiedYouth: 80000,
        avgSalary: 19000,
    },
    {
        name: "Munger",
        isTopPerformer: false,
        placementRate: 60,
        youthRegistered: 95000,
        activeJobs: 1800,
        trainingCenters: 15,
        youthEngagement: 9.5,
        activeTrainees: 105000,
        certifiedYouth: 50000,
        avgSalary: 16000,
    },
    {
        name: "Begusarai",
        isTopPerformer: false,
        placementRate: 70,
        youthRegistered: 160000,
        activeJobs: 3100,
        trainingCenters: 24,
        youthEngagement: 13.8,
        activeTrainees: 175000,
        certifiedYouth: 90000,
        avgSalary: 18500,
    },
    // --- NEW DISTRICTS ADDED ---
    {
        name: "Nalanda",
        isTopPerformer: false,
        placementRate: 74,
        youthRegistered: 170000,
        activeJobs: 3300,
        trainingCenters: 25,
        youthEngagement: 14.5,
        activeTrainees: 180000,
        certifiedYouth: 95000,
        avgSalary: 19800,
    },
    {
        name: "Siwan",
        isTopPerformer: false,
        placementRate: 67,
        youthRegistered: 110000,
        activeJobs: 1900,
        trainingCenters: 16,
        youthEngagement: 10.2,
        activeTrainees: 125000,
        certifiedYouth: 60000,
        avgSalary: 16500,
    },
    {
        name: "Chapra",
        isTopPerformer: false,
        placementRate: 71,
        youthRegistered: 135000,
        activeJobs: 2700,
        trainingCenters: 21,
        youthEngagement: 13.0,
        activeTrainees: 150000,
        certifiedYouth: 78000,
        avgSalary: 18200,
    },
    {
        name: "Katihar",
        isTopPerformer: false,
        placementRate: 63,
        youthRegistered: 100000,
        activeJobs: 1700,
        trainingCenters: 14,
        youthEngagement: 8.8,
        activeTrainees: 115000,
        certifiedYouth: 55000,
        avgSalary: 15500,
    },
];


// --- UTILITY COMPONENTS (Minor mobile-friendly adjustments) ---

// Custom formatting for display
const formatValue = (value, type) => {
    if (type === 'percent') return `${value}%`;
    if (type === 'currency') return `₹${value.toLocaleString('en-IN')}`; 
    if (type === 'large') {
        if (value >= 10000000) { // Crore
            return (value / 10000000).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + ' Cr';
        }
        if (value >= 100000) { // Lakh
            return (value / 100000).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + ' Lakh';
        }
        return value.toLocaleString('en-IN');
    }
    return value.toLocaleString('en-IN');
};

// Animated Progress Bar (UNCHANGED)
const ProgressBar = ({ label, percentage }) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(percentage);
    }, [percentage]);

    return (
        <div className="mb-3" style={globalFont}>
            <div className="flex justify-between items-center mb-0.5">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <span className="text-sm font-semibold text-indigo-600">{formatValue(percentage, 'percent')}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2"> 
                <div 
                    className="h-2 rounded-full bg-indigo-600 transition-all duration-1000 ease-out"
                    style={{ width: `${width}%` }}
                />
            </div>
        </div>
    );
};


// --- MAIN LAYOUT COMPONENTS (FIXED FOR MOBILE/TABLET) ---

/**
 * Renders the responsive district list/selector.
 */
const DistrictSelector = ({ districts, selectedDistrict, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Mobile: Dropdown/Selector
    const MobileSelector = () => (
        <div className="relative block lg:hidden w-full mb-4" style={globalFont}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-3 bg-white border border-gray-300 rounded-xl shadow-md text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <div className="flex items-center">
                    <MapPin size={20} className="mr-2 text-indigo-600" />
                    Viewing: **{selectedDistrict.name}**
                </div>
                <ChevronDown size={20} className={`transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            
            {isOpen && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                    {districts.map(district => (
                        <div
                            key={district.name}
                            onClick={() => {
                                onSelect(district);
                                setIsOpen(false);
                            }}
                            className={`flex items-center justify-between p-3 cursor-pointer transition-colors text-sm ${
                                district.name === selectedDistrict.name 
                                ? 'bg-indigo-500 text-white' 
                                : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                            }`}
                        >
                            <span className="font-medium">{district.name}</span>
                            <span className={`text-xs font-bold px-1 py-0 rounded-full ${
                                district.name === selectedDistrict.name 
                                ? 'bg-white text-indigo-600' 
                                : 'bg-gray-200 text-gray-800'
                            }`}>
                                {district.placementRate}%
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    // Desktop/Tablet: Fixed Sidebar
    const DesktopSidebar = () => (
        <div 
            className="hidden lg:block w-full lg:w-1/4 p-4 bg-white rounded-xl shadow-lg h-full overflow-y-auto sticky top-5" 
            style={{ maxHeight: 'calc(100vh - 40px)', ...globalFont }}
        >
            <h3 className="text-lg font-bold text-gray-800 mb-3 border-b pb-2">
                Select District
            </h3>
            <div className="space-y-1">
                {districts.map(district => (
                    <div
                        key={district.name}
                        onClick={() => onSelect(district)}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                            district.name === selectedDistrict.name 
                            ? 'bg-indigo-600 text-white shadow-md' 
                            : 'bg-gray-50 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                        }`}
                    >
                        <div className="flex items-center text-sm">
                            <MapPin size={16} className="mr-2" />
                            <span className="font-semibold">{district.name}</span>
                        </div>
                        <span className={`text-xs font-bold px-1 py-0 rounded-full ${
                            district.name === selectedDistrict.name 
                            ? 'bg-white text-indigo-600' 
                            : 'bg-gray-200 text-gray-800'
                        }`}>
                            {district.placementRate}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <>
            <MobileSelector />
            <DesktopSidebar />
        </>
    );
};

/**
 * Renders a single statistic card for the overview.
 */
const MetricCard = ({ icon: Icon, value, label, color, type }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 h-full" 
        style={globalFont} // Apply font style to the card content
    >
        <div className={`p-2 rounded-full w-fit mb-2`} style={{ backgroundColor: `${color}1A`, color: color }}>
            <Icon size={20} /> 
        </div>
        <div className="text-xl md:text-2xl font-extrabold text-gray-900 leading-tight mb-1">
            {formatValue(value, type)}
        </div>
        <p className="text-xs font-medium text-gray-500">{label}</p>
    </motion.div>
);

/**
 * Renders the main details panel for the selected district.
 */
const DistrictDetails = ({ district }) => {
    return (
        <motion.div
            key={district.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-3/4 p-4 md:p-6 bg-white rounded-xl shadow-lg" // Adjusted padding for mobile
            style={globalFont} // Apply font style to the main details panel
        >
            {/* Header: District Name & Top Performer Badge */}
            <div className="flex justify-between items-start mb-6 border-b pb-3">
                <div className="flex items-center">
                    <MapPin size={24} className="text-indigo-600 mr-2 md:mr-3 flex-shrink-0" />
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">{district.name}</h2>
                        <p className="text-sm text-gray-500 hidden sm:block">District Overview & Analytics</p>
                    </div>
                </div>
                {district.isTopPerformer && (
                    <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-bold text-xs shadow-sm flex-shrink-0">
                        <Star size={14} className="mr-1 fill-yellow-500 text-yellow-500" />
                        Top Performer
                    </div>
                )}
            </div>

            {/* Section 1: Core Metrics Cards (Top Row) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <MetricCard 
                    icon={User} 
                    value={district.youthRegistered} 
                    label="Youth Registered" 
                    color="#4f46e5"
                    type="large"
                />
                <MetricCard 
                    icon={Briefcase} 
                    value={district.activeJobs} 
                    label="Active Job Openings" 
                    color="#9333ea"
                    type="number"
                />
                <MetricCard 
                    icon={ClipboardList} 
                    value={district.trainingCenters} 
                    label="Training Centers" 
                    color="#059669"
                    type="number"
                />
                <MetricCard 
                    icon={TrendingUp} 
                    value={district.placementRate} 
                    label="Placement Rate" 
                    color="#dc2626"
                    type="percent"
                />
            </div>

            {/* Section 2: Performance Metrics (Progress Bars) */}
            <div className="mb-8 p-4 md:p-5 bg-gray-50 rounded-xl shadow-inner">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Performance Metrics</h3>
                <ProgressBar 
                    label="Placement Success Rate" 
                    percentage={district.placementRate} 
                />
                <ProgressBar 
                    label="Youth Engagement (%)" 
                    percentage={district.youthEngagement} 
                />
            </div>
            
            {/* Section 3: Additional Analytics (Bottom Row Cards) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <MetricCard 
                    icon={Users} 
                    value={district.activeTrainees} 
                    label="Active Trainees" 
                    color="#2563eb"
                    type="large"
                />
                <MetricCard 
                    icon={CheckCircle} 
                    value={district.certifiedYouth} 
                    label="Certified Youth" 
                    color="#06b6d4"
                    type="large"
                />
                <MetricCard 
                    icon={IndianRupee} 
                    value={district.avgSalary} 
                    label="Avg. Salary" 
                    color="#ca8a04"
                    type="currency"
                />
            </div>

        </motion.div>
    );
};


// --- MAIN COMPONENT ---

const DistrictInsights = () => {
    // Set Patna as the default selected district
    const [selectedDistrict, setSelectedDistrict] = useState(DISTRICT_DATA[0]);

    return (
        // --- BACKGROUND & FONT UPDATE: Changed bg-gray-100 to bg-white and applied font style
        <section className="py-8 md:py-12 px-4 md:px-6 bg-white min-h-screen" style={globalFont}>
            <div className="max-w-7xl mx-auto mb-6 md:mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                    Bihar's Skill & Opportunity Compass
                </h2>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                    Explore key metrics for skill development across the state of Bihar.
                </p>
            </div>
            
            {/* Key Fix: Use flex-col on mobile, then flex-row on large screens (lg) */}
            <div className="flex flex-col lg:flex-row gap-5 max-w-7xl mx-auto relative"> 
                {/* Left Column: District Selector (Now responsive) */}
                <DistrictSelector 
                    districts={DISTRICT_DATA}
                    selectedDistrict={selectedDistrict}
                    onSelect={setSelectedDistrict}
                />
                
                {/* Right Column: District Details */}
                <DistrictDetails district={selectedDistrict} />
            </div>
        </section>
    );
};

export default DistrictInsights;