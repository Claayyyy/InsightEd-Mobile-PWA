import React from 'react';
import { useNavigate } from 'react-router-dom';

const EngineerForms = () => {
    const navigate = useNavigate();

    // --- CONFIGURATION: Engineer Specific Data ---
    // Note: I have linked 'School Infrastructure' and 'Resources' to your existing routes.
    // You can add new routes for the other specific engineering forms later.
    const formsData = [
        // { 
        //     id: 1, 
        //     name: "School Infrastructure", 
        //     emoji: "🏗️",
        //     description: "Detailed status of classrooms, buildings, and buildable space.",
        //     route: "/school-infrastructure", // Existing route
        // },
        { 
            id: 2, 
            name: "Damage Assessment", 
            emoji: "🏚️",
            description: "Log major/minor damages needing immediate repair or funding.",
            route: "/damage-assessment", // Placeholder for future form
        },
        { 
            id: 3, 
            name: "Project Monitoring", 
            emoji: "🚧",
            description: "Track progress of ongoing construction and repair projects.",
            route: "/project-monitoring", // Placeholder for future form
        },
        { 
            id: 4, 
            name: "Site Inspection", 
            emoji: "📋",
            description: "Safety checklists and site validation reports.",
            route: "/site-inspection", // Placeholder for future form
        },
        // { 
        //     id: 5, 
        //     name: "School Resources", 
        //     emoji: "⚡",
        //     description: "Inventory of electrical, water, and sanitation facilities.",
        //     route: "/school-resources", // Existing route
        // },
        { 
            id: 6, 
            name: "Material Inventory", 
            emoji: "🧱",
            description: "Stockpile of construction materials and equipment.",
            route: "/material-inventory", // Placeholder for future form
        },
    ];

    const handleFormClick = (form) => {
        navigate(form.route); 
    };

    // UPDATED: Goes back to Engineer Dashboard
    const goBack = () => {
        navigate('/engineer-dashboard');
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-24 relative overflow-hidden">
            
            {/* Background Decorative Blob */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

            {/* --- TOP HEADER --- */}
            <div className="bg-[#004A99] pt-10 pb-24 px-6 rounded-b-[3rem] shadow-xl relative z-10">
                <div className="max-w-6xl mx-auto flex items-center gap-5">
                    <button 
                        onClick={goBack} 
                        className="bg-white/10 hover:bg-white/20 text-white rounded-xl p-3 transition-all duration-300 backdrop-blur-md border border-white/10 group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:-translate-x-1 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="h-1 w-8 bg-[#FDB913] rounded-full"></span>
                            <p className="text-blue-100 text-xs font-bold tracking-widest uppercase">Department of Education</p>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Engineer Forms</h1>
                    </div>
                </div>
            </div>

            {/* --- MAIN CONTENT CONTAINER --- */}
            <div className="px-6 -mt-16 relative z-20 max-w-6xl mx-auto">
                
                {/* --- FORMS GRID --- */}
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {formsData.map((form) => (
                        <div 
                            key={form.id}
                            onClick={() => handleFormClick(form)} 
                            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 cursor-pointer group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Decorative Top Accent Line (Blue default, Red on hover) */}
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-100 to-blue-50 group-hover:from-[#CC0000] group-hover:to-[#FF5555] transition-all duration-500"></div>

                            <div className="flex items-start justify-between mb-4">
                                {/* Icon Container */}
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-slate-100 group-hover:scale-110 group-hover:bg-blue-50 transition-all duration-300">
                                    {form.emoji}
                                </div>
                                
                                {/* Arrow Indicator */}
                                <div className="text-gray-300 group-hover:text-[#CC0000] transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>
                                </div>
                            </div>
                            
                            {/* Text Content */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 leading-tight mb-2 group-hover:text-[#004A99] transition-colors">
                                    {form.name}
                                </h2>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {form.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EngineerForms;