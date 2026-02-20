import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Award, Repeat, Timer, ChevronsRight, X, ChevronDown, BookOpen, Laptop, Briefcase, BarChart2, ChevronLeft, ChevronRight, Save, Download } from 'lucide-react'; // Added Download icon

// --- CSS for Custom Animations (MUST be included in your project's global CSS or tailwind.config.js) ---
const customAnimationsCSS = `
  @keyframes slideInLeft {
    0% {
      opacity: 0;
      transform: translateX(-100%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slide-in-left {
    animation: slideInLeft 0.5s ease-out forwards;
  }

  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  /* Custom animation delays to be used with the utility class */
  .animation-delay-200 { animation-delay: 200ms; }
  .animation-delay-500 { animation-delay: 500ms; }

  /* CSS for Certificate Printing - Hides everything but the certificate content */
  @media print {
      body * {
          visibility: hidden;
      }
      #certificate-of-achievement, #certificate-of-achievement * {
          visibility: visible;
      }
      #certificate-of-achievement {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          min-height: 100vh;
          margin: 0;
          padding: 20px;
          box-sizing: border-box;
          color: #000; /* Ensure dark text for print */
          background-color: #fff; /* Ensure white background for print */
      }
  }
`;
// --- END of Custom Animation CSS ---

// --- EXPANDED Industry and Test Data Structures (Unchanged) ---
const itTests = [
  // Core IT & Development
  { id: 3, title: 'IT Fundamentals', description: 'Core IT and technical concepts.', category: 'it_technical' },
  { id: 10, title: 'Programming Basics', description: 'Fundamental programming concepts.', category: 'it_technical' },
  { id: 12, title: 'Web Development Basics (HTML/CSS/JS)', description: 'HTML, CSS, and JavaScript knowledge.', category: 'it_technical' },
  { id: 13, title: 'Software Engineering & SDLC', description: 'Software development life cycles and methodologies.', category: 'it_technical' },
  { id: 16, title: 'Networking Fundamentals', description: 'Basic networking concepts and protocols.', category: 'it_technical' },
  { id: 20, title: 'General IT Knowledge', description: 'A broad assessment of IT concepts and terminology.', category: 'it_technical' },
  // Specialized IT
  { id: 21, title: 'Java Programming', description: 'Intermediate Java concepts and OOP.', category: 'it_technical' },
  { id: 22, title: 'Python for Data Science', description: 'Python syntax, libraries like Pandas/Numpy.', category: 'it_technical' },
  { id: 23, title: 'Database Management (SQL)', description: 'SQL queries, relational databases, and data integrity.', category: 'it_technical' },
  { id: 24, title: 'Cloud Computing (AWS/Azure)', description: 'Fundamentals of cloud platforms and services.', category: 'it_technical' },
  { id: 25, title: 'Cyber Security Essentials', description: 'Risk, vulnerability, and threat management basics.', category: 'it_technical' },
  { id: 26, title: 'React/Angular/Vue Frameworks', description: 'Modern JavaScript framework knowledge.', category: 'it_technical' },
  { id: 27, title: 'Operating Systems (Linux/Windows)', description: 'OS core concepts and command-line usage.', category: 'it_technical' },
  { id: 28, title: 'DevOps Tools (Git/Docker/CI/CD)', description: 'Continuous integration and deployment tools.', category: 'it_technical' },
];

const nonItTests = [
  // Management & Business
  { id: 4, title: 'Non-IT Professional Essentials', description: 'Questions related to business, management, and general knowledge.', category: 'non_it_general' },
  { id: 7, title: 'Human Resources Management', description: 'Recruitment, compliance, and employee relations.', category: 'non_it_general' },
  { id: 11, title: 'Financial Accounting & Management', description: 'Financial concepts, P&L, and balance sheets.', category: 'non_it_general' },
  { id: 15, title: 'Project Management (PMP/Agile)', description: 'Project planning, execution, and risk management.', category: 'non_it_general' },
  { id: 29, title: 'Supply Chain & Logistics', description: 'Inventory, procurement, and supply chain optimization.', category: 'non_it_general' },
  // Sales & Support
  { id: 6, title: 'Marketing and Sales Principles', description: 'Digital marketing, market research, and sales strategy.', category: 'non_it_general' },
  { id: 14, title: 'Customer Support & Service', description: 'Communication, problem-solving, and service skills.', category: 'non_it_general' },
  { id: 30, title: 'Business Development', description: 'Strategy, lead generation, and client relationship management.', category: 'non_it_general' },
  { id: 31, title: 'General Management Skills', description: 'Leadership, decision-making, and organizational structure.', category: 'non_it_general' },
];

