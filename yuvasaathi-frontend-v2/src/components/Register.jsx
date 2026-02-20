import React, { useState, useEffect, useRef } from 'react'; 
import { Home as HomeIcon, User, Lock, GraduationCap, MapPin, Briefcase, FileText, CheckCircle, Loader2 } from 'lucide-react'; 

// =================================================================
// ⭐️ AWS API GATEWAY CONFIGURATION: Confirmed and Correct
// =================================================================
const AWS_REGISTER_URL = 'https://g98ejl6tob.execute-api.eu-north-1.amazonaws.com/prod/auth';
// =================================================================

// =================================================================
// 🌟 NEW DATA STRUCTURES: Sector & Job Roles
// =================================================================

const jobRoles = {
    'IT': [
        'Select IT Role',
        'Software Developer (Front-end)',
        'Software Developer (Back-end)',
        'Full Stack Developer',
        'DevOps Engineer',
        'Data Scientist',
        'Cloud Architect',
        'Cyber Security Analyst',
        'Mobile App Developer',
        'UI/UX Designer',
        'IT Project Manager',
        'Network Engineer',
        'IT Support Specialist'
    ],
    'Non-IT': [
        'Select Non-IT Role',
        'Sales and Marketing Manager',
        'Human Resources Specialist',
        'Accountant',
        'Financial Analyst',
        'Operations Manager',
        'Civil Engineer',
        'Mechanical Engineer',
        'Electrician',
        'Plumber',
        'Hospitality/Hotel Management',
        'Retail Store Manager',
        'Logistics Coordinator',
        'Manufacturing Technician'
    ],
    'Other': [
        'Enter Other Role Manually'
    ]
};

const sectorOptions = [
    { value: '', label: 'Select Sector' },
    { value: 'IT', label: 'IT (Information Technology)' },
    { value: 'Non-IT', label: 'Non-IT' },
    { value: 'Other', label: 'Other (Please Specify)' },
];

// =================================================================
// 🌟 UPDATED LANGUAGE OBJECT: Added Sector/Role Text
// =================================================================
const languages = {
    en: {
        title: 'Applicant Registration',
        subtitle: 'Secure your future with Yuva Saathi.',
        firstName: 'First Name*',
        middleName: 'Middle Name (optional)',
        surname: 'Surname*',
        email: 'Email Address*',
        mobileNumber: 'Mobile Number (10 digits)*',
        aadhaarNumber: 'Aadhaar Number (Optional but Recommended)',
        panNumber: 'PAN Number (Optional)',
        password: 'Password*',
        confirmPassword: 'Confirm Password*',
        passwordRequirementsPlaceholder: '8+ chars: Uppercase, lowercase, number, special char.',
        passwordsMatch: 'Passwords match',
        passwordsMismatch: 'Passwords do not match!',
        education: 'Highest Educational Qualification*',
        selectQualification: 'Select Qualification',
        location: 'Current Location*',
        selectState: 'Select State',
        selectCity: 'Select City',
        sector: 'Preferred Sector*', 
        jobRole: 'Preferred Job Role*', 
        selectSector: 'Select Sector', 
        selectJobRole: 'Select Job Role', 
        employmentHistory: 'Employment History / Appraisals*',
        certifications: 'Certifications / Skills Acquired*',
        previouslyRegistered: 'Previously registered with Employment Exchange?*',
        yes: 'Yes',
        no: 'No',
        registrationNumber: 'Exchange Registration Number*',
        register: 'Register Account',
        registering: 'Registering...',
        alreadyAccount: 'Already have an account?',
        loginHere: 'Login here',
        aadhaarFormat: 'Aadhaar must be a 12-digit number.',
        panFormat: 'PAN must be 5 letters, 4 numbers, and 1 letter (e.g., ABCDE1234F).',
        mobileFormat: 'Mobile must be a 10-digit number.',
        successMessage: 'Registration successful! The Admin will review and activate your account shortly. You may now attempt to login.',
        errorMessage: 'Registration failed: '
    },
};

const statesAndCities = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur'],
    'Arunachal Pradesh': ['Itanagar', 'Naharlagun'],
    'Assam': ['Guwahati', 'Silchar', 'Dibrugarh'],
    'Bihar': ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur'],
    'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur'],
    'Goa': ['Panaji', 'Vasco da Gama'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara'],
    'Haryana': ['Faridabad', 'Gurugram', 'Panipat'],
    'Himachal Pradesh': ['Shimla', 'Dharamshala'],
    'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad'],
    'Karnataka': ['Bengaluru', 'Mysuru', 'Hubballi'],
    'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
    'Manipur': ['Imphal'],
    'Meghalaya': ['Shillong'],
    'Mizoram': ['Aizawl'],
    'Nagaland': ['Kohli', 'Dimapur'],
    'Odisha': ['Bhubaneswar', 'Cuttack'],
    'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur'],
    'Sikkim': ['Gangtok'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
    'Telangana': ['Hyderabad', 'Warangal'],
    'Tripura': ['Agartala'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi'],
    'Uttarakhand': ['Dehradun', 'Haridwar'],
    'West Bengal': ['Kolkata', 'Howrah', 'Siliguri'],
    'Andaman and Nicobar Islands': ['Port Blair'],
    'Chandigarh': ['Chandigarh'],
    'Dadra and Nagar Haveli and Daman and Diu': ['Daman'],
    'Delhi': ['New Delhi'],
    'Jammu and Kashmir': ['Srinagar', 'Jammu'],
    'Ladakh': ['Leh'],
    'Lakshadweep': ['Kavaratti'],
    'Puducherry': ['Puducherry']
};

const countryCodes = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'USA' },
    { code: '+44', country: 'UK' },
    { code: '+61', country: 'Australia' }
];

// =================================================================
// 🌟 UPDATED initialFormDataState: Added sector & jobRole
// =================================================================
const initialFormDataState = {
    role: 'Employee',
    firstName: '',
    middleName: '',
    surname: '',
    email: '',
    mobileCountryCode: '+91',
    mobileNumber: '',
    aadhaarNumber: '',
    panNumber: '',
    password: '',
    confirmPassword: '',
    education: '',
    locationState: '',
    locationCity: '',
    sector: '', 
    jobRole: '', 
    employmentHistory: '',
    certifications: '',
    previouslyRegistered: 'no',
    registrationNumber: ''
};

const educationOptions = [
    '10th', 'Inter', 'Degree', 'Post-Graduate', 'Diploma'
];

// =================================================================
// 🌟 HELPER COMPONENTS: Moved outside RegisterPage for stability
// =================================================================

// Tighter, 2-column layout for the radio buttons
const RadioGroup = ({ label, name, options, value, onChange, error }) => (
    <div className="col-span-full mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="flex space-x-6">
            {options.map((option) => (
                <label key={option.value} className="flex items-center text-sm cursor-pointer">
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={onChange}
                        className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                    />
                    <span className="ml-2 text-gray-700">{option.label}</span>
                </label>
            ))}
        </div>
        {error && <p className="text-xs mt-1 text-red-600 font-semibold">{error}</p>}
    </div>
);

// Tighter Input component
const FormInput = ({ label, name, type = "text", value, onChange, error, placeholder, required = false, ...rest }) => (
    <div>
        <label className="block text-xs font-medium text-gray-600 mb-0.5">{label}</label>
        <input 
            type={type} 
            name={name} 
            value={value} 
            onChange={onChange} 
            required={required} 
            placeholder={placeholder}
            className="mt-0 block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" // Reduced py-2 to py-1.5
            {...rest}
        />
        {error && <p className="text-xs mt-1 text-red-600 font-semibold">{error}</p>}
    </div>
);

// Tighter Select component
const FormSelect = ({ label, name, value, onChange, error, children, required = false, ...rest }) => (
    <div>
        <label className="block text-xs font-medium text-gray-600 mb-0.5">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="mt-0 block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white" // Reduced py-2 to py-1.5
            {...rest}
        >
            {children}
        </select>
        {error && <p className="text-xs mt-1 text-red-600 font-semibold">{error}</p>}
    </div>
);

// Tighter Textarea component
const FormTextArea = ({ label, name, value, onChange, error, placeholder, required = false, rows = 3, ...rest }) => (
    <div className="col-span-full">
        <label className="block text-xs font-medium text-gray-600 mb-0.5">{label}</label>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            rows={rows}
            placeholder={placeholder}
            className="mt-0 block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" // Reduced py-2 to py-1.5
            {...rest}
        ></textarea>
        {error && <p className="text-xs mt-1 text-red-600 font-semibold">{error}</p>}
    </div>
);

