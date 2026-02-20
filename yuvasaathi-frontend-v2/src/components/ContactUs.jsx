import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Link as LinkIcon, ChevronDown } from 'lucide-react';
import Lottie from 'react-lottie-player';
import * as LottieData from '../assets/contact-animation.json';

// --- Configuration Data ---
const CONTACT_TOPICS = [
    'General Inquiry',
    'Technical Support',
    'Partnership/Employer Inquiry',
    'Grievance Redressal',
    'Suggestions/Feedback'
];

const BIHAR_CM_OFFICE_ADDRESS = 'Chief Minister Secretariat, 4, DeshRatna Marg, Patna, Bihar, 800001';

const CONTACT_INFO = [
    { icon: Mail, label: 'Email Support', value: 'support@yuvasaathi.gov.in', link: 'mailto:support@yuvapragati.gov.in' },
    { icon: Phone, label: 'Helpline (Toll-Free)', value: '+91 1800 123 4567', link: 'tel:+9118001234567' },
    { icon: Clock, label: 'Operating Hours', value: 'Mon - Fri: 9:00 AM - 5:00 PM IST', link: null },
    // *** UPDATED ADDRESS LINK ***
    { icon: MapPin, label: 'Office Address', value: BIHAR_CM_OFFICE_ADDRESS, link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BIHAR_CM_OFFICE_ADDRESS)}` },
];

// --- Component: Contact Us Page ---
const ContactUs = ({ isDarkMode }) => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: CONTACT_TOPICS[0], message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call delay
        setTimeout(() => {
            console.log('Form Submitted:', formData);
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', subject: CONTACT_TOPICS[0], message: '' });

            // Hide success message after 5 seconds
            setTimeout(() => setIsSubmitted(false), 5000); 
        }, 2000);
    };

    const containerClass = isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900";
    const titleClass = isDarkMode ? "text-red-400" : "text-red-600";
    const subTitleClass = isDarkMode ? "text-gray-300" : "text-gray-600";
    const cardClass = isDarkMode ? "bg-gray-800 shadow-xl border border-gray-700" : "bg-gray-50 shadow-lg border border-red-100";
    const inputClass = isDarkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-red-500" : "bg-white border-gray-300 text-gray-900 focus:ring-red-500";
    const buttonClass = isDarkMode ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700";
    
    // Google Maps Embed URL for Bihar CM Secretariat, Patna
    const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.5303644026367!2d85.12767077533816!3d25.6022839774351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f29930058b88d3%3A0x6436e2f170c8413b!2sCM%20Secretariat%2C%20Patna!5e0!3m2!1sen!2sin!4v1677772101345!5m2!1sen!2sin";

    return (
        <div className={`min-h-screen py-8 md:py-12 px-4 transition-colors duration-500 ${containerClass}`}>
            <div className="container mx-auto max-w-5xl">
                
                {/* Header and Lottie Section */}
                <div className="flex flex-col md:flex-row items-center justify-between pb-8 md:pb-12 border-b border-gray-200 dark:border-gray-700 mb-8">
                    <div className="md:w-1/2 mb-6 md:mb-0">
                        <h1 className={`text-4xl md:text-5xl font-extrabold mb-3 tracking-tight ${titleClass}`}>
                            <span className="block text-2xl font-light mb-1">How can we help?</span>
                            Connect With Us
                        </h1>
                        <p className={`text-sm md:text-base ${subTitleClass} leading-relaxed`}>
                            Fill out the form below or use our direct contact details to get in touch with our support team. We aim to respond within 24 hours.
                        </p>
                    </div>
                    {/* *** UPDATED LOTTIE CONTAINER SIZE (h-80) *** */}
                    <div className="w-full md:w-1/3 h-60 md:h-80 flex justify-center items-center">
                        <Lottie
                            loop
                            animationData={LottieData}
                            play
                            // *** UPDATED LOTTIE MAX-WIDTH ***
                            style={{ width: '100%', height: '100%', maxWidth: '350px' }} 
                            rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
                            speed={0.9}
                        />
                    </div>
                </div>
                
                {/* Main Content: Details and Form */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Contact Details (Left Column) */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className={`p-6 rounded-xl ${cardClass}`}>
                             <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>Direct Contacts</h2>
                             
                             {CONTACT_INFO.map((item, index) => (
                                <div key={index} className="flex items-start mb-4">
                                    <item.icon className={`w-6 h-6 mr-3 flex-shrink-0 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                    <div>
                                        <p className="font-semibold">{item.label}</p>
                                        {item.link ? (
                                            <a href={item.link} target="_blank" rel="noopener noreferrer" className={`text-sm hover:underline ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.value}</p>
                                        )}
                                    </div>
                                </div>
                             ))}
                        </div>
                        
                        {/* *** MAP EMBED SECTION (REPLACED PLACEHOLDER) *** */}
                        <div className={`p-6 rounded-xl h-64 ${cardClass} overflow-hidden`}>
                            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>Locate Our Office (Patna)</h2>
                            <div className="w-full h-full rounded-lg -mt-1">
                                <iframe 
                                    src={mapEmbedUrl}
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="CM Secretariat Patna Map"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                    
                    {/* Contact Form (Right Column) */}
                    <div className="lg:col-span-2">
                         <div className={`p-8 rounded-xl ${cardClass}`}>
                            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>Send Us a Message</h2>
                            
                            {isSubmitted && (
                                <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200 flex items-center" role="alert">
                                    <CheckCircle className="w-5 h-5 mr-2"/>
                                    <span className="font-medium">Success!</span> Your message has been sent. We will get back to you shortly.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                
                                <div>
                                    <label htmlFor="name" className={`block mb-2 text-sm font-medium ${subTitleClass}`}>Your Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleChange} 
                                        required 
                                        className={`w-full p-3 text-sm border rounded-lg ${inputClass}`}
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="email" className={`block mb-2 text-sm font-medium ${subTitleClass}`}>Your Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        required 
                                        className={`w-full p-3 text-sm border rounded-lg ${inputClass}`}
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="subject" className={`block mb-2 text-sm font-medium ${subTitleClass}`}>Subject</label>
                                    <select 
                                        id="subject" 
                                        name="subject" 
                                        value={formData.subject} 
                                        onChange={handleChange} 
                                        required 
                                        className={`w-full p-3 text-sm border rounded-lg ${inputClass}`}
                                    >
                                        {CONTACT_TOPICS.map(topic => (
                                            <option key={topic} value={topic}>{topic}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label htmlFor="message" className={`block mb-2 text-sm font-medium ${subTitleClass}`}>Your Message</label>
                                    <textarea 
                                        id="message" 
                                        name="message" 
                                        rows="6" 
                                        value={formData.message} 
                                        onChange={handleChange} 
                                        required 
                                        className={`w-full p-3 text-sm border rounded-lg resize-none ${inputClass}`}
                                    ></textarea>
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full px-5 py-3 text-sm font-medium text-center text-white rounded-lg transition-colors duration-200 ${buttonClass} disabled:opacity-50 flex items-center justify-center`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5 mr-2"/>
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ContactUs;