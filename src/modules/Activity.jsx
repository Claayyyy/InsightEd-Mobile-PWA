import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; 
import { doc, getDoc } from 'firebase/firestore';
import BottomNav from './BottomNav';
import PageTransition from '../components/PageTransition'; // Import Transition

const Activity = () => {
    // Default to '/' to ensure the BottomNav renders something immediately
    const [homeRoute, setHomeRoute] = useState('/');

    useEffect(() => {
        const fetchUserRole = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setHomeRoute(getDashboardPath(userData.role));
                }
            }
        };
        fetchUserRole();
    }, []);

    const getDashboardPath = (role) => {
        const roleMap = {
            'Engineer': '/engineer-dashboard',
            'School Head': '/schoolhead-dashboard',
            'Human Resource': '/hr-dashboard',
            'Admin': '/admin-dashboard',
        };
        return roleMap[role] || '/';
    };

    return (
        <PageTransition>
            <div style={{ padding: '20px', paddingBottom: '80px', minHeight: '100vh', backgroundColor: '#F0F0F0' }}>
                <h1 className="text-2xl font-bold text-[#004A99] mb-2">Recent Activities</h1>
                <p className="text-gray-600 mb-4">Here are your latest updates and tasks.</p>
                
                {/* Placeholder for Activities Content */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center text-gray-400">
                    No recent activities found.
                </div>

                {/* Dynamic Footer */}
                <BottomNav homeRoute={homeRoute} />
            </div>
        </PageTransition>
    );
};

export default Activity;