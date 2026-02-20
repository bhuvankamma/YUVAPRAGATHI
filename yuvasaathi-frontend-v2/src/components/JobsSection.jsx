// JobSection.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import {
  Briefcase, MapPin, Building, ChevronDown, Laptop, UserRoundPlus, LogIn,
  ExternalLink, X, Search, Banknote, Mic, Send, Mail, Phone, Home, Globe,
  CheckCircle, Lightbulb, TrendingUp, DollarSign, Loader, Landmark, Shield, AlertTriangle
} from 'lucide-react';

const API_BASE_URL = 'https://yuvasaathi-backend-v2.vercel.app';
const EMPLOYER_JOBS_API_BASE = 'https://0qmiqmhmw3.execute-api.eu-north-1.amazonaws.com/prod/Jobposting';



// -------------------------
// Data: States, Portals, Categories
// -------------------------
const indianStatesAndCities = [
  { label: 'All India', value: 'India', cities: ['All', 'Any City'] },
  { label: 'Andhra Pradesh', value: 'Andhra Pradesh', cities: ['All', 'Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati'] },
  { label: 'Arunachal Pradesh', value: 'Arunachal Pradesh', cities: ['All', 'Itanagar', 'Naharlagun'] },
  { label: 'Assam', value: 'Assam', cities: ['All', 'Guwahati', 'Silchar', 'Dibrugarh'] },
  { label: 'Bihar', value: 'Bihar', cities: ['All', 'Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga'] },
  { label: 'Chhattisgarh', value: 'Chhattisgarh', cities: ['All', 'Raipur', 'Bilaspur', 'Durg'] },
  { label: 'Goa', value: 'Goa', cities: ['All', 'Panaji', 'Margao'] },
  { label: 'Gujarat', value: 'Gujarat', cities: ['All', 'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'] },
  { label: 'Haryana', value: 'Haryana', cities: ['All', 'Gurugram', 'Faridabad', 'Chandigarh'] },
  { label: 'Himachal Pradesh', value: 'Himachal Pradesh', cities: ['All', 'Shimla', 'Dharamshala'] },
  { label: 'Jharkhand', value: 'Jharkhand', cities: ['All', 'Ranchi', 'Jamshedpur', 'Dhanbad'] },
  { label: 'Karnataka', value: 'Karnataka', cities: ['All', 'Bengaluru', 'Mysuru', 'Hubballi', 'Mangaluru'] },
  { label: 'Kerala', value: 'Kerala', cities: ['All', 'Kochi', 'Thiruvananthapuram', 'Kozhikode'] },
  { label: 'Madhya Pradesh', value: 'Madhya Pradesh', cities: ['All', 'Bhopal', 'Indore', 'Jabalpur'] },
  { label: 'Maharashtra', value: 'Maharashtra', cities: ['All', 'Mumbai', 'Pune', 'Nagpur', 'Nashik'] },
  { label: 'Manipur', value: 'Manipur', cities: ['All', 'Imphal'] },
  { label: 'Meghalaya', value: 'Meghalaya', cities: ['All', 'Shillong'] },
  { label: 'Mizoram', value: 'Mizoram', cities: ['All', 'Aizawl'] },
  { label: 'Nagaland', value: 'Nagaland', cities: ['All', 'Kohima', 'Dimapur'] },
  { label: 'Odisha', value: 'Odisha', cities: ['All', 'Bhubaneswar', 'Cuttack', 'Rourkela'] },
  { label: 'Punjab', value: 'Punjab', cities: ['All', 'Ludhiana', 'Amritsar', 'Mohali'] },
  { label: 'Rajasthan', value: 'Rajasthan', cities: ['All', 'Jaipur', 'Jodhpur', 'Kota'] },
  { label: 'Sikkim', value: 'Sikkim', cities: ['All', 'Gangtok'] },
  { label: 'Tamil Nadu', value: 'Tamil Nadu', cities: ['All', 'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli'] },
  { label: 'Telangana', value: 'Telangana', cities: ['All', 'Hyderabad', 'Warangal', 'Karimnagar'] },
  { label: 'Tripura', value: 'Tripura', cities: ['All', 'Agartala'] },
  { label: 'Uttar Pradesh', value: 'Uttar Pradesh', cities: ['All', 'Lucknow', 'Kanpur', 'Noida', 'Ghaziabad'] },
  { label: 'Uttarakhand', value: 'Uttarakhand', cities: ['All', 'Dehradun', 'Haridwar'] },
  { label: 'West Bengal', value: 'West Bengal', cities: ['All', 'Kolkata', 'Howrah', 'Siliguri'] },
  // Union Territories
  { label: 'Andaman and Nicobar Islands', value: 'Andaman and Nicobar Islands', cities: ['All', 'Port Blair'] },
  { label: 'Chandigarh', value: 'Chandigarh', cities: ['All', 'Chandigarh'] },
  { label: 'Dadra and Nagar Haveli and Daman and Diu', value: 'Dadra and Nagar Haveli and Daman and Diu', cities: ['All', 'Daman', 'Silvassa'] },
  { label: 'Delhi', value: 'Delhi', cities: ['All', 'New Delhi'] },
  { label: 'Jammu and Kashmir', value: 'Jammu and Kashmir', cities: ['All', 'Srinagar', 'Jammu'] },
  { label: 'Ladakh', value: 'Ladakh', cities: ['All', 'Leh', 'Kargil'] },
  { label: 'Lakshadweep', value: 'Lakshadweep', cities: ['All', 'Kavaratti'] },
  { label: 'Puducherry', value: 'Puducherry', cities: ['All', 'Puducherry'] },
];

