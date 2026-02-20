import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Search,
  Zap,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Download,
  BarChart2,
  PieChart as PieChartIcon,
  Activity,
  Trello,
  LineChart as LineChartIcon,
  Globe,
  Users,
  Award,
  BookOpen,
  Layers,
  Columns, // Icon for the new Split Bar view
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import * as XLSX from "xlsx";
import { useSpring, animated } from '@react-spring/web';

// 🖼️ Image imports (Assuming paths are correct)
import cool from "../assets/cool.png";
import pm from "../assets/pm.png";
import db from "../assets/db.png";
import ub from "../assets/ub.jpg";
import youth from "../assets/youth.png";
import budda from '../assets/budda.jpg';
import connect from '../assets/connect.png';
import banner from '../assets/banner.jpg';

const HEADER_HEIGHT_CSS_VAR = "var(--top-nav-height, 72px)";

// Color scheme matching the visual patterns in your image (Dark Blue/Indigo and Olive Green/Brown)
const TRAINEES_COLOR = "#312e81"; // Indigo-900 / Dark Purple for Trainees
const PLACED_COLOR = "#ca8a04"; // Yellow-700 / Olive for Placed
const CHART_COLORS = [TRAINEES_COLOR, "#059669", "#f59e0b", "#9333ea", "#e11d48"];

// --- DATA ---
const pieData = [
  { name: "IT & Digital Skills", value: 35000 },
  { name: "Manufacturing", value: 25000 },
  { name: "Healthcare", value: 15000 },
  { name: "Agriculture", value: 10000 },
  { name: "Others", value: 15000 },
];

const barData = [
  { category: "Patna", jobs: 4800, trained: 3200 },
  { category: "Gaya", jobs: 3600, trained: 2900 },
  { category: "Bhagalpur", jobs: 3100, trained: 2500 },
  { category: "Muzaffarpur", jobs: 2900, trained: 2400 },
  { category: "Darbhanga", jobs: 2700, trained: 2100 },
];

const progressData = [
  { quarter: "Q1 2024", Trainees: 45000, Placed: 38000 },
  { quarter: "Q2 2024", Trainees: 52000, Placed: 44000 },
  { quarter: "Q3 2024", Trainees: 48000, Placed: 41000 },
  { quarter: "Q4 2024", Trainees: 55000, Placed: 47000 },
  { quarter: "Q1 2025", Trainees: 58000, Placed: 51000 }, // Updated to match the last image's value for consistency
];

// 🖼️ Image data with taglines
const images = [
  { src: cool, tagline: "Empowering Bihar through Digital Skills" },
  { src: pm, tagline: "Creating Opportunities, Building Futures" },
  { src: db, tagline: "Welcome To Yuvasaathi Portal" },
  { src: connect, tagline: "" },
  { src: youth, tagline: "" },
  { src: budda, tagline: "" },
  { src: ub, tagline: "" },
   { src: banner, tagline: "" },
    
];

// --- Helper Functions ---

const calculateStats = (data, title) => {
  if (title.includes("Skill Distribution")) {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const topSkill = data.reduce((max, item) => (item.value > (max.value || 0) ? item : max), data[0] || {name: "N/A", value: 0});
    return [
      { label: "Total Trainees", value: total.toLocaleString() },
      { label: `Top Sector (${topSkill.name})`, value: topSkill.value.toLocaleString() },
      { label: "Sector Count", value: data.length },
    ];
  } else if (title.includes("Employment Progress by Region")) {
    const totalJobs = data.reduce((sum, item) => sum + item.jobs, 0);
    const totalTrained = data.reduce((sum, item) => sum + item.trained, 0);
    const topRegion = data.reduce((max, item) => (item.jobs > (max.jobs || 0) ? item : max), data[0] || {category: "N/A", jobs: 0});
    return [
      { label: "Total Jobs Offered", value: totalJobs.toLocaleString() },
      { label: "Total Youth Trained", value: totalTrained.toLocaleString() },
      { label: `Top Region (${topRegion.category})`, value: topRegion.jobs.toLocaleString() },
    ];
  } else if (title.includes("Quarterly Trainee")) {
    const totalTrainees = data.reduce((sum, item) => sum + item.Trainees, 0); 
    const latestQuarter = data[data.length - 1];
    return [
      { label: "Total Trainees (Cumulative)", value: totalTrainees.toLocaleString() },
      { label: "Latest Quarter Placement", value: latestQuarter?.Placed?.toLocaleString() || "N/A" },
      { label: "Quarter Count", value: data.length },
    ];
  }
  return [];
};


