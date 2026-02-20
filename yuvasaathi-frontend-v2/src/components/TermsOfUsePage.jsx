// src/components/TermsOfUsePage.jsx
import React from 'react';
import LegalPageLayout from './LegalPageLayout'; 
import { UserCheck, ShieldOff, Server, Anchor, AlertTriangle, Fingerprint } from 'lucide-react';

const TermsOfUsePage = () => {
  return (
    <LegalPageLayout 
      title="Terms of Use (TOS)" // Assuming this passes the title appropriately
      subtitle="Mandatory binding agreement governing the use and access of the Yuva Saathi Portal."
      lastUpdated="October 20, 2025" 
    >
      {/* Introduction Paragraph Styling */}
      <p className="text-base text-gray-700 dark:text-gray-300 border-b pb-4 mb-6 border-gray-200 dark:border-slate-700">
        <Anchor size={16} className="inline mr-2 text-teal-600"/>
        This document constitutes the official **Terms of Service** for the Yuva Saathi Digital Portal (hereinafter, "**The Service**"), mandated by the Government of Bihar for the express purpose of Skill Development and Employment Facilitation. Your use of The Service signifies your unconditional consent to this agreement, which is governed by the laws of India.
      </p>

      {/* --- Section 1 --- */}
      {/* H2 Styling: Minimal, reduced size (text-xl) and reduced weight (font-semibold) */}
      <h2 className="mt-8 mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100 pb-1">1. Mandate, Eligibility, and Consent</h2>
      
      {/* H3 Styling: Minimal, reduced weight (font-medium) */}
      <h3 className="mt-5 text-lg font-medium text-teal-600 dark:text-teal-400">1.1 Binding Mandate and Acceptance</h3>
      <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
        These Terms replace any prior agreements. **Continuous use** of the application after the "Last Updated" date constitutes your full acceptance of all amendments. Disputes are subject to the jurisdiction defined in **Section 5**.
      </p>

      <h3 className="mt-5 text-lg font-medium text-teal-600 dark:text-teal-400 flex items-center">
        1.2 Biometric and Identity Consent <Fingerprint size={18} className="inline ml-2 text-yellow-500"/>
      </h3>
      <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
        By creating an account, you provide **explicit, revocable consent** for The Service to use your **Aadhaar/VID (Virtual ID)** for two-factor authentication and for cross-referencing your credentials with **DigiLocker** and the **Academic Bank of Credits (ABC)** infrastructure. This consent is specifically for the purpose of verifying your identity and skill claims to registered employers and government auditors.
      </p>

      <h3 className="mt-5 text-lg font-medium text-teal-600 dark:text-teal-400">1.3 Employer Verification and Liability</h3>
      <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
        Employers posting jobs must hold a valid **Government-issued Entity Identifier** (e.g., Udyam Registration, GSTIN) and comply with all central/state labour laws, including mandatory ESI/PF registration where applicable. The Service acts only as a facilitator; it **does not assume liability** for any disputes, wage arrears, or adverse events arising between the employer and the job seeker.
      </p>

      {/* --- Section 2 --- */}
      <h2 className="mt-8 mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100 pb-1">2. Data Integrity and Prohibited Uses</h2>

      <h3 className="mt-5 text-lg font-medium text-teal-600 dark:text-teal-400">2.1 Certification Validity and Audits</h3>
      <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
        All skill certifications and educational records linked to your profile are subject to periodic **electronic audit** by the National Council for Vocational Education and Training (NCVET) or Sector Skill Councils (SSCs). Any data found to be fraudulent, misleading, or in violation of the **IT Act, 2000**, will result in immediate and **permanent suspension** of the profile.
      </p>

      <h3 className="mt-5 text-lg font-medium text-teal-600 dark:text-teal-400 flex items-center">
        2.2 Digital Misconduct and Scraping <ShieldOff size={18} className="inline ml-2 text-red-500"/>
      </h3>
      <p className="text-base text-gray-700 dark:text-gray-300 mb-2">The following technical activities are explicitly **prohibited**:</p>
      {/* Styled List for Professional Look */}
      <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300">
        <li>**API Abuse:** Unauthorized access or excessive, non-human consumption of the Job/Skill APIs.</li>
        <li>**Data Mirroring:** Replication of the core Yuva Saathi job database for creating a competitive/alternative service.</li>
        <li>**Credential Phishing:** Using the platform to solicit personal or financial details from other users or impersonate a government official.</li>
      </ul>
        <div className="mb-4"/> {/* Add spacing after list */}

      {/* --- Section 3 --- */}
      <h2 className="mt-8 mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100 pb-1">3. System Availability and Service Levels</h2>
      <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
        <Server size={16} className="inline mr-2 text-teal-600"/>
        The Service is deployed on a **NIC (National Informatics Centre)** compliant cloud infrastructure. While we aim for **99.9% uptime**, access may be restricted or suspended for scheduled maintenance, security patches, or during periods of national emergency without prior notification. No monetary compensation will be offered for temporary service interruptions.
      </p>

      {/* --- Section 4 --- */}
      <h2 className="mt-8 mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100 pb-1">4. Intellectual Property and Government Logos</h2>
      <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
        You are granted a **limited license** to use the output (e.g., job application status, verified skill card) for personal, non-commercial use. All branding, logos (including co-branding with **Skill India** or **Digital India**), and application source code remain the exclusive property of the Government of Bihar and/or the Ministry of Skill Development and Entrepreneurship. Unauthorized usage is subject to penalty under the **Emblems and Names (Prevention of Improper Use) Act, 1950.**
      </p>

      {/* --- Section 5 --- */}
      <h2 className="mt-8 mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100 pb-1">5. Dispute Resolution and Jurisdiction</h2>
      <p className="text-base text-gray-700 dark:text-gray-300 mb-2">
        <AlertTriangle size={16} className="inline mr-2 text-red-600"/>
        Any claims or controversies arising out of or relating to the use of The Service must first be submitted to the **Yuva Saathi Grievance Redressal Mechanism** (Level 1). If the issue remains unresolved after 60 days, the **exclusive jurisdiction** for all legal proceedings shall lie with the competent courts in **Patna, Bihar, India**.
      </p>
      <p className="text-base text-gray-700 dark:text-gray-300 font-medium italic">
        **Process:** Filing a grievance requires a valid User ID, a detailed incident report, and a minimum waiting period of 30 days for Level 1 investigation.
      </p>

    </LegalPageLayout>
  );
};

export default TermsOfUsePage;