// Central & State portals (kept from Part 1/2)
const centralGovtPortals = [
  { name: 'Staff Selection Commission (SSC)', link: 'https://ssc.nic.in/', icon: <Landmark size={20} className="text-blue-600" /> },
  { name: 'UPSC (Civil Services, NDA, etc.)', link: 'https://upsc.gov.in/', icon: <Shield size={20} className="text-red-600" /> },
  { name: 'Indian Railways (RRB)', link: 'https://www.rrbcdg.gov.in/', icon: <Briefcase size={20} className="text-green-600" /> },
  { name: 'Bank/IBPS', link: 'https://www.ibps.in/', icon: <Banknote size={20} className="text-yellow-600" /> },
  { name: 'Defense/Army/Navy/Air Force', link: 'https://joinindianarmy.nic.in/', icon: <Shield size={20} className="text-gray-600" /> },
  { name: 'Post Office (India Post)', link: 'https://www.indiapost.gov.in/vas/pages/Content/Recruitment.aspx', icon: <Mail size={20} className="text-teal-600" /> },
];

const stateGovtPortals = [
  { name: 'Andhra Pradesh PSC', link: 'https://portal-psc.ap.gov.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Arunachal Pradesh PSC', link: 'https://appsc.gov.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Assam PSC', link: 'https://apsc.nic.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Bihar Job Portal (General)', link: 'https://www.biharjobportal.com', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Chhattisgarh PSC', link: 'https://psc.cg.gov.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Goa PSC', link: 'https://gpsc.goa.gov.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Gujarat PSC', link: 'https://gpsc.gujarat.gov.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Haryana PSC', link: 'http://hpsc.gov.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Himachal Pradesh PSC', link: 'http://www.hppsc.hp.gov.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Jharkhand PSC', link: 'https://www.jpsc.gov.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Karnataka PSC', link: 'https://kpsc.kar.nic.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Kerala PSC', link: 'https://www.keralapsc.gov.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Madhya Pradesh PSC', link: 'https://mppsc.mp.gov.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Maharashtra PSC', link: 'https://mpsc.gov.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Manipur PSC', link: 'https://www.mpscmanipur.gov.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Meghalaya PSC', link: 'https://mpsc.nic.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Mizoram PSC', link: 'https://mpsc.mizoram.gov.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Nagaland PSC', link: 'https://npsc.nagaland.gov.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Odisha PSC', link: 'https://www.opsc.gov.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Punjab PSC', link: 'https://ppsc.gov.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Rajasthan PSC', link: 'https://rpsc.rajasthan.gov.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Sikkim PSC', link: 'https://spsc.sikkim.gov.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Tamil Nadu PSC', link: 'https://tnpsc.gov.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Telangana PSC', link: 'https://websitenew.tgpsc.gov.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Tripura PSC', link: 'https://tpsc.tripura.gov.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Uttar Pradesh PSC', link: 'https://uppsc.up.nic.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Uttarakhand PSC', link: 'https://psc.uk.gov.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'West Bengal PSC', link: 'https://pscwbapplication.in/', icon: <MapPin size={20} className="text-orange-500" /> },
  { name: 'Jammu & Kashmir PSC', link: 'http://jkpsc.nic.in/', icon: <MapPin size={20} className="text-orange-500" /> },
];

const privatePortals = [
  { name: 'Naukri', link: 'https://www.naukri.com/', icon: <Briefcase size={20} /> },
  { name: 'LinkedIn Jobs', link: 'https://www.linkedin.com/jobs/', icon: <Laptop size={20} /> },
  { name: 'Indeed', link: 'https://www.indeed.co.in/', icon: <Search size={20} /> },
  { name: 'Monster India', link: 'https://www.monsterindia.com/', icon: <Mic size={20} /> },
  { name: 'Glassdoor India', link: 'https://www.glassdoor.co.in/index.htm', icon: <Lightbulb size={20} /> },
  { name: 'Shine', link: 'https://www.shine.com/', icon: <TrendingUp size={20} /> },
];

const adzunaMockCategories = [
  'IT', 'Management', 'Marketing', 'Sales', 'Engineering',
  'Manufacturing', 'Finance', 'Healthcare', 'Education',
  'Government', 'HR', 'Customer Service', 'Hospitality',
  'Research', 'Media', 'Skilled Trade'
].sort();

const externalPortals = [
  { name: 'Adzuna Link (Original)', link: (job) => job?.link, icon: <CheckCircle size={20} className="text-teal-500" />, isExternalLink: true },
  { name: 'Naukri.com', link: 'https://www.naukri.com/', icon: <Briefcase size={20} className="text-blue-500" /> },
  { name: 'LinkedIn Jobs', link: 'https://www.linkedin.com/jobs/', icon: <Laptop size={20} className="text-blue-700" /> },
  { name: 'Indeed', link: 'https://www.indeed.com/', icon: <Search size={20} className="text-green-500" /> },
  { name: 'Monster India', link: 'https://www.monsterindia.com/', icon: <Mic size={20} className="text-orange-500" /> },
];

// --- English content & i18n helper ---
const englishContent = {
  title: 'Your Next Career Move Starts Here',
  subtitle: 'Uncover opportunities tailored to your skills across every sector and location in India.',
  allCategories: 'All Categories',
  selectState: 'Select State',
  selectCity: 'Select City',
  searchPlaceholder: 'Search by Title, Company, or Keyword...',
  readButton: 'View Details',
  applyNowButton: 'Apply Now (External)',
  viewMoreButton: 'Show More Jobs',
  viewLessButton: 'View Less',
  jobDescriptionModalTitle: 'Complete Job Details',
  howToApply: 'How would you like to apply?',
  applyWithYuvaSaathi: 'Apply with YuvaPragati',
  applyWithOtherPortals: 'Explore Other Portals',
  usefulJobPortals: 'Useful External Job Portals',
  closeButton: 'Close',
  all: 'All',
  jobSeeker: 'I am a Job Seeker',
  employer: 'I am an Employer',
  govtJobs: 'Government Jobs 🇮🇳',
  employerFormTitle: 'Tell Us About Your Company',
  employerFormSubtitle: 'Fill this quick form to register and start posting jobs.',
  companyName: 'Company Name',
  contactPerson: 'Contact Person',
  email: 'Email Address',
  phone: 'Phone Number',
  redirectButton: 'Save Details & Proceed to Register',
  redirectMessage: 'Your basic details will be saved, and you will be redirected to the full registration page.',
  category: 'Category',
  location: 'Location',
  salary: 'Salary',
  type: 'Type',
  fetchingJobs: 'Fetching latest jobs...',
  errorFetchingJobs: 'Error fetching jobs. Please try again.',
};
const t = (k) => englishContent[k] || k;

// --- Utility: transform Adzuna job => UI job (from Part 1) ---
const transformAdzunaJob = (adzunaJob) => {
  const categoryLabel = adzunaJob.category?.label.split(' ')[0] || 'Unspecified';
  const locationParts = adzunaJob.location?.display_name?.split(', ') || [];
  const city = locationParts[0] || adzunaJob.area?.[0] || 'India';
  const state = locationParts.length > 1 ? locationParts[1] : 'India';
  return {
    id: adzunaJob.id,
    title: adzunaJob.title,
    company: adzunaJob.company?.display_name || 'N/A',
    category: categoryLabel,
    location: city,
    state,
    type: adzunaJob.contract_time || 'Full-time',
    salary: adzunaJob.salary_max ? `₹${(adzunaJob.salary_max / 100000).toFixed(1)} LPA` : 'Negotiable',
    description: (adzunaJob.description || '').substring(0, 150) + '...',
    readMore: adzunaJob.description || '',
    link: adzunaJob.redirect_url,
  };
};

// --- NEW: transform Employer (DB) job => UI job ---
const transformEmployerJob = (dbJob) => {
  // dbJob expected fields (from your lambda): id, title, company, description, location,
  // min_salary, max_salary, posted_at, how_to_apply, reference_id (optional)
  const salary = (dbJob.min_salary || dbJob.max_salary) ? `${dbJob.min_salary || 0} - ${dbJob.max_salary || 0}` : 'Negotiable';
  const postedAt = dbJob.posted_at || dbJob.postedAt || dbJob.posted || null;
  return {
    id: dbJob.id || dbJob.reference_id || Math.random().toString(36).slice(2, 9),
    title: dbJob.title || 'Untitled',
    company: dbJob.company || 'Employer',
    category: 'Employer Post',
    location: dbJob.location || 'N/A',
    state: 'Local',
    type: dbJob.type || 'Full-time',
    salary: salary,
    description: (dbJob.description || '').substring(0, 150) + (dbJob.description && dbJob.description.length > 150 ? '...' : ''),
    readMore: dbJob.description || '',
    postedAt: postedAt,
    how_to_apply: dbJob.how_to_apply || dbJob.howToApply || '',
    raw: dbJob
  };
};

// ---------------------------
// Reusable Modal component
// ---------------------------
const Modal = ({ title, children, onClose, icon: Icon }) => (
  <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70 flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg md:max-w-xl transition-all duration-300 transform scale-100 opacity-100" onClick={(e) => e.stopPropagation()}>
      <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center">
          {Icon && <Icon size={24} className="mr-3 text-teal-500" />}
          {title}
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <X size={24} />
        </button>
      </div>
      <div className="p-4 md:p-6 max-h-[70vh] overflow-y-auto">
        {children}
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
        <button onClick={onClose} className="py-2 px-6 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          {t('closeButton')}
        </button>
      </div>
    </div>
  </div>
);

// Redirect confirmation (reused)
const RedirectConfirmationModal = ({ onClose, targetLink, portalName }) => {
  const handleRedirect = () => {
    onClose();
    window.open(targetLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal title="External Redirect Warning" onClose={onClose} icon={AlertTriangle}>
      <div className="text-center space-y-4">
        <p className="text-xl font-semibold text-red-600 dark:text-red-400">You are leaving YuvaSaathi</p>
        <p className="text-gray-700 dark:text-gray-300">
          You are about to be redirected to the official portal for <strong>{portalName}</strong>.
          <br />
          The link is: <span className="font-mono text-sm break-all text-teal-600 dark:text-teal-400">{targetLink}</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Always verify the URL before submitting personal information on external websites.</p>
        <div className="flex justify-center space-x-4 mt-6">
          <button onClick={onClose} className="py-2 px-6 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold rounded-full hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors">
            Cancel
          </button>
          <button onClick={handleRedirect} className="py-2 px-6 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 transition-colors flex items-center">
            Proceed <ExternalLink size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Job description modal
const JobDescriptionModal = ({ job, onClose }) => {
  const IconMap = {
    'IT': Laptop, 'Government': Banknote, 'Finance': Banknote, 'Education': Mic, 'Healthcare': Home, 'Marketing': Send,
    'Management': Briefcase, 'HR': UserRoundPlus, 'Engineering': Building, 'Sales': DollarSign, 'Manufacturing': TrendingUp,
    'Hospitality': Home, 'Research': Lightbulb, 'Media': Globe, 'Customer Service': Mail, 'Skilled Trade': Building, 'Unspecified': Briefcase
  };
  const JobIcon = IconMap[job.category] || Briefcase;

  return (
    <Modal title={t('jobDescriptionModalTitle')} onClose={onClose} icon={JobIcon}>
      <div className="space-y-6">
        <h4 className="text-2xl md:text-3xl font-extrabold text-teal-600 dark:text-teal-400">{job.title}</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p className="flex items-center text-gray-600 dark:text-gray-400">
            <Building size={16} className="mr-2 text-teal-500" />
            <span className="font-medium text-slate-900 dark:text-white">{job.company}</span>
          </p>
          <p className="flex items-center text-gray-600 dark:text-gray-400">
            <MapPin size={16} className="mr-2 text-teal-500" />
            <span className="font-medium">{job.location}, {job.state}</span>
          </p>
          <p className="flex items-center text-gray-600 dark:text-gray-400">
            <Briefcase size={16} className="mr-2 text-teal-500" />
            <span className="font-medium">{job.type}</span>
          </p>
          <p className="flex items-center text-gray-600 dark:text-gray-400">
            <Banknote size={16} className="mr-2 text-teal-500" />
            <span className="font-medium">{job.salary || 'Negotiable'}</span>
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{t('category')}: {job.category}</p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{job.readMore}</p>

          {/* If this is an employer post, show posted date & how to apply */}
          {job.postedAt && <p className="text-sm text-gray-500 mt-4">Posted: {new Date(job.postedAt).toLocaleString()}</p>}
          {job.how_to_apply && <p className="text-sm text-gray-500 mt-2">How to apply: <span className="font-medium">{job.how_to_apply}</span></p>}
        </div>
      </div>
    </Modal>
  );
};

// Apply modal (keeps existing flow)
const ApplyModal = ({ job, onClose, setShowOtherPortalsModal }) => (
  <Modal title={t('howToApply')} onClose={onClose} icon={UserRoundPlus}>
    <div className="space-y-6">
      <h4 className="text-2xl font-bold text-center text-slate-900 dark:text-white">Applying for: <span className="text-teal-600">{job.title}</span></h4>

      <div onClick={() => { window.location.href = '/register'; }} className="block p-4 bg-teal-50 dark:bg-teal-900/50 border border-teal-200 dark:border-teal-700 rounded-xl hover:bg-teal-100 dark:hover:bg-teal-900 transition-all duration-300 group cursor-pointer">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-teal-700 dark:text-teal-300">{t('applyWithYuvaSaathi')}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Recommended. You will be redirected to the registration/login page to apply with your profile.</p>
          </div>
          <LogIn size={24} className="text-teal-600 group-hover:scale-110 transition-transform" />
        </div>
      </div>

      <div onClick={() => { onClose(); setShowOtherPortalsModal(true); }} className="block p-4 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 group cursor-pointer">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{t('applyWithOtherPortals')}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">See the direct link to the job and other major job sites.</p>
          </div>
          <ExternalLink size={24} className="text-gray-600 dark:text-gray-400 group-hover:scale-110 transition-transform" />
        </div>
      </div>
    </div>
  </Modal>
);

// Other portals modal
const OtherPortalsModal = ({ onClose, job, setRedirectTarget }) => (
  <Modal title={t('usefulJobPortals')} onClose={onClose} icon={Globe}>
    <p className="mb-4 text-gray-600 dark:text-gray-400">Choose an option to apply or search on external portals:</p>
    <div className="space-y-3">
      {externalPortals.map((portal) => {
        const link = portal.isExternalLink ? portal.link(job) : portal.link;
        const portalName = portal.isExternalLink ? `Adzuna Link (${job?.company})` : portal.name;
        return (
          <button key={portal.name} onClick={() => setRedirectTarget({ link, name: portalName })} className="flex items-center justify-between w-full text-left p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-200">
            <div className="flex items-center">
              {portal.icon}
              <span className="ml-3 text-lg font-semibold text-slate-900 dark:text-white">{portalName}</span>
            </div>
            <ExternalLink size={18} className="text-teal-500" />
          </button>
        );
      })}
    </div>
  </Modal>
);

// ---------------------------
// Govt Jobs Panel (reusable)
// ---------------------------
const GovtJobsPanel = ({ selectedGovtType, onPortalClick }) => {
  const portals = selectedGovtType === 'central' ? centralGovtPortals
    : selectedGovtType === 'state' ? stateGovtPortals
    : privatePortals;
  const header = selectedGovtType === 'central' ? 'Central Government Portals'
    : selectedGovtType === 'state' ? 'State Government Portals'
    : 'Private Job Portals';
  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold mb-3">{header}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {portals.map((p) => (
          <button
            key={p.name}
            onClick={() => onPortalClick(p)}
            className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
          >
            <div className="flex items-center">
              {p.icon}
              <span className="ml-3 text-sm font-medium text-slate-900 dark:text-white">{p.name}</span>
            </div>
            <ExternalLink size={16} className="text-teal-500" />
          </button>
        ))}
      </div>
    </div>
  );
};

