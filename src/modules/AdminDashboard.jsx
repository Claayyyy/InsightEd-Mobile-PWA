import React, { useState, useEffect } from 'react';
import BottomNav from './BottomNav';
import PageTransition from '../components/PageTransition'; // Import Transition
import { auth, db } from '../firebase'; 
import { doc, getDoc } from 'firebase/firestore';

const AdminDashboard = () => {
    const [userName, setUserName] = useState('Admin');

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

    return (
        <PageTransition>
            <div className="min-h-screen bg-[#E6F4FF] p-5 pb-24 md:p-10 font-sans">
                
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <h1 className="text-[#004A99] text-3xl font-bold">
                            Admin {userName} 👑
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            System overview and user management.
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-700 mb-2">System Status</h3>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <p className="text-green-600 text-sm font-semibold">
                                All systems operational
                            </p>
                        </div>
                    </div>
                </div>

                <BottomNav homeRoute="/admin-dashboard" />
            </div>
        </PageTransition>
    );
};

export default AdminDashboard;