import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useNavigate,
  useLocation
} from "react-router-dom";

// 🌍 Translation Provider + Hook (NEW)
import { TranslationProvider, useTranslation } from "./context/TranslationContext";
import { autoTranslatePage } from "./utils/autoTranslate";

// 🧩 Core Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";

// ⭐ Feature Components
import JobRecommendationModal from "./components/JobRecommendationModal";
import TestJobDashboard from "./components/TestJobDashboard";

// 🎯 Sections & Feature Pages
import JobsSection from "./components/JobsSection";
import SkillsSection from "./components/SkillsSection";
import AssessmentsSection from "./components/AssessmentsSection";
import AboutUs from "./components/AboutUs";
import FAQ from "./components/FAQ";
import ContactUs from "./components/ContactUs";
import Forum from "./components/Forum";
import AboutCm from "./components/AboutCm";

// 👨‍💼 Employer & User Dashboards
import EmployerAuth from "./components/EmployerAuth";
import UserDashboardPage from "./components/UserDashboardPage";
import AdditionalPage from "./components/AdditionalPage";

// 📊 Info / Utility / Other Components
import BenefitsPrograms from "./components/BenefitsPrograms";
import ImageCarousel from "./components/ImageCarousel";
import HeroSection from "./components/HeroSection";
import MediaGallery from "./components/MediaGallary";
import SchemeSection from "./components/SchemeSection";
import SkillIconScroller from "./components/SkillIconScroller";
import ChatBot from "./components/Chatbot";

// 📍 NEW Component: District Insights for Bihar data
import DistrictInsights from "./components/DistrictInsights";

// ⚖️ Policy / Legal Pages
import TermsOfUsePage from "./components/TermsOfUsePage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import CopyrightPolicyPage from "./components/CopyrightPolicyPage";
import SitemapPage from "./components/SitemapPage";
import GrievanceRedressalPage from "./components/GrievanceRedressalPage";
import DisclaimerPolicyPage from "./components/DisclaimerPolicyPage";
import RTIDocumentsPage from "./components/RTIDocumentsPage";
import LearningResourcesPage from "./components/LearningResourcesPage";

import "./App.css";
import { getRecaptchaToken } from "./utils/recaptcha";


// =================================================================
// 🌟 LOGIN SUCCESS HANDLER COMPONENT
// =================================================================

const LoginSuccessHandler = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const preferredJob =
    localStorage.getItem("userPreferredJobRole") || "IT Sector";

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isModalOpen && (
        <JobRecommendationModal
          jobRole={preferredJob}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
      <p className="text-lg text-gray-700">Loading personalized dashboard...</p>
    </div>
  );
};


// =================================================================
// 📌 MAIN LAYOUT (Header + Footer)
// =================================================================

const MainLayout = () => (
  <>
    <Header />
    <div className="main-content-wrapper min-h-screen bg-white pt-[90px] md:pt-[100px]">
      <Outlet />
    </div>
    <Footer />
  </>
);


// =================================================================
// 🌍 GLOBAL AUTO-TRANSLATION WRAPPER (NEW MAGIC)
// =================================================================

const GlobalAutoTranslator = ({ children }) => {
  const location = useLocation();
  const { language } = useTranslation();

  useEffect(() => {
    // Delay to ensure DOM is fully loaded before translating
    setTimeout(() => {
      autoTranslatePage(language);
    }, 300);
  }, [location, language]);

  return children;
};


// =================================================================
// 🌍 MAIN APP
// =================================================================

function App() {
  useEffect(() => {
    if (window.grecaptcha && window.recaptchaSiteKey) {
      window.grecaptcha.ready(async () => {
        const token = await getRecaptchaToken("page_load");
        console.log("Initial reCAPTCHA token:", token);
      });
    }
  }, []);

  return (
    <TranslationProvider>
      <BrowserRouter>
        <GlobalAutoTranslator>
          <div className="App">
            <Routes>
              {/* Auth Pages */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Login Success → Job Recommendation Modal */}
              <Route
                path="/login-success"
                element={<LoginSuccessHandler />}
              />

              {/* Test Route */}
              <Route path="/test-modal" element={<TestJobDashboard />} />

              {/* Dashboards */}
              <Route path="/dashboard" element={<UserDashboardPage />} />
              <Route
                path="/employer/dashboard"
                element={<AdditionalPage />}
              />

              {/* Chatbot */}
              <Route path="/chatbot" element={<ChatBot />} />

              {/* Main Routes with Header & Footer */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/jobs" element={<JobsSection />} />
                <Route path="/skills" element={<SkillsSection />} />
                <Route path="/assessments" element={<AssessmentsSection />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/forum" element={<Forum />} />
                <Route
                  path="/forum/thread/:threadSlug"
                  element={<Forum />}
                />
                <Route path="/employer-auth" element={<EmployerAuth />} />

                {/* Policy Pages */}
                <Route path="/terms-of-use" element={<TermsOfUsePage />} />
                <Route
                  path="/privacy-policy"
                  element={<PrivacyPolicyPage />}
                />
                <Route
                  path="/copyright-policy"
                  element={<CopyrightPolicyPage />}
                />
                <Route path="/sitemap" element={<SitemapPage />} />
                <Route
                  path="/grievance-policy"
                  element={<GrievanceRedressalPage />}
                />
                <Route
                  path="/disclaimer-policy"
                  element={<DisclaimerPolicyPage />}
                />
                <Route
                  path="/rti-documents"
                  element={<RTIDocumentsPage />}
                />
                <Route
                  path="/learning-resources"
                  element={<LearningResourcesPage />}
                />

                {/* Showcase */}
                <Route path="/hero" element={<HeroSection />} />
                <Route
                  path="/district-insights"
                  element={<DistrictInsights />}
                />
                <Route path="/imagecarousel" element={<ImageCarousel />} />
                <Route path="/benefits" element={<BenefitsPrograms />} />
                <Route path="/schemes" element={<SchemeSection />} />
                <Route
                  path="/skills-icons"
                  element={<SkillIconScroller />}
                />
                <Route path="/AboutCm" element={<AboutCm />} />
              </Route>

              {/* 404 Page */}
              <Route
                path="*"
                element={
                  <div className="flex flex-col items-center justify-center h-screen text-center">
                    <h1 className="text-4xl font-bold text-red-600 mb-2">
                      404 - Page Not Found
                    </h1>
                    <p className="text-gray-600">
                      The page you’re looking for doesn’t exist.
                    </p>
                  </div>
                }
              />
            </Routes>
          </div>
        </GlobalAutoTranslator>
      </BrowserRouter>
    </TranslationProvider>
  );
}

export default App;