// ---------------------------
// Employer Form (Part 2)
// ---------------------------
const EmployerForm = ({ navigate }) => {
  const [formData, setFormData] = useState({ companyName: '', contactPerson: '', email: '', phone: '' });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactPerson || !formData.email || !formData.phone) {
      alert('Please fill in all fields.');
      return;
    }
    console.log('Employer Form Data Saved:', formData);
    navigate('/employer-auth');
  };
  const inputClass = "w-full p-3 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200";

  return (
    <div className="max-w-xl mx-auto p-6 md:p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl transition-all duration-500 transform hover:shadow-2xl">
      <h3 className="text-3xl font-extrabold text-teal-600 dark:text-teal-400 mb-2">{t('employerFormTitle')}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{t('employerFormSubtitle')}</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('companyName')}</label>
          <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('contactPerson')}</label>
          <input type="text" id="contactPerson" name="contactPerson" value={formData.contactPerson} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('email')}</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('phone')}</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} required />
        </div>

        <button type="submit" className="w-full py-3 px-6 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-lg flex items-center justify-center text-lg mt-6">
          <Send size={20} className="mr-3" />
          {t('redirectButton')}
        </button>
      </form>
      <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4 italic">{t('redirectMessage')}</p>
    </div>
  );
};

// ---------------------------
// Category Dropdown (hover)
// ---------------------------
const CategoryDropdown = ({ category, setCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative h-full" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button type="button" className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-teal-500 transition-all cursor-pointer text-base flex justify-between items-center h-full" aria-expanded={isOpen}>
        {category === 'All' ? t('allCategories') : category}
        <ChevronDown size={20} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>

      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 max-h-60 overflow-y-auto">
          <button onClick={() => { setCategory('All'); setIsOpen(false); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${category === 'All' ? 'bg-teal-50 dark:bg-teal-900 text-teal-600 dark:text-teal-200 font-semibold' : 'text-gray-800 dark:text-white'}`}>{t('allCategories')}</button>
          {adzunaMockCategories.map((cat) => (
            <button key={cat} onClick={() => { setCategory(cat); setIsOpen(false); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${category === cat ? 'bg-teal-50 dark:bg-teal-900 text-teal-600 dark:text-teal-200 font-semibold' : 'text-gray-800 dark:text-white'}`}>{cat}</button>
          ))}
        </div>
      )}
    </div>
  );
};

// ---------------------------
// Hover Select wrapper for states/cities (Part 2)
// ---------------------------
const HoverSelectWrapper = ({ children, selectValue, setSelectValue, isDisabled, placeholder }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: '0.75rem',
      padding: '0.1rem',
      borderColor: state.isFocused ? 'rgb(20 184 166)' : 'rgb(209 213 219)',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      backgroundColor: 'rgb(249 250 251)',
      minHeight: '48px',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
    }),
    menu: (provided) => ({ ...provided, zIndex: 30, borderRadius: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)' }),
    option: (provided, state) => ({ ...provided, backgroundColor: state.isSelected ? 'rgb(20 184 166)' : state.isFocused ? 'rgb(243 244 246)' : 'white', color: state.isSelected ? 'white' : 'rgb(31 41 55)' }),
    singleValue: (provided) => ({ ...provided, color: 'rgb(31 41 55)' }),
    placeholder: (provided) => ({ ...provided, color: 'rgb(107 114 128)' }),
  };

  const handleSelectChange = (value) => {
    setSelectValue(value);
    setMenuIsOpen(false);
  };

  return (
    <div onMouseEnter={() => !isDisabled && setMenuIsOpen(true)} onMouseLeave={() => setMenuIsOpen(false)}>
      <Select
        value={selectValue}
        onChange={handleSelectChange}
        options={children}
        menuIsOpen={menuIsOpen}
        styles={selectStyles}
        isDisabled={isDisabled}
        placeholder={placeholder}
      />
    </div>
  );
};

