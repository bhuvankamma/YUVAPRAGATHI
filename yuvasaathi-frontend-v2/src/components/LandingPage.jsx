import React, { useEffect } from 'react'; // ADDED useEffect
import { Link, useLocation } from 'react-router-dom'; // ADDED useLocation

import Announcements from './Announcements';
import HeroSection from './HeroSection';
// import ImageCarousel from './ImageCarousel';
// import DataVisualization from './DataVisualization';
import BenefitsPrograms from './BenefitsPrograms';
import MediaGallary from './MediaGallary';
import SchemeSection from './SchemeSection';
import ChatBot from './Chatbot';
import DistrictInsights from './DistrictInsights';
import AboutCm from './AboutCm';
// import AdminDashboardPage from './AdminDashboard';


const LandingPage = () => {
    // Get the current location object, which includes the URL hash
    const location = useLocation();

    // Effect to handle scrolling to hash fragments (anchor links)
    useEffect(() => {
        // Check if there is a hash fragment in the URL (e.g., #media-gallery-section)
        if (location.hash) {
            // Get the element ID by removing the '#' from the hash
            const id = location.hash.substring(1);
            const element = document.getElementById(id);
            
            // If the element exists, scroll to it smoothly
            if (element) {
                // Ensure MediaGallary.jsx has id="media-gallery-section"
                element.scrollIntoView({ behavior: 'smooth' }); 
            }
        }
    // Dependency array runs this effect every time the location changes (after link click)
    }, [location]); 
    
    
    return (
        <div>
            
            
            <HeroSection/>
            <Announcements />
            <DistrictInsights/>
            {/* <ImageCarousel /> */}
            {/* <DataVisualization/> */}
            <BenefitsPrograms/>
           <section id="media-gallery-section">
  <MediaGallary />
</section>

            <SchemeSection/>
            <AboutCm/>
            
            <ChatBot/>
            {/* <AdminDashboardPage/> */}
        </div>
        
        
    );
};

export default LandingPage;