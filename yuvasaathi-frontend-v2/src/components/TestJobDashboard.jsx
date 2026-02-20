import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobRecommendationModal from "./JobRecommendationModal";

// --- ✅ Firebase Initialization (Safe + Correct) ---
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6pahIObk5dEbkRBwBftESfQAgiyDS2Q4",
  authDomain: "yuvasaathi-38707.firebaseapp.com",
  projectId: "yuvasaathi-38707",
  storageBucket: "yuvasaathi-38707.firebasestorage.app",
  messagingSenderId: "728010695401",
  appId: "1:728010695401:web:a3286f2e88fdb731418678",
};

// ✅ Prevent Firebase duplicate initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// --------------------------------------------------------------------------

const TestJobDashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  // ✅ Try to fetch preferred job from localStorage or fallback gracefully
  const storedJob = localStorage.getItem("userPreferredJobRole");
  const jobRoleToDisplay = storedJob && storedJob.trim() !== ""
    ? storedJob
    : "Software Developer";

  const handleModalClose = () => {
    setIsModalOpen(false);
    console.log("✅ Modal closed. Redirecting to /dashboard...");
    navigate("/dashboard");
  };

  // 🧩 Fallback dashboard view (after modal closed)
  if (!isModalOpen) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-100">
        <h1 className="text-3xl font-semibold text-green-600 mb-4">
          Dashboard Simulation Active
        </h1>
        <p className="text-gray-700">
          The AI-powered job recommendations were displayed successfully.
        </p>
        <p className="text-gray-600 mt-2">
          You can now view your personalized dashboard below.
        </p>
      </div>
    );
  }

  // 🧠 Display the AI-based Job Recommendation Modal
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 relative">
      {/* ✅ Pass correct prop name for job role */}
      <JobRecommendationModal
        userJobRole={jobRoleToDisplay}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />

      {/* Subtle overlay + label */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <p className="absolute top-4 left-4 text-sm text-white bg-blue-600 px-2 py-1 rounded-lg shadow-md">
        AI TEST MODE
      </p>
    </div>
  );
};

export default TestJobDashboard;