const otherTests = [
  // Aptitude
  { id: 1, title: 'General Aptitude', description: 'Logical, numerical, and verbal reasoning skills.', category: 'aptitude' },
  { id: 8, title: 'Logical Reasoning', description: 'Problem-solving and critical thinking.', category: 'aptitude' },
  { id: 18, title: 'Quantitative Aptitude', description: 'Numerical and mathematical reasoning (Advanced).', category: 'aptitude' },
  // English
  { id: 2, title: 'English Proficiency', description: 'Grammar, vocabulary, and writing skills.', category: 'english' },
  { id: 9, title: 'Verbal Ability', description: 'Vocabulary, reading comprehension, and sentence correction.', category: 'english' },
  { id: 17, title: 'Business Communication', description: 'Verbal and written communication in a professional context.', category: 'english' },
  // General Knowledge
  { id: 32, title: 'General Awareness (Current Affairs)', description: 'Knowledge of current events and world affairs.', category: 'general' },
  { id: 33, title: 'Critical Thinking', description: 'Analyzing facts to form a judgment.', category: 'general' },
];

const industryOptions = {
  'IT Industry': itTests,
  'Non-IT': nonItTests,
  'Other/General': otherTests,
};

// Merging all tests for the initial Test List view (fallback)
const fallbackAvailableTests = [...itTests, ...nonItTests, ...otherTests].sort((a, b) => a.id - b.id);
// --- END of EXPANDED Test Data Structures ---

// --- Assessment Questions Data (Unchanged) ---
const allAssessments = {
  // Existing categories...
  aptitude: [
    { id: 1, text: 'If a car travels at a speed of 60 km/h, how long will it take to cover 180 km?', options: ['2 hours', '3 hours', '4 hours'], correct: '3 hours' },
    { id: 2, text: 'What is 15% of 200?', options: ['15', '30', '45'], correct: '30' },
    { id: 3, text: 'If $a = 5$ and $b = 3$, what is $a² - b²$?', options: ['16', '12', '8'], correct: '16' },
  ],
  english: [
    { id: 11, text: 'Choose the correct synonym for "diligent".', options: ['Lazy', 'Hard-working', 'Careless'], correct: 'Hard-working' },
    { id: 12, text: 'Which word is an antonym for "brave"?', options: ['Courageous', 'Fearful', 'Strong'], correct: 'Fearful' },
    { id: 13, text: 'Identify the grammatically correct sentence.', options: ['He go to the park.', 'He goes to the park.', 'He going to the park.'], correct: 'He goes to the park.' },
  ],
  it_technical: [
    { id: 21, text: 'Which data structure is a LIFO (Last-In, First-Out) structure?', options: ['Queue', 'Stack', 'Array'], correct: 'Stack' },
    { id: 22, text: 'What is the full form of HTML?', options: ['Hyper Text Markup Language', 'High Text Markup Language', 'Hyperlink and Text Markup Language'], correct: 'Hyper Text Markup Language' },
    { id: 23, text: 'Which of these is a programming language?', options: ['Photoshop', 'SQL', 'Java'], correct: 'Java' },
  ],
  non_it_general: [
    { id: 28, text: 'What is the full form of a "CV"?', options: ['Career View', 'Curriculum Vitae', 'Company Verification'], correct: 'Curriculum Vitae' },
    { id: 29, text: 'Which of these is a key skill for a manager?', options: ['Coding', 'Communication', 'Graphic Design'], correct: 'Communication' },
    { id: 30, text: 'What does "B2B" stand for in business?', options: ['Business to Business', 'Buy to Business', 'Big to Big'], correct: 'Business to Business' },
  ],
  // New category for General Knowledge
  general: [
    { id: 34, text: 'What is the capital of Japan?', options: ['Seoul', 'Beijing', 'Tokyo'], correct: 'Tokyo' },
    { id: 35, text: 'Who wrote "Romeo and Juliet"?', options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen'], correct: 'William Shakespeare' },
  ],
};
// --- End of Assessment Questions Data ---

// --- Helper Components for Input Fields (Memoized) ---
const InputField = React.memo(({ label, name, type = 'text', value, onChange, placeholder, required = true }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value} 
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
));

const SelectField = React.memo(({ label, name, value, onChange, options, required = true, disabled = false }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`w-full p-3 pl-4 pr-10 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none 
            ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <option value="" disabled>Select {label}</option>
          {options.map((option) => (
            <option key={option.value || option.title || option.id} value={option.value || option.title || option.id}>
              {option.label || option.title || option.name}
            </option>
          ))}
        </select>
        <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>
    </div>
));
// --- End of Helper Components ---

// NOTE: Frontend certificate generation removed. Backend-only certificate flow below.

// API endpoints (update if yours change)
const ASSESS_API_BASE = "https://o10de5xhxh.execute-api.eu-north-1.amazonaws.com/prod";
const CERT_API_BASE = "https://yt1vnloadb.execute-api.eu-north-1.amazonaws.com/prod/generate-certificate";

const AssessmentsSection = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showTestList, setShowTestList] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [completionDate, setCompletionDate] = useState(''); // New state for completion date

  // State for user form data
  const [userData, setUserData] = useState({
    fullName: '',
    surname: '',
    email: '',
    mobileNumber: '',
    industry: '', // IT Industry, Non-IT, Other/General
    testName: '', // The title of the selected test
  });

  // State to track user answers
  const [userAnswers, setUserAnswers] = useState({});

  const [selectedTest, setSelectedTest] = useState(null);

  // Certificate generation state
  const [certificateUrl, setCertificateUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState(null);

  // API fetched assessments (optional override of local tests)
  const [apiAssessments, setApiAssessments] = useState(null);
  const [availableTests, setAvailableTests] = useState(fallbackAvailableTests);

  // --- Utility Functions ---

  useEffect(() => {
      // Injecting Custom CSS for Animation
      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = customAnimationsCSS;
      document.head.appendChild(style);
      return () => {
          document.head.removeChild(style);
      };
  }, []);

  // Fetch assessments from backend on mount (if available)
  useEffect(() => {
    let ignore = false;
    const load = async () => {
      try {
        const res = await fetch(`${ASSESS_API_BASE}/assessments`, { method: 'GET' });
        if (!res.ok) throw new Error(`Assessments API returned ${res.status}`);
        const json = await res.json();
        // Expecting shape: { count: N, data: [ {id, title, description}, ... ] }
        if (!ignore && json && Array.isArray(json.data)) {
          setApiAssessments(json.data);
          // Convert to the shape used by availableTests
          const mapped = json.data.map(a => ({
            id: a.id,
            title: a.title,
            description: a.description || '',
            category: a.category || 'general'
          }));
          // Merge with local tests (avoid duplicates by id)
          const merged = [...mapped];
          fallbackAvailableTests.forEach(local => {
            if (!merged.some(m => m.id === local.id)) merged.push(local);
          });
          setAvailableTests(merged.sort((a, b) => (a.id || 0) - (b.id || 0)));
        }
      } catch (e) {
        // If fetch failed, keep fallbackAvailableTests (silent fallback)
        console.warn("Failed to load assessments from API, using local fallback.", e);
        setAvailableTests(fallbackAvailableTests);
      }
    };
    load();
    return () => { ignore = true; };
  }, []);

  useEffect(() => {
    let timer;
    if (testStarted && !showResult && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && testStarted) {
      handleEndTest(); // Auto-submit on time up
    }
    return () => clearTimeout(timer);
  }, [timeLeft, testStarted, showResult]);

  const generateQuestions = (testCategory) => {
    const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);
    const newQuestions = [];

    // Use a reasonable number of questions (e.g., 20)
    const MAX_QUESTIONS = 20; 

    // Prioritize questions from the selected category
    const mainCategoryQuestions = allAssessments[testCategory] || [];
    newQuestions.push(...shuffleArray(mainCategoryQuestions));

    // Fill the rest with a mix of other categories to reach 20
    const otherCategories = Object.keys(allAssessments).filter(cat => cat !== testCategory);
    otherCategories.forEach(cat => {
      newQuestions.push(...shuffleArray(allAssessments[cat]));
    });

    return shuffleArray(newQuestions.slice(0, MAX_QUESTIONS));
  };

  const handleSelectTest = (test) => {
    setSelectedTest(test);
    setUserData(prev => ({ ...prev, testName: test.title }));
    setShowTestList(false);
    setShowForm(true);
  };

  const handleStartTest = () => {
    // 1. Save User Data (Simulated)
    console.log("User Data Saved:", userData); 
    
    // 2. Find the category and Generate Test
    const allTests = [...itTests, ...nonItTests, ...otherTests];
    // If we used API assessments, try to find category from them else fallback to local mapping:
    const testCategory = allTests.find(t => t.title === userData.testName)?.category || 'general';

    const newQuestions = generateQuestions(testCategory);
    setSelectedQuestions(newQuestions);
    
    setShowForm(false);
    setTestStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(900);
    setUserAnswers({}); // Reset answers
    setCertificateUrl(null);
    setGenerateError(null);
  };

  const calculateScore = (answers) => {
    let newScore = 0;
    selectedQuestions.forEach(q => {
      if (answers[q.id] === q.correct) {
        newScore++;
      }
    });
    return newScore;
  };

  // Handles question answer selection and navigation logic
  const handleAnswerAndNavigate = (option, navigateDirection) => {
    const questionId = selectedQuestions[currentQuestionIndex].id;
    const updatedAnswers = {
        ...userAnswers,
        [questionId]: option // Save the selected option
    };
    setUserAnswers(updatedAnswers);

    let nextIndex = currentQuestionIndex;

    if (navigateDirection === 'next') {
        nextIndex = currentQuestionIndex + 1;
    } else if (navigateDirection === 'prev') {
        nextIndex = currentQuestionIndex - 1;
    }

    if (nextIndex < selectedQuestions.length && nextIndex >= 0) {
        setCurrentQuestionIndex(nextIndex);
    } else if (nextIndex >= selectedQuestions.length) {
        // End of test
        handleEndTest(updatedAnswers);
    }
  };
  
  const handleEndTest = (answersToScore = userAnswers) => {
      const finalScore = calculateScore(answersToScore);
      setScore(finalScore);
      setTestStarted(false);
      setShowResult(true);
      // Set the current date for the certificate
      setCompletionDate(new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }));
      // Stop the timer implicitly by setting testStarted to false
  }

 // Submit score to backend and then request certificate
const submitScoreAndGenerateCertificate = async () => {
  // Guard
  if (score < 12) {
    setGenerateError("Not eligible for certificate (score < 12).");
    return;
  }
  if (!userData.fullName || !userData.surname) {
    setGenerateError("Please provide your full name and surname before generating certificate.");
    return;
  }

  setIsGenerating(true);
  setGenerateError(null);
  setCertificateUrl(null);

  try {
    // Build minimal payload expected by /submit
    // Note: backend expects user_id (required). We don't have persistent user IDs — use a generated int.
    const generatedUserId = Math.floor(Date.now() / 1000); // coarse unique integer

    // Determine assessment_id: try selectedTest.id else try to infer from API Assessments
    let assessmentId = selectedTest?.id || null;
    if (!assessmentId && apiAssessments && userData.testName) {
      const found = apiAssessments.find(
        a => (a.title || '').toLowerCase() === (userData.testName || '').toLowerCase()
      );
      assessmentId = found ? found.id : null;
    }

    // ✅ Safe fallback: ensure the assessment ID exists in your database
    // (your current DB only has IDs 1, 2, and 3)
    if (!assessmentId || ![1, 2, 3].includes(assessmentId)) {
      assessmentId = 1; // fallback to a valid existing assessment
    }

    const payload = {
      user_id: generatedUserId,
      user_name: `${userData.fullName} ${userData.surname}`,
      course: userData.testName || "Course Completion",
      score: score,
      total: selectedQuestions.length || 20,
      assessment_id: assessmentId
    };

    // 🔽 (keep rest of your function here unchanged)

      // Submit score to API
      const submitRes = await fetch(`${ASSESS_API_BASE}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      let submitJson = await submitRes.json().catch(() => null);

      // Handle API Gateway wrapped body
      if (submitJson && submitJson.body && typeof submitJson.body === 'string') {
        try {
          submitJson = JSON.parse(submitJson.body);
        } catch (e) { /* ignore */ }
      }

      if (!submitRes.ok) {
        const msg = (submitJson && (submitJson.message || submitJson.error)) ? (submitJson.message || submitJson.error) : `Submit API returned ${submitRes.status}`;
        throw new Error(msg);
      }

      // Expecting submit response containing new score row id in data.id
      const returnedId = submitJson?.data?.id || submitJson?.id || submitJson?.score_id || null;
      if (!returnedId) {
        // Some implementations return id at top-level as 'id'
        // If still not available, throw
        throw new Error("Submit API did not return new score id.");
      }

      // Now call certificate generator with the returned id
  const certApiUrl = `${CERT_API_BASE}?id=${returnedId}`;



      const certRes = await fetch(certApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // If your API requires an Origin header or API key, add it here.
        }
      });

      let certJson = await certRes.json().catch(() => null);

      if (certJson && certJson.body && typeof certJson.body === 'string') {
        try {
          certJson = JSON.parse(certJson.body);
        } catch (e) { /* ignore */ }
      }

      if (!certRes.ok) {
        const msg = (certJson && (certJson.message || certJson.error)) ? (certJson.message || certJson.error) : `Certificate API returned ${certRes.status}`;
        throw new Error(msg);
      }

      const certUrl =
        certJson?.certificate_url ||
        certJson?.certificateUrl ||
        certJson?.data?.certificate_url ||
        (certJson?.body && (() => { try { return JSON.parse(certJson.body).certificate_url } catch(e){ return null } })());

      if (!certUrl) {
        // Some older responses return full object string inside 'body'
        if (certJson && certJson.body) {
          try {
            const parsed = JSON.parse(certJson.body);
            if (parsed.certificate_url) {
              setCertificateUrl(parsed.certificate_url);
              window.open(parsed.certificate_url, '_blank', 'noopener,noreferrer');
              return;
            }
          } catch (e) { /* ignore */ }
        }
        throw new Error("No certificate URL returned from server.");
      }

      setCertificateUrl(certUrl);
      // Open in new tab
      window.open(certUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error("Certificate generation failed:", err);
      setGenerateError(err.message || 'Certificate generation failed.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Exposed as the Download button handler
  const downloadCertificate = async () => {
    await submitScoreAndGenerateCertificate();
  };

  /**
    * ✅ CRITICAL FIX IMPLEMENTED HERE: 
    * Wrapping handleFormChange with useCallback ensures that this function 
    * reference is stable across renders, which is crucial for memoized child components 
    * (like InputField) to retain focus.
    */
  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    
    setUserData(prev => {
        const newState = { ...prev, [name]: value };
        
        // Only reset testName if the industry field itself is changing to a new value
        if (name === 'industry' && value !== prev.industry) {
          newState.testName = '';
        }
        return newState;
    });
  }, []); // Empty dependency array ensures the function is created only once

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Changed score thresholds as per the new requirement (12 or above)
  const getCertificateStatus = (finalScore) => {
    if (finalScore >= 18) {
      return { text: "Merit Certificate!", color: "text-yellow-500", icon: <Award size={64} />, type: "Merit Certificate!" };
    } else if (finalScore >= 14) {
      return { text: "Certificate of Distinction", color: "text-blue-500", icon: <Award size={64} />, type: "Certificate of Distinction" };
    } else if (finalScore >= 12) {
      return { text: "Certificate of Completion", color: "text-green-500", icon: <Award size={64} />, type: "Certificate of Completion" };
    } else {
      return { text: "No Certificate Awarded", color: "text-red-500", icon: <X size={64} />, type: "None" };
    }
  };

  const certificateStatus = showResult ? getCertificateStatus(score) : {};
  const isCertificateEligible = score >= 12; // Check for 12 or above
  
  const isFormComplete = userData.fullName && userData.surname && userData.email && userData.mobileNumber && userData.industry && userData.testName;

  // Use useMemo to prevent recalculating test questions on every render
  const currentTestQuestions = useMemo(() => {
    // build from industryOptions OR fallback to API list categories if provided
    return userData.industry ? industryOptions[userData.industry] : [];
  }, [userData.industry]);

  // Determine if we're on the last question for the 'End Test' button
  const isLastQuestion = currentQuestionIndex === selectedQuestions.length - 1;


  return (
    <section className="bg-white text-gray-800 dark:text-gray-200 min-h-screen pt-12">
        {/* Removed frontend certificate component — we rely on backend-generated certificate */}
        
      <div className="container mx-auto px-4 max-w-4xl pt-8">
        <h2 className="text-4xl md:text-5xl font-semibold text-center text-slate-900 dark:text-white mb-6 drop-shadow-md 
        animate-slide-in-left opacity-0 animation-delay-200"
        style={{animationFillMode: 'forwards'}}>
          Skill Assessments
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto animation-delay-500 animate-fade-in opacity-0"
        style={{animationFillMode: 'forwards'}}>
          Choose an assessment below or fill the form to select a tailored test!
        </p>

        {/* Updated Form/Registration Section */}
        {showForm && (
          <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 text-center animate-fade-in opacity-0"
          style={{animationFillMode: 'forwards'}}>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">User Registration & Test Selection</h3>
            
            <form onSubmit={(e) => { e.preventDefault(); handleStartTest(); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* InputField uses memoized handler */}
                    <InputField label="Full Name" name="fullName" value={userData.fullName} onChange={handleFormChange} placeholder="John" />
                    <InputField label="Surname" name="surname" value={userData.surname} onChange={handleFormChange} placeholder="Doe" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Email" name="email" type="email" value={userData.email} onChange={handleFormChange} placeholder="john.doe@example.com" />
                    <InputField label="Mobile Number" name="mobileNumber" type="tel" value={userData.mobileNumber} onChange={handleFormChange} placeholder="9876543210" />
                </div>
                
                <hr className="my-6 border-gray-200 dark:border-gray-700" />
                
                {/* SelectField uses memoized handler */}
                <SelectField
                    label="Select Industry"
                    name="industry"
                    value={userData.industry}
                    onChange={handleFormChange}
                    options={[
                        { value: 'IT Industry', label: 'IT Industry (Software, Tech)' },
                        { value: 'Non-IT', label: 'Non-IT (Business, Management, Finance, HR)' },
                        { value: 'Other/General', label: 'Other/General (Aptitude, English, GA)' },
                    ]}
                />

                <SelectField
                    label="Select Test Name"
                    name="testName"
                    value={userData.testName}
                    onChange={handleFormChange}
                    disabled={!userData.industry}
                    options={currentTestQuestions.map(test => ({ title: test.title }))}
                />
                
                <button
                    type="submit"
                    disabled={!isFormComplete}
                    className="mt-6 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg transition-transform duration-300 hover:scale-105 transform hover:rotate-2 flex items-center justify-center mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Save size={20} className="mr-2" />
                    <span>Save & Start Test</span>
                </button>
            </form>
            <button
                onClick={() => {
                    setShowForm(false);
                    setShowTestList(true);
                }}
                className="mt-4 text-sm text-gray-500 dark:text-gray-400 hover:text-teal-500 transition-colors"
            >
                Back to Test List
            </button>
          </div>
        )}

        {showTestList && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Display all expanded tests */}
            {availableTests.map((test, index) => (
              <div
                key={test.id}
                onClick={() => {
                    // Logic to pre-select industry based on the test clicked
                    const inferredIndustry = Object.keys(industryOptions).find(key => 
                        industryOptions[key].some(t => t.id === test.id)
                    ) || 'Other/General';
                    
                    setUserData(prev => ({...prev, testName: test.title, industry: inferredIndustry}));
                    handleSelectTest(test);
                }}
                className={`bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col items-start 
                animate-fade-in-up opacity-0`}
                style={{animationDelay: `${index * 50 + 700}ms`, animationFillMode: 'forwards'}} 
              >
                <div className="p-3 bg-teal-500/10 text-teal-500 rounded-lg mb-4">
                  {test.category === 'aptitude' || test.category === 'general' ? <BarChart2 size={24} /> : null}
                  {test.category === 'english' && <BookOpen size={24} />}
                  {test.category === 'it_technical' && <Laptop size={24} />}
                  {test.category === 'non_it_general' && <Briefcase size={24} />}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{test.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{test.description}</p>
                <button
                  className="mt-auto inline-flex items-center text-teal-500 font-semibold transition-colors duration-200 hover:text-teal-600"
                >
                  Take Test <ChevronsRight size={16} className="ml-1" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Test Question Section with Navigation */}
        {testStarted && !showResult && selectedQuestions.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center text-lg mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Question {currentQuestionIndex + 1} of {selectedQuestions.length}</span>
              <span className="flex items-center space-x-2 text-red-500 font-bold">
                <Timer size={20} />
                <span>{formatTime(timeLeft)}</span>
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              {selectedQuestions[currentQuestionIndex].text}
            </h3>
            
            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedQuestions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    // Save answer but do not auto-navigate on click
                    const questionId = selectedQuestions[currentQuestionIndex].id;
                    setUserAnswers(prev => ({ ...prev, [questionId]: option }));
                  }} 
                  // Highlight button if it is the currently selected answer
                  className={`p-5 rounded-xl shadow-md font-medium text-left transition-transform duration-200 hover:scale-[1.02] 
                      ${userAnswers[selectedQuestions[currentQuestionIndex].id] === option 
                        ? 'bg-teal-500 text-white dark:bg-teal-600'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-teal-500/80 hover:text-white dark:hover:bg-teal-600/80'
                      }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between items-center">
                <button
                    onClick={() => handleAnswerAndNavigate(userAnswers[selectedQuestions[currentQuestionIndex].id], 'prev')}
                    disabled={currentQuestionIndex === 0}
                    className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white px-6 py-3 rounded-full font-semibold shadow-md transition-transform duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                    <ChevronLeft size={20} className="mr-2" />
                    Previous
                </button>

                {isLastQuestion ? (
                    <button
                        onClick={() => handleEndTest()}
                        className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-transform duration-300 hover:scale-105"
                    >
                        End Test
                    </button>
                ) : (
                    <button
                        onClick={() => handleAnswerAndNavigate(userAnswers[selectedQuestions[currentQuestionIndex].id], 'next')}
                        // Ensure Next button is disabled if no answer is selected for the current question
                        disabled={!userAnswers.hasOwnProperty(selectedQuestions[currentQuestionIndex].id)}
                        className="bg-teal-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-transform duration-300 hover:scale-105 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                        <ChevronRight size={20} className="ml-2" />
                    </button>
                )}
            </div>
          </div>
        )}

        {/* Result Section (Updated with Certificate Logic and Download Button) */}
        {showResult && (
          <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 text-center">
            <div className="flex flex-col items-center justify-center mb-6">
              <div className={`p-4 rounded-full ${certificateStatus.color}`}>
                {certificateStatus.icon}
              </div>
              <h3 className={`mt-4 text-3xl md:text-4xl font-extrabold ${certificateStatus.color}`}>
                {certificateStatus.text}
              </h3>
            </div>
            <p className="text-xl md:text-2xl font-semibold mb-2">
              Your Score: <span className="font-bold">{score} / {selectedQuestions.length}</span>
            </p>
            {!isCertificateEligible && (
              <p className="text-red-500 font-bold mb-6">
                You need a score of **12 or more** to be eligible for a certificate.
              </p>
            )}
            {isCertificateEligible && (
              <p className="text-gray-600 dark:text-gray-400 mb-6 font-semibold">
                Congratulations, **{userData.fullName} {userData.surname}**! You have successfully passed the **{userData.testName}** test on **{completionDate}** and are eligible for a certificate!
              </p>
            )}

            {/* Show generation status / link */}
            {isCertificateEligible && (
              <div className="mb-6">
                {isGenerating ? (
                  <p className="text-teal-600 font-semibold">Generating your certificate... please wait.</p>
                ) : generateError ? (
                  <p className="text-red-500 font-semibold">Error: {generateError}</p>
                ) : certificateUrl ? (
                  <div className="flex flex-col items-center space-y-2">
                    <a href={certificateUrl} target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
                      Open your certificate
                    </a>
                    <p className="text-sm text-gray-600">You can also download or share this link.</p>
                  </div>
                ) : (
                  <p className="text-gray-600">Click <strong>Download Certificate</strong> to generate it via server.</p>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <button
                onClick={() => {
                  setShowForm(false);
                  setTestStarted(false);
                  setShowResult(false);
                  setShowTestList(true); // Return to the test list
                  setCertificateUrl(null);
                  setGenerateError(null);
                }}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-transform duration-300 hover:scale-105 flex items-center justify-center"
              >
                <Repeat size={20} className="mr-2" />
                <span>Retake Test</span>
              </button>
              {isCertificateEligible && (
                <button
                  onClick={downloadCertificate}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-transform duration-300 hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download size={20} className="mr-2" />
                  <span>{isGenerating ? 'Generating...' : (certificateUrl ? 'Regenerate / Download' : 'Download Certificate')}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AssessmentsSection;