// Reusable Section Header with Tighter Spacing
const SectionHeader = ({ step, title }) => (
    <h4 className="text-lg font-bold text-gray-800 border-b pb-1 pt-4 mb-3">
        {step}. {title}
    </h4>
);

// =================================================================
// 🌟 UPDATED COMPONENT: Animated Registration Steps (7 Steps)
// =================================================================

const steps = [
    { id: 1, name: 'Personal ID & Contact', icon: User, description: 'Enter your name, email, and mobile number.' },
    { id: 2, name: 'Set Account Security', icon: Lock, description: 'Create a strong password for your profile.' },
    { id: 3, name: 'Document Details', icon: FileText, description: 'Provide Aadhaar and PAN numbers (optional but helpful).' },
    { id: 4, name: 'Education & Location', icon: GraduationCap, description: 'Specify your highest qualification and current city/state.' },
    { id: 5, name: 'Job & Career Focus', icon: Briefcase, description: 'Select your preferred sector and job role.' }, 
    { id: 6, name: 'Experience & Skills', icon: Briefcase, description: 'Submit your work history and certifications.' },
    { id: 7, name: 'Exchange Registration', icon: CheckCircle, description: 'Confirm prior registration and provide the necessary number.' },
];

const RegistrationSteps = ({ activeStep, errors }) => {
    // Logic to determine the step based on the first encountered error
    const determineActiveStep = () => {
        if (errors.password || errors.confirmPassword) return 2;
        if (errors.aadhaarNumber || errors.panNumber) return 3;
        if (errors.education || errors.locationState || errors.locationCity) return 4;
        if (errors.sector || errors.jobRole) return 5; 
        if (errors.employmentHistory || errors.certifications) return 6;
        if (errors.registrationNumber) return 7;
        
        // Otherwise, track based on completion/current input
        return activeStep;
    };

    const currentStep = determineActiveStep();

    return (
        <div className="hidden lg:block w-full h-full p-6 bg-white/50 backdrop-blur-sm rounded-l-2xl shadow-lg border-r border-orange-200">
            <h3 className="text-xl font-bold text-orange-700 mb-6">Complete Registration Guide</h3>
            <div className="space-y-4"> {/* Reduced space-y from 6 to 4 */}
                {steps.map((step) => {
                    const isActive = step.id <= currentStep;
                    const isCurrent = step.id === currentStep;
                    const Icon = step.icon;
                    return (
                        <div key={step.id} className="flex items-start transition duration-500 ease-in-out">
                            <div className={`flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0 mr-3 ${ // Smaller icon size
                                isCurrent ? 'bg-orange-600 text-white shadow-lg scale-105' : isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                            } transition-all duration-300 transform`}>
                                <Icon className="w-4 h-4" /> {/* Smaller icon */}
                            </div>
                            <div className="flex-grow border-l-2 ml-3 pl-3 border-gray-200"> {/* Tighter spacing */}
                                <h4 className={`text-sm font-semibold transition-colors duration-300 ${isCurrent ? 'text-orange-600' : isActive ? 'text-green-700' : 'text-gray-900'}`}>
                                    {step.name}
                                </h4>
                                <p className={`text-xs mt-0.5 transition-all duration-500 text-gray-500 ${isCurrent ? 'font-medium' : 'font-normal'}`}>
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// =================================================================
// 🌟 MAIN COMPONENT: RegisterPage (With Sector/Job Role Logic)
// =================================================================

const RegisterPage = () => {
    const [formData, setFormData] = useState(initialFormDataState); 
    const language = 'en';
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordError, setPasswordError] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const text = languages[language];
    const formRef = useRef(null);
    
    // NEW STATE: Track which form section is active for the Steps component
    const [activeStep, setActiveStep] = useState(1);
    
    // Logic for setting active step (based on which section is visible/focused)
    const observeActiveStep = () => {
        // Simplified heuristic: determine based on the latest filled mandatory field
        if (formData.registrationNumber || (formData.previouslyRegistered === 'no' && formData.certifications)) {
            setActiveStep(7); // Updated step number
        } else if (formData.employmentHistory || formData.certifications) {
            setActiveStep(6); // Updated step number
        } else if (formData.jobRole) { // NEW Check
            setActiveStep(5);
        } else if (formData.locationCity) {
            setActiveStep(4);
        } else if (formData.panNumber || formData.aadhaarNumber) {
            setActiveStep(3);
        } else if (formData.password) {
            setActiveStep(2);
        } else {
            setActiveStep(1);
        }
    };
    
    useEffect(() => {
        observeActiveStep();
    }, [formData, errors]);

    // Remaining useEffects for password match, message timeout, keypress remain unchanged
    useEffect(() => {
        if (formData.password || formData.confirmPassword) {
            setPasswordsMatch(formData.password === formData.confirmPassword);
        } else {
            setPasswordsMatch(true);
        }
    }, [formData.password, formData.confirmPassword]);

    useEffect(() => {
        if (message && message.type === 'success') {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleGoHome = () => {
        window.location.href = '/'; 
    };

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasMinLength = password.length >= 8; 
        const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
        const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasMinLength;

        if (!isValid && password.length > 0) {
            setPasswordError(text.passwordRequirementsPlaceholder);
            return false;
        }
        setPasswordError('');
        return true;
    };

    // =================================================================
    // 🌟 UPDATED handleChange: Added Sector and JobRole reset logic
    // =================================================================
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        if (name === 'password') {
            validatePassword(value);
        }

        if (name === 'locationState') {
            setFormData(prevData => ({
                ...prevData,
                locationState: value,
                locationCity: '' // Reset city when state changes
            }));
            setErrors(prevErrors => ({ ...prevErrors, locationCity: '' })); // Clear city error
        }

        // NEW: Sector change logic
        if (name === 'sector') {
            setFormData(prevData => ({
                ...prevData,
                sector: value,
                jobRole: '' // Reset job role when sector changes
            }));
            setErrors(prevErrors => ({ ...prevErrors, jobRole: '' })); // Clear jobRole error
        }
        
        // NEW: Job Role dropdown change logic (Fixed accessing jobRoles keys)
        // If the user selects the default 'Select Role' placeholder, or if they choose 'Enter Other Role Manually', 
        // the state updates correctly but the specific logic here prevents unnecessary resets.
        if (name === 'jobRole' && (formData.sector === 'IT' || formData.sector === 'Non-IT') && value === (formData.sector === 'IT' ? jobRoles.IT[0] : jobRoles['Non-IT'][0])) {
            // Do nothing if user selects the initial "Select Role" placeholder
        } 


        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'aadhaarNumber':
                if (value && !/^\d{12}$/.test(value)) {
                    error = text.aadhaarFormat;
                }
                break;
            case 'panNumber':
                if (value && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.toUpperCase())) {
                    error = text.panFormat;
                }
                break;
            case 'mobileNumber':
                if (value && !/^\d{10}$/.test(value)) {
                    error = text.mobileFormat;
                }
                break;
            default:
                break;
        }
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage(null);
        
        const newErrors = {};
        let isValid = true;

        // --- Core Validation ---
        // Basic Required Fields
        if (!formData.firstName) { newErrors.firstName = 'First Name is required.'; isValid = false; }
        if (!formData.surname) { newErrors.surname = 'Surname is required.'; isValid = false; }
        if (!formData.email) { newErrors.email = 'Email is required.'; isValid = false; }
        if (!formData.mobileNumber) { newErrors.mobileNumber = 'Mobile Number is required.'; isValid = false; }
        if (!formData.education) { newErrors.education = 'Educational Qualification is required.'; isValid = false; }
        if (!formData.locationState) { newErrors.locationState = 'State is required.'; isValid = false; } 
        if (!formData.locationCity) { newErrors.locationCity = 'City is required.'; isValid = false; }
        if (!formData.sector) { newErrors.sector = 'Preferred Sector is required.'; isValid = false; } 
        
        // Job Role Validation
        if (!formData.jobRole || 
            (formData.sector === 'IT' && formData.jobRole === jobRoles.IT[0]) || 
            (formData.sector === 'Non-IT' && formData.jobRole === jobRoles['Non-IT'][0])) { 
                newErrors.jobRole = 'Preferred Job Role is required.'; isValid = false; 
        } 
        
        if (!formData.employmentHistory) { newErrors.employmentHistory = 'Employment History is required.'; isValid = false; }
        if (!formData.certifications) { newErrors.certifications = 'Certifications are required.'; isValid = false; }
        if (!formData.password) { newErrors.password = 'Password is required.'; isValid = false; }

        // Password Match and Format
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = text.passwordsMismatch;
            isValid = false;
        }
        if (!validatePassword(formData.password)) {
            newErrors.password = newErrors.password || text.passwordRequirementsPlaceholder;
            isValid = false;
        }

        // Conditional Required Field
        if (formData.previouslyRegistered === 'yes' && !formData.registrationNumber) {
            newErrors.registrationNumber = 'Registration Number is required.';
            isValid = false;
        }

        // Format Checks
        if (formData.aadhaarNumber && !/^\d{12}$/.test(formData.aadhaarNumber)) {
            newErrors.aadhaarNumber = text.aadhaarFormat;
            isValid = false;
        }
        if (formData.panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber.toUpperCase())) {
            newErrors.panNumber = text.panFormat;
            isValid = false;
        }
        if (formData.mobileNumber && !/^\d{10}$/.test(formData.mobileNumber)) {
            newErrors.mobileNumber = text.mobileFormat;
            isValid = false;
        }
        
        setErrors(newErrors);

        if (!isValid) {
            setLoading(false);
            const firstErrorElement = document.querySelector('.text-red-600');
            if (firstErrorElement) {
                firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        setLoading(true);

        // --- FINAL DATA PAYLOAD --- (Updated to include new fields)
        const dataToSend = {
            registration: true, 
            first_name: formData.firstName,
            middle_name: formData.middleName, 
            surname: formData.surname,
            email: formData.email,
            mobile_no: formData.mobileNumber, 
            aadhaar_number: formData.aadhaarNumber || null,
            pan_number: formData.panNumber.toUpperCase() || null, 
            password_hash: formData.password, 
            education_qualification: formData.education,
            current_location: `${formData.locationCity}, ${formData.locationState}`,
            preferred_sector: formData.sector, 
            preferred_job_role: formData.jobRole, 
            employment_history_appraisals: formData.employmentHistory,
            certifications: formData.certifications,
            previously_with_employment_exchange: formData.previouslyRegistered === 'yes',
            registration_number: formData.previouslyRegistered === 'yes' ? formData.registrationNumber : null,
            is_verified: false, 
        };

        try {
            const response = await fetch(AWS_REGISTER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const result = await response.json();

            if (response.ok) {
                setFormData(initialFormDataState); 
                setMessage({ type: 'success', text: result.message || text.successMessage });
            } else {
                let errorMessage = result.error || result.message || text.errorMessage + 'An unknown error occurred.';

                if (errorMessage.includes('email, mobile number, or Aadhaar already exists')) {
                    errorMessage = 'Registration failed: User with this email, mobile number, or Aadhaar already exists.';
                } else if (errorMessage.includes('Missing required registration fields')) {
                    errorMessage = 'Registration failed: ' + errorMessage.split(':').pop().trim();
                } else if (errorMessage.includes('Failed to connect to database')) {
                    errorMessage = 'Registration failed: Server is temporarily unavailable. Please try again later.';
                }

                setMessage({ type: 'error', text: errorMessage });
            }
        } catch (error) {
            setMessage({ type: 'error', text: text.errorMessage + 'Network error. Please check your connection and try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden"
            style={{ 
                background: 'linear-gradient(135deg, #ffffff 0%, #fef3c7 40%, #ffedd5 100%)' 
            }}
        >
            <div className="absolute inset-0 z-0 opacity-50"></div>
            
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-7xl relative z-10 border border-gray-200 flex min-h-[85vh] lg:min-h-[75vh]">
                
                {/* LEFT PANEL: Registration Steps */}
                <div className="hidden lg:block lg:w-1/3">
                    <RegistrationSteps activeStep={activeStep} errors={errors} />
                </div>
                
                {/* RIGHT PANEL: The Form */}
                <div className="w-full lg:w-2/3 p-6 md:p-8 overflow-y-auto"> 
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 border-b pb-2 border-gray-100"> 
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-orange-600">
                                {text.title}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">{text.subtitle}</p>
                        </div>
                        <button 
                            onClick={handleGoHome}
                            className="p-2 ml-auto text-orange-600 hover:text-orange-800 transition duration-150 rounded-full hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            title="Go to Home Page"
                        >
                            <HomeIcon className="w-6 h-6" />
                        </button>
                    </div>

                    {message && (
                        <div className={`p-3 rounded-lg text-center mb-4 font-semibold ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
                            {message.text}
                        </div>
                    )}

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-2"> 
                        
                        {/* Section 1: Personal Details */}
                        <SectionHeader step={1} title="Personal ID & Contact" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2"> 
                            <FormInput label={text.firstName} name="firstName" value={formData.firstName} onChange={handleChange} required error={errors.firstName} />
                            <FormInput label={text.middleName} name="middleName" value={formData.middleName} onChange={handleChange} error={errors.middleName} />
                            <FormInput label={text.surname} name="surname" value={formData.surname} onChange={handleChange} required error={errors.surname} />
                            <FormInput label={text.email} name="email" type="email" value={formData.email} onChange={handleChange} required error={errors.email} />
                            
                            <div className="col-span-full">
                                <label className="block text-xs font-medium text-gray-600 mb-0.5">{text.mobileNumber}</label>
                                <div className="flex rounded-lg shadow-sm overflow-hidden">
                                    <select name="mobileCountryCode" value={formData.mobileCountryCode} onChange={handleChange} className="border-t border-b border-l border-gray-300 rounded-l-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                                        {countryCodes.map(c => (
                                            <option key={c.code} value={c.code}>{c.code}</option>
                                        ))}
                                    </select>
                                    <input 
                                        type="tel" 
                                        name="mobileNumber" 
                                        value={formData.mobileNumber} 
                                        onChange={(e) => { handleChange(e); validateField('mobileNumber', e.target.value); }} 
                                        onBlur={(e) => validateField('mobileNumber', e.target.value)} 
                                        required 
                                        maxLength="10" 
                                        className="block w-full border border-gray-300 rounded-r-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" 
                                    />
                                </div>
                                {errors.mobileNumber && <p className="text-xs mt-1 text-red-600 font-semibold">{errors.mobileNumber}</p>}
                            </div>
                        </div>
                        
                        {/* Section 2: Passwords */}
                        <SectionHeader step={2} title="Set Account Security" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                            <div>
                                <FormInput
                                    label={text.password}
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder={text.passwordRequirementsPlaceholder}
                                    error={passwordError || errors.password}
                                />
                            </div>
                            <div>
                                <FormInput 
                                    label={text.confirmPassword} 
                                    name="confirmPassword" 
                                    type="password" 
                                    value={formData.confirmPassword} 
                                    onChange={handleChange} 
                                    required 
                                    error={errors.confirmPassword}
                                />
                                {formData.password && formData.confirmPassword && (
                                    <p className={`text-xs mt-1 ${passwordsMatch ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                                        {passwordsMatch ? text.passwordsMatch : text.passwordsMismatch}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Section 3: Document Details */}
                        <SectionHeader step={3} title="Document Details" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                            <FormInput 
                                label={text.aadhaarNumber} 
                                name="aadhaarNumber" 
                                value={formData.aadhaarNumber} 
                                onChange={(e) => { handleChange(e); validateField('aadhaarNumber', e.target.value); }} 
                                onBlur={(e) => validateField('aadhaarNumber', e.target.value)} 
                                maxLength="12" 
                                placeholder="xxxx xxxx xxxx" 
                                error={errors.aadhaarNumber}
                            />
                            <FormInput 
                                label={text.panNumber} 
                                name="panNumber" 
                                value={formData.panNumber} 
                                onChange={(e) => { handleChange(e); validateField('panNumber', e.target.value); }} 
                                onBlur={(e) => validateField('panNumber', e.target.value)} 
                                maxLength="10" 
                                placeholder="ADPWK0074K" 
                                className="uppercase"
                                error={errors.panNumber}
                            />
                        </div>

                        {/* Section 4: Education and Location */}
                        <SectionHeader step={4} title="Education & Location" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                            <FormSelect label={text.education} name="education" value={formData.education} onChange={handleChange} required error={errors.education}>
                                <option value="">{text.selectQualification}</option>
                                {educationOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </FormSelect>
                            
                            {/* Location State */}
                            <FormSelect label={text.location} name="locationState" value={formData.locationState} onChange={handleChange} required error={errors.locationState}>
                                <option value="">{text.selectState}</option>
                                {Object.keys(statesAndCities).sort().map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </FormSelect>

                            {/* Location City (Conditional) */}
                            {formData.locationState && (
                                <FormSelect label={text.location} name="locationCity" value={formData.locationCity} onChange={handleChange} required error={errors.locationCity}>
                                    <option value="">{text.selectCity}</option>
                                    {statesAndCities[formData.locationState]?.sort().map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </FormSelect>
                            )}
                        </div>

                        {/* Section 5: Job & Career Focus (NEW SECTION) */}
                        <SectionHeader step={5} title="Job & Career Focus" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                            {/* Sector Dropdown */}
                            <FormSelect label={text.sector} name="sector" value={formData.sector} onChange={handleChange} required error={errors.sector}>
                                {sectorOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </FormSelect>

                            {/* Job Role Input/Dropdown (Conditional) */}
                            {formData.sector === 'Other' || formData.jobRole === 'Enter Other Role Manually' ? (
                                // Manual text input for 'Other' or when 'Manual Entry' is selected
                                <FormInput 
                                    label={text.jobRole} 
                                    name="jobRole" 
                                    value={formData.jobRole === 'Enter Other Role Manually' ? '' : formData.jobRole} // Clear value if placeholder is "Enter Manually"
                                    onChange={handleChange} 
                                    required 
                                    error={errors.jobRole}
                                    placeholder="e.g., Textile Quality Inspector"
                                />
                            ) : (
                                // Conditional Dropdown for IT/Non-IT
                                <FormSelect 
                                    label={text.jobRole} 
                                    name="jobRole" 
                                    value={formData.jobRole} 
                                    onChange={handleChange} 
                                    required={!!formData.sector} // Required if a sector is selected
                                    error={errors.jobRole}
                                    disabled={!formData.sector} // Disable if no sector is chosen
                                >
                                    <option value="">{text.selectJobRole}</option>
                                    {(formData.sector && jobRoles[formData.sector]) ? (
                                        <>
                                            {jobRoles[formData.sector].slice(1).map(role => (
                                                <option key={role} value={role}>{role}</option>
                                            ))}
                                            <option value="Enter Other Role Manually">-- Not in the list (Enter Manually) --</option>
                                        </>
                                    ) : (
                                        <option value="" disabled>Select a Sector first</option>
                                    )}
                                </FormSelect>
                            )}
                        </div>
                        
                        {/* Section 6: Experience and Skills (Updated Step) */}
                        <SectionHeader step={6} title="Experience & Skills" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                            <FormTextArea 
                                label={text.employmentHistory} 
                                name="employmentHistory" 
                                value={formData.employmentHistory} 
                                onChange={handleChange} 
                                required 
                                placeholder="e.g., 3 years at ABC Corp as a Web Developer. Key achievements: project X, Y."
                                rows={3} 
                                error={errors.employmentHistory} 
                            />
                            <FormTextArea 
                                label={text.certifications} 
                                name="certifications" 
                                value={formData.certifications} 
                                onChange={handleChange} 
                                required 
                                placeholder="e.g., AWS Certified Developer, Microsoft Azure Fundamentals, Fluent in Python."
                                rows={3} 
                                error={errors.certifications} 
                            />
                        </div>

                        {/* Section 7: Exchange Registration (Updated Step) */}
                        <SectionHeader step={7} title="Exchange Registration" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                            
                            <RadioGroup 
                                label={text.previouslyRegistered}
                                name="previouslyRegistered"
                                options={[
                                    { value: 'yes', label: text.yes },
                                    { value: 'no', label: text.no }
                                ]}
                                value={formData.previouslyRegistered}
                                onChange={handleChange}
                                error={errors.previouslyRegistered}
                            />

                            {formData.previouslyRegistered === 'yes' && (
                                <FormInput 
                                    label={text.registrationNumber} 
                                    name="registrationNumber" 
                                    value={formData.registrationNumber} 
                                    onChange={handleChange} 
                                    required 
                                    error={errors.registrationNumber} 
                                    placeholder="Enter your valid registration number"
                                />
                            )}
                        </div>

                        {/* Submit Button and Login Link */}
                        <div className="col-span-full pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white transition duration-200 ${
                                    loading 
                                        ? 'bg-orange-400 cursor-not-allowed' 
                                        : 'bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 transform hover:scale-[1.01]'
                                }`}
                            >
                                {loading ? (
                                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> {text.registering}</>
                                ) : (
                                    <>{text.register}</>
                                )}
                            </button>
                        </div>
                        
                        <div className="text-center mt-3 pt-2 text-sm">
                            <p className="text-gray-600">
                                {text.alreadyAccount} <a href="/login" className="font-medium text-orange-600 hover:text-orange-800 transition duration-150">{text.loginHere}</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// =================================================================
// ⭐️ EXPORT STATEMENT: Main Component Exported
// =================================================================
export default RegisterPage;