// src/documents/PIOsListPage.jsx (Content for the PIO List PDF download)
import React from 'react';
import { Mail, Phone, MapPin, User, Briefcase, ChevronRight } from 'lucide-react';

const nodalOfficers = [
    { role: "Public Information Officer (PIO)", name: "Shri Rajesh Kumar", designation: "Deputy Director, Planning", address: "Dept. of Labour Resources, New Secretariat, Patna", email: "pio.labour@bihar.gov.in", phone: "+91 612 XXXXXX01" },
    { role: "First Appellate Authority (FAA)", name: "Smt. Anjali Singh", designation: "Director, Skill Development", address: "Skill Development Mission Office, Patna", email: "faa.skill@bihar.gov.in", phone: "+91 612 XXXXXX02" },
    { role: "Second PIO (Skill Schemes)", name: "Shri Sanjay Verma", designation: "Assistant Director, Schemes", address: "Dept. of Labour Resources, New Secretariat, Patna", email: "s.verma@bihar.gov.in", phone: "+91 612 XXXXXX03" },
];

const PIOsListPage = () => {
    const docTitleClass = "text-3xl font-extrabold text-center mb-2 text-red-800";
    const docSubtitleClass = "text-lg text-center font-medium text-gray-600 mb-8 border-b pb-3";
    const officerCardClass = "p-5 bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition duration-300";
    const contactItemClass = "flex items-center text-sm text-gray-700";

    return (
        <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-[1000px]">
            <h1 className={docTitleClass}>List of Public Information Officers (PIOs)</h1>
            <h2 className={docSubtitleClass}>RTI Act, 2005 - Section 4(1)(b)(xvi) and Bihar State Rules</h2>

            <p className="mb-8 text-gray-700 text-center font-medium">
                This list is updated semi-annually and designates the responsible officials for handling Right to Information applications and appeals concerning the Yuva Saathi Portal and its parent department.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nodalOfficers.map((officer, index) => (
                    <div key={index} className={officerCardClass}>
                        <div className="flex items-center space-x-3 mb-4 border-b pb-2">
                            <User size={24} className="text-red-600 flex-shrink-0" />
                            <h3 className="text-xl font-bold text-red-700">{officer.role}</h3>
                        </div>
                        
                        <p className="text-lg font-semibold text-gray-900 mb-1">{officer.name}</p>
                        <p className="text-md font-medium text-teal-600 mb-4 flex items-center"><Briefcase size={16} className="mr-1"/> {officer.designation}</p>
                        
                        <div className="space-y-2">
                            <p className={contactItemClass}>
                                <Mail size={16} className="mr-3 text-blue-500 flex-shrink-0"/> 
                                Email: <span className="ml-1 font-mono">{officer.email}</span>
                            </p>
                            <p className={contactItemClass}>
                                <Phone size={16} className="mr-3 text-green-500 flex-shrink-0"/> 
                                Phone: <span className="ml-1">{officer.phone}</span>
                            </p>
                            <p className={contactItemClass}>
                                <MapPin size={16} className="mr-3 text-orange-500 flex-shrink-0"/> 
                                Address: <span className="ml-1">{officer.address}</span>
                            </p>
                        </div>

                        {officer.role === 'Public Information Officer (PIO)' && (
                            <p className="mt-4 p-2 bg-yellow-100 text-yellow-800 text-xs rounded flex items-center">
                                <ChevronRight size={14} className="mr-1"/> First point of contact for RTI applications.
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <footer className="mt-12 pt-4 border-t border-gray-300 text-center text-xs text-gray-500">
                Document Version: 2.1 | Last Updated: 2024-10-01 | Source: Department of Labour Resources, Govt. of Bihar.
            </footer>
        </div>
    );
};

export default PIOsListPage;