// 1. Chart Components 

// --- NEW COMPONENT: Custom Quarterly Split Bar Chart ---
const CustomQuarterlySplitBarChart = ({ data }) => {
    const maxValue = data.reduce((max, item) => Math.max(max, item.Trainees, item.Placed), 0) * 1.1;

    return (
        // *FIXED: Added responsive padding/margin, ensured scrollable on mobile*
        <div className="flex flex-col space-y-4 overflow-y-auto pr-2 h-full py-2">
            {data.map((item, index) => {
                const traineesPercentage = (item.Trainees / maxValue) * 100;
                const placedPercentage = (item.Placed / maxValue) * 100;
                
                return (
                    <motion.div 
                        key={item.quarter} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex flex-col space-y-2 pb-1 border-b border-gray-100"
                    >
                        <h5 className="text-sm font-semibold text-gray-700">{item.quarter}</h5>
                        
                        {/* Trainees Bar */}
                        <div className="flex items-center space-x-2">
                            {/* *FIXED: Made category label smaller and fixed width for alignment* */}
                            <span className="text-xs font-medium text-gray-500 w-12 sm:w-16">Trainees</span>
                            <div className="w-full bg-gray-200 rounded-full h-6 sm:h-8 relative">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${traineesPercentage}%` }}
                                    transition={{ duration: 1.2, ease: "easeInOut" }}
                                    // *FIXED: Reduced bar height on smaller screens*
                                    className="h-6 sm:h-8 rounded-l-full flex items-center justify-end pr-2"
                                    style={{
                                        backgroundColor: TRAINEES_COLOR,
                                    }}
                                >
                                    {/* *FIXED: Reduced value text size* */}
                                    <span className="text-xs font-bold text-white leading-none">
                                        {item.Trainees.toLocaleString()}
                                    </span>
                                </motion.div>
                            </div>
                        </div>

                        {/* Placed Bar */}
                        <div className="flex items-center space-x-2">
                            {/* *FIXED: Made category label smaller and fixed width for alignment* */}
                            <span className="text-xs font-medium text-gray-500 w-12 sm:w-16">Placed</span>
                            <div className="w-full bg-gray-200 rounded-full h-6 sm:h-8 relative">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${placedPercentage}%` }}
                                    transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }}
                                     // *FIXED: Reduced bar height on smaller screens*
                                    className="h-6 sm:h-8 rounded-l-full flex items-center justify-end pr-2"
                                    style={{
                                        backgroundColor: PLACED_COLOR,
                                    }}
                                >
                                    {/* *FIXED: Reduced value text size* */}
                                    <span className="text-xs font-bold text-white leading-none">
                                        {item.Placed.toLocaleString()}
                                    </span>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};


const StockMarketChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart
      data={data}
      // *FIXED: Adjusted margins for better mobile fit*
      margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorTrainees" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={TRAINEES_COLOR} stopOpacity={0.8} />
          <stop offset="95%" stopColor={TRAINEES_COLOR} stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPlaced" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={PLACED_COLOR} stopOpacity={0.8} />
          <stop offset="95%" stopColor={PLACED_COLOR} stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="quarter" />
      <YAxis />
      <Tooltip formatter={(value) => value.toLocaleString()} />
      <Area
        type="monotone"
        dataKey="Trainees"
        stroke={TRAINEES_COLOR}
        fillOpacity={1}
        fill="url(#colorTrainees)"
      />
      <Area
        type="monotone"
        dataKey="Placed"
        stroke={PLACED_COLOR}
        fillOpacity={1}
        fill="url(#colorPlaced)"
      />
      <Legend />
    </AreaChart>
  </ResponsiveContainer>
);

