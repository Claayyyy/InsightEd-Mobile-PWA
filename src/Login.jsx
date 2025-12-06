// src/Login.jsx

import React, { useState } from 'react';
import logo from './assets/InsightEd1.png';
import { auth, googleProvider, db } from './firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';


const getDashboardPath = (role) => {
    const roleMap = {
        'Engineer': '/engineer-dashboard',
        'School Head': '/schoolhead-dashboard',
        'Human Resource': '/hr-dashboard',
        'Admin': '/admin-dashboard',
    };
    return roleMap[role] || '/';
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            await checkUserRole(userCredential.user.uid);
        } catch (error) {
            alert(error.message);
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            await checkUserRole(result.user.uid);
        } catch (error) {
            alert(error.message);
        }
    };

    const checkUserRole = async (uid) => {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const path = getDashboardPath(userData.role);
            navigate(path);
        } else {
            alert("Account not found. Redirecting you to finish registration...");
            navigate('/register'); 
        }
        setLoading(false);
    };

    return (
        <div className="login-container">
            <div className="login-card" style={{ zIndex: 10 }}>
                <div className="login-header">
                    
                    {/* 2. REPLACE TEXT H2 WITH IMAGE TAG */}
                    <img src={logo} alt="InsightEd Logo" className="app-logo" />
                    
                    <p>Log in to access your dashboard</p>
                </div>

                <form onSubmit={handleLogin} className="form-group">
                    <div className="input-wrapper">
                        <input 
                            type="email" 
                            className="custom-input"
                            placeholder="Email Address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <input 
                            type="password" 
                            className="custom-input"
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Logging in...' : 'Sign In'}
                    </button>
                </form>
                
                <div className="divider">
                    <span>OR</span>
                </div>
                
                <button onClick={handleGoogleLogin} className="btn btn-google">
                    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                        <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.836.86-3.048.86-2.344 0-4.328-1.584-5.032-3.716H.96v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                        <path d="M3.968 10.705A5.366 5.366 0 0 1 3.682 9c0-.593.102-1.17.286-1.705V4.962H.96A9.006 9.006 0 0 0 0 9c0 1.452.348 2.827.96 4.095l3.008-2.39z" fill="#FBBC05"/>
                        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .96 4.962l3.008 2.392C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                </button>
                
                <div className="login-footer">
                    Don't have an account? <Link to="/register" className="link-text">Register here</Link>
                </div>
            </div>

            {/* --- NEW WAVES CONTAINER --- */}
            <div className="waves-container">
                <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="parallax">
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                        <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default Login;