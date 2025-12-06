import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'; 
import { doc, getDoc } from 'firebase/firestore';
import BottomNav from './BottomNav';
import PageTransition from '../components/PageTransition'; // Import Transition

const UserProfile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [homeRoute, setHomeRoute] = useState('/');

    useEffect(() => {
        const fetchData = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUserData(data);
                    setHomeRoute(getDashboardPath(data.role));
                }
            }
        };
        fetchData();
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

    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to log out?")) {
            await auth.signOut();
            navigate('/');
        }
    };

    const getInitials = (first, last) => {
        return `${first?.charAt(0) || ''}${last?.charAt(0) || ''}`.toUpperCase();
    };

    // Removed the "if loading return..." block to allow instant render

    return (
        <PageTransition>
            <div style={styles.container}>
                {/* HERO SECTION */}
                <div style={styles.header}>
                    <div style={styles.avatarCircle}>
                        {userData ? getInitials(userData.firstName, userData.lastName) : "..."}
                    </div>
                    <h2 style={styles.name}>
                        {userData ? `${userData.firstName} ${userData.lastName}` : "Loading..."}
                    </h2>
                    <span style={styles.roleBadge}>
                        {userData?.role || "User"}
                    </span>
                </div>

                {/* DETAILS CARD */}
                <div style={styles.card}>
                    <h3 style={styles.sectionTitle}>👤 Employment Details</h3>
                    
                    <div style={styles.row}>
                        <span style={styles.label}>Email</span>
                        <span style={styles.value}>{userData?.email || "..."}</span>
                    </div>

                    <div style={styles.divider}></div>

                    <h3 style={styles.sectionTitle}>📍 Area of Assignment</h3>
                    <div style={styles.row}>
                        <span style={styles.label}>Region</span>
                        <span style={styles.value}>{userData?.region || "..."}</span>
                    </div>
                    <div style={styles.row}>
                        <span style={styles.label}>Province</span>
                        <span style={styles.value}>{userData?.province || "..."}</span>
                    </div>
                    <div style={styles.row}>
                        <span style={styles.label}>City/Mun</span>
                        <span style={styles.value}>{userData?.city || "..."}</span>
                    </div>
                    {userData?.barangay && (
                        <div style={styles.row}>
                            <span style={styles.label}>Barangay</span>
                            <span style={styles.value}>{userData.barangay}</span>
                        </div>
                    )}
                </div>

                {/* ACTIONS */}
                <div style={styles.actionContainer}>
                    <button style={styles.editButton} onClick={() => alert("Edit Profile Coming Soon!")}>
                        ✏️ Edit Profile
                    </button>
                    <button style={styles.logoutButton} onClick={handleLogout}>
                        🚪 Logout
                    </button>
                </div>

                {/* FOOTER */}
                <BottomNav homeRoute={homeRoute} />
            </div>
        </PageTransition>
    );
};

const styles = {
    container: { minHeight: '100vh', backgroundColor: '#f5f7fa', paddingBottom: '80px', fontFamily: 'Segoe UI, sans-serif' },
    header: { background: 'linear-gradient(135deg, #004A99 0%, #003366 100%)', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', color: 'white' },
    avatarCircle: { width: '80px', height: '80px', backgroundColor: 'white', color: '#004A99', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', fontWeight: 'bold', marginBottom: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' },
    name: { margin: '0', fontSize: '22px', fontWeight: '600' },
    roleBadge: { marginTop: '5px', backgroundColor: 'rgba(255,255,255,0.2)', padding: '5px 15px', borderRadius: '20px', fontSize: '14px', letterSpacing: '1px' },
    card: { backgroundColor: 'white', margin: '20px', padding: '20px', borderRadius: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
    sectionTitle: { fontSize: '14px', color: '#888', textTransform: 'uppercase', marginBottom: '15px', marginTop: '10px' },
    row: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px' },
    label: { color: '#666', fontWeight: '500' },
    value: { color: '#333', fontWeight: '600', textAlign: 'right', maxWidth: '60%' },
    divider: { height: '1px', backgroundColor: '#eee', margin: '15px 0' },
    actionContainer: { padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '10px' },
    editButton: { width: '100%', padding: '15px', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '12px', fontSize: '16px', color: '#333', cursor: 'pointer', fontWeight: '600' },
    logoutButton: { width: '100%', padding: '15px', backgroundColor: '#ffebee', border: 'none', borderRadius: '12px', fontSize: '16px', color: '#CC0000', cursor: 'pointer', fontWeight: '600' },
};

export default UserProfile;