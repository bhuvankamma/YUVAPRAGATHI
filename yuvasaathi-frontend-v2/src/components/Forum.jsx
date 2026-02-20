import React, { useState } from 'react';
import { MessageSquare, Users, TrendingUp, Sparkles, Search, PlusCircle, ThumbsUp, MessageCircle, Clock, CheckCircle, Briefcase, GraduationCap } from 'lucide-react'; 
import Lottie from 'react-lottie-player';
import * as LottieData from '../assets/forum-animation.json';

// --- Configuration Data ---
const FORUM_CATEGORIES = [
    { title: 'Job Market Discussions', icon: Briefcase, description: 'Trends, salary expectations, and interview tips.', slug: 'job-market', threads: 145 },
    { title: 'Skill Development & Courses', icon: GraduationCap, description: 'Questions on training, certifications, and resources.', slug: 'skills', threads: 89 },
    { title: 'Government Schemes', icon: Sparkles, description: 'Eligibility, application process, and benefits.', slug: 'schemes', threads: 55 },
    { title: 'General Career Advice', icon: Users, description: 'Networking, resume building, and career shifts.', slug: 'general-advice', threads: 201 },
    { title: 'Technical Help', icon: MessageSquare, description: 'Issues with the YuvaSaathi platform or apps.', slug: 'technical-help', threads: 32 },
];

const RECENT_THREADS = [
    { id: 1, title: 'Which certification is best for Data Science in 2024?', category: 'Skill Development & Courses', user: 'Anil S.', replies: 15, views: '1.2K', time: '1 hour ago' },
    { id: 2, title: 'Experiences with the MSME Job Program?', category: 'Government Schemes', user: 'Priya R.', replies: 42, views: '3.5K', time: '5 hours ago' },
    { id: 3, title: 'Is a non-tech background a barrier for IT jobs?', category: 'Job Market Discussions', user: 'Kiran K.', replies: 98, views: '5.1K', time: '1 day ago' },
    { id: 4, title: 'Best practices for creating a video resume.', category: 'General Career Advice', user: 'Deepa V.', replies: 7, views: '800', time: '2 days ago' },
];

