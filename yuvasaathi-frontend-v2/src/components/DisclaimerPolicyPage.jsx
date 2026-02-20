// src/components/DisclaimerPolicyPage.jsx
import React from 'react';
import LegalPageLayout from './LegalPageLayout';
import { AlertOctagon, Link, BarChart, FileText, Globe, DollarSign, Database, ShieldOff } from 'lucide-react';

const DisclaimerPolicyPage = () => {
    // Define professional document heading classes for minimal look
    const sectionHeadingClass = "mt-8 mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100 pb-1";
    const subSectionHeadingClass = "mt-5 text-lg font-medium text-teal-600 dark:text-teal-400 flex items-center";
    const contentParagraphClass = "text-base text-gray-700 dark:text-gray-300 mb-4";
    const highlightBlockClass = "p-3 my-3 border-l-4 border-yellow-600 bg-yellow-50 dark:bg-slate-700 text-sm italic";

    return (
        <LegalPageLayout
            title="Official Disclaimer Policy"
            subtitle="Statement defining the limits of liability, data accuracy, and responsibility for external content."
            lastUpdated="October 25, 2025"
        >
            {/* Primary Important Notice Block (Stays prominent) */}
            <div className="p-4 mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 rounded-lg shadow-md flex items-start space-x-3">
                <AlertOctagon size={24} className="text-red-600 flex-shrink-0 mt-1" />
                <p className="text-gray-800 dark:text-gray-200 text-base font-medium">
                    **IMPORTANT NOTICE:** The Yuva Saathi Portal (The Service) is an **employment facilitator** and **skill information aggregator**. It operates on an **"AS IS"** and **"AS AVAILABLE"** basis. The Government of Bihar explicitly disclaims all warranties, express or implied, to the maximum extent permitted by law.
                </p>
            </div>

            {/* --- Section 1: Job Listings and External Employer Liability --- */}
            <h2 className={sectionHeadingClass}>1. Job Listings and External Employer Liability</h2>

            <h3 className={subSectionHeadingClass}>
                <FileText size={20} className="mr-2 text-yellow-600"/> 1.1 Third-Party Content Disclaimer
            </h3>
            <p className={contentParagraphClass}>
                The Service hosts job listings and training programs posted by registered external entities (**Employers, Training Partners**). The Service does not endorse or certify the solvency, integrity, or hiring practices of these third parties.
            </p>
            <p className={highlightBlockClass}>
                **USER DUE DILIGENCE:** Job seekers are strongly advised to perform their own due diligence before accepting any offer or sharing sensitive information.
            </p>

            <h3 className={subSectionHeadingClass}>
                <DollarSign size={20} className="mr-2 text-red-600"/> 1.2 Financial and Wage Liability
            </h3>
            <p className={contentParagraphClass}>
                The Service is **not responsible** for any salary arrears, payment disputes, or breach of contract between a job seeker and an employer. The Service's role ends upon successful connection; all subsequent employment terms and conditions are strictly between the user and the employing entity.
            </p>

            {/* --- Section 2: Data Accuracy and Reliability --- */}
            <h2 className={sectionHeadingClass}>2. Data Accuracy and Reliability</h2>

            <h3 className={subSectionHeadingClass}>
                <BarChart size={20} className="mr-2 text-teal-600"/> 2.1 Aggregated Data Disclaimer
            </h3>
            <p className={contentParagraphClass}>
                Data presented on the portal, including labor statistics, market demand projections, and scheme eligibility, is compiled from various government and public domain sources.
            </p>
            <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                <li>The Service **does not guarantee** the absolute accuracy, completeness, or timeliness of this aggregated information.</li>
                <li>Users must **cross-verify critical details** with the relevant nodal government department before relying solely on this portal's data.</li>
            </ul>

            <h3 className={subSectionHeadingClass}>
                <Database size={20} className="mr-2 text-blue-600"/> 2.2 Educational Certification Verification
            </h3>
            <p className={contentParagraphClass}>
                The portal aggregates certification data from the Academic Bank of Credits (ABC) and Skill India databases. The validity and legal standing of any certificate or degree remain the sole responsibility of the **issuing educational or certifying body**, not the Yuva Saathi Portal.
            </p>

            {/* --- Section 3: External Links and Hyperlinks --- */}
            <h2 className={sectionHeadingClass}>3. External Links and Hyperlinks</h2>

            <h3 className={subSectionHeadingClass}>
                <Link size={20} className="mr-2 text-purple-600"/> 3.1 Third-Party Site Responsibility
            </h3>
            <p className={contentParagraphClass}>
                The Service contains links to external government websites (e.g., PMKVY, NCS, Udyam Registration) and other third-party resources for convenience.
            </p>
            <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                <li>The Service has **no control** over the content, privacy practices, or security of these external sites.</li>
                <li>The inclusion of any link does not imply official endorsement by the Government of Bihar.</li>
            </ul>

            <h3 className={subSectionHeadingClass}>
                <ShieldOff size={20} className="mr-2 text-red-500"/> 3.2 Security Risk
            </h3>
            <p className={contentParagraphClass}>
                Users access external sites **entirely at their own risk**. The Service is not liable for any damages, data loss, or security breaches (including malware or viruses) encountered while navigating to or using third-party websites linked from this portal.
            </p>

            {/* --- Section 4: Policy Updates and Review --- */}
            <h2 className={sectionHeadingClass}>4. Policy Updates and Review</h2>
            <div className="mt-6 p-4 bg-gray-100 dark:bg-slate-700/50 rounded-lg shadow-inner">
                <p className="flex items-center text-gray-700 dark:text-gray-300 font-medium">
                    <Globe size={18} className="mr-3 text-gray-600 dark:text-gray-400 flex-shrink-0"/>
                    This Disclaimer Policy is subject to revision and update without specific prior notification. The date of the **last update** is clearly indicated on the top of this page. Your continued use of the service constitutes explicit acceptance of the current policy in its entirety.
                </p>
            </div>

        </LegalPageLayout>
    );
};

export default DisclaimerPolicyPage;