// 2. Chart Wrapper Component 
const ChartWrapper = ({ title, chartData, globalChartType }) => {
  const stats = useMemo(() => calculateStats(chartData, title), [chartData, title]);

  let typeToRender = globalChartType;
    
  // Logic to determine the final chart type to render (omitted for brevity, assume correct)
  if (typeToRender !== 'default') {
      if (typeToRender === 'pie' && !title.includes("Skill Distribution")) {
          typeToRender = title.includes("Employment Progress") ? 'bar' : 'line';
      } else if ((typeToRender === 'bar' || typeToRender === 'line' || typeToRender === 'stock' || typeToRender === 'stack' || typeToRender === 'split-bar') && title.includes("Skill Distribution")) {
          typeToRender = 'pie';
      } else if ((typeToRender === 'line' || typeToRender === 'stock' || typeToRender === 'split-bar') && title.includes("Employment Progress")) {
          typeToRender = 'bar'; 
      }
  }

  if (typeToRender === 'default') {
      if (title.includes("Skill Distribution")) typeToRender = 'pie';
      else if (title.includes("Employment Progress")) typeToRender = 'bar';
      else if (title.includes("Quarterly Trainee")) typeToRender = 'split-bar'; // Default to split-bar for a clean mobile visual
  }


  const renderChart = () => {
    switch (typeToRender) {
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="100%"> 
            <PieChart margin={{ top: 0, right: 5, left: 5, bottom: 0 }}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={80} 
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ paddingBottom: '5px' }} /> 
            </PieChart>
          </ResponsiveContainer>
        );

      case 'bar':
      case 'stack': 
        return (
          <ResponsiveContainer width="100%" height="100%">
            {/* *FIXED: Adjusted margins for better mobile fit* */}
            <BarChart data={barData} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}> 
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
              <Bar dataKey="jobs" fill="#1d4ed8" name="Jobs Offered" stackId={typeToRender === 'stack' ? 'a' : undefined} />
              <Bar dataKey="trained" fill="#059669" name="Trained Youth" stackId={typeToRender === 'stack' ? 'a' : undefined} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            {/* *FIXED: Adjusted margins for better mobile fit* */}
            <LineChart data={progressData} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
              <Line
                type="monotone"
                dataKey="Trainees"
                stroke={TRAINEES_COLOR}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Placed"
                stroke={PLACED_COLOR}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'split-bar': // New case for the requested visual pattern
        // Only Quarterly Trainee data is suitable for the horizontal split bar visual
        if (title.includes("Quarterly Trainee")) {
            return <CustomQuarterlySplitBarChart data={progressData} />;
        }
        return <div className="flex items-center justify-center h-full text-center text-gray-500 text-sm">
            <Columns size={18} className="mr-2"/> Visualization not ideal for this data type.
          </div>;


      case 'stock':
        return title.includes("Quarterly Trainee") ? (
          <StockMarketChart data={progressData} />
        ) : (
          <div className="flex items-center justify-center h-full text-center text-gray-500 text-sm">
            <Globe size={18} className="mr-2"/> Visualization not ideal for this data type.
          </div>
        );

      default:
        // Defaulting to the custom split-bar chart for Quarterly data (for clean mobile visual)
        if (title.includes("Quarterly Trainee")) {
             return <CustomQuarterlySplitBarChart data={progressData} />;
        }
        return <div className="flex items-center justify-center h-full text-center text-gray-500 text-sm">Error: Unknown Chart Type.</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      // *FIXED: Reduced chart height on mobile, set a min-height for robustness*
      className="bg-white rounded-xl p-3 sm:p-4 flex flex-col h-[380px] sm:h-[420px] shadow-lg relative min-h-[350px]"
    >
      {/* 📊 Chart Title */}
      <div className="flex justify-between items-start mb-2 border-b pb-1 w-full">
        {/* *FIXED: Reduced title size on mobile* */}
        <h4 className="text-base sm:text-lg font-bold text-gray-800 text-left">{title}</h4>
      </div>

      {/* 🚀 Three Key Stats Section (COMPACT STYLE) */}
      <motion.div
        key={globalChartType + title}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        // *FIXED: Reduced vertical padding*
        className="grid grid-cols-3 gap-1 sm:gap-2 mb-2 pt-1" 
      >
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center bg-gray-50 p-1 rounded-md shadow-sm">
            {/* *FIXED: Reduced value text size on mobile* */}
            <div className="text-sm sm:text-base font-extrabold text-indigo-600">
              {stat.value}
            </div>
             {/* *FIXED: Added custom utility class 'text-xxs' or used 'text-[10px]' for smallest font size* */}
            <div className="text-[10px] sm:text-xxs text-gray-500 font-medium text-center leading-tight mt-0.5"> 
              {stat.label.split('(')[0].trim()}
            </div>
          </div>
        ))}
      </motion.div>

      {/* 📈 Chart Rendering based on State */}
      <div className="flex-grow min-h-0">
        {renderChart()}
      </div>
    </motion.div>
  );
};