// --- Component: Forum Thread Card ---
const ThreadCard = ({ thread, isDarkMode }) => {
    // NOTE: This thread card is still an <a> tag and will navigate, but the user only asked to remove navigation for the category list.
    const cardClass = isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100";
    const userClass = isDarkMode ? "text-blue-400" : "text-blue-600";
    const statClass = isDarkMode ? "text-gray-400" : "text-gray-500";
    const replyClass = isDarkMode ? "text-green-400" : "text-green-600";
    const categoryColor = FORUM_CATEGORIES.find(cat => cat.title === thread.category)?.slug;

    const getCategoryStyles = (slug) => {
        switch (slug) {
            case 'job-market': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
            case 'skills': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
            case 'schemes': return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    return (
        <a href={`/forum/thread/${thread.id}`} className={`block p-5 rounded-lg shadow-md transition-all duration-200 ${cardClass}`}>
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold hover:text-blue-500 transition-colors duration-150">{thread.title}</h3>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ml-3 flex-shrink-0 ${getCategoryStyles(categoryColor)}`}>
                    {thread.category}
                </span>
            </div>
            <div className="flex items-center justify-between text-sm">
                <div className={`flex items-center ${statClass}`}>
                    <Users className="w-4 h-4 mr-1"/>
                    <span className="mr-4">{thread.views} Views</span>
                    <MessageCircle className="w-4 h-4 mr-1 text-green-500"/>
                    <span className={`${replyClass}`}>{thread.replies} Replies</span>
                </div>
                <div className={`text-xs ${statClass}`}>
                    <span className={userClass}>By {thread.user}</span> • {thread.time}
                </div>
            </div>
        </a>
    );
};


// --- Main Component: Forum Page ---
const Forum = ({ isDarkMode }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const containerClass = isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900";
    const titleClass = isDarkMode ? "text-green-400" : "text-green-700";
    const subTitleClass = isDarkMode ? "text-gray-300" : "text-gray-600";
    const cardClass = isDarkMode ? "bg-gray-800 shadow-xl border border-gray-700" : "bg-white shadow-lg border border-green-100";
    const inputClass = isDarkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-green-500" : "bg-white border-gray-300 text-gray-900 focus:ring-green-500";
    const buttonClass = isDarkMode ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700";
    

    const filteredThreads = RECENT_THREADS.filter(thread =>
        thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        thread.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`min-h-screen py-8 md:py-12 px-4 transition-colors duration-500 ${containerClass}`}>
            <div className="container mx-auto max-w-6xl">
                
                {/* Header and Search */}
                <div className="flex flex-col md:flex-row items-center justify-between pb-8 md:pb-12 mb-8 border-b border-gray-200 dark:border-gray-700">
                    <div className="md:w-1/2 mb-6 md:mb-0">
                        <h1 className={`text-4xl md:text-5xl font-extrabold mb-3 tracking-tight ${titleClass}`}>
                            <span className="block text-2xl font-light mb-1">Community Hub</span>
                            YuvaSaathi Discussion Forum
                        </h1>
                        <p className={`text-sm md:text-base ${subTitleClass} leading-relaxed`}>
                            Connect with peers, ask questions about jobs, skills, and schemes, and share your experiences.
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 h-40 md:h-60 flex justify-center items-center">
                        <Lottie
                            loop
                            animationData={LottieData} // <<--- USING LOCAL DATA
                            play
                            style={{ width: '100%', height: '100%', maxWidth: '300px' }}
                            rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
                            speed={0.8}
                        />
                    </div>
                </div>
                
                {/* Search Bar and CTA */}
                <div className="flex flex-col md:flex-row gap-4 mb-10">
                    <div className="flex-grow relative">
                        <input
                            type="text"
                            placeholder="Search threads, topics, or keywords..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full p-4 pl-12 text-base border rounded-xl shadow-inner ${inputClass}`}
                        />
                        <Search className={`w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 ${subTitleClass}`} />
                    </div>
                    <a href="/forum/new-thread" className={`flex items-center justify-center px-6 py-3 font-semibold text-white rounded-xl shadow-lg transition-colors duration-200 ${buttonClass}`}>
                        <PlusCircle className="w-5 h-5 mr-2" />
                        Start New Discussion
                    </a>
                </div>

                {/* Categories and Threads */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    
                    {/* Categories Sidebar */}
                    <div className="lg:col-span-1 space-y-4">
                        <h3 className={`text-xl font-bold mb-4 ${titleClass}`}>Browse Categories</h3>
                        <div className={`p-5 rounded-xl space-y-3 ${cardClass}`}>
                            {FORUM_CATEGORIES.map(cat => (
                                // FIX: Changed <a> to <div> and removed href to prevent navigation
                                <div key={cat.slug} className={`flex items-center p-3 rounded-lg transition-colors duration-150 cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                                    <cat.icon className={`w-5 h-5 mr-3 flex-shrink-0 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                    <div>
                                        <p className="font-medium">{cat.title}</p>
                                        <p className={`text-xs ${subTitleClass}`}>{cat.threads} threads</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Thread List */}
                    <div className="lg:col-span-3">
                        <h3 className={`text-xl font-bold mb-4 ${titleClass}`}>
                            {searchQuery ? `Search Results for "${searchQuery}"` : "Recent Activity"}
                        </h3>
                        <div className="space-y-4">
                            {filteredThreads.length > 0 ? (
                                filteredThreads.map(thread => (
                                    <ThreadCard key={thread.id} thread={thread} isDarkMode={isDarkMode} />
                                ))
                            ) : (
                                <div className={`p-8 rounded-lg text-center ${cardClass}`}>
                                    <Search className="w-8 h-8 mx-auto mb-3 text-red-500" />
                                    <p className="text-lg font-medium">No discussions found matching your search.</p>
                                    <p className={subTitleClass}>Try a different keyword or start a new thread!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Forum;