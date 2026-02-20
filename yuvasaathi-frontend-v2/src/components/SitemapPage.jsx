import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Home, 
    Briefcase, 
    GraduationCap, 
    FileText, 
    Search, 
    Settings, 
    Copy, 
    AlertTriangle, 
    // FIX 3: Imported Mail icon to resolve 'Mail is not defined' error
    Mail 
} from 'lucide-react';

// FIX 1: Corrected path from '../components/LegalPageLayout' to './LegalPageLayout' (sibling import)
import LegalPageLayout from './LegalPageLayout';
// FIX 2: Corrected import from default 'GovtPortals' to NAMED export 'govtPortals'
import { govtPortals } from './GovtPortals'; 


// --- Core Application Routes (Centralized for Sitemap) ---
const applicationRoutes = [
    { path: '/', name: 'Home Portal', icon: Home, priority: '1.0' },
    { path: '/jobs/search', name: 'Job Search Engine (Advanced)', icon: Search, priority: '0.9' },
    { path: '/training-programs', name: 'Skill Training Catalogue', icon: GraduationCap, priority: '0.8' },
    { path: '/employer/login', name: 'Employer Login / Dashboard', icon: Briefcase, priority: '0.8' },
    { path: '/job-seeker/register', name: 'Job Seeker Registration', icon: Settings, priority: '0.7' },
    { path: '/about-us', name: 'About Yuva Saathi Initiative', icon: FileText, priority: '0.6' },
];

const policyRoutes = [
    { path: '/terms-of-use', name: 'Terms of Use (TOS)', icon: FileText, priority: '0.5' },
    { path: '/privacy-policy', name: 'Privacy Policy', icon: FileText, priority: '0.5' },
    { path: '/copyright-policy', name: 'Copyright Policy', icon: FileText, priority: '0.5' },
];

/**
 * Advanced Sitemap Page Component: Dynamically generated, structured, and includes utility features.
 */
const SitemapPage = () => {
    const [copyStatus, setCopyStatus] = useState(null);

    // Function to generate the sitemap data in JSON format for SEO/Admin use
    const generateSitemapJson = () => {
        const routes = [
            ...applicationRoutes, 
            ...policyRoutes, 
            // FIX 1 CONTINUED: Used the correctly imported 'govtPortals' array
            ...govtPortals.map(p => ({
                path: p.internalRoute, 
                name: `${p.name} Gateway`, 
                priority: '0.7',
                externalUrl: p.url
            }))
        ];

        return JSON.stringify(routes.map(r => ({
            loc: window.location.origin + r.path, // Use window.location.origin for full URL context
            priority: r.priority,
            name: r.name
        })), null, 2);
    };

    const handleCopy = () => {
        const jsonContent = generateSitemapJson();
        navigator.clipboard.writeText(jsonContent).then(() => {
            setCopyStatus('success');
            setTimeout(() => setCopyStatus(null), 3000);
        }).catch(() => {
            setCopyStatus('error');
            setTimeout(() => setCopyStatus(null), 3000);
        });
    };

    const StatusIndicator = () => {
        if (!copyStatus) return null;
        return (
            <span className={`flex items-center text-sm font-semibold ml-4 p-2 rounded-lg transition-opacity duration-300 ${
                copyStatus === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
                {copyStatus === 'success' ? 'Copied to Clipboard! ✅' : 'Copy Failed ❌'}
            </span>
        );
    };

    // --- Sub-Component for a clean link item ---
    const SitemapLinkItem = ({ path, name, icon: Icon, priority, isExternal = false }) => (
        <li className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg transition-all duration-300 hover:bg-teal-500/10 hover:shadow-md border-l-4 border-gray-300 dark:border-slate-700 hover:border-teal-500">
            <Link 
                to={path} 
                className="flex justify-between items-center text-gray-700 dark:text-gray-300"
            >
                <span className="flex items-center space-x-3 font-medium text-[14px]">
                    <Icon size={18} className="text-teal-500 flex-shrink-0" />
                    <span className="hover:text-teal-400 transition-colors">{name}</span>
                </span>
                <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                    Priority: {priority}
                </span>
            </Link>
        </li>
    );


    return (
        // FIX 1: Corrected usage of LegalPageLayout (removed the need for '../components/')
        <LegalPageLayout 
            title="Sitemap" 
            subtitle="Comprehensive map of all core user and administrative routes."
            lastUpdated="October 8, 2025"
        >
            <p>
                This official sitemap provides a clear, hierarchical overview of all major public and administrative routes available on the Yuva Saathi portal, structured for both users and search engine indexing.
            </p>

            {/* Admin Utility Bar */}
            <div className="flex justify-between items-center my-6 p-4 bg-slate-100 dark:bg-slate-800/50 border border-teal-500/30 rounded-lg">
                <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <AlertTriangle size={20} className="text-yellow-500 mr-2 flex-shrink-0" />
                    <span>Admin/SEO Utility: Export data for webmasters.</span>
                </div>
                <div className='flex items-center'>
                    <button
                        onClick={handleCopy}
                        className="flex items-center px-4 py-2 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-500 transition-colors shadow-md transform hover:scale-[1.02]"
                    >
                        <Copy size={16} className="mr-2" />
                        Copy SEO JSON
                    </button>
                    <StatusIndicator />
                </div>
            </div>

            {/* --- 1. Main Application Pages --- */}
            <h2>1. Core User Experience Routes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <ul className="space-y-3">
                    {applicationRoutes.slice(0, 3).map(route => (
                        <SitemapLinkItem key={route.path} {...route} />
                    ))}
                </ul>
                <ul className="space-y-3">
                    {applicationRoutes.slice(3).map(route => (
                        <SitemapLinkItem key={route.path} {...route} />
                    ))}
                </ul>
            </div>

            {/* --- 2. Skill Development Portal Gateways --- */}
            <h2>2. Govt. Portal Gateways (Dynamic Scroller Links)</h2>
            <p className='mb-4 text-gray-600 dark:text-gray-400'>These internal pages provide context and seamless transition to the official platforms.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* FIX 1 CONTINUED: Use the correctly imported 'govtPortals' array name */}
                {govtPortals.map((portal) => (
                    <Link 
                        key={portal.id} 
                        to={portal.internalRoute} 
                        title={portal.desc} 
                        className="block p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-yellow-500/70 hover:border-teal-500 group"
                    >
                        <div className="flex items-center space-x-3">
                            <span className="text-3xl transition-transform duration-300 group-hover:scale-110">{portal.icon}</span>
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-teal-400">{portal.name} Gateway</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{portal.desc}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* --- 3. Legal and Compliance Pages --- */}
            <h2 className='mt-10'>3. Legal, Policy, and Administration</h2>
            <ul className="space-y-3 my-6">
                {policyRoutes.map(route => (
                    <SitemapLinkItem key={route.path} {...route} icon={FileText} />
                ))}
                
                {/* FIX 3: Mail icon is now correctly imported and can be used */}
                <li className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg transition-all duration-300 hover:bg-teal-50/10 hover:shadow-md border-l-4 border-gray-300 dark:border-slate-700">
                    <a href="mailto:grievance@yuvasaathi.gov.in" className="flex items-center space-x-3 font-medium text-[14px] text-gray-700 dark:text-gray-300 hover:text-teal-400">
                        <Mail size={18} className="text-teal-500 flex-shrink-0" />
                        <span>Grievance Redressal (External Contact)</span>
                    </a>
                </li>
            </ul>

        </LegalPageLayout>
    );
};

export default SitemapPage;