// ---------------------------
// JobCard component (small buttons)
// ---------------------------
const JobCard = ({ job, onViewDetails, onApplyNow }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 text-xs font-semibold rounded-full">{job.category}</span>
        <span className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
          <Banknote size={16} className="mr-1 text-yellow-500" />
          {job.salary || 'Negotiable'}
        </span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 leading-snug">{job.title}</h3>
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center mb-3">
        <Building size={16} className="mr-1 text-gray-500" />
        {job.company}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mb-4">
        <MapPin size={16} className="mr-1 text-gray-500" />
        {job.location}, {job.state} &middot; {job.type}
      </p>
      <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-4">{job.description}</p>
    </div>
    <div className="flex space-x-3 mt-4">
      <button onClick={() => onViewDetails(job)} className="flex-1 py-1.5 px-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-xs">View Description</button>
      <button onClick={() => onApplyNow(job)} className="flex-1 py-1.5 px-3 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 transition-colors text-xs text-center">Apply</button>
    </div>
  </div>
);

// ---------------------------
// GovernmentJobsDropdown (in-place behavior: calls onSelect)
// ---------------------------
const GovernmentJobsDropdown = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const choose = (type) => {
    onSelect(type.toLowerCase()); // 'central'|'state'|'private'
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className={`py-2 px-4 rounded-full font-semibold transition-all duration-300 flex items-center h-full ${isOpen ? 'bg-teal-600 text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-teal-600 border border-teal-600 hover:bg-teal-50 dark:hover:bg-gray-700'}`}
      >
        <Landmark size={20} className="mr-2" />
        {t('govtJobs')}
        <ChevronDown size={20} className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-40 p-2">
          <button onClick={() => choose('Central')} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center font-medium">
            <Shield size={16} className="mr-2 text-blue-500" /> Central Govt Jobs
          </button>
          <button onClick={() => choose('State')} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center font-medium">
            <MapPin size={16} className="mr-2 text-red-500" /> State Govt Jobs
          </button>
          <button onClick={() => choose('Private')} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center font-medium">
            <Briefcase size={16} className="mr-2 text-gray-600" /> Private Jobs
          </button>
        </div>
      )}
    </div>
  );
};

