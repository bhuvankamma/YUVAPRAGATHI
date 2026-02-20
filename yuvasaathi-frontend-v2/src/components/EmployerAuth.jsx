import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, UserRoundPlus, LogIn, ChevronLeft } from 'lucide-react';

const REGISTER_URL = "https://lzpjotse0i.execute-api.eu-north-1.amazonaws.com/default/employee_register";

const getErrorMessage = (data) => {
    if (data.detail) {
        if (Array.isArray(data.detail)) {
            return data.detail.map(err => `${err.loc[err.loc.length - 1]}: ${err.msg}`).join(", ");
        }
        return data.detail;
    }
    return "Something went wrong. Try again.";
};

const EmployerAuth = () => {
    const navigate = useNavigate(); 
    const [isRegister, setIsRegister] = useState(true);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); 
    const [otp, setOtp] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        companyName: '',
    });

    const isMountedRef = useRef(true);
    useEffect(() => () => { isMountedRef.current = false; }, []);

    const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); setError(''); setSuccessMessage(''); };
    const handleOtpChange = (e) => { setOtp(e.target.value); setError(''); setSuccessMessage(''); };
    const handleToggle = () => {
        setIsRegister(prev => !prev);
        setShowOtpInput(false);
        setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
        setError('');
        setSuccessMessage('');
    };

    const validateForm = () => {
        if (!formData.email || !formData.password) { setError('Email and Password are required.'); return false; }
        if (isRegister && !showOtpInput) {
            if (!formData.name || !formData.companyName) { setError('Name and Company Name are required.'); return false; }
            if (formData.password !== formData.confirmPassword) { setError('Passwords do not match.'); return false; }
        }
        return true;
    };

    const makeApiCall = async (payload) => {
        const response = await fetch(REGISTER_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        const data = await response.json();
        return { response, data };
    };

    const handleRegistrationSubmit = async () => {
        const payload = {
            action: "register",
            contact_person_name: formData.name,
            company_official_name: formData.companyName,
            email_address: formData.email,
            password: formData.password,
            confirm_password: formData.confirmPassword,
        };
        const { response, data } = await makeApiCall(payload);
        if (!isMountedRef.current) return;

        if (!response.ok) {
            setError(getErrorMessage(data));
        } else {
            alert(data.message || "OTP sent!");
            setShowOtpInput(true);
        }
    };

    const handleOtpVerification = async () => {
        if (!otp) { setError("Enter the OTP sent to your email."); return; }
        const payload = {
            action: "verify_otp",
            contact_person_name: formData.name, 
            company_official_name: formData.companyName, 
            email_address: formData.email,
            password: formData.password, 
            confirm_password: formData.confirmPassword, 
            otp,
        };
        const { response, data } = await makeApiCall(payload);
        if (!isMountedRef.current) return;

        if (!response.ok) {
            setError(getErrorMessage(data) || "OTP verification failed.");
        } else {
            alert("OTP verified! You can now login.");
            setIsRegister(false);
            setShowOtpInput(false);
        }
    };

    const handleLoginSubmit = async () => {
        const payload = {
            action: "login",
            contact_person_name: "ignored", 
            company_official_name: "ignored",
            confirm_password: "ignored",
            email_address: formData.email,
            password: formData.password,
        };
        const { response, data } = await makeApiCall(payload);
        if (!isMountedRef.current) return;

        if (!response.ok) {
            setError(getErrorMessage(data));
        } else {
            setSuccessMessage("Login successful! Redirecting to dashboard...");
            setTimeout(() => navigate('/employer/dashboard'), 1500);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            if (isRegister) { 
                showOtpInput ? await handleOtpVerification() : await handleRegistrationSubmit();
            } else {
                await handleLoginSubmit();
            }
        } catch (err) { 
            setError("Network error or server unavailable."); 
        } finally { 
            setLoading(false);
        }
    };

    const inputClass = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white text-gray-800 transition-colors duration-200";
    const buttonClass = `w-full py-3 mt-4 text-white font-bold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center ${loading ? 'bg-orange-300 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`;
    const buttonContent = loading ? 'Processing...' : showOtpInput ? "Verify OTP" : isRegister ? <><UserRoundPlus size={20} className="mr-2" /> Register Company</> : <><LogIn size={20} className="mr-2" /> Login</>;

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
            style={{
                backgroundImage: 'linear-gradient(135deg, #fff7ed 0%, #ffe0b2 100%)', // ✅ white + orange light gradient
                backgroundSize: 'cover',
                paddingTop: '100px',   // keeps space below header
                paddingBottom: '50px',
            }}
        >
            <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-xl shadow-2xl backdrop-blur-sm bg-opacity-95">
                <a href="/" className="flex items-center text-sm text-orange-600 mb-6 hover:underline">
                    <ChevronLeft size={16} className="mr-1" /> Back to Home
                </a>

                <h1 className="text-3xl font-extrabold text-gray-900 mb-2 flex items-center">
                    <Building size={28} className="mr-2 text-orange-500" />
                    Employer {isRegister ? 'Registration' : 'Login'}
                </h1>
                <p className="text-gray-600 mb-6">
                    {isRegister ? 'Create your company account to post jobs.' : 'Welcome back! Log in to manage your postings.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {showOtpInput ? (
                        <input type="text" name="otp" placeholder="Enter OTP" value={otp} onChange={handleOtpChange} className={inputClass} maxLength={6} required />
                    ) : (
                        <>
                            {isRegister && (
                                <>
                                    <input type="text" name="name" placeholder="Contact Person Name" value={formData.name} onChange={handleChange} className={inputClass} required />
                                    <input type="text" name="companyName" placeholder="Official Company Name" value={formData.companyName} onChange={handleChange} className={inputClass} required />
                                </>
                            )}
                            <input type="email" name="email" placeholder="Business Email Address" value={formData.email} onChange={handleChange} className={inputClass} required />
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className={inputClass} required />
                            {isRegister && <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className={inputClass} required />}
                        </>
                    )}

                    {successMessage && (
                        <p className="text-sm text-green-700 bg-green-100 p-2 rounded-lg font-medium flex items-center">
                            ✅ {successMessage}
                        </p>
                    )}

                    {error && <p className="text-sm text-red-600 bg-red-100 p-2 rounded-lg font-medium">{error}</p>}

                    <button type="submit" disabled={loading} className={buttonClass}>{buttonContent}</button>
                </form>

                {!showOtpInput && (
                    <div className="mt-6 text-center text-sm text-gray-700">
                        {isRegister ? (
                            <span>Already have an account? <button onClick={handleToggle} className="ml-1 font-semibold text-orange-600 hover:underline">Login Here</button></span>
                        ) : (
                            <span>Need to create an account? <button onClick={handleToggle} className="ml-1 font-semibold text-orange-600 hover:underline">Register Now</button></span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployerAuth;
