import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie-player';
// Importing relevant icons for the new steps guide
import { User, Lock, Send, LogIn, Home, ChevronRight, Hash, CheckCircle } from 'lucide-react'; 
import * as LoginLottieData from '../assets/login-animation.json'; 

// =================================================================
// ⭐️ NEW COMPONENT: Login Steps Guide
// =================================================================

const loginSteps = [
    { id: 1, name: 'Enter Credentials', icon: User, description: 'Provide your registered Email/Mobile and Password.' },
    { id: 2, name: 'Generate OTP', icon: Send, description: 'Click the button to receive a one-time password (OTP).' },
    { id: 3, name: 'Verify & Access', icon: CheckCircle, description: 'Enter the OTP within 5 minutes to securely log in.' },
];

const LoginStepsGuide = ({ otpSent }) => {
    // Determine the active step based on whether OTP has been sent
    const activeStep = otpSent ? 3 : 1;

    return (
        <div className="hidden md:block md:w-5/12 h-full p-6 bg-white/50 backdrop-blur-sm rounded-l-2xl shadow-lg border-r border-orange-200">
            <h3 className="text-xl font-bold text-orange-700 mb-6">Secure Login Procedure</h3>
            <div className="space-y-4">
                {loginSteps.map((step) => {
                    const isActive = step.id <= activeStep;
                    const isCurrent = (step.id === 1 && !otpSent) || (step.id === 2 && otpSent) || (step.id === 3 && otpSent);
                    const Icon = step.icon;
                    
                    return (
                        <div key={step.id} className="flex items-start transition duration-500 ease-in-out">
                            <div className={`flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0 mr-3 ${
                                isActive ? 'bg-orange-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'
                            } transition-all duration-300 transform`}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-grow border-l-2 ml-3 pl-3 border-gray-200">
                                <h4 className={`text-sm font-semibold transition-colors duration-300 ${isActive ? 'text-orange-600' : 'text-gray-900'}`}>
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
            {/* Added Lottie for visual appeal at the bottom of the guide */}
            <div className="mt-8"> 
                <Lottie
                    loop
                    animationData={LoginLottieData} 
                    play
                    style={{ width: '100%', height: '100px', maxWidth: '200px', margin: '0 auto' }}
                />
            </div>
        </div>
    );
};

// =================================================================
// 🌟 MAIN COMPONENT: Login (with new background & steps)
// =================================================================

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState(''); 
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const AWS_BASE_URL = 'https://g98ejl6tob.execute-api.eu-north-1.amazonaws.com/prod';
    const AWS_LOGIN_ENDPOINT = `${AWS_BASE_URL}/login`;

    const isEmail = (input) => /\S+@\S+\.\S+/.test(input);
    const isMobile = (input) => /^[0-9]{10}$/.test(input);

    const handleGenerateOtp = async () => {
        setMessage(null);
        setLoading(true);

        if (!identifier.trim() || !password.trim() || (!isEmail(identifier) && !isMobile(identifier))) {
            setMessage({ type: 'error', text: 'Please enter a valid email/mobile and your password.' });
            setLoading(false);
            return;
        }

        const payload = { action: 'GENERATE_OTP', identifier: identifier.trim(), password: password.trim() };

        try {
            const response = await fetch(AWS_LOGIN_ENDPOINT, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            if (response.ok) {
                setMessage({ type: 'success', text: result.message || 'OTP sent to your device. Please check SMS/Email.' });
                setOtpSent(true);
            } else {
                setMessage({ type: 'error', text: result.error || result.message || 'Authentication failed.' });
                setOtpSent(false);
            }
        } catch {
            setMessage({ type: 'error', text: 'Network error. Please check your connection.' });
            setOtpSent(false);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        setMessage(null);
        setLoading(true);

        if (!identifier.trim() || !otp.trim()) {
            setMessage({ type: 'error', text: 'Please enter both Email/Mobile and OTP.' });
            setLoading(false);
            return;
        }

        const payload = { action: 'VERIFY_LOGIN', identifier: identifier.trim(), otp_code: otp.trim() };

        try {
            const response = await fetch(AWS_LOGIN_ENDPOINT, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            if (response.ok) {
                setMessage({ type: 'success', text: result.message || 'Login successful! Redirecting...' });
                // 🔑 CRITICAL FIX: Redirect to the handler component first
                // It will display the modal and then redirect to /dashboard
                setTimeout(() => navigate('/test-modal'), 1500); // ⬅️ UPDATED REDIRECT TARGET
            } else {
                setMessage({ type: 'error', text: result.error || result.message || 'Login failed. Check your OTP.' });
            }
        } catch {
            setMessage({ type: 'error', text: 'Network error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            otpSent ? handleLogin() : (identifier.trim() && password.trim() && handleGenerateOtp());
        }
    };

    const isGenerateOtpButtonDisabled = loading || !identifier.trim() || !password.trim();

    return (
        <div 
            className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden"
            style={{ 
                // Updated Background: White to Orange light gradient
                background: 'linear-gradient(135deg, #ffffff 0%, #fef3c7 40%, #ffedd5 100%)' 
            }}
        >
            <div className="absolute inset-0 z-0 opacity-50"></div>
            
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-5xl relative z-10 border border-gray-200 flex min-h-[70vh]">

                {/* Left Column: Login Steps Guide */}
                <LoginStepsGuide otpSent={otpSent} />
                
                {/* Right Column: Login Form */}
                <div className="w-full md:w-7/12 p-8 sm:p-10 flex flex-col items-center bg-white rounded-r-2xl relative">

                    {/* Home Icon to Landing Page */}
                    <button onClick={() => navigate('/')} className="absolute top-4 right-4 text-orange-600 hover:text-orange-800 transition duration-150 rounded-full hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500">
                        <Home className="w-6 h-6" />
                    </button>

                    <div className="text-center mb-6 w-full max-w-sm pt-4"> {/* Added pt-4 for top spacing */}
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">Secure Sign In</h1>
                        <p className="text-gray-500 text-sm">Two-step authentication for enhanced security</p>
                    </div>

                    {message && (
                        <div className={`mb-4 p-3 rounded-lg text-sm border w-full max-w-sm text-center font-medium ${
                            message.type === 'success'
                                ? 'bg-green-100 border-green-400 text-green-800'
                                : 'bg-red-100 border-red-400 text-red-800'
                        }`}>
                            {message.text}
                        </div>
                    )}

                    <form className="space-y-4 w-full flex flex-col items-center" onKeyPress={handleKeyPress}>

                        {/* Identifier Input */}
                        <div className="w-full max-w-sm">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <User className="inline-block w-4 h-4 mr-2 text-orange-600" /> Email / Mobile
                            </label>
                            <input
                                type="text"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                placeholder="name@example.com or 10-digit mobile"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-800"
                            />
                        </div>

                        {/* Password Input (Hidden after OTP sent) */}
                        {!otpSent && (
                            <div className="w-full max-w-sm">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <Lock className="inline-block w-4 h-4 mr-2 text-orange-600" /> Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-800"
                                />
                            </div>
                        )}

                        {/* Generate OTP Button */}
                        {!otpSent && (
                            <button
                                type="button"
                                onClick={handleGenerateOtp}
                                disabled={isGenerateOtpButtonDisabled}
                                className="max-w-xs w-full flex items-center justify-center bg-gradient-to-r from-orange-600 to-indigo-600 hover:from-orange-700 hover:to-indigo-700 disabled:opacity-50 text-white py-2 rounded-lg font-semibold shadow-md transition duration-200"
                            >
                                <Send className="w-4 h-4 mr-2" /> 
                                {loading ? 'Sending OTP...' : 'Generate OTP'}
                            </button>
                        )}

                        {/* OTP Input (Shown after OTP sent) */}
                        {otpSent && (
                            <div className="w-full max-w-sm">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <Hash className="inline-block w-4 h-4 mr-2 text-red-600" /> OTP Code
                                </label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter 6-digit OTP"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-800"
                                    maxLength="6"
                                />
                            </div>
                        )}

                        {/* Verify & Login Button (Shown after OTP sent) */}
                        {otpSent && (
                            <button
                                type="button"
                                onClick={handleLogin}
                                disabled={loading || !otp.trim()}
                                className="max-w-sm w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 text-white py-2 rounded-lg font-semibold flex items-center justify-center shadow-md transition duration-200"
                            >
                                <LogIn className="w-4 h-4 mr-2" /> 
                                {loading ? 'Verifying...' : 'Verify & Login'}
                            </button>
                        )}

                    </form>

                    {/* Footer Register Link */}
                    <p className="mt-6 text-center text-sm text-gray-500 w-full max-w-sm">
                        Don’t have an account?{' '}
                        <button
                            onClick={() => navigate('/register')}
                            className="text-orange-600 hover:text-orange-700 font-semibold inline-flex items-center transition duration-150"
                        >
                            Register Now <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Login;