// ---------------------------
// JobSection (main) - merged Parts 1/2/3
// - selectedGovtType controls in-place Govt panel rendering
// ---------------------------
const JobSection = () => {
  const navigate = useNavigate();

  // state
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedState, setSelectedState] = useState(indianStatesAndCities[0]);
  const [selectedCity, setSelectedCity] = useState({ label: 'All', value: 'All' });
  const [userRole, setUserRole] = useState('Job Seeker');

  // --- NEW: posted-by-employers state ---
  const [employerJobs, setEmployerJobs] = useState([]);
  const [employerLoading, setEmployerLoading] = useState(false);
  const [employerError, setEmployerError] = useState(null);

  const [showJobModal, setShowJobModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showOtherPortalsModal, setShowOtherPortalsModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const rpp = 50;

  // redirect confirmation target
  const [redirectTarget, setRedirectTarget] = useState(null);

  // in-place govt panel state: null | 'central' | 'state' | 'private'
  const [selectedGovtType, setSelectedGovtType] = useState(null);

  // city options based on state
  const cityOptions = useMemo(() => {
    const stateData = indianStatesAndCities.find(s => s.value === selectedState.value);
    if (!stateData) return [{ label: t('all'), value: 'All' }];
    return stateData.cities.map(city => ({ label: city, value: city }));
  }, [selectedState]);

  // fetchJobs (Part 3 code integrated)
  const fetchJobs = async (pageToFetch = 1) => {
    setLoading(true);
    setError(null);

    try {
      // build query
      let query = searchTerm.trim();
      if (selectedCategory !== 'All' && !query) query = selectedCategory;
      else if (selectedCategory !== 'All' && query) query = `${query} ${selectedCategory}`;
      else if (!query) query = 'IT jobs';

      // location
      let locationQuery = selectedState.value;
      if (selectedCity.value && selectedCity.value !== 'All' && selectedState.value !== 'India') locationQuery = selectedCity.value;
      else if (selectedState.value === 'India') locationQuery = 'India';
      else locationQuery = selectedState.value;

      const url = new URL(`${API_BASE_URL}/api/jobs`);
      url.searchParams.append('q', query);
      url.searchParams.append('location', locationQuery);
      url.searchParams.append('page', pageToFetch);
      url.searchParams.append('rpp', rpp);

      const response = await fetch(url.toString());

      const contentType = response.headers.get("content-type");
      if (!response.ok || !contentType || !contentType.includes("application/json")) {
        let errorText = await response.text();
        console.error("Non-JSON response (likely HTML):", (errorText || '').substring(0, 200) + '...');
        throw new Error(`Expected JSON but received '${contentType}'. Backend may be down or returning HTML error.`);
      }

      const data = await response.json();
      const transformedJobs = (data.results || []).map(transformAdzunaJob);

      if (pageToFetch > 1) setJobs(prev => [...prev, ...transformedJobs]);
      else setJobs(transformedJobs);

      setTotalJobs(data.count || 0);
      setPage(pageToFetch);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(t('errorFetchingJobs'));
      if (pageToFetch === 1) setJobs([]);
    } finally {
      setLoading(false);
    }
  };

// --- NEW: fetch posted-by-employers (calls Lambda landing path) ---
const fetchEmployerPostedJobs = async () => {
  setEmployerLoading(true);
  setEmployerError(null);

  try {
    // ✅ The correct API path (now under /Jobposting)
    const url = `${EMPLOYER_JOBS_API_BASE}/user/jobs`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'x-role': 'user',
      },
    });

    const contentType = res.headers.get('content-type') || '';
    if (!res.ok || !contentType.includes('application/json')) {
      const txt = await res.text();
      console.error('Employer jobs non-json response:', txt.substring(0, 300));
      throw new Error('Employer jobs backend error or non-JSON response');
    }

    const parsed = await res.json();

    // ✅ Lambda returns { message: "...", jobs: [...] }
    const rawJobs = parsed.jobs || (Array.isArray(parsed) ? parsed : []);
    const mapped = rawJobs.map(transformEmployerJob);
    setEmployerJobs(mapped);
  } catch (err) {
    console.error('Failed to fetch employer-posted jobs:', err);
    setEmployerError('Failed to fetch employer jobs. Please try again later.');
    setEmployerJobs([]);
  } finally {
    setEmployerLoading(false);
  }
};

  // initial & filters effect
  useEffect(() => {
    if (userRole === 'Job Seeker') fetchJobs(1);
    else { setJobs([]); setTotalJobs(0); }
  }, [searchTerm, selectedCategory, selectedState, selectedCity, userRole]);

  // when user toggles to PostedByEmployers, fetch employer posts
  useEffect(() => {
    if (userRole === 'PostedByEmployers') {
      fetchEmployerPostedJobs();
    }
  }, [userRole]);

  // reset city when state changes
  useEffect(() => setSelectedCity({ label: 'All', value: 'All' }), [selectedState]);

  // modal handlers
  const handleViewDetails = (job) => { setSelectedJob(job); setShowJobModal(true); };
  const handleApplyNow = (job) => { setSelectedJob(job); setShowApplyModal(true); };
  const handleLoadMore = () => fetchJobs(page + 1);

  // handle portal clicks (show redirect modal)
  const handlePortalClick = (portal) => {
    setRedirectTarget({ link: portal.link, name: portal.name });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-12">
      {/* Modals */}
      {showJobModal && selectedJob && <JobDescriptionModal job={selectedJob} onClose={() => setShowJobModal(false)} />}
      {showApplyModal && selectedJob && <ApplyModal job={selectedJob} onClose={() => setShowApplyModal(false)} setShowOtherPortalsModal={setShowOtherPortalsModal} />}
      {showOtherPortalsModal && selectedJob && <OtherPortalsModal onClose={() => setShowOtherPortalsModal(false)} job={selectedJob} setRedirectTarget={setRedirectTarget} />}
      {redirectTarget && <RedirectConfirmationModal targetLink={redirectTarget.link} portalName={redirectTarget.name} onClose={() => setRedirectTarget(null)} />}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-3">{t('title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
        </header>

        {/* Role buttons + Govt jobs */}
        <div className="flex justify-center items-center mb-12 space-x-4">
          <button onClick={() => setUserRole('Job Seeker')} className={`py-2 px-6 rounded-full font-semibold transition-colors duration-200 flex items-center shadow-lg ${userRole === 'Job Seeker' ? 'bg-teal-600 text-white' : 'bg-white dark:bg-gray-800 text-teal-600 border border-teal-600 hover:bg-teal-50 dark:hover:bg-gray-700'}`}>
            <UserRoundPlus size={20} className="mr-2" /> {t('jobSeeker')}
          </button>

          <button onClick={() => setUserRole('Employer')} className={`py-2 px-6 rounded-full font-semibold transition-colors duration-200 flex items-center shadow-lg ${userRole === 'Employer' ? 'bg-teal-600 text-white' : 'bg-white dark:bg-gray-800 text-teal-600 border border-teal-600 hover:bg-teal-50 dark:hover:bg-gray-700'}`}>
            <Building size={20} className="mr-2" /> {t('employer')}
          </button>

          {/* NEW BUTTON: Posted by Employers */}
          <button onClick={() => setUserRole('PostedByEmployers')} className={`py-2 px-6 rounded-full font-semibold transition-colors duration-200 flex items-center shadow-lg ${userRole === 'PostedByEmployers' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-indigo-600 border border-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-700'}`}>
            <Briefcase size={20} className="mr-2" /> Posted by Employers
          </button>

          <GovernmentJobsDropdown onSelect={(type) => setSelectedGovtType(type)} />
        </div>

        {/* If selectedGovtType -> render in-place Govt panel */}
        {selectedGovtType ? (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-2xl mb-12 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedGovtType === 'central' ? 'Central Government Jobs' : selectedGovtType === 'state' ? 'State Government Jobs' : 'Private Jobs'}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Official links and portals for {selectedGovtType === 'private' ? 'private job boards' : selectedGovtType + ' government' }.</p>
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={() => setSelectedGovtType(null)} className="py-2 px-4 rounded-full bg-gray-100 dark:bg-gray-700 text-slate-900 dark:text-white hover:bg-gray-200 transition">Back</button>
                <button onClick={() => { setSelectedGovtType(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="py-2 px-4 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition">Close Panel</button>
              </div>
            </div>

            <GovtJobsPanel selectedGovtType={selectedGovtType} onPortalClick={handlePortalClick} />

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">Clicking any portal will show a redirect confirmation before opening the external site.</p>
          </div>
        ) : userRole === 'Employer' ? (
          <EmployerForm navigate={navigate} />
        ) : userRole === 'PostedByEmployers' ? (
          // --- NEW: Posted by Employers view ---
          <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-2xl mb-12 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Jobs Posted by Employers</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">These are jobs posted directly by employers through the Employer Dashboard.</p>
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={() => { setUserRole('Job Seeker'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="py-2 px-4 rounded-full bg-gray-100 dark:bg-gray-700 text-slate-900 dark:text-white hover:bg-gray-200 transition">Back to Jobs</button>
                <button onClick={() => fetchEmployerPostedJobs()} className="py-2 px-4 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition">Refresh</button>
              </div>
            </div>

            {employerLoading && (
              <div className="text-center py-8">
                <Loader size={40} className="animate-spin text-indigo-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Loading employer postings...</p>
              </div>
            )}

            {employerError && (
              <div className="text-center py-6 bg-red-50 dark:bg-red-900/50 p-4 rounded-xl border border-red-200 dark:border-red-700">
                <AlertTriangle size={28} className="text-red-600 mx-auto mb-2" />
                <p className="text-red-700 dark:text-red-300">{employerError}</p>
              </div>
            )}

            {!employerLoading && employerJobs.length === 0 && !employerError && (
              <div className="text-center py-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">No employer-posted jobs found.</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Employers will see their posts appear here after they publish from the dashboard.</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {employerJobs.map(job => (
                <JobCard key={job.id} job={job} onViewDetails={handleViewDetails} onApplyNow={handleApplyNow} />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-3xl shadow-2xl mb-12 border border-gray-100 dark:border-gray-700">
              <form className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div className="md:col-span-2 relative">
                  <label htmlFor="search" className="sr-only">Search</label>
                  <input type="text" id="search" placeholder={t('searchPlaceholder')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all" />
                  <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                <CategoryDropdown category={selectedCategory} setCategory={setSelectedCategory} />

                <HoverSelectWrapper selectValue={selectedState} setSelectValue={setSelectedState} placeholder={t('selectState')}>
                  {indianStatesAndCities}
                </HoverSelectWrapper>

                <HoverSelectWrapper selectValue={selectedCity} setSelectValue={setSelectedCity} isDisabled={selectedState.value === 'India'} placeholder={selectedState.value === 'India' ? 'Any City' : t('selectCity')}>
                  {cityOptions}
                </HoverSelectWrapper>
              </form>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <TrendingUp size={24} className="mr-2 text-teal-600" />
              {totalJobs > 0 ? `${totalJobs} Jobs Found` : 'Latest Job Opportunities'}
            </h2>

            {loading && page === 1 && (
              <div className="text-center py-10">
                <Loader size={48} className="animate-spin text-teal-600 mx-auto mb-4" />
                <p className="text-lg text-gray-600 dark:text-gray-400">{t('fetchingJobs')}</p>
              </div>
            )}

            {error && (
              <div className="text-center py-10 bg-red-50 dark:bg-red-900/50 p-6 rounded-xl border border-red-200 dark:border-red-700">
                <AlertTriangle size={32} className="text-red-600 mx-auto mb-4" />
                <p className="text-lg text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            {!loading && jobs.length === 0 && !error && (
              <div className="text-center py-10 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <Search size={32} className="text-gray-500 mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">No jobs found matching your criteria.</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search term, category, or location.</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobs.map(job => (
                <JobCard key={job.id} job={job} onViewDetails={handleViewDetails} onApplyNow={handleApplyNow} />
              ))}
            </div>

            {jobs.length < totalJobs && (
              <div className="text-center mt-12">
                <button onClick={handleLoadMore} disabled={loading} className="py-3 px-10 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 transition-all duration-300 shadow-xl flex items-center justify-center mx-auto disabled:opacity-50">
                  {loading ? <Loader size={20} className="animate-spin mr-3" /> : <ChevronDown size={20} className="mr-3" />}
                  {t('viewMoreButton')} ({totalJobs - jobs.length} remaining)
                </button>
              </div>
            )}

            {jobs.length > 0 && jobs.length >= totalJobs && (
              <div className="text-center mt-12">
                <p className="text-gray-500 dark:text-gray-400">That's all for now! You've seen all {totalJobs} jobs matching your criteria.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobSection;
