// src/components/GrievanceRedressalPage.jsx
import React, { useState } from 'react'; // Import useState for modal control
import LegalPageLayout from './LegalPageLayout'; 


import { UserPlus, Send, Clock, Repeat2, Zap, ArrowRight, XCircle, CheckCircle, Layers, X, Mail, Phone, User, FileText, Hash, Code } from 'lucide-react'; // Added Hash and Code for form options

// --- Input Field Sub-Component (for cleaner form UI & validation) ---
const InputField = ({ icon: Icon, label, ...props }) => (
    <div className="relative">
        {label && <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>}
        <Icon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
        <input 
            className="w-full pl-10 pr-3 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-gray-200 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-sm"
            {...props} 
        />
    </div>
);


// --- UPGRADED Grievance Submission Modal ---
const GrievanceFormModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic Form Validation Check (HTML5 will handle most)
        if (!e.target.checkValidity()) {
            return; 
        }

        // In a real application, you would send this data to an API endpoint here
        console.log("Grievance submitted!");
        alert("Grievance Submitted! You will receive your Unique Tracking ID via email shortly.");
        onClose(); // Close the modal on successful (simulated) submission
    };

    return (
        <div 
            className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center p-4 transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                // Reduced max-width for a more minimal, centered look
                className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-xl w-full transform transition-all duration-300 scale-100 dark:border dark:border-teal-700 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-900 z-10">
                    {/* REDUCED TITLE FONT SIZE AND WEIGHT */}
                    <h2 className="text-lg font-semibold text-teal-600 dark:text-teal-400 flex items-center">
                        <FileText size={20} className="mr-2" /> Submit Grievance Form
                    </h2>
                    <button 
                        onClick={onClose} 
                        className="p-2 rounded-full text-gray-500 hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                        aria-label="Close form"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Reduced spacing: space-y-4 instead of space-y-5 */}
                <form className="p-6 space-y-4" onSubmit={handleSubmit} noValidate> 
                    
                    {/* User Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField icon={User} type="text" placeholder="Full Name" required minLength="3" />
                        <InputField icon={Mail} type="email" placeholder="Email ID" required />
                        {/* Added Mobile Number validation */}
                        <InputField icon={Phone} type="tel" placeholder="Mobile Number" required minLength="10" maxLength="10" pattern="[0-9]{10}" title="Must be a 10-digit number" />
                        <InputField icon={Hash} type="text" placeholder="Yuva Saathi User ID" required minLength="6" />
                    </div>

                    {/* Grievance Type and Subject */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Grievance Category (High-Level Options)</label>
                        <select 
                            className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-gray-200 focus:ring-teal-500 focus:border-teal-500 text-sm" 
                            required
                        >
                            <option value="">Select the primary category...</option>
                            <option value="Scheme-Payment">Scheme Payment/Disbursement Delay</option>
                            <option value="Scheme-Eligibility">Scheme Eligibility Denial/Issue</option>
                            <option value="Job-Listing">Job Listing Misleading/Fraudulent Activity</option>
                            <option value="Job-Application">Job Application/Tracking Error</option>
                            <option value="Data-Profile">Profile/Data Correction (Aadhaar, Skill, Education)</option>
                            <option value="Technical-Bug">Portal Functionality/Technical Bug</option>
                            <option value="Officer-Conduct">Grievance Officer/Nodal Contact Conduct</option>
                            <option value="Other">Other (Must detail below)</option>
                        </select>
                    </div>

                    {/* Description (Reduced rows for minimal size) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Detailed Description</label>
                        <textarea 
                            rows="3" // Reduced from 4 to 3 rows
                            placeholder="Clearly describe your complaint, including dates, names of schemes, and any relevant reference numbers. Minimum 50 characters." 
                            className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-gray-200 focus:ring-teal-500 focus:border-teal-500 resize-none text-sm"
                            required
                            minLength="50"
                        ></textarea>
                    </div>

                    {/* Document Upload (Simplified) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                            <Code size={16} className="mr-1 text-gray-500" /> Attach Proof/Screenshots (Optional)
                        </label>
                        <input type="file" className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/>
                        <p className="text-xs text-gray-500 mt-1">Max file size: 5MB (PDF, JPG, PNG only)</p>
                    </div>


                    <button 
                        type="submit" 
                        className="w-full py-2.5 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-md flex items-center justify-center space-x-2 text-base mt-5"
                    >
                        <Send size={20} />
                        <span>Submit Grievance & Get Tracking ID</span>
                    </button>
                </form>
            </div>
        </div>
    );
};


const GrievanceRedressalPage = () => {
    // 🌟 STATE ADDED for Modal Control 🌟
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Reduced font size and weight for primary page headings
    const primaryHeadingClass = "mt-8 mb-4 flex items-center space-x-2 text-xl font-semibold dark:text-gray-100";

    return (
        <LegalPageLayout 
            title="Grievance Redressal Policy"
            subtitle="Official mechanism for submitting, tracking, and resolving user complaints and feedback."
            lastUpdated="October 15, 2025"
        >
            <p className="text-lg text-gray-700 dark:text-gray-300 border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50/50 dark:bg-slate-800/50">
                The Yuva Saathi portal is committed to ensuring prompt and transparent resolution of all user grievances related to scheme access, job portal functionality, or data integrity. Please follow the mandated three-level structure.
            </p>

            {/* --- Grievance Levels Section --- */}
            <h2 className={primaryHeadingClass}>
                <Layers size={24} className="text-teal-600" />
                <span>Three-Tier Resolution Process</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                {/* Level 1 */}
                <GrievanceStep
                    level="Level 1"
                    title="Nodal Helpdesk Submission"
                    icon={UserPlus}
                    time="5 Working Days"
                    details="The initial complaint must be filed via the online 'Submit Grievance' form (link below). You will receive a unique Tracking ID."
                    status="Initial Contact"
                    statusColor="border-blue-500"
                />

                {/* Level 2 */}
                <GrievanceStep
                    level="Level 2"
                    title="Review by Department Head"
                    icon={Repeat2}
                    time="15 Working Days"
                    details="If Level 1 response is unsatisfactory or after 5 days, the grievance automatically escalates to the designated Department Head for review."
                    status="Escalation"
                    statusColor="border-yellow-500"
                />

                {/* Level 3 */}
                <GrievanceStep
                    level="Level 3"
                    title="Chief Grievance Officer"
                    icon={Zap} 
                    time="30 Working Days (Final)"
                    details="The final point of appeal for all matters. The decision at this level is binding and concludes the portal's internal process."
                    status="Final Appeal"
                    statusColor="border-red-500"
                />
            </div>

            {/* --- Key Procedures and Links --- */}
            <h2 className={primaryHeadingClass}>
                <Send size={24} className="text-teal-600" />
                <span>How to Submit a Grievance</span>
            </h2>

            <div className="prose dark:prose-invert">
                <ol className="list-decimal pl-5 space-y-3">
                    <li className="text-gray-700 dark:text-gray-300">**Registration:** You must have a valid, active user ID on the Yuva Saathi portal to submit a formal grievance.</li>
                    <li className="text-gray-700 dark:text-gray-300">**Form Completion:** Use the dedicated <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="text-teal-600 font-semibold hover:underline">Online Grievance Form</a>. Include a detailed description, relevant dates, and upload supporting documents (e.g., screenshots, IDs).</li>
                    <li className="text-gray-700 dark:text-gray-300">**Tracking ID:** Upon successful submission, an email will be sent containing your **Unique Grievance Tracking ID**. This ID must be used for all future correspondence.</li>
                    <li className="text-gray-700 dark:text-gray-300">**Tracking Status:** Check the live status of your complaint using your Tracking ID on the <a href="/grievance-tracker" className="text-teal-600 font-semibold hover:underline">Grievance Tracker Page</a>.</li>
                </ol>

                <h3 className="mt-6 flex items-center space-x-2 text-lg font-semibold dark:text-gray-200">
                    <Clock size={20} className="text-blue-500" />
                    <span>Time Bound Resolution</span>
                </h3>
                <p className="text-gray-700 dark:text-gray-300">The total mandated time limit for final resolution, including any escalations, is **30 working days** from the initial submission date. If no satisfactory resolution is provided within this period, you may pursue external legal recourse as per the Terms of Use (Section 5).</p>

                <h3 className="mt-6 flex items-center space-x-2 text-lg font-semibold dark:text-gray-200">
                    <XCircle size={20} className="text-red-500" />
                    <span>Non-Grievable Issues (Disclaimers)</span>
                </h3>
                <p className="text-gray-700 dark:text-gray-300">The following items typically fall outside the scope of this redressal mechanism:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                    <li>General policy/scheme disapproval (must be directed to the relevant department).</li>
                    <li>Job recruitment or hiring decisions made by external employers.</li>
                    <li>Anonymous or incomplete submissions lacking a valid User ID.</li>
                    <li>Matters already under active judicial review.</li>
                </ul>
            </div>
            
            {/* 🌟 CTA Section 🌟 */}
            <div className="mt-8 p-6 bg-teal-50 dark:bg-slate-700 rounded-xl shadow-lg flex justify-between items-center">
                <p className="text-md text-teal-800 dark:text-teal-200 font-medium"> 
                    Ready to file your complaint?
                </p>
                <button 
                    onClick={() => setIsModalOpen(true)} // 🌟 Open the Modal 🌟
                    className="flex items-center space-x-2 px-6 py-3 bg-teal-600 text-white font-semibold rounded-full shadow-md hover:bg-teal-700 transition-all transform hover:scale-[1.03]"
                >
                    <span>Submit Grievance Now</span>
                    <ArrowRight size={20} />
                </button>
            </div>

            {/* Render the Modal */}
            <GrievanceFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        </LegalPageLayout>
    );
};

// --- Sub-Component for UI/UX Enhancement ---
const GrievanceStep = ({ level, title, icon: Icon, time, details, status, statusColor }) => (
    <div className={`p-5 bg-white dark:bg-slate-800 rounded-lg shadow-xl ${statusColor} border-t-4 transition-all duration-300 hover:shadow-2xl`}>
        <div className="flex justify-between items-start">
            <h4 className="text-xl font-extrabold text-gray-900 dark:text-gray-50 mb-1">{level}</h4>
            <div className={`px-3 py-1 text-xs font-mono rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300`}>
                {status}
            </div>
        </div>
        <div className="flex items-center space-x-3 mt-3">
            <Icon size={24} className="text-teal-600 flex-shrink-0" />
            <h5 className="text-md font-semibold text-gray-700 dark:text-gray-200">{title}</h5>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-3">{details}</p>
        <div className="flex items-center text-sm font-bold text-yellow-600 dark:text-yellow-400">
            <Clock size={14} className="mr-1" />
            Response Time: {time}
        </div>
    </div>
);

export default GrievanceRedressalPage;