// 3. Global Menu Component (ADDED SPLIT BAR OPTION)
const GlobalChartMenu = ({ setChartType, handleDownloadAll, allChartData }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Added 'split-bar' chart option
  const ChartOptions = [
    { key: "pie", label: "Pie Chart" },
    { key: "bar", label: "Bar Chart" },
    { key: "stack", label: "Stack Chart" },
    { key: "line", label: "Line Chart" },
    { key: "split-bar", label: "Dual Bar" },
    { key: "stock", label: "Area Chart" },
];


    return (
        <div className="relative ml-auto">
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md focus:outline-none flex items-center text-gray-700"
                aria-expanded={isMenuOpen}
            >
                <MoreVertical size={20} />
            </button>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        transition={{ duration: 0.2 }}
                        // *FIXED: Adjusted menu width for small screens*
                        className="absolute right-0 mt-2 w-56 sm:w-64 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-2xl z-50"
                    >
                        <div className="py-1">
                            <span className="block px-4 pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase">
                                Global Visualization Settings
                            </span>
                            {ChartOptions.map((option) => (
                                <button
                                    key={option.key}
                                    onClick={() => {
                                        setChartType(option.key);
                                        setIsMenuOpen(false);
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                                >
                                    <span>{option.label}</span>

                                </button>
                            ))}
                        </div>
                        <div className="py-1">
                            <button
                                onClick={() => {
                                    handleDownloadAll(allChartData);
                                    setIsMenuOpen(false);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 font-semibold transition"
                            >
                               <span>Download All Data to Excel</span>
                               </button>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Animated Counter and Empowering Section components ---

const AnimatedCounter = ({ endValue, duration = 1500, symbol }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.5 }); 

    const spring = useSpring({
        from: { number: 0 },
        number: inView ? endValue : 0,
        delay: 200,
        config: { duration },
    });

    const formatNumber = (num) => {
        if (symbol === 'M+') {
            // Check if the number is large enough to show M+ or K+ for better readability
            if (num >= 1000000) {
              return `${(num / 1000000).toFixed(2)}M+`;
            } else if (num >= 1000) {
              return `${(num / 1000).toFixed(1)}K+`;
            }
        }
        return `${Math.floor(num)}${symbol}`;
    }

    return (
        // *FIXED: Reduced font size on mobile*
        <animated.div ref={ref} className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            {spring.number.to(num => formatNumber(num))}
        </animated.div>
    );
};

const StatCard = ({ icon: Icon, value, label, endValue, symbol }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        // *FIXED: Reduced padding on mobile*
        className="flex items-center bg-white p-3 sm:p-4 rounded-lg shadow-xl border-t-4 border-indigo-500"
    >
        <div className="p-2 bg-indigo-100 rounded-full text-indigo-600 mr-3">
            <Icon size={20} />
        </div>
        <div>
            <AnimatedCounter endValue={endValue} symbol={symbol} /> 
            <p className="text-xs sm:text-sm font-medium text-gray-500">{label}</p>
        </div>
    </motion.div>
);

const EmpoweringSection = () => (
    // *FIXED: Adjusted vertical padding for better mobile flow*
    <section className="py-10 sm:py-16 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                // *FIXED: Reduced heading size on mobile*
                className="text-xl md:text-3xl text-center text-gray-800 font-bold font-poppins mb-4" 
            >
                Empowering Bihar's Youth
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
                 // *FIXED: Reduced paragraph size on mobile*
                className="text-sm sm:text-lg text-center text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto"
            >
                Join thousands of youth who have transformed their careers through our platform.
            </motion.p>
            {/* *FIXED: Changed to a single column on the smallest mobile screens, then 3 columns on tablet/desktop* */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
                <StatCard 
                    icon={Users}
                    value="1.85M+"
                    label="Youth Registered"
                    endValue={1850000}
                    symbol="M+"
                />
                <StatCard 
                    icon={BookOpen}
                    value="245+"
                    label="Youth Schemes Available"
                    endValue={245}
                    symbol="+"
                />
                <StatCard 
                    icon={Award}
                    value="89+"
                    label="Student Programs"
                    endValue={89}
                    symbol="+"
                />
            </div>
        </div>
    </section>
);


// --- Main Component ---

const HeroSection = () => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  // *FIXED: Changed default to 'split-bar' for the most visually appealing Quarterly chart on a small screen*
  const [globalChartType, setGlobalChartType] = useState('split-bar'); 

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => setIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  // Function to handle global Excel download
  const handleDownloadAllData = (dataToExport) => {
    const workbook = XLSX.utils.book_new();

   Object.keys(dataToExport).forEach(key => {
    const sheetData = dataToExport[key].map(obj => ({
        Name: obj.name || obj.category || obj.quarter || "",
        Value: obj.value || obj.jobs || obj.trained || obj.Trainees || obj.Placed || ""
    }));
    const ws = XLSX.utils.json_to_sheet(sheetData);

    // Apply header styling (pale yellow)
    const headerCellStyle = {
        fill: { patternType: "solid", fgColor: { rgb: "FFFDE9" } }, // pale yellow
        font: { bold: true }
    };

    const headerCells = ["A1", "B1"];
    headerCells.forEach(cell => {
        if (ws[cell]) ws[cell].s = headerCellStyle;
    });

    XLSX.utils.book_append_sheet(workbook, ws, key.substring(0, 30));
});


    XLSX.writeFile(workbook, `Bihar_Insights_All_Data.xlsx`);
  };

  const allChartData = {
    "Skill Distribution": pieData,
    "Regional Progress": barData,
    "Quarterly Growth": progressData
  };


  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          marginTop: "-80px", 
          // *FIXED: Reduced height on mobile to ensure content below the hero is visible without excessive scrolling*
          height: "calc(80vh + 80px)", // Default height for mobile/tablet
          '@media (min-width: 768px)': { // Override for desktop/large screen
            height: "calc(100vh + 80px)",
          },
          paddingTop: "0px",
        }}
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <AnimatePresence mode="wait">
           <motion.img
              key={index}
              src={images[index].src}
              alt="Hero Slide"
              // *FIXED: Changed object-contain to object-cover on small screens as well for consistent fill*
              className="w-full h-full object-cover object-center" 
              style={{
                objectPosition: "center top",
                // *FIXED: Used a max-height relative to the new section height*
                maxHeight: "100%", 
              }}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>
        {/* Social Media Icons - Hide on small mobile screens to save space */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex-col space-y-4 z-30 hidden sm:flex">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook-f text-2xl text-[#1877f2] hover:scale-110 transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter text-2xl text-[#1da1f2] hover:scale-110 transition" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <i className="fab fa-linkedin-in text-2xl text-[#0077b5] hover:scale-110 transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram text-2xl text-[#e4405f] hover:scale-110 transition" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <i className="fab fa-youtube text-2xl text-[#ff0000] hover:scale-110 transition" />
          </a>
        </div>
        {/* Chevron Buttons - Adjusted position on mobile */}
        <button
          onClick={prevImage}
          // *FIXED: Adjusted left-margin for mobile*
          className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 z-30 bg-black/40 text-white rounded-full p-2 hover:bg-black/60"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={nextImage}
           // *FIXED: Adjusted right-margin for mobile*
          className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 z-30 bg-black/40 text-white rounded-full p-2 hover:bg-black/60"
        >
          <ChevronRight size={22} />
        </button>
        {/* Tagline - Adjusted vertical position on mobile */}
        <div className="absolute bottom-20 sm:bottom-24 w-full text-center text-white z-20 px-4">
          <motion.p
            key={images[index].tagline}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
             // *FIXED: Adjusted font size for mobile*
            className="text-sm sm:text-base md:text-lg font-medium tracking-wide"
          >
            {images[index].tagline}
          </motion.p>
        </div>
        {/* Action Buttons - Adjusted vertical position on mobile */}
        <div className="absolute bottom-6 sm:bottom-10 w-full z-20 flex justify-center space-x-2">
          <a
            href="/jobs"
            className="inline-flex items-center px-2.5 py-1.5 text-xs font-semibold bg-yellow-400 text-gray-900 rounded-full shadow-md transition-transform hover:scale-105 hover:bg-yellow-500"
          >
            <Search className="w-3.5 h-3.5 mr-1" />
            {t("hero_searchJobs") || "Search Jobs"}
          </a>
          <a
            href="/register"
            className="inline-flex items-center px-2.5 py-1.5 text-xs font-semibold border border-white/60 bg-white/10 text-white rounded-full shadow-md backdrop-blur-sm transition-transform hover:scale-105 hover:bg-white/20"
          >
            <Zap className="w-3.5 h-3.5 mr-1" />
            {t("hero_getStarted") || "Get Started"}
          </a>
        </div>
      </section>

      {/* --- NEW SECTION: Empowering Bihar's Youth (with Counter Animation) --- */}
      <EmpoweringSection />

      {/* --- INSIGHTS SECTION --- */}
       {/* *FIXED: Adjusted vertical and horizontal padding for mobile* */}
      <section className="py-10 sm:py-16 px-4 md:px-12 bg-gradient-to-br from-white via-orange-50/40 to-white">
        
        {/* Global Header and Menu */}
        <div className="flex justify-between items-center max-w-7xl mx-auto mb-6 sm:mb-8">
            <motion.h3
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true }}
    className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 tracking-tight text-center font-poppins"
>
    Bihar Skill Development & Employment Insights
</motion.h3>

            <GlobalChartMenu 
                setChartType={setGlobalChartType} 
                handleDownloadAll={handleDownloadAllData}
                allChartData={allChartData}
            />
        </div>

        {/* Charts Grid */}
         {/* *FIXED: Changed to a single column on mobile, two columns on tablet (md:), then three columns on desktop (lg:)* */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* 1. Sector-wise Skill Distribution */}
          <ChartWrapper
            title="Sector-wise Skill Distribution"
            globalChartType={globalChartType}
            chartData={pieData}
          />

          {/* 2. Employment Progress by Region */}
          <ChartWrapper
            title="Employment Progress by Region"
            globalChartType={globalChartType}
            chartData={barData}
          />

          {/* 3. Quarterly Trainee & Placement Growth */}
          <ChartWrapper
            title="Quarterly Trainee & Placement Growth"
            globalChartType={globalChartType}
            chartData={progressData}
          />
        </div>
      </section>
    </>
  );
};

export default HeroSection;