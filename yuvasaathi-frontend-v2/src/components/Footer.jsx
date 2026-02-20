import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Home, UserRound, Briefcase, 
  GraduationCap, FileText, X, Facebook, Twitter, 
  Youtube, Landmark, Globe 
} from 'lucide-react';

import SkillIconScroller from './SkillIconScroller';

// --- 🌟 FooterLink Component 🌟 ---
const FooterLink = ({ to, children, ...props }) => {
  const handleScrollAndNavigate = () => {
    window.scrollTo(0, 0); 
  };

  return (
    <Link 
      to={to} 
      onClick={handleScrollAndNavigate}
      {...props}
    >
      {children}
    </Link>
  );
};
// --- END OF FooterLink ---


// --- Contact Modal ---
const ContactModal = ({ isOpen, onClose }) => {
  const modalClasses = isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none";

  return (
    <div 
      className={`fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      onClick={onClose} 
    >
      <div 
        className={`bg-white text-gray-800 p-8 rounded-2xl shadow-2xl max-w-lg w-11/12 transform transition-all duration-500 ease-out border-t-4 border-orange-400 ${modalClasses}`}
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-6">
          <h2 className="text-3xl font-bold text-orange-500 flex items-center">
            Contact Yuva Pragati
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full bg-gray-100 hover:bg-red-500 transition-colors duration-300 transform hover:rotate-90"
            aria-label="Close contact form"
          >
            <X size={24} className="text-gray-700 hover:text-white" />
          </button>
        </div>

        <form className="space-y-5">
          <div className="relative">
            <UserRound size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
            <input 
              type="text" 
              placeholder="Your Full Name" 
              className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:border-orange-400 focus:ring-1 focus:ring-orange-400 outline-none transition-all"
              required 
            />
          </div>
          <div className="relative">
            <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
            <input 
              type="email" 
              placeholder="Your Email ID (For reply)" 
              className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:border-orange-400 focus:ring-1 focus:ring-orange-400 outline-none transition-all"
              required 
            />
          </div>
          
          <textarea 
            placeholder="Type your message here..." 
            rows="5" 
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:border-orange-400 focus:ring-1 focus:ring-orange-400 outline-none transition-all resize-none"
            required 
          ></textarea>
          
          <button 
            type="submit" 
            className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-400 transition-all duration-300 shadow-lg transform hover:-translate-y-1 active:scale-95"
          >
            Submit Query to Yuva Pragati
          </button>
        </form>
      </div>
    </div>
  );
};


// --- 🌈 Footer Component ---
const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e) => {
    e.preventDefault(); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const socialLinks = [
    { Icon: Facebook, url: 'https://www.facebook.com/BiharGovt', color: 'text-blue-400', name: 'Facebook' },
    { Icon: Twitter, url: 'https://twitter.com/BiharGovt', color: 'text-sky-400', name: 'Twitter' },
    { Icon: Youtube, url: 'https://youtube.com/@bihargovt', color: 'text-red-500', name: 'YouTube' },
    { Icon: Globe, url: 'https://state.bihar.gov.in/', color: 'text-green-400', name: 'Official Website' },
  ];

  const policyLinks = [
    { name: "Grievance Redressal", to: "/grievance-policy", icon: Landmark, desc: "Submit your official complaint/feedback." },
    { name: "Terms of Use (TOS)", to: "/terms-of-use", icon: FileText, desc: "Application terms and conditions." },
    { name: "Privacy Policy", to: "/privacy-policy", icon: FileText, desc: "How we protect your data." },
    { name: "Disclaimer Policy", to: "/disclaimer-policy", icon: FileText, desc: "Legal limitations and liabilities." },
  ];

  const quickLinks = [
    { name: "Home Portal", to: "/", icon: Home, iconColor: "text-indigo-400" },
    { name: "About Us", to: "/about", icon: UserRound, iconColor: "text-green-400" },
    { name: "Job Listings", to: "/jobs", icon: Briefcase, iconColor: "text-blue-400" },
    { name: "Learning Resources", to: "/learning-resources", icon: GraduationCap, iconColor: "text-purple-400" },
  ];

  const cmOffice = {
    address: "Chief Minister Secretariat, 4, DeshRatna Marg, Patna, Bihar, PIN Code: 800001",
    email: "cmbihar@nic.in",
    phone: "+91-612-2215601" 
  };

  return (
    <footer className="bg-black text-gray-300 pt-10 md:pt-16 mt-16 shadow-inner shadow-gray-900 relative">
      
      <SkillIconScroller />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-6 pb-6 border-b border-gray-700">
          
          {/* Brand + Apps */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-4xl font-extrabold text-white mb-2 tracking-wider">
              Yuva Pragati <span className="text-orange-400 text-3xl"></span>
            </h4>
            <p className="text-sm text-gray-400 max-w-sm mb-6 border-l-4 border-orange-400 pl-3">
              A flagship initiative by the Bihar Government to empower youth through skill development and employment.
            </p>

            <h4 className="text-xl font-bold text-white mb-4">Get The App Now</h4>
            <div className="flex flex-col space-y-3">
              <a 
                href="https://play.google.com/store/apps/details?id=bih.nic.kyb.bihar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transform transition-transform duration-300 hover:scale-[1.05]"
                title="Download on Google Play Store"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-11" />
              </a>
              <a 
                href="https://apps.apple.com/us/app/yuvasaathi/id1234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transform transition-transform duration-300 hover:scale-[1.05]"
                title="Download on Apple App Store"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-11" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-orange-400 pb-1">
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <FooterLink to={link.to} className="flex items-center space-x-3 hover:text-orange-400 transition-colors">
                    <link.icon size={20} className={link.iconColor} />
                    <span>{link.name}</span>
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-orange-400 pb-1">
              Legal & Compliance
            </h3>
            <ul className="space-y-4">
              {policyLinks.map((link) => (
                <li key={link.name}>
                  <FooterLink 
                    to={link.to} 
                    title={link.desc} 
                    className="block group"
                  >
                    <span className="flex items-center space-x-2 text-sm text-gray-400 group-hover:text-orange-400 transition-colors">
                      <link.icon size={16} className="text-orange-400 flex-shrink-0" />
                      <span className="font-medium">{link.name}</span>
                    </span>
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-orange-400 pb-1">
              Official CM Office, Patna
            </h3>
            
            <address className="not-italic space-y-3 mb-6 text-sm">
              <p className="flex items-start space-x-3 justify-center sm:justify-start">
                <MapPin size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">{cmOffice.address}</span>
              </p>
              <a href={`tel:${cmOffice.phone}`} className="flex items-center space-x-3 justify-center sm:justify-start hover:text-orange-400 transition-colors">
                <Phone size={20} className="text-blue-400 flex-shrink-0" />
                <span>{cmOffice.phone} (Secretariat)</span>
              </a>
              <a href={`mailto:${cmOffice.email}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 justify-center sm:justify-start hover:text-orange-400 transition-colors">
                <Mail size={20} className="text-blue-400 flex-shrink-0" />
                <span>{cmOffice.email}</span>
              </a>
            </address>

            <h4 className="text-lg font-semibold text-white mt-6 mb-3">Follow Bihar Govt.</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full bg-gray-800 border border-gray-700 ${social.color} hover:bg-orange-100 hover:text-black transition-all duration-300 transform hover:scale-110 shadow-sm`}
                  title={`Follow Bihar Government on ${social.name}`}
                >
                  <social.Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 pb-8 text-center text-gray-500 text-xs border-t border-gray-700 mt-10">
          <p>
            © {new Date().getFullYear()} Yuva Pragati, Government of Bihar. All rights reserved.
            <span className="block mt-1 text-gray-500">
              Content Owned and Managed by <b>Department of Youth and Skilling, Government of Bihar.</b> Designed & Hosted by NIC.
            </span>
          </p>
        </div>
      </div>

      {/* Contact Form Modal */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </footer>
  );
};

export default Footer;
