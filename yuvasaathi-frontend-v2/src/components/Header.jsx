import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { Menu, X, ChevronDown, UserPlus, LogIn } from "lucide-react";

import { useTranslation } from "../context/TranslationContext";
import { autoTranslatePage } from "../utils/autoTranslate";

import Logo from "../assets/Logo.png";
import JobLogo from "../assets/job logo.jpg";
import BiharSkillLogo from "../assets/Bihar skill.png";
import BiharLogo from "../assets/Bihar Logo.png";

// =============================================================
// DROPDOWN DATA
// =============================================================
const ABOUT_US_OPTIONS = [
  { name: "About Yuva Pragati Portal", to: "/about", external: false },
  {
    name: "Benefits for Youth",
    to: "https://bihariyojana.com/mukhyamantri-pratigya-yojana/",
    external: true,
  },
];

const SCHEMES_OPTIONS = [
  { name: "Student Credit Card / KYP", to: "https://skillmissionbihar.org/", external: true },
  { name: "Udyami Yojana", to: "https://udyami.bihar.gov.in/", external: true },
  { name: "Skill Development", to: "https://skillmissionbihar.org/", external: true },
  { name: "Labor Welfare & Registration", to: "https://bocwscheme.bihar.gov.in/home", external: true },
  { name: "Public Services", to: "https://serviceonline.bihar.gov.in/", external: true },
  { name: "Social Welfare Schemes", to: "https://state.bihar.gov.in/socialwelfare/CitizenHome.html", external: true },
  { name: "Health Services", to: "https://shs.bihar.gov.in/", external: true },
  { name: "General Administration", to: "https://state.bihar.gov.in/gad/CitizenHome.html", external: true },
];

const SKILLS_OPTIONS = [
  { name: "Skill Development", to: "https://www.yuvasaathi.in/skills", external: true },
  { name: "Assessments", to: "https://www.yuvasaathi.in/assessments", external: true },
];

// =============================================================
// LANGUAGES
// =============================================================
const LANGUAGES = [
  "English", "हिन्दी (Hindi)", "বাংলা (Bengali)", "মারাঠি (Marathi)", "తెలుగు (Telugu)",
  "தமிழ் (Tamil)", "ગુજરાતી (Gujarati)", "ಕನ್ನಡ (Kannada)", "ଓଡ଼ିଆ (Odia)", "ਪੰਜਾਬੀ (Punjabi)",
  "മലയാളം (Malayalam)", "অসমীয়া (Assamese)", "اردو (Urdu)"
];

const LANG_CODES = ["en","hi","bn","mr","te","ta","gu","kn","or","pa","ml","as","ur"];

// =============================================================
// LOGO COMPONENT
// =============================================================
const LogoLink = ({ src, alt, to }) => (
  <a
    href={to}
    target="_blank"
    rel="noopener noreferrer"
    className="block transition-transform duration-300 hover:scale-110"
  >
    <img
      src={src}
      alt={alt}
      className="h-8 w-8 object-contain p-[3px] bg-white border border-gray-200 rounded-full shadow-sm"
    />
  </a>
);

