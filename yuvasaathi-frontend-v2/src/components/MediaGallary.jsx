import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // Assuming this is used elsewhere
import CM from '../assets/CM.jpg';
import vg from '../assets/vg.jpg';
import st from '../assets/st.jpg';
import docs from '../assets/docs.jpg';
import ac from '../assets/ac.png';
import mini from '../assets/mini.webp';
// import deputy from '../assets/deputy';
// import Ministers from '../assets/Ministers'

// NOTE: I am assuming your tailwind.config.js has defined 'font-poppins' and 'font-roboto' utility classes.
// Headings and prominent text use font-poppins, body text inherits font-roboto from the main App container.

const mediaItems = {
  visuals: [
    { src: CM, alt: 'Bihar CM Nitish Kumar in a cabinet meeting', title: 'Honorable CM Nitish Kumar at a Cabinet Meeting' },
    { src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExIWFRUVFxUYFRUXFRUXFxUVFxcXFxcYFRUYHSggGBolGxcVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGi0lICUyLS0vLS0tLS8tLS0rLS0tLS0tLS0tLS0tLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIEBQYHAwj/xABHEAABAwEFBQUEBQoFAwUAAAABAAIRAwQFEiExBkFRYXETIjKBkVKhscEHQpLR8BQjJFNicoKisuEVMzRz8UOzwlRjZIOT/8QAGgEAAQUBAAAAAAAAAAAAAAAABQACAwQGAf/EADURAAICAQIDBAgGAgMBAAAAAAABAgMRBCESMUEFE1FxIjIzYYHB0fA0kaGx4fEUIxUkQgb/2gAIAQEAAj8A/tWvJ1S+zZlnhp/wDBpkNd3huKSLgf9YCFB3sWGHpZ533J7Z+hTfQ77p7MkjPSQrlszXx0ZjRzwOgcQPcs/Nm7Cg7PxEfFaBspTizM5gn1KfCxt8JX1VSjDi6ksQub11cFzfopkDjtYx3Qu642PwhOITWISUSUgkISglIkhBII0EhCSjRoJCCASkIRpCEgI4SK9ZrGlzyGgakqKq7R0Rk0Of0ED35+5Q231VevJInp01t3s4tkxCVCrdbaZ0d2mAeJJd7gB8UxtF52h2r3N5BuGPOJ96pWdq0R5ZfwLtfZF8vWxHzf0LkAiwqgOlxkuLjzMoNaRoSOhIVV9tLPqfr/Bc/w4j+K29p+n8l/hJJVULNe9dn18Q4P73v196nLvvlhSGr+448R3T0PyKk6ftKrFk7n9T/AMq+hXfS+J/1f/8AJZWX/MX+v+C5/wAQkEEiQlIIhZWDMykuJuTEOXI67FcnnUNHFh8I804Tez+H1TlNYgJMEpBIQYVaoaC5xDQNakqJKq47d0u0A+b/S2D8f+8vW2v/wAQ/wDBf/8AZf//Z', alt: 'Bihar Deputy CM Samrat Chaudhary', title: 'Deputy CM Samrat Chaudhary' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNbOSxELMFmHJs67YfKV1cAxJq1D976GEPRw&s', alt: 'Bihar ministers at the Vidhan Sabha building', title: 'Ministers at the Bihar Vidhan Sabha' },
    { src: mini, alt: 'Exterior of the Bihar Vidhan Sabha building', title: 'Bihar Vidhan Sabha Building' },
    { src: 'https://media.gettyimages.com/id/2217136417/photo/bikramganj-india-prime-minister-narendra-modi-bihar-governor-arif-mohammed-khan-chief.jpg?s=612x612&w=0&k=20&c=jK6_DulljaVGqllM-gtLYpmckvNrH7K4B1vtEtefHLo=', alt: 'Ministers and officials at a public event', title: 'Public Event with Ministers and Officials' },
  ],
  movingImages: [
    {
      src: 'https://youtu.be/WkB-j3F6gfw?si=VTSpV4H5ivhZZ9N9',
      alt: 'Video of a new government scheme launch',
      title: 'Launch of New Government Scheme',
    },
    {
      src: 'https://www.youtube.com/embed/tgbNymZ7vqY',
      alt: "Chief Minister addressing the public",
      title: "CM's Public Address",
    },
    {
      src: 'https://www.youtube.com/embed/g2qJ53r2K7c',
      alt: 'Drone footage of new infrastructure projects',
      title: 'Progress on Infrastructure Projects',
    },
    {
      src: 'https://www.youtube.com/embed/M7lc1UVf-VE',
      alt: 'Inauguration of new bridges',
      title: 'Inauguration of New Bridges',
    },
    {
      src: 'https://www.youtube.com/embed/u1QeKx5u2eE',
      alt: 'Farmers fair in rural Bihar',
      title: 'Farmers Fair in Rural Bihar',
    },
    {
      src: 'https://www.youtube.com/embed/Bw9O1w2M7f8',
      alt: 'Public awareness campaign on health',
      title: 'Public Health Awareness Campaign',
    },
    {
      src: 'https://www.youtube.com/embed/WJ_v6B0p-80',
      alt: 'Education initiatives for students',
      title: 'New Education Initiatives',
    },
    {
      src: 'https://www.youtube.com/embed/oG5s7y-Tj2U',
      alt: 'Tourism promotion in Bihar',
      title: 'Promoting Tourism in Bihar',
    },
  ],
  cmImages: [
    { src: 'https://placehold.co/1200x600/16a34a/ffffff?text=CM+at+a+meeting', alt: 'CM Nitish Kumar in a meeting with officials' },
    { src: 'https://placehold.co/1200x600/d97706/ffffff?text=CM+delivering+a+speech', alt: 'CM delivering a speech at a public event' },
    { src: 'https://placehold.co/1200x600/1e40af/ffffff?text=CM+visiting+a+project', alt: 'CM Nitish Kumar visiting an infrastructure project' },
  ],
};

// Icons remain w-6 h-6 (small)

const PhotoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-6 h-6 transition-transform duration-300 group-hover:scale-110">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const VideoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-6 h-6 transition-transform duration-300 group-hover:scale-110">
    <path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
    <polygon points="12 11 12 13 14 12" />
    <polygon points="23 7 16 12 23 17 23 7" />
  </svg>
);

const PublicationsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-6 h-6 transition-transform duration-300 group-hover:scale-110">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20h-14.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const FeedbackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-6 h-6 transition-transform duration-300 group-hover:scale-110">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CMActivitiesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-6 h-6 transition-transform duration-300 group-hover:scale-110">
    <circle cx="12" cy="7" r="4" />
    <path d="M12 15a9 9 0 0 0-9 9h18a9 9 0 0 0-9-9z" />
  </svg>
);

// --- NEW ICONS ---

const SportsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-6 h-6 transition-transform duration-300 group-hover:scale-110">
        <path d="M12 2v20M17 5H7l5 5 5-5zM17 19H7l5-5 5 5z" />
    </svg>
);

const CulturalActivitiesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-6 h-6 transition-transform duration-300 group-hover:scale-110">
        <path d="M16 8a4 4 0 0 1-8 0v-2a4 4 0 0 1 8 0v2z" />
        <path d="M21 17l-1.5-3.5L18 17" />
        <path d="M3 17l1.5-3.5L6 17" />
        <path d="M8 17v4" />
        <path d="M16 17v4" />
        <path d="M3 17h18" />
    </svg>
);

const PressReleaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-6 h-6 transition-transform duration-300 group-hover:scale-110">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
);

// --- END NEW ICONS ---

const cardData = [
  {
    title: 'Visuals',
    icon: <PhotoIcon />,
    view: 'visuals',
    bgImage: mini,
  },
  {
    title: 'Video Gallery',
    icon: <VideoIcon />,
    view: 'movingImages',
    bgImage: vg,
  },
  {
    title: 'Documents & Reports',
    icon: <PublicationsIcon />,
    view: 'documents',
    bgImage: docs,
  },
  {
    title: 'Share Your Thoughts',
    icon: <FeedbackIcon />,
    view: 'feedback',
    bgImage: st,
  },
  {
    title: 'CM Activities',
    icon: <CMActivitiesIcon />,
    view: 'cmActivities',
    bgImage: ac,
  },
  // --- NEW SECTIONS ADDED ---
  {
    title: 'Sports',
    icon: <SportsIcon />,
    view: 'sports',
    bgImage: 'https://placehold.co/1200x600/38a169/ffffff?text=SPORTS+BIHAR',
  },
  {
    title: 'Cultural Activities',
    icon: <CulturalActivitiesIcon />,
    view: 'culturalActivities',
    bgImage: 'https://placehold.co/1200x600/6b46c1/ffffff?text=CULTURE+BIHAR',
  },
  {
    title: 'Press Release',
    icon: <PressReleaseIcon />,
    view: 'pressRelease',
    bgImage: 'https://placehold.co/1200x600/e53e3e/ffffff?text=PRESS+BIHAR',
  },
  // --- END NEW SECTIONS ---
];

const SectionCard = ({ title, icon, onClick, bgImage, index }) => (
  <div
    onClick={onClick}
    // MODIFICATION: Reduced height (h-48) and padding (p-3) for smaller card size
    className={`group relative flex flex-col justify-end p-3 text-center text-white cursor-pointer rounded-2xl shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl bg-cover bg-center overflow-hidden h-48 animate-slide-up`}
    style={{ backgroundImage: `url(${bgImage})`, animationDelay: `${index * 100}ms` }}
  >
    {/* Icon positioned in top-left corner with colorful background */}
    <div className="absolute top-3 left-3 z-20 p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
      {icon}
    </div>

    {/* Light orange/amber hover color and opacity control for button */}
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent group-hover:bg-amber-100/10 transition-opacity duration-300 rounded-2xl"></div>
    
    <div className="relative z-10 flex flex-col items-center">
      {/* MODIFICATION: Used font-poppins for the prominent card title */}
      <h4 className="font-poppins text-base sm:text-xl font-bold mb-2 text-shadow-lg">{title}</h4>
      <button
        // Smaller button and hover visibility
        className="bg-white text-gray-800 border-2 border-white hover:bg-gray-100 font-bold py-1 px-4 rounded-full shadow-lg transition-all duration-300 transform scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100 text-sm"
      >
        View More
      </button>
    </div>
  </div>
);

const BackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    // MODIFIED: Reduced padding (py-1.5 px-4) and text size (text-sm) for a smaller back option
    className="absolute top-4 left-4 flex items-center bg-gray-800 text-white py-1.5 px-4 rounded-full shadow-md hover:bg-gray-700 transition-colors duration-300 z-50 text-sm"
  >
    {/* MODIFIED: Reduced icon size (h-4 w-4) and margin (mr-1.5) */}
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H14a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
    </svg>
    Back
  </button>
);

const PhotoGallery = ({ onBack }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <div className={`transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'} p-4 sm:p-8 rounded-b-lg w-full relative bg-white`}>
      <BackButton onClick={onBack} />
      {/* MODIFIED: Used font-poppins for the main heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center font-poppins">Visuals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaItems.visuals.map((item, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg animate-fadeIn hover:shadow-xl hover:border-2 hover:border-gray-200 transition-all duration-300 bg-white" style={{ animationDelay: `${index * 50}ms` }}>
            <img src={item.src} alt={item.alt} className="w-full h-48 object-cover" />
            <div className="p-4">
              {/* MODIFIED: Used font-poppins for the title */}
              <h3 className="text-base text-gray-800 font-poppins">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.alt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const VideoGallery = ({ onBack }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <div className={`transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'} p-4 sm:p-8 rounded-b-lg w-full relative bg-white`}>
      <BackButton onClick={onBack} />
      {/* MODIFIED: Used font-poppins for the main heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center font-poppins">Video Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
        {mediaItems.movingImages.map((item, index) => (
          <div key={index} className="flex-none overflow-hidden rounded-lg shadow-lg hover:shadow-xl hover:border-2 hover:border-gray-200 transition-all duration-300 bg-white">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={item.src}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover rounded-t-lg"
              ></iframe>
            </div>
            <div className="p-4">
              {/* MODIFIED: Used font-poppins for the title */}
              <h3 className="text-base text-gray-800 font-poppins">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.alt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Publications = ({ onBack }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <div className={`transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'} p-4 sm:p-8 rounded-b-lg w-full relative bg-white`}>
      <BackButton onClick={onBack} />
      {/* MODIFIED: Used font-poppins for the main heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center font-poppins">Documents & Reports</h2>
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-md animate-fadeIn hover:shadow-lg transition-shadow duration-300">
          {/* MODIFIED: Used font-poppins for the report title */}
          <h3 className="text-lg font-bold text-gray-800 mb-1 font-poppins">Bihar Budget 2024-25</h3>
          <p className="text-gray-600">A detailed report on the state budget, outlining key allocations and fiscal policies for the year.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md animate-fadeIn hover:shadow-lg transition-shadow duration-300" style={{ animationDelay: '50ms' }}>
          {/* MODIFIED: Used font-poppins for the report title */}
          <h3 className="text-lg font-bold text-gray-800 mb-1 font-poppins">State of Education Report</h3>
          <p className="text-gray-600">An annual publication on the progress and challenges in the education sector across Bihar.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md animate-fadeIn hover:shadow-lg transition-shadow duration-300" style={{ animationDelay: '100ms' }}>
          {/* MODIFIED: Used font-poppins for the report title */}
          <h3 className="text-lg font-bold text-gray-800 mb-1 font-poppins">Agricultural Policy Brief</h3>
          <p className="text-gray-600">A concise document summarizing the government's initiatives to support farmers and boost agricultural productivity.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md animate-fadeIn hover:shadow-lg transition-shadow duration-300" style={{ animationDelay: '150ms' }}>
          {/* MODIFIED: Used font-poppins for the report title */}
          <h3 className="text-lg font-bold text-gray-800 mb-1 font-poppins">Economic Survey 2024</h3>
          <p className="text-gray-600">A comprehensive survey of Bihar's economic performance, key sectors, and growth drivers.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md animate-fadeIn hover:shadow-lg transition-shadow duration-300" style={{ animationDelay: '200ms' }}>
          {/* MODIFIED: Used font-poppins for the report title */}
          <h3 className="text-lg font-bold text-gray-800 mb-1 font-poppins">Infrastructure Development Plan</h3>
          <p className="text-gray-600">Details on upcoming and ongoing projects for roads, bridges, and other public infrastructure.</p>
        </div>
      </div>
    </div>
  );
};

const Feedback = ({ onBack }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <div className={`transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'} p-4 sm:p-8 rounded-b-lg w-full relative bg-white`}>
      <BackButton onClick={onBack} />
      {/* MODIFIED: Used font-poppins for the main heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center font-poppins">Share Your Thoughts</h2>
      <p className="text-center text-gray-600 mb-6">Your feedback helps us improve our services. Please fill out the form below.</p>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-600">Name</label>
          {/* Input/Textarea text will inherit font-roboto */}
          <input type="text" id="name" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-800 placeholder-gray-400" placeholder="Your Name" />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-600">Email</label>
          <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-800 placeholder-gray-400" placeholder="Your Email" />
        </div>
        <div>
          <label htmlFor="feedback" className="block text-gray-600">Your Feedback</label>
          <textarea id="feedback" rows="4" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-800 placeholder-gray-400" placeholder="Share your thoughts..."></textarea>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-md transition-colors duration-300 shadow-md">
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

const CMActivities = ({ onBack }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  const activities = [
    {
      title: "Addressing the State Assembly on Key Legislative Reforms",
      date: "September 2, 2025",
      description: "Honorable Chief Minister presented a series of landmark bills aimed at improving public services and governance. The session highlighted his commitment to transparency and efficiency.",
    },
    {
      title: "Launch of 'Digital Bihar' Initiative",
      date: "August 28, 2025",
      description: "A new scheme was unveiled to bridge the digital divide in rural areas. The initiative includes plans to establish community centers and provide digital literacy training to thousands of citizens.",
    },
    {
      title: "Meeting with a Delegation of International Investors",
      date: "August 20, 2025",
      description: "The Chief Minister hosted a high-level meeting to showcase Bihar's investment potential. Discussions focused on attracting foreign capital to sectors like manufacturing, renewable energy, and technology.",
    },
    {
      title: "Inauguration of the Patna Metro's First Phase",
      date: "August 15, 2025",
      description: "In a major step towards modernizing urban transport, the Chief Minister inaugurated the first operational stretch of the Patna Metro. This project is expected to significantly ease traffic congestion.",
    },
    {
      title: "Review Meeting on Flood Preparedness",
      date: "August 10, 2025",
      description: "With monsoon season approaching, the CM chaired a meeting with district officials to assess preparedness for potential flooding. He emphasized proactive measures and swift response mechanisms.",
    },
  ];

  return (
    <div className={`transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'} p-4 sm:p-8 rounded-b-lg w-full relative bg-white`}>
      <BackButton onClick={onBack} />
      {/* MODIFIED: Used font-poppins for the main heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center font-poppins">CM Activities</h2>
      <div
        className="mb-8 relative rounded-lg shadow-lg aspect-w-16 aspect-h-9"
        style={{
          backgroundImage: `url(${mediaItems.cmImages[0].src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
      </div>
      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md animate-fadeIn hover:shadow-lg transition-shadow duration-300" style={{ animationDelay: `${index * 50}ms` }}>
            {/* MODIFIED: Used font-poppins for the activity title */}
            <h3 className="text-lg font-bold text-gray-800 mb-1 font-poppins">{activity.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{activity.date}</p>
            <p className="text-gray-600">{activity.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- NEW COMPONENTS ---

const Sports = ({ onBack }) => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(true);
    }, []);
    const sportsItems = [
        { title: "Inauguration of New Multi-Purpose Stadium in Patna", date: "October 10, 2025", description: "The CM inaugurated the state-of-the-art stadium, designed to host national and international events, boosting local sports talent. This facility will be a major hub for youth development." },
        { title: "Bihar Wins National Junior Athletics Championship", date: "September 25, 2025", description: "Young athletes from Bihar clinched multiple medals at the national level, showcasing the success of the new grassroots training program and increasing investment in sports." },
        { title: "Launch of 'Khelo Bihar' Talent Hunt Scheme", date: "August 5, 2025", description: "A statewide program to identify and nurture talent in 10 different sports categories, providing scholarships and professional coaching to deserving candidates." },
        { title: "State Cricket Academy Foundation Laid", date: "July 12, 2025", description: "The foundation stone for the new Bihar State Cricket Academy was laid, aiming to develop professional cricket talent from the region." },
    ];
    return (
        <div className={`transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'} p-4 sm:p-8 rounded-b-lg w-full relative bg-white`}>
            <BackButton onClick={onBack} />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center font-poppins">Sports</h2>
            <div className="space-y-6">
                {sportsItems.map((item, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md animate-fadeIn hover:shadow-lg transition-shadow duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                        <h3 className="text-lg font-bold text-gray-800 mb-1 font-poppins">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{item.date}</p>
                        <p className="text-gray-600">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CulturalActivities = ({ onBack }) => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(true);
    }, []);
    const culturalItems = [
        { title: "Annual Bihar Diwas Celebration Concludes Successfully", date: "March 22, 2025", description: "A week-long event promoting the rich history, art, and cuisine of Bihar saw record attendance and participation from artists worldwide. The focus was on folk music and dance forms." },
        { title: "Government Sanctions Funds for Heritage Site Restoration", date: "February 1, 2025", description: "Major funding approved for the conservation and restoration of three historical sites, aimed at boosting heritage tourism and preserving the state's legacy." },
        { title: "Launch of 'Maithili Art Promotion' Program", date: "January 15, 2025", description: "An initiative to support local Madhubani and Mithila artists through workshops, exhibitions, and direct sales platforms to ensure their financial stability." },
        { title: "State Literary Festival Announces Winners", date: "December 5, 2024", description: "The annual festival concluded with awards given to emerging and established writers in Hindi, Urdu, and Maithili languages, fostering literary talent." },
    ];
    return (
        <div className={`transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'} p-4 sm:p-8 rounded-b-lg w-full relative bg-white`}>
            <BackButton onClick={onBack} />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center font-poppins">Cultural Activities</h2>
            <div className="space-y-6">
                {culturalItems.map((item, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md animate-fadeIn hover:shadow-lg transition-shadow duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                        <h3 className="text-lg font-bold text-gray-800 mb-1 font-poppins">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{item.date}</p>
                        <p className="text-gray-600">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PressRelease = ({ onBack }) => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(true);
    }, []);
    const releases = [
        { title: "Press Note: Major Recruitment Drive in Health Sector", date: "October 20, 2025", summary: "The government has announced a massive recruitment drive to fill over 10,000 vacant posts in state-run hospitals and primary health centers, improving healthcare access." },
        { title: "Immediate Relief Package for Flood-Affected Districts", date: "September 1, 2025", summary: "Chief Minister approves ₹500 crore relief package, including direct financial aid and essential supplies distribution for affected families. NDRF teams mobilized." },
        { title: "Statement on Industrial Investment Policy 2.0", date: "August 18, 2025", summary: "Official document detailing the new incentives and streamlined approval process for investors under the updated Industrial Policy, aiming for a single-window clearance system." },
        { title: "Cabinet Decisions Summary (Meeting No. 45)", date: "August 1, 2025", summary: "Key decisions from the latest cabinet meeting, including approvals for new road projects and educational grants for economically weaker sections." },
        { title: "Progress Report on 7 Nischay-2 Schemes Released", date: "July 15, 2025", summary: "Transparency initiative to detail the progress made in the core development schemes of the state government, including water and electricity projects." },
    ];
    return (
        <div className={`transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'} p-4 sm:p-8 rounded-b-lg w-full relative bg-white`}>
            <BackButton onClick={onBack} />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center font-poppins">Press Release</h2>
            <div className="space-y-6">
                {releases.map((release, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md animate-fadeIn hover:shadow-lg transition-shadow duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                        <h3 className="text-lg font-bold text-gray-800 mb-1 font-poppins">{release.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{release.date}</p>
                        <p className="text-gray-600">{release.summary}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- END NEW COMPONENTS ---

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [showTitle, setShowTitle] = useState(false);

  // Trigger animation whenever we return to 'home' view
  useEffect(() => {
    if (currentView === 'home') {
      setShowTitle(false); // Reset animation state
      // Delay setting to true slightly to ensure the animation plays again
      const timer = setTimeout(() => setShowTitle(true), 10);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  return (
    // MODIFIED: Added font-roboto as the base font for all content
    <div className="flex flex-col items-center justify-center min-h-screen font-roboto p-4 bg-white">
      <div className="w-full max-w-6xl rounded-lg shadow-xl overflow-hidden my-4 mx-auto relative">
        
        <div className="p-4 md:p-6 text-center rounded-t-lg shadow-lg bg-white">
          {/* MODIFIED: Used font-poppins and removed old-school-govt-font class */}
          <h4 className={`font-poppins text-2xl md:text-3xl font-bold tracking-tight text-gray-900 ${showTitle ? 'slide-in-left-to-right' : 'opacity-0'}`}>
            Bihar Government Information Hub
          </h4>
        </div>

        <div className="p-4 md:p-6 relative">
          {currentView === 'home' ? (
            
            <div className="w-full bg-white rounded-b-lg p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center w-full">
                {cardData.map((card, index) => (
                  <SectionCard
                    key={index}
                    index={index} // Pass index for staggered animation
                    title={card.title}
                    icon={card.icon}
                    bgImage={card.bgImage}
                    onClick={() => setCurrentView(card.view)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              {currentView === 'visuals' && <PhotoGallery onBack={() => setCurrentView('home')} />}
              {currentView === 'movingImages' && <VideoGallery onBack={() => setCurrentView('home')} />}
              {currentView === 'documents' && <Publications onBack={() => setCurrentView('home')} />}
              {currentView === 'feedback' && <Feedback onBack={() => setCurrentView('home')} />}
              {currentView === 'cmActivities' && <CMActivities onBack={() => setCurrentView('home')} />}
              {/* --- NEW SECTION LOGIC --- */}
              {currentView === 'sports' && <Sports onBack={() => setCurrentView('home')} />}
              {currentView === 'culturalActivities' && <CulturalActivities onBack={() => setCurrentView('home')} />}
              {currentView === 'pressRelease' && <PressRelease onBack={() => setCurrentView('home')} />}
              {/* --- END NEW SECTION LOGIC --- */}
            </>
          )}
        </div>

        <style>
          {`
            /* REMOVED: old-school-govt-font definition as requested to update font style */

            /* Title slide-in animation (Left to Right) */
            .slide-in-left-to-right {
              animation: slideIn 1s ease-out forwards;
              opacity: 0;
            }

            @keyframes slideIn {
              0% {
                transform: translateX(-100%);
                opacity: 0;
              }
              100% {
                transform: translateX(0);
                opacity: 1;
              }
            }

            /* Card slide-up animation */
            .animate-slide-up {
                animation: slideCardUp 0.6s ease-out forwards;
                opacity: 0;
            }

            @keyframes slideCardUp {
                0% {
                    transform: translateY(50px);
                    opacity: 0;
                }
                100% {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}
        </style>
        {/* REMOVED: Cursive font link */}
      </div>
    </div>
  );
};

export default App;