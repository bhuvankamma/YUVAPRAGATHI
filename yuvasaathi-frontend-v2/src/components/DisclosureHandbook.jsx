// src/documents/DisclosureHandbook.jsx (Content for the PDF download)
import React from 'react';
import { Briefcase, Gavel, User, DollarSign, Clock, List, Scale } from 'lucide-react';

const DisclosureHandbook = () => {
    // Styling for a professional, printable document look
    const docTitleClass = "text-3xl font-extrabold text-center mb-2 text-teal-800";
    const docSubtitleClass = "text-lg text-center font-medium text-gray-600 mb-8 border-b pb-3";
    const docSectionClass = "mt-8 mb-4 text-xl font-bold text-gray-900 border-l-4 border-teal-600 pl-3";
    const docSubheadingClass = "mt-5 text-lg font-semibold text-teal-700 flex items-center space-x-2";
    const docContentClass = "text-base text-gray-700 mb-4";
    const infoBoxClass = "p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm";
    
    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl min-h-[1000px]">
            <h1 className={docTitleClass}>PROACTIVE DISCLOSURE HANDBOOK</h1>
            <h2 className={docSubtitleClass}>RTI Act, 2005 - Section 4 Compliance for Yuva Saathi Portal (Govt. of Bihar)</h2>
            
            <div className="space-y-6">

                {/* --- Section 1: Organisation and Functions --- */}
                <h3 className={docSectionClass}><Briefcase size={22} className="inline mr-2"/>1. Organisation, Functions, and Duties (Section 4(1)(b)(i))</h3>
                <div className={infoBoxClass}>
                    <p className={docContentClass}>
                        **1.1. Core Mandate:** The Yuva Saathi Portal is a digital initiative under the **Department of Labour Resources, Government of Bihar**. Its core function is to facilitate **Skill Development and Employment Matching** for the youth of Bihar.
                    </p>
                    <p className={docContentClass}>
                        **1.2. Authority:** The portal operates under the authority of the **Bihar State Skill Development Mission (BSSDM)** and relevant central government mandates (e.g., Skill India Mission).
                    </p>
                </div>

                {/* --- Section 2: Powers and Duties of Officers --- */}
                <h3 className={docSectionClass}><User size={22} className="inline mr-2"/>2. Powers and Duties of Officers and Employees (Section 4(1)(b)(ii))</h3>
                
                <h4 className={docSubheadingClass}><Gavel size={18}/>2.1. Public Information Officer (PIO)</h4>
                <p className={docContentClass}>
                    The PIO is mandated to receive RTI applications, process requests for information, and ensure compliance with the **30-day statutory time limit**. The PIO does not hold policymaking authority but is the statutory point of contact for information release.
                </p>
                
                <h4 className={docSubheadingClass}><Scale size={18}/>2.2. First Appellate Authority (FAA)</h4>
                <p className={docContentClass}>
                    The FAA is the next higher authority to whom an applicant can appeal if dissatisfied with the PIO's response, or if the PIO fails to respond within the stipulated time. The FAA's decision is final within the Department's internal redressal structure.
                </p>

                {/* --- Section 3: Norms and Rules --- */}
                <h3 className={docSectionClass}><List size={22} className="inline mr-2"/>3. Norms Set for Discharge of Functions (Section 4(1)(b)(iv))</h3>
                <div className={infoBoxClass}>
                    <p className={docContentClass}>
                        **3.1. Service Delivery:** The portal adheres to **e-Governance Standards (MeitY)** for 99.9% uptime (excluding scheduled maintenance) and response times outlined in the **Citizen's Charter** (available separately).
                    </p>
                    <p className={docContentClass}>
                        **3.2. Record Keeping:** All digital records are classified, indexed, and maintained as per the **Public Records Act, 1993**. Records are archived on a NIC-certified government cloud infrastructure.
                    </p>
                </div>

                {/* --- Section 4: Budget and Remuneration --- */}
                <h3 className={docSectionClass}><DollarSign size={22} className="inline mr-2"/>4. Budget Allocated and Remuneration (Section 4(1)(b)(xii) & (x))</h3>
                
                <h4 className={docSubheadingClass}><DollarSign size={18}/>4.1. Budget Allocation</h4>
                <p className={docContentClass}>
                    Detailed budget expenditure reports for the development, maintenance, and operation of the Yuva Saathi Portal are published in the **Annual Compliance Report** (available for download in the main table). Funds are allocated under the head of **State Skill Development Schemes** and IT modernization.
                </p>
                
                <h4 className={docSubheadingClass}><Clock size={18}/>4.2. Monthly Remuneration</h4>
                <p className={docContentClass}>
                    The salary structure and monthly remuneration of all key officers (e.g., PIO, FAA, and Nodal Project Director) are disclosed in the **List of Public Information Officers** document, in adherence to transparency guidelines.
                </p>

            </div>

            <footer className="mt-12 pt-4 border-t border-gray-300 text-center text-xs text-gray-500">
                Document Version: 1.0 | Last Updated: 2024-04-01 | Issued by: Department of Labour Resources, Govt. of Bihar.
            </footer>
        </div>
    );
};

export default DisclosureHandbook;