// =============================================================
// TOP LANGUAGE ROW
// =============================================================
const TopHeaderRow = ({
  languageOpen,
  setLanguageOpen,
  currentLanguageLabel,
  onSelectLanguage,
  closeAllDropdowns,
}) => (
  <div className="bg-gray-50 border-b border-gray-200 py-1 px-4 md:px-10 font-sans-alt font-semibold">
    <div className="flex justify-between items-center max-w-7xl mx-auto">

      {/* Logos */}
      <div className="flex items-center gap-3">
        <LogoLink src={JobLogo} alt="Job Logo" to="https://www.yuvasaathi.in/jobs" />
        <LogoLink src={BiharSkillLogo} alt="Bihar Skill" to="https://www.yuvasaathi.in/skills" />
        <LogoLink src={BiharLogo} alt="Bihar Logo" to="/" />
      </div>

      {/* Language Dropdown */}
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            closeAllDropdowns("language");
            setLanguageOpen(!languageOpen);
          }}
          className="flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-800 transition"
        >
          <span className="font-bold">{currentLanguageLabel.split(" ")[0]}</span>
          <ChevronDown size={10} className={`${languageOpen ? "rotate-180" : ""}`} />
        </button>

        {languageOpen && (
          <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-xl w-40 max-h-60 overflow-y-auto z-50 py-1 font-semibold">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectLanguage(lang);
                }}
                className={`block w-full text-left px-3 py-1 text-[0.65rem] ${
                  lang === currentLanguageLabel
                    ? "bg-sky-100 text-sky-800 font-bold border-l-4 border-sky-500"
                    : "hover:bg-sky-50"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

// =============================================================
// FIXED DROPDOWN COMPONENT
// =============================================================
const Dropdown = ({ title, options, open, setOpen }) => (
  <div className="relative font-sans-alt font-semibold">
    <button
      onClick={(e) => {
        e.stopPropagation();
        setOpen(!open);
      }}
      className="flex items-center gap-1 text-sm font-semibold text-black hover:text-blue-700 border-b-2 border-transparent hover:border-blue-500 pb-[2px]"
    >
      {title}
      <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
    </button>

    {open && (
      <div className="absolute left-0 mt-2 bg-white border rounded-lg shadow-xl w-56 z-50 py-1 font-semibold max-h-60 overflow-y-auto">
        {options.map((option, index) => {
          const isInternal = option.to && !option.external && !option.to.includes("#");
          const isHash = option.to && option.to.includes("#");

          if (isInternal) {
            return (
              <Link
                key={index}
                to={option.to}
                onClick={() => setOpen(false)}
                className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-blue-50 font-semibold"
              >
                {option.name}
              </Link>
            );
          }

          if (isHash) {
            return (
              <HashLink
                key={index}
                smooth
                to={option.to}
                onClick={() => setOpen(false)}
                className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-blue-50 font-semibold"
              >
                {option.name}
              </HashLink>
            );
          }

          return (
            <a
              key={index}
              href={option.to}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-blue-50 font-semibold"
            >
              {option.name}
            </a>
          );
        })}
      </div>
    )}
  </div>
);

// =============================================================
// MAIN HEADER
// =============================================================
const Header = () => {
  // Load Roboto + Poppins Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => document.head.removeChild(link);
  }, []);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const [aboutOpen, setAboutOpen] = useState(false);
  const [schemesOpen, setSchemesOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const { changeLanguage, language } = useTranslation();
  const [currentLanguageLabel, setCurrentLanguageLabel] = useState("English");

  const closeAllDropdowns = (exc) => {
    if (exc !== "about") setAboutOpen(false);
    if (exc !== "schemes") setSchemesOpen(false);
    if (exc !== "skills") setSkillsOpen(false);
    if (exc !== "login") setLoginOpen(false);
    if (exc !== "register") setRegisterOpen(false);
    if (exc !== "language") setLanguageOpen(false);
  };

  useEffect(() => {
    const idx = LANG_CODES.indexOf(language);
    setCurrentLanguageLabel(idx !== -1 ? LANGUAGES[idx] : "English");
  }, [language]);

  const getLangCode = (label) =>
    LANG_CODES[LANGUAGES.indexOf(label)] || "en";

  const handleLanguageSelect = async (label) => {
    setCurrentLanguageLabel(label);
    setLanguageOpen(false);

    const code = getLangCode(label);
    try {
      await changeLanguage(code);
    } catch {}
    setTimeout(() => autoTranslatePage(code), 200);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-lg bg-white font-sans-alt font-semibold">

      {/* TOP ROW */}
      <TopHeaderRow
        languageOpen={languageOpen}
        setLanguageOpen={setLanguageOpen}
        currentLanguageLabel={currentLanguageLabel}
        onSelectLanguage={handleLanguageSelect}
        closeAllDropdowns={closeAllDropdowns}
      />

      {/* MAIN NAV */}
      <div className="flex items-center justify-between px-4 py-2 md:px-10 border-t border-gray-100">

        <Link
          to="/"
          className="text-xl font-extrabold text-slate-800 hover:text-blue-700 font-sans-alt"
        >
          Yuva Saathi
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center text-sm font-semibold font-sans-alt">

          <Link to="/" className="hover:text-blue-700 border-b-2 border-transparent hover:border-blue-500 pb-[2px]">
            Home
          </Link>

          <Dropdown
            title="About Us"
            options={ABOUT_US_OPTIONS}
            open={aboutOpen}
            setOpen={(val) => {
              closeAllDropdowns("about");
              setAboutOpen(val);
            }}
          />

          <Dropdown
            title="Schemes"
            options={SCHEMES_OPTIONS}
            open={schemesOpen}
            setOpen={(val) => {
              closeAllDropdowns("schemes");
              setSchemesOpen(val);
            }}
          />

          <a
            href="https://www.yuvasaathi.in/jobs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 border-b-2 border-transparent hover:border-blue-500 pb-[2px]"
          >
            Jobs
          </a>

          <Dropdown
            title="Skills"
            options={SKILLS_OPTIONS}
            open={skillsOpen}
            setOpen={(val) => {
              closeAllDropdowns("skills");
              setSkillsOpen(val);
            }}
          />

          <Link to="/forum" className="hover:text-blue-700 border-b-2 border-transparent hover:border-blue-500 pb-[2px]">
            Forum
          </Link>

          <HashLink
            smooth
            to="/#media-gallery-section"
            className="hover:text-blue-700 border-b-2 border-transparent hover:border-blue-500 pb-[2px]"
          >
            Media
          </HashLink>

          <Link to="/faq" className="hover:text-blue-700 border-b-2 border-transparent hover:border-blue-500 pb-[2px]">
            FAQ
          </Link>

          <Link to="/contact" className="hover:text-blue-700 border-b-2 border-transparent hover:border-blue-500 pb-[2px]">
            Contact Us
          </Link>

          {/* REGISTER */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns("register");
                setRegisterOpen(!registerOpen);
              }}
              className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-full hover:bg-orange-600 font-semibold"
            >
              <UserPlus size={14} /> Register
            </button>

            {registerOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-1 font-semibold">
                <Link
                  to="/register"
                  onClick={() => closeAllDropdowns()}
                  className="block px-3 py-1.5 hover:bg-green-50 text-sm"
                >
                  Register as User
                </Link>

                <Link
                  to="/employer-auth?type=register"
                  onClick={() => closeAllDropdowns()}
                  className="block px-3 py-1.5 hover:bg-green-50 text-sm"
                >
                  Register as Employer
                </Link>
              </div>
            )}
          </div>

          {/* LOGIN */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns("login");
                setLoginOpen(!loginOpen);
              }}
              className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-800 font-semibold"
            >
              <LogIn size={14} /> Login
            </button>

            {loginOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-1 font-semibold">
                <Link
                  to="/login"
                  onClick={() => closeAllDropdowns()}
                  className="block px-3 py-1.5 hover:bg-blue-50 text-sm"
                >
                  Login as User
                </Link>

                <Link
                  to="/employer-auth?type=login"
                  onClick={() => closeAllDropdowns()}
                  className="block px-3 py-1.5 hover:bg-blue-50 text-sm"
                >
                  Login as Employer
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-lg font-sans-alt font-semibold">
          <ul className="flex flex-col py-2">

            <Link to="/" onClick={() => setMobileOpen(false)} className="px-4 py-2 hover:bg-gray-100">
              Home
            </Link>

            {/* ABOUT */}
            <button
              className="px-4 py-2 flex justify-between items-center hover:bg-gray-100"
              onClick={() => setAboutOpen(!aboutOpen)}
            >
              About Us <ChevronDown size={14} className={`${aboutOpen ? "rotate-180" : ""}`} />
            </button>
            {aboutOpen && (
              <div className="bg-gray-800 font-semibold">
                {ABOUT_US_OPTIONS.map((opt, i) =>
                  opt.external ? (
                    <a
                      key={i}
                      href={opt.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileOpen(false)}
                      className="block px-6 py-2 text-gray-200 hover:bg-gray-700 font-semibold"
                    >
                      {opt.name}
                    </a>
                  ) : (
                    <Link
                      key={i}
                      to={opt.to}
                      onClick={() => setMobileOpen(false)}
                      className="block px-6 py-2 text-gray-200 hover:bg-gray-700 font-semibold"
                    >
                      {opt.name}
                    </Link>
                  )
                )}
              </div>
            )}

            {/* SCHEMES */}
            <button
              className="px-4 py-2 flex justify-between items-center hover:bg-gray-100"
              onClick={() => setSchemesOpen(!schemesOpen)}
            >
              Schemes <ChevronDown size={14} className={`${schemesOpen ? "rotate-180" : ""}`} />
            </button>
            {schemesOpen && (
              <div className="bg-gray-800 font-semibold">
                {SCHEMES_OPTIONS.map((opt, i) => (
                  <a
                    key={i}
                    href={opt.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-6 py-2 text-gray-200 hover:bg-gray-700 font-semibold"
                  >
                    {opt.name}
                  </a>
                ))}
              </div>
            )}

            {/* JOBS */}
            <a
              href="https://www.yuvasaathi.in/jobs"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2 hover:bg-gray-100"
            >
              Jobs
            </a>

            {/* SKILLS */}
            <button
              className="px-4 py-2 flex justify-between items-center hover:bg-gray-100"
              onClick={() => setSkillsOpen(!skillsOpen)}
            >
              Skills <ChevronDown size={14} className={`${skillsOpen ? "rotate-180" : ""}`} />
            </button>
            {skillsOpen && (
              <div className="bg-gray-800 font-semibold">
                {SKILLS_OPTIONS.map((opt, i) => (
                  <a
                    key={i}
                    href={opt.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-6 py-2 text-gray-200 hover:bg-gray-700 font-semibold"
                  >
                    {opt.name}
                  </a>
                ))}
              </div>
            )}

            {/* OTHER LINKS */}
            <Link
              to="/forum"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2 hover:bg-gray-100"
            >
              Forum
            </Link>

            <HashLink
              smooth
              to="/#media-gallery-section"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2 hover:bg-gray-100"
            >
              Media
            </HashLink>

            <Link
              to="/faq"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2 hover:bg-gray-100"
            >
              FAQ
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2 hover:bg-gray-100"
            >
              Contact Us
            </Link>

            <Link
              to="/register"
              onClick={() => setMobileOpen(false)}
              className="mx-4 mt-4 bg-green-600 text-white text-center py-2 rounded-md"
            >
              Register
            </Link>

            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="mx-4 mb-4 bg-blue-600 text-white text-center py-2 rounded-md"
            >
              Login
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
