import React from 'react';
import { Shield, Clock, Zap } from 'lucide-react';
console.log("✅ Using LegalPageLayout from src/components/LegalPageLayout.jsx");

/**
 * A professional, high-impact layout wrapper for all policy and legal pages.
 * Features: Thematic styling, last update timestamp, and visual emphasis on titles.
 * @param {string} title - The main title of the legal document (e.g., "Privacy Policy").
 * @param {string} subtitle - A brief descriptive subtitle.
 * @param {string} lastUpdated - The date of the last policy update.
 * @param {React.ReactNode} children - The rich content of the legal document.
 */
const LegalPageLayout = ({ title, subtitle, lastUpdated, children }) => {
    return (
        <div className="w-full bg-gray-50 dark:bg-slate-900 min-h-screen">
            <div className="container mx-auto px-4 py-12 md:py-16">
                
                {/* Header Block with Icons and Styling */}
                <header className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl border-t-4 border-teal-600 mb-10">
                    <div className="flex items-center space-x-4">
                        <Shield size={40} className="text-teal-600 dark:text-teal-400 flex-shrink-0" />
                        <div>
                          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 leading-snug">
  {title}
</h3>

                            {subtitle && (
                                <p className="mt-1 text-sm md:text-base text-gray-600 dark:text-gray-400">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                    
                    {/* Metadata */}
                    {lastUpdated && (
                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between text-xs md:text-sm text-gray-500 dark:text-gray-500">
                            <span className="flex items-center space-x-2">
                                <Clock size={14} className="text-yellow-500" />
                                <span>Last Updated: {lastUpdated}</span>
                            </span>
                            <span className="flex items-center space-x-2">
                                <Zap size={14} className="text-red-500" />
                                <span>Official Government Policy</span>
                            </span>
                        </div>
                    )}
                </header>

                {/* Content Area (Rich Text/Prose) */}
                <main className="bg-white dark:bg-slate-800 p-6 md:p-10 rounded-xl shadow-xl">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        {children}
                    </div>
                </main>
                
                {/* Government Disclaimer Footer */}
                <div className="mt-10 text-center text-xs md:text-sm text-gray-500 dark:text-gray-600">
                    <p>
                        *This document is the official legal policy of the Yuva Saathi platform, a Bihar Government initiative. Consult the relevant department for official printed copies.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default LegalPageLayout;
