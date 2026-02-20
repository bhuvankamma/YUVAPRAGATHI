// src/components/RTIDocumentsPage.jsx
import React, { useState } from 'react';
import LegalPageLayout from './LegalPageLayout';
import { FileSearch, Contact, Download, UserCheck, Mail, Phone, BookOpen } from 'lucide-react';

const rtiDocuments = [
    // IMPORTANT: THESE LINKS MUST POINT TO REAL PDF FILES ON YOUR SERVER TO WORK.
    { name: "Proactive Disclosure Handbook (Section 4)", date: "2024-04-01", format: "PDF", link: "/documents/rti/section4_disclosure.pdf" },
    { name: "List of Public Information Officers (PIOs)", date: "2024-10-01", format: "PDF", link: "/documents/rti/pio_list_latest.pdf" },
    { name: "RTI Annual Compliance Report - FY 24-25", date: "2025-03-31", format: "PDF", link: "/documents/rti/annual_report_fy25.pdf" },
    { name: "Fee and Payment Guidelines (Bihar)", date: "2023-08-15", format: "PDF", link: "/documents/rti/fee_guidelines_bihar.pdf" },
];

const nodalOfficers = [
    { role: "Public Information Officer (PIO)", name: "Shri Rajesh Kumar", designation: "Deputy Director, Planning", email: "pio.labour@bihar.gov.in", phone: "+91 612 XXXXXX01" },
    { role: "First Appellate Authority (FAA)", name: "Smt. Anjali Singh", designation: "Director, Skill Development", email: "faa.skill@bihar.gov.in", phone: "+91 612 XXXXXX02" },
];

const RTIDocumentsPage = () => {
    // Set default tab to 'documents' to match the screenshot
    const [activeTab, setActiveTab] = useState('documents'); 

    const TabButton = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-t-lg transition-all duration-300 font-semibold ${
                activeTab === id 
                    ? 'bg-white dark:bg-slate-800 text-teal-600 border-b-4 border-teal-600'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:text-teal-500'
            }`}
        >
            <Icon size={20} />
            <span>{label}</span>
        </button>
    );

    return (
        <LegalPageLayout
            title="Right to Information (RTI)"
            subtitle="Ensuring transparency: Official documents and contact details for RTI applications."
            lastUpdated="October 1, 2025"
        >
            <div className="flex space-x-2 border-b border-gray-200 dark:border-slate-700 mb-6">
                <TabButton id="process" icon={FileSearch} label="RTI Process & Forms" />
                <TabButton id="officers" icon={Contact} label="Nodal Officers" />
                <TabButton id="documents" icon={Download} label="Proactive Disclosures" />
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-inner min-h-[300px]">
                
                {/* --- RTI PROCESS TAB --- */}
                {activeTab === 'process' && (
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <h3 className="flex items-center space-x-2"><UserCheck size={20} className="text-teal-600"/><span>How to File an RTI Request</span></h3>
                        <p>
                            Applications under the Right to Information Act, 2005, pertaining to the Yuva Saathi Portal or the Department of Labour Resources, Government of Bihar, must be submitted to the designated Public Information Officer (PIO).
                        </p>
                        <ol className="list-decimal pl-5 space-y-3">
                            <li>**Formal Application:** The request must be in writing (English or Hindi), clearly specifying the information required.</li>
                            <li>**Payment:** Include the mandated RTI fee (as per Bihar State Rules) via Demand Draft or Treasury Challan in favor of the relevant Accounts Officer.</li>
                            <li>**Submission:** Send the signed application and fee by speed post or submit it in person to the PIO's office (details in the **Nodal Officers** tab).</li>
                            <li>**Online Option:** For convenience, citizens can use the <a href="https://rtionline.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">RTI Online Portal (External Link)</a>, selecting the relevant State/Central Ministry.</li>
                        </ol>
                        <p className="mt-4 p-3 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-slate-700 text-sm">
                            **Time Limit:** Information must be provided within **30 days** of receiving the application by the PIO. Appeals should be filed within 30 days of the decision.
                        </p>
                    </div>
                )}

                {/* --- NODAL OFFICERS TAB --- */}
                {activeTab === 'officers' && (
                    <div className="space-y-6">
                        <p className="text-gray-700 dark:text-gray-300">
                            Please contact the relevant officer based on the nature of your request or appeal.
                        </p>
                        {nodalOfficers.map((officer, index) => (
                            <div key={index} className="p-5 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-700/50 shadow-md">
                                <h4 className="text-xl font-bold text-teal-600 mb-2">{officer.role}</h4>
                                <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">{officer.name}</p>
                                <p className="text-md text-gray-600 dark:text-gray-300 mb-3">{officer.designation}</p>
                                <div className="space-y-1 text-sm">
                                    <p className="flex items-center text-gray-700 dark:text-gray-200"><Mail size={16} className="mr-2 text-blue-500"/> Email: <a href={`mailto:${officer.email}`} className="ml-1 text-blue-600 hover:underline">{officer.email}</a></p>
                                    <p className="flex items-center text-gray-700 dark:text-gray-200"><Phone size={16} className="mr-2 text-green-500"/> Phone: {officer.phone}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* --- DOCUMENTS TAB (TABLE) --- */}
                {activeTab === 'documents' && (
                    <div className="overflow-x-auto">
                        <p className="mb-4 text-gray-700 dark:text-gray-300 flex items-center"><BookOpen size={18} className="mr-2 text-teal-600"/> Section 4 of the RTI Act mandates these documents be made public proactively.</p>
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                            <thead className="bg-gray-50 dark:bg-slate-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Document Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Updated</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                                {rtiDocuments.map((doc, index) => (
                                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">{doc.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{doc.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <a 
                                                href={doc.link} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 font-semibold flex items-center"
                                                download={doc.link.split('/').pop()} // Use download attribute
                                            >
                                                <Download size={16} className="mr-1"/> Download ({doc.format})
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </LegalPageLayout>
    );
};

export default RTIDocumentsPage;