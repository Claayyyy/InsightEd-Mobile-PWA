// src/modules/BottomNav.jsx

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// 1. IMPORT YOUR NEW ICON HERE
import { TbHomeEdit } from "react-icons/tb"; 
import { LuActivity, LuUser } from "react-icons/lu"; // Keep these for the other buttons

const BottomNav = ({ homeRoute }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div style={styles.wrapper}>
            {/* Background Curve */}
            <div style={styles.curveContainer}>
                <svg viewBox="0 0 375 70" preserveAspectRatio="none" style={styles.svg}>
                    <path 
                        d="M0,0 L137,0 C145,0 150,5 152,12 C157,35 180,45 187.5,45 C195,45 218,35 223,12 C225,5 230,0 238,0 L375,0 L375,70 L0,70 Z" 
                        fill="white" 
                        filter="drop-shadow(0px -5px 10px rgba(0,0,0,0.05))"
                    />
                </svg>
            </div>

            <div style={styles.navItems}>
                
                {/* 1. ACTIVITY BUTTON */}
                <button 
                    style={styles.sideButton} 
                    onClick={() => navigate('/activities')}
                >
                    {/* REPLACE EMOJI WITH ICON COMPONENT */}
                    <LuActivity 
                        size={24} 
                        color={location.pathname === '/activities' ? '#094684' : '#B0B0B0'}
                        style={styles.icon}
                    />
                    <span style={{
                        ...styles.label,
                        color: location.pathname === '/activities' ? '#094684' : '#B0B0B0'
                    }}>Activity</span>
                </button>

                {/* 2. HOME BUTTON (Floating) */}
                {/* 2. HOME BUTTON (Floating) */}
                <div style={styles.centerButtonContainer}>
                    <button 
                        style={styles.floatingButton}
                        onClick={() => navigate(homeRoute)}
                    >
                        {/* REPLACE HERE */}
                        <TbHomeEdit size={30} color="#ffffffff" />
                    </button>
                </div>

                {/* 3. PROFILE BUTTON */}
                <button 
                    style={styles.sideButton} 
                    onClick={() => navigate('/profile')}
                >
                    <LuUser 
                        size={24} 
                        color={location.pathname === '/profile' ? '#094684' : '#B0B0B0'}
                        style={styles.icon}
                    />
                    <span style={{
                        ...styles.label,
                        color: location.pathname === '/profile' ? '#094684' : '#B0B0B0'
                    }}>Profile</span>
                </button>
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '70px',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
    },
    curveContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '70px',
        zIndex: 1,
        pointerEvents: 'none',
    },
    svg: {
        width: '100%',
        height: '100%',
        display: 'block',
    },
    navItems: {
        position: 'relative',
        zIndex: 2,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingBottom: '10px',
        pointerEvents: 'auto',
    },
    sideButton: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'none',
        border: 'none',
        height: '100%',
        paddingTop: '15px',
        cursor: 'pointer',
    },
    centerButtonContainer: {
        width: '80px',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
    },
    floatingButton: {
        position: 'absolute',
        top: '-82px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#0c4885', // DepEd Red
        border: '4px solid #ffffffff', // Matches your background color
        boxShadow: '0 4px 10px rgba(20, 20, 20, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'transform 0.2s',
    },
    icon: {
        marginBottom: '4px', // Space between icon and text
        transition: 'color 0.3s',
    },
    label: {
        fontSize: '10px',
        fontWeight: '600',
    }
};

export default BottomNav;