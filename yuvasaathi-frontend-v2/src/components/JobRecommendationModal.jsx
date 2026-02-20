import React, { useState, useEffect } from 'react';
import { Briefcase, X, MapPin, DollarSign, Loader2, Zap, Brain, AlertTriangle, Search } from 'lucide-react';

// ✅ Your backend API base URL
const API_BASE_URL = 'https://yuvasaathi-backend-v2.vercel.app/api';

const JobRecommendationModal = ({ userJobRole, onClose, isOpen }) => {
  const [jobs, setJobs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetching Logic (Unchanged for Functionality) ---
  useEffect(() => {
    if (!isOpen || !userJobRole) return;

    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);
      setJobs(null);

      try {
        const query = encodeURIComponent(userJobRole);
        const url = `${API_BASE_URL}/jobs/recommendations?q=${query}&rpp=10`;

        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch recommendations.');
        }

        setJobs(data.job_results || []);
      } catch (err) {
        console.error('❌ Job Recommendation Fetch Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [isOpen, userJobRole]);

  if (!isOpen) return null;

  // --- Helper Components for Clean Rendering ---

  const renderJobCard = (job, index) => (
    <div
      key={job.id || index}
      className="p-4 sm:p-5 border border-gray-100 rounded-xl shadow-lg bg-white transition duration-300 ease-in-out cursor-pointer
                 hover:shadow-xl hover:ring-2 hover:ring-purple-400/50 transform hover:-translate-y-0.5"
      onClick={() => window.open(job.redirect_url, '_blank')}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
        <a
          href={job.redirect_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg sm:text-xl font-poppins font-extrabold text-purple-700 hover:text-purple-900 transition block leading-tight"
          onClick={(e) => e.stopPropagation()}
        >
          {job.title}
        </a>
        <span className="flex items-center mt-2 sm:mt-0 px-3 py-1 text-xs font-bold text-green-800 bg-green-100 rounded-full shadow-md sm:ml-4 flex-shrink-0 w-max border border-green-300">
          <Zap className="h-3 w-3 inline mr-1 text-green-600" />
          Top Match
        </span>
      </div>

      <div className="flex flex-col mt-3 text-sm text-gray-700 font-roboto space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-6">
        <p className="flex items-center font-semibold">
          <Briefcase className="h-4 w-4 mr-1 text-purple-400" />
          {job.company?.display_name || 'Unspecified Company'}
        </p>
        <p className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-1 text-purple-400" />
          <span className="truncate max-w-[150px] sm:max-w-full">
            {job.location_display || 'Remote / Unspecified'}
          </span>
        </p>
        {job.salary_max && (
          <p className="text-pink-600 font-extrabold flex items-center bg-pink-50 px-2 py-0.5 rounded-md">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="text-xs sm:text-sm">₹ {job.salary_max.toLocaleString('en-IN')}</span>
          </p>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    // Renders Loading, Error, or Job List
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center p-10 sm:p-12 text-center h-64">
          <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 animate-spin text-purple-500" />
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 font-roboto">
            <span className="font-semibold text-purple-700">AI Analysis:</span> Fetching top roles for "{userJobRole}"...
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center p-8 sm:p-12 bg-red-100 border-l-4 border-red-500">
          <AlertTriangle className="h-8 w-8 text-red-600 mx-auto" />
          <p className="mt-3 text-red-700 font-poppins font-bold">Failed to Load Jobs</p>
          <p className="text-sm text-red-600 mt-1 font-roboto">{error}</p>
        </div>
      );
    }

    const hasJobs = jobs && jobs.length > 0;

    return (
      <div className="p-4 sm:p-6 bg-gray-50">
        {/* 💬 Disclaimer Box - Always visible - Softer colors */}
        <div className="flex items-start p-3 sm:p-4 mb-5 text-sm text-blue-800 bg-blue-100 border border-blue-300 rounded-lg font-roboto shadow-inner">
          <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0 mr-3 text-blue-500" />
          <p>
            <strong>Disclaimer:</strong> These are AI-matched roles. Always verify details on the official link.
            <strong className="text-red-600 ml-1">We don't guarantee placement.</strong>
          </p>
        </div>

        {!hasJobs ? (
          <div className="text-center p-10 bg-white rounded-2xl border-dashed border-2 border-gray-300 shadow-inner">
            <Search className="h-8 w-8 text-gray-400 mx-auto mb-3" />
            <p className="text-xl font-poppins font-extrabold text-gray-800">
              No Matching Jobs Found
            </p>
            <p className="text-gray-600 mt-3 font-roboto">
              The AI couldn't find immediate matches for your role. Try exploring the{' '}
              <a href="/jobs" className="text-purple-600 hover:text-purple-800 font-semibold transition underline">
                main job board
              </a>.
            </p>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-5">
            {jobs.map(renderJobCard)}
          </div>
        )}
      </div>
    );
  };

  // --- Main Modal Structure ---
  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-gray-900/80 backdrop-blur-md transition-opacity p-0 sm:p-4" onClick={onClose}>
      {/* Modal Content Box - Key structural changes for fixed header/footer and scrollable body */}
      <div
        className="bg-white rounded-t-2xl sm:rounded-3xl shadow-2xl shadow-gray-900/50 w-full max-w-lg transform transition-all duration-500 font-sans
                   ring-4 ring-purple-100/50 flex flex-col h-full sm:h-auto sm:max-h-[90vh]" // Added flex-col and max-h on sm
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >

        {/* Header - Fixed top section */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-100 bg-white z-20 flex-shrink-0 rounded-t-2xl shadow-lg shadow-gray-100/50">
          <h2 className="text-xl sm:text-2xl font-poppins font-extrabold text-gray-800 flex items-center">
            <Brain className="h-6 w-6 sm:h-7 sm:w-7 text-purple-600 mr-2 sm:mr-3" />
            Top AI Matches
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 hover:bg-purple-100 hover:text-purple-700 transition"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* AI Insight Header - Contextual Bar (Also fixed at the top, immediately under the main header) */}
        <div className="flex items-center p-3 sm:p-4 bg-purple-50 border-b border-purple-200 font-roboto flex-shrink-0">
          <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mr-3" />
          <p className="text-xs sm:text-sm text-purple-800 font-medium">
            Personalized recommendations based on your **"{userJobRole}"** profile.
          </p>
        </div>

        {/* Content Section (Scrollable) - KEY CHANGE: flex-grow and overflow-y-auto */}
        <div className="overflow-y-auto flex-grow">
            {renderContent()}
        </div>

        {/* Footer - Fixed bottom section */}
        <div className="p-4 sm:p-5 border-t border-gray-100 text-center bg-white z-20 flex-shrink-0 shadow-xl shadow-gray-100/50 rounded-b-3xl">
          <button
            onClick={onClose}
            className="w-full bg-purple-600 text-white px-5 py-3 rounded-xl font-poppins font-extrabold text-base hover:bg-purple-700 transition shadow-2xl shadow-purple-500/40 transform hover:scale-[1.01] active:scale-95"
          >
            Finished Browsing
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobRecommendationModal;