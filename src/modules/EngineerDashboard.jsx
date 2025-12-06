import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Components
import BottomNav from './BottomNav';
import PageTransition from '../components/PageTransition'; 
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const EngineerDashboard = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('Engineer');

    // 1. Fetch User Data
    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserName(docSnap.data().firstName);
                }
            }
        };
        fetchUserData();
    }, []);

    // --- FIX IS HERE ---
    // Renamed function to match the button and updated route to '/engineer-forms'
    const goToEngineerForms = () => {
        navigate('/engineer-forms'); 
    };

    // 2. Engineer Specific Stats
    const stats = [
        { label: "Repairs Needed", value: "8", color: "text-orange-600", bg: "bg-orange-50" },
        { label: "Active Sites", value: "3", color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Completed", value: "15", color: "text-green-600", bg: "bg-green-50" },
    ];

    // 3. Engineer Specific Slider Content
    const sliderContent = [
        { 
            id: 1, 
            title: `Welcome, Engr. ${userName}!`, 
            emoji: "👷", 
            description: "Your dashboard is ready. Track ongoing construction and validate school infrastructure data." 
        },
        { 
            id: 2, 
            title: "Site Inspection", 
            emoji: "🏗️", 
            description: "Scheduled inspection for Building A is due this Thursday. Please review the checklist." 
        },
        { 
            id: 3, 
            title: "Safety Reminder", 
            emoji: "🦺", 
            description: "Ensure all personnel are wearing appropriate PPE during the site visit." 
        }
    ];

    return (
        <PageTransition>
            <div className="min-h-screen bg-slate-50 font-sans pb-24">
                
                {/* --- TOP HEADER --- */}
                <div className="relative bg-[#004A99] pt-12 pb-20 px-6 rounded-b-[2.5rem] shadow-xl">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-blue-100 text-sm font-medium tracking-wide uppercase">Department of Education</p>
                            <h1 className="text-3xl font-bold text-white mt-1">Dashboard</h1>
                            <p className="text-blue-200 mt-2 text-sm">Hello, {userName}. Manage infrastructure and repairs.</p>
                        </div>
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 text-white text-xl">
                            👷‍♂️
                        </div>
                    </div>
                </div>

                {/* --- MAIN CONTENT CONTAINER --- */}
                <div className="px-6 -mt-10 relative z-10 space-y-6">

                    {/* 1. Quick Stats Row */}
                    <div className="grid grid-cols-3 gap-3">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                                <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
                                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter mt-1">{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* 2. Announcements Slider */}
                    <div className="w-full">
                        <div className="flex items-center justify-between mb-3 px-1">
                            <h2 className="text-gray-800 font-bold text-lg">Project Updates</h2>
                            <span className="text-xs text-[#004A99] font-medium">View Log</span>
                        </div>
                        
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={15}
                            slidesPerView={1}
                            pagination={{ clickable: true, dynamicBullets: true }}
                            autoplay={{ delay: 5000 }}
                            className="w-full"
                        >
                            {sliderContent.map((item) => (
                                <SwiperSlide key={item.id} className="pb-8">
                                    <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-[#FDB913] h-40 flex flex-col justify-center">
                                        <h3 className="text-[#004A99] font-bold text-lg flex items-center mb-2">
                                            <span className="text-2xl mr-3">{item.emoji}</span>
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* 3. Primary Action Card */}
                    <div className="bg-gradient-to-br from-[#CC0000] to-[#990000] rounded-3xl p-6 text-white shadow-lg shadow-red-900/20 relative overflow-hidden">
                        <div className="absolute -right-5 -top-5 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        
                        <h2 className="text-2xl font-bold mb-2 relative z-10">Infrastructure Data</h2>
                        <p className="text-red-100 text-sm mb-6 relative z-10 max-w-[85%]">
                            Update building conditions, log necessary repairs, and view school facilities inventory.
                        </p>

                        <button 
                            onClick={goToEngineerForms} 
                            className="w-full bg-white text-[#CC0000] font-bold py-3.5 px-4 rounded-xl shadow-sm hover:bg-gray-50 transition transform active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <span>🧱</span> Manage Infrastructure
                        </button>
                    </div>

                    {/* 4. Pro Tip */}
                    <div className="bg-[#FFF8E1] border border-[#FFE082] p-4 rounded-xl">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl mt-1">💡</span>
                            <div>
                                <h4 className="font-bold text-[#F57F17] text-sm">Pro Tip</h4>
                                <p className="text-[#F57F17]/80 text-xs mt-1 leading-relaxed">
                                    Regularly updating the damage report helps the Division Office prioritize funding for school repairs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Navigation */}
                <BottomNav homeRoute="/engineer-dashboard" />
            </div>
        </PageTransition>
    );
};

export default EngineerDashboard;