import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import AboutCm from "../assets/Nitish.png";
// import Media from "../assets/Media"; 
import cin from "../assets/cin.jpg"; 

// 2. Define the array of images
const CM_IMAGES = [AboutCm, cin];

const ChiefMinisterSection = () => {
  const [triggerCount, setTriggerCount] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State for current image
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const closeTimeout = useRef(null);

  // Auto-flip images logic (runs every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % CM_IMAGES.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Trigger animation and counters when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggerCount((prev) => !prev);
          controls.start("visible");
        }
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [controls]);

  // Counter animation
  const Counter = ({ end, duration = 800 }) => {
    const [value, setValue] = useState(0);
    useEffect(() => {
      let startTime = null;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setValue(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, [triggerCount]);
    return value.toLocaleString("en-IN");
  };

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };
  const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.25 } },
  };

  // Image transition variants
  const imageVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeInOut" } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  // Stats Data
  const statsData = [
    {
      end: 1854320,
      label: "Youth Empowered",
      info: [
        "Skill Development Programs",
        "Startup Bihar Initiative",
        "Digital Literacy Campaigns",
        "Vocational Training Centres",
        "Employment Fairs (Rojgar Melas)",
      ],
    },
    {
      end: 38,
      label: "Districts Covered",
      info: [
        "Patna", "Nalanda", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga",
        "Purnea", "Begusarai", "Siwan", "Saran", "Arrah", "Aurangabad",
        "Katihar", "Araria", "Kishanganj", "Madhubani", "Sitamarhi",
        "Samastipur", "Motihari", "Chhapra", "Nawada", "Lakhisarai", "Saharsa",
        "Khagaria", "Sheikhpura", "Buxar", "Rohtas", "Kaimur", "Banka",
        "Gopalganj", "West Champaran", "East Champaran", "Jehanabad", "Sheohar",
        "Vaishali", "Jamui", "Supaul", "Munger",
      ],
    },
    {
      end: 334,
      label: "Active Schemes",
      info: [
        "Mukhyamantri Kanya Utthan Yojana",
        "Har Ghar Nal Ka Jal",
        "Saat Nischay Programme",
        "Kushal Yuva Programme",
        "Digital Bihar Mission",
        "Chief Minister Entrepreneurship Scheme",
        "Bihar Rural Livelihood Mission",
        "Har Ghar Bijli Lagataar",
        "Gramin Tola Sampark Yojana",
        "Women Self-Help Group Programmes",
      ],
    },
  ];

  // Hover handlers
  const handleMouseEnter = (index) => {
    clearTimeout(closeTimeout.current);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 400);
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-12 md:py-16 overflow-hidden"
      style={{
        fontFamily: "'Noto Sans', 'Open Sans', 'Verdana', sans-serif",
      }}
    >
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between px-6 md:px-10 lg:px-16 gap-8 lg:gap-14">
        {/* Left: CM Image Carousel */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          animate={controls}
          className="relative w-full lg:w-1/2 flex justify-center lg:justify-start"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={currentImageIndex}
              src={CM_IMAGES[currentImageIndex]}
              alt={`Hon’ble Chief Minister of Bihar - Image ${currentImageIndex + 1}`}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full max-w-[480px] rounded-2xl shadow-xl border border-gray-200 object-cover"
            />
          </AnimatePresence>
        </motion.div>

        {/* Right: CM Info */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={controls}
          className="w-full lg:w-1/2 space-y-4"
        >
          <motion.h3
            variants={fadeUp}
            className="text-sm font-semibold text-blue-700 uppercase tracking-widest"
          >
            Leadership
          </motion.h3>

          <motion.h1
            variants={fadeUp}
            className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug"
            style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
          >
            Hon’ble Chief Minister of Bihar
          </motion.h1>

          <motion.p
            variants={fadeRight}
            className="text-gray-700 text-[15px] sm:text-base leading-relaxed"
          >
            Shri Nitish Kumar’s leadership embodies transformative governance,
            youth empowerment, and transparency. His digital and development
            initiatives are shaping a new Bihar for the next generation.
          </motion.p>

          <motion.p
            variants={fadeLeft}
            className="text-gray-700 text-[15px] sm:text-base leading-relaxed"
          >
            Programs such as{" "}
            <span className="font-semibold text-blue-700">Yuva Pragati</span> and{" "}
            <span className="font-semibold text-blue-700">Har Ghar Nal Ka Jal</span>{" "}
            stand as symbols of inclusive growth and sustainable progress.
          </motion.p>
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={controls}
        className="max-w-5xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5 px-6 md:px-10"
      >
        {statsData.map((stat, i) => (
          <div
            key={i}
            className="w-full"
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              variants={fadeUp}
              className={`relative border border-gray-200 rounded-xl text-center py-6 transition-all duration-300 ${
                hoveredIndex === i
                  ? "bg-orange-500 text-white shadow-xl scale-[1.03]"
                  : "bg-white text-gray-900 shadow-sm"
              }`}
            >
              <motion.h2
                className={`text-2xl sm:text-3xl font-extrabold ${
                  hoveredIndex === i ? "text-white" : "text-blue-800"
                }`}
              >
                <Counter end={stat.end} />
                {i !== 1 && "+"}
              </motion.h2>
              <p
                className={`text-sm font-medium mt-1 ${
                  hoveredIndex === i ? "text-white" : "text-gray-700"
                }`}
              >
                {stat.label}
              </p>
            </motion.div>

            {/* Expanding Info Section */}
            <AnimatePresence>
              {hoveredIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                  className="bg-orange-50 border border-orange-200 rounded-b-xl shadow-inner px-4 py-3 mt-1 overflow-hidden"
                >
                  <h4 className="text-xs font-semibold text-orange-700 mb-1">
                    {stat.label} Details:
                  </h4>
                  <ul className="text-xs text-gray-700 text-left max-h-40 overflow-y-auto custom-scroll">
                    {stat.info.map((item, idx) => (
                      <li key={idx} className="py-[2px] border-b border-gray-100">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default ChiefMinisterSection;
