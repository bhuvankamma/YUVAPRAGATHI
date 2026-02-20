import React from 'react';
import LegalPageLayout from './LegalPageLayout'; // Corrected import path to relative (./)
import { Mail, Shield, Zap, Fingerprint, Users, Clock, Database, CheckSquare, Layers } from 'lucide-react';

/**
 * Advanced Privacy Policy Page Component.
 * Emphasizes Data Principal consent, Mandate-based collection, and DPDP Act compliance.
 */
const PrivacyPolicyPage = () => {

    // Define professional document heading classes for minimal look
    const sectionHeadingClass = "mt-8 mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100 pb-1";
    const subSectionHeadingClass = "mt-5 text-lg font-medium text-teal-600 dark:text-teal-400 flex items-center";
    const contentParagraphClass = "text-base text-gray-700 dark:text-gray-300 mb-4";
    const listItemClass = "text-base text-gray-700 dark:text-gray-300";


  return (
    <LegalPageLayout 
      title="Privacy Policy" 
      subtitle="Governing the collection, processing, and protection of digital personal data as mandated by the DPDP Act, 2023."
      lastUpdated="October 20, 2025" 
    >
      <p className={`${contentParagraphClass} border-b pb-4 mb-6 border-gray-200 dark:border-slate-700`}>
        <Shield size={16} className="inline mr-2 text-teal-600"/>
        The Yuva Saathi digital service operates as a **Data Fiduciary** on behalf of the Government of Bihar. This policy outlines our **lawful purpose** for collecting, processing, and protecting your data, in strict adherence to the **Digital Personal Data Protection (DPDP) Act, 2023**.
      </p>

      {/* --- Section 1: Lawful Purpose and Mandate --- */}
      <h2 className={sectionHeadingClass}>1. Lawful Purpose and Data Collection Mandate</h2>
      
      <h3 className={subSectionHeadingClass}>
          <Database size={18} className="mr-2"/> 1.1 Data Collected (Mandatory Fields)
      </h3>
      <p className={contentParagraphClass}>
        Collection is strictly limited to the data necessary for the lawful purpose of **identity verification, skill credentialing, and targeted employment facilitation**. Key categories include:
      </p>
      {/* Structured List Block */}
      <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg space-y-2 mb-4">
          <p className={listItemClass}>**Aadhaar/VID and Biometric Hash:** Used strictly for identity de-duplication and secure linkage to DigiLocker/ABC. (**High Sensitivity**).</p>
          <p className={listItemClass}>**Skill Data:** PMKVY/NCVET certification numbers, course completion dates, and scores.</p>
          <p className={listItemClass}>**Contact and Geolocation:** Verified mobile number, email, and permanent state/district residence (for scheme eligibility).</p>
      </div>

      <h3 className={subSectionHeadingClass}>
        <Fingerprint size={18} className="mr-2 text-yellow-600"/> 1.2 Data Principal Consent and Notice
      </h3>
      <p className={contentParagraphClass}>
        Your use of the service constitutes **informed consent**. By agreeing, you authorize the Service to perform the following operations:
      </p>
      <ol className="list-decimal pl-8 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
        <li>**Verification:** Utilizing your Aadhaar/VID for secure API calls to government identity services (not stored directly).</li>
        <li>**Matchmaking:** Secure, anonymized sharing of your skill/experience data with verified Employers (Data Processors).</li>
        <li>**Auditing:** Data sharing with authorized Government Auditors (e.g., CAG) for program evaluation and transparency.</li>
      </ol>

      {/* --- Section 2: Processing and Disclosure Protocol --- */}
      <h2 className={sectionHeadingClass}>2. Data Processing and Disclosure Protocol</h2>
      
      <h3 className={subSectionHeadingClass}>
        <Users size={18} className="mr-2 text-teal-600"/> 2.1 Secure Disclosure to Verified Employers
      </h3>
      <p className={contentParagraphClass}>
        Personal data is released to a third-party Employer only upon **explicit action by the Data Principal** (you), such as applying for a job, and under the following conditions:
      </p>
      <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
        <li>The Employer is formally verified with a valid Government-issued Entity Identifier (e.g., GSTIN/Udyam ID).</li>
        <li>Only the data required for recruitment (e.g., Name, Mobile, Skills, Education) is shared. **Aadhaar/Biometric data is never shared.**</li>
      </ul>

      <h3 className={subSectionHeadingClass}>
        <Layers size={18} className="mr-2 text-blue-600"/> 2.2 Cross-Platform Data Exchange (Government APIs)
      </h3>
      <p className={contentParagraphClass}>
        We utilize secure Government of India APIs to enrich your profile and ensure data accuracy:
      </p>
      <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
        <li>**National Career Service (NCS):** For job posting aggregation.</li>
        <li>**E-Shram:** For validation of Unorganised Worker status.</li>
        <li>**DigiLocker/ABC:** For fetching verified copies of certificates and academic credits.</li>
      </ul>

      {/* --- Section 3: Security, Retention, and Rights --- */}
      <h2 className={sectionHeadingClass}>3. Data Security, Retention, and Rights</h2>

      <h3 className={subSectionHeadingClass}>
        <Zap size={18} className="mr-2 text-yellow-600"/> 3.1 Advanced Security Measures
      </h3>
      <p className={contentParagraphClass}>
        All data is housed on a **NIC/MeitY certified Government Cloud**. We enforce industry-leading security practices, including: **encryption in transit** (TLS 1.2+), **encryption at rest** (AES-256), and maintenance of an **immutable audit log** of all data access events.
      </p>

      <h3 className={subSectionHeadingClass}>
        <Clock size={18} className="mr-2 text-gray-600"/> 3.2 Data Retention Schedule
      </h3>
      <p className={contentParagraphClass}>
        Data retention is subject to mandatory archival policies for audit purposes:
      </p>
      <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
        <li>**Active Data:** Retained while the account is active or pending a service mandate (e.g., job placement).</li>
        <li>**Archived Data:** Deactivated profile data is retained for a minimum of **seven (7) years** for government audit, after which it is anonymized.</li>
      </ul>
      
      <h3 className={subSectionHeadingClass}>
        <CheckSquare size={18} className="mr-2 text-green-600"/> 3.3 Data Principal Rights (As per DPDP Act)
      </h3>
      <p className={contentParagraphClass}>
        You, as the Data Principal, have the following core rights:
      </p>
      <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
        <li>**Right to Access:** Request information about your data and processing history.</li>
        <li>**Right to Correction:** Have inaccurate data corrected promptly (via the profile update or Grievance process).</li>
        <li>**Right to Erasure:** Request data deletion, conditional on mandatory government archival periods (Section 3.2) being met.</li>
      </ul>
      
      {/* --- Section 4: Grievance Redressal --- */}
      <h2 className={sectionHeadingClass}>4. Grievance Redressal and Contact</h2>
      <p className={contentParagraphClass}>
        All formal requests regarding this Privacy Policy or your data rights must be directed to our designated Data Protection Officer (DPO) via the official channel:
      </p>
      <div className="p-4 bg-red-50 dark:bg-slate-800/70 border border-red-300 dark:border-red-700 rounded-lg my-4">
        <h4 className="font-semibold text-lg text-red-700 dark:text-red-400 flex items-center">
            <Shield size={20} className="mr-2"/> Nodal Data Protection Officer (DPO) Contact
        </h4>
        <p className="flex items-center space-x-2 mt-2 font-medium">
          <Mail size={16} className="text-red-600"/>
          <a href="mailto:privacygrievance@yuvasaathi.gov.in" className="text-blue-600 dark:text-blue-400 hover:underline">privacygrievance@yuvasaathi.gov.in</a>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          All data protection-related grievances will be acknowledged within **24 hours** and resolved within **30 working days**.
        </p>
      </div>
    </LegalPageLayout>
  );
};

export default PrivacyPolicyPage;