// src/forms/SchoolProfile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse'; 
import { auth } from '../firebase'; 
import locationData from '../locations.json'; // 1. IMPORT LOCATIONS JSON

const SchoolProfile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isLocked, setIsLocked] = useState(false);

    // 2. Options State for Cascading Dropdowns
    const [provinceOptions, setProvinceOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [barangayOptions, setBarangayOptions] = useState([]);

    const [formData, setFormData] = useState({
        schoolId: '', schoolName: '', 
        region: '', province: '', municipality: '', barangay: '', // Dropdowns
        division: '', district: '', legDistrict: '', // Text Inputs (Specific to DepEd)
        motherSchoolId: '', latitude: '', longitude: ''
    });

    const goBack = () => navigate('/school-forms');

    // --- CASCADING HANDLERS ---

    const handleRegionChange = (e) => {
        const region = e.target.value;
        setFormData(prev => ({ ...prev, region, province: '', municipality: '', barangay: '' }));
        
        // Load Provinces
        if (region && locationData[region]) {
            setProvinceOptions(Object.keys(locationData[region]).sort());
        } else {
            setProvinceOptions([]);
        }
        setCityOptions([]);
        setBarangayOptions([]);
    };

    const handleProvinceChange = (e) => {
        const province = e.target.value;
        setFormData(prev => ({ ...prev, province, municipality: '', barangay: '' }));

        // Load Municipalities
        if (province && formData.region && locationData[formData.region][province]) {
            setCityOptions(Object.keys(locationData[formData.region][province]).sort());
        } else {
            setCityOptions([]);
        }
        setBarangayOptions([]);
    };

    const handleCityChange = (e) => {
        const municipality = e.target.value;
        setFormData(prev => ({ ...prev, municipality, barangay: '' }));

        // Load Barangays
        if (municipality && formData.province && locationData[formData.region][formData.province]) {
            const brgys = locationData[formData.region][formData.province][municipality];
            setBarangayOptions(brgys ? brgys.sort() : []);
        } else {
            setBarangayOptions([]);
        }
    };

    const handleManualChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // --- AUTO-FILL LOGIC ---
    const handleIdBlur = () => {
        if (isLocked || formData.schoolId.length < 6) return;
        setLoading(true);
        
        Papa.parse('/schools.csv', {
            download: true, header: true, skipEmptyLines: true,
            complete: (results) => {
                const rows = results.data;
                const headers = Object.keys(rows[0] || {});
                const clean = (str) => str?.toLowerCase().replace(/[^a-z0-9]/g, '') || '';

                const idKey = headers.find(h => clean(h) === 'schoolid');

                if (!idKey) {
                    alert("Error: 'SchoolID' column missing in CSV.");
                    setLoading(false); return;
                }

                const targetId = String(formData.schoolId).trim();
                const school = rows.find(s => String(s[idKey]).trim().split('.')[0] === targetId);

                if (school) {
                    const getVal = (target) => {
                        const k = headers.find(h => clean(h).includes(clean(target)));
                        return k ? String(school[k]).trim() : '';
                    };

                    // 1. Extract Raw Values
                    const rawRegion = getVal('region');
                    const rawProv = getVal('province');
                    const rawMun = getVal('municipality');
                    const rawBrgy = getVal('barangay');

                    // 2. Intelligent Mapping (Case-Insensitive Matcher for JSON keys)
                    // This ensures "REGION I" in CSV matches "Region I" in JSON
                    const findMatch = (options, value) => options.find(opt => clean(opt) === clean(value)) || value;

                    // A. Region
                    const regionOptions = Object.keys(locationData);
                    const matchedRegion = findMatch(regionOptions, rawRegion);
                    
                    // B. Province
                    let newProvOptions = [];
                    let matchedProv = rawProv;
                    if (locationData[matchedRegion]) {
                        newProvOptions = Object.keys(locationData[matchedRegion]).sort();
                        matchedProv = findMatch(newProvOptions, rawProv);
                    }

                    // C. Municipality
                    let newCityOptions = [];
                    let matchedMun = rawMun;
                    if (locationData[matchedRegion]?.[matchedProv]) {
                        newCityOptions = Object.keys(locationData[matchedRegion][matchedProv]).sort();
                        matchedMun = findMatch(newCityOptions, rawMun);
                    }

                    // D. Barangay
                    let newBrgyOptions = [];
                    let matchedBrgy = rawBrgy;
                    if (locationData[matchedRegion]?.[matchedProv]?.[matchedMun]) {
                        newBrgyOptions = locationData[matchedRegion][matchedProv][matchedMun].sort();
                        matchedBrgy = findMatch(newBrgyOptions, rawBrgy);
                    }

                    // 3. Update Options State (So dropdowns work)
                    setProvinceOptions(newProvOptions);
                    setCityOptions(newCityOptions);
                    setBarangayOptions(newBrgyOptions);

                    // 4. Update Form State
                    setFormData(prev => ({
                        ...prev,
                        schoolName:     getVal('schoolname'),
                        division:       getVal('division'),
                        district:       getVal('district'),
                        legDistrict:    getVal('legdistrict') || getVal('legislative'),
                        motherSchoolId: getVal('motherschool') || '',
                        latitude:       getVal('latitude'),
                        longitude:      getVal('longitude'),
                        
                        // Set matched location values
                        region: matchedRegion,
                        province: matchedProv,
                        municipality: matchedMun,
                        barangay: matchedBrgy
                    }));
                } else {
                    alert(`School ID "${targetId}" not found.`);
                }
                setLoading(false);
            },
            error: (err) => { console.error(err); setLoading(false); }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!auth.currentUser) { alert("Login required."); return; }
        setIsSaving(true);

        const payload = { ...formData, submittedBy: auth.currentUser.uid };

        try {
            const response = await fetch('http://localhost:3000/api/save-school', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            if (response.ok) {
                setIsLocked(true);
                alert('Success: Data saved and locked.');
            } else {
                alert('Failed: ' + result.message);
            }
        } catch (error) {
            console.error(error);
            alert("Connection error.");
        } finally {
            setIsSaving(false);
        }
    };

    // --- STYLES ---
    const inputClass = `w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#004A99] focus:border-[#004A99] bg-white text-gray-800 font-semibold text-[15px] shadow-sm transition-all disabled:bg-gray-100 disabled:text-gray-500`;
    const labelClass = "block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 ml-1";

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans p-4 md:p-8 pb-24 relative"> 
            <div className="max-w-3xl mx-auto">
                <header className="flex items-center justify-between mb-8">
                    <button onClick={goBack} className="text-[#004A99] hover:text-[#003B7A] text-2xl transition-transform hover:-translate-x-1">&larr;</button>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#CC0000]">🏫 School Profile</h1>
                    <div className="w-6"></div> 
                </header>

                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-white">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        <div className={`flex justify-between items-center px-4 py-3 rounded-xl border mb-6 ${isLocked ? 'bg-green-50 border-green-200' : 'bg-blue-50/50 border-blue-100'}`}>
                            <p className={`text-sm font-medium flex items-center gap-2 ${isLocked ? 'text-green-700' : 'text-[#004A99]'}`}>
                                <span>{isLocked ? '🔒' : 'ℹ️'}</span> 
                                {isLocked ? "Profile Locked." : "Enter School ID to auto-fill."}
                            </p>
                            {loading && <span className="text-xs text-blue-600 font-bold animate-pulse">Searching...</span>}
                        </div>
                        
                        <div className="relative">
                            <label className={labelClass}>School ID (6-Digit)</label>
                            <input type="text" name="schoolId" value={formData.schoolId} onChange={handleManualChange} onBlur={handleIdBlur}
                                placeholder="100001" maxLength="6"
                                className={`${inputClass} text-center text-2xl tracking-widest text-[#004A99] font-bold`} required disabled={isLocked} />
                        </div>

                        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <label className={labelClass}>School Name</label>
                                <input type="text" name="schoolName" value={formData.schoolName} onChange={handleManualChange} className={inputClass} required disabled={isLocked} />
                            </div>

                            {/* --- LOCATION DROPDOWNS --- */}
                            <div>
                                <label className={labelClass}>Region</label>
                                <select name="region" value={formData.region} onChange={handleRegionChange} className={inputClass} disabled={isLocked} required>
                                    <option value="">Select Region</option>
                                    {Object.keys(locationData).sort().map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>Province</label>
                                <select name="province" value={formData.province} onChange={handleProvinceChange} className={inputClass} disabled={!formData.region || isLocked} required>
                                    <option value="">Select Province</option>
                                    {provinceOptions.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>Municipality / City</label>
                                <select name="municipality" value={formData.municipality} onChange={handleCityChange} className={inputClass} disabled={!formData.province || isLocked} required>
                                    <option value="">Select City/Mun</option>
                                    {cityOptions.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>Barangay</label>
                                <select name="barangay" value={formData.barangay} onChange={handleManualChange} className={inputClass} disabled={!formData.municipality || isLocked} required>
                                    <option value="">Select Barangay</option>
                                    {barangayOptions.map(b => <option key={b} value={b}>{b}</option>)}
                                </select>
                            </div>

                            {/* --- TEXT INPUTS (Specific DepEd Fields) --- */}
                            <div>
                                <label className={labelClass}>Division</label>
                                <input type="text" name="division" value={formData.division} onChange={handleManualChange} className={inputClass} disabled={isLocked} />
                            </div>
                            <div>
                                <label className={labelClass}>District</label>
                                <input type="text" name="district" value={formData.district} onChange={handleManualChange} className={inputClass} disabled={isLocked} />
                            </div>
                            <div>
                                <label className={labelClass}>Legislative District</label>
                                <input type="text" name="legDistrict" value={formData.legDistrict} onChange={handleManualChange} className={inputClass} disabled={isLocked} />
                            </div>
                            <div>
                                <label className={labelClass}>Mother School ID</label>
                                <input type="text" name="motherSchoolId" value={formData.motherSchoolId} onChange={handleManualChange} className={inputClass} disabled={isLocked} />
                            </div>
                            
                            {/* Geo-tagging */}
                            <div className="md:col-span-2 grid grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-dashed border-gray-200 mt-2">
                                <div className="col-span-2 text-xs font-bold text-gray-400 uppercase tracking-widest">📍 Geo-Location</div>
                                <div>
                                    <label className={labelClass}>Latitude</label>
                                    <input type="text" name="latitude" value={formData.latitude} onChange={handleManualChange} className={inputClass} disabled={isLocked} />
                                </div>
                                <div>
                                    <label className={labelClass}>Longitude</label>
                                    <input type="text" name="longitude" value={formData.longitude} onChange={handleManualChange} className={inputClass} disabled={isLocked} />
                                </div>
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex justify-end space-x-3 pt-8 border-t border-gray-100 mt-8">
                            <button type="button" onClick={goBack} className="px-6 py-3.5 rounded-xl text-gray-500 font-semibold hover:bg-gray-100 hover:text-gray-700 transition duration-200">
                                {isLocked ? "Back to Menu" : "Cancel"}
                            </button>
                            
                            {!isLocked ? (
                                <button type="submit" disabled={isSaving} className="px-6 py-3.5 rounded-xl bg-[#CC0000] text-white font-bold hover:bg-[#A30000] shadow-lg shadow-red-100 transition transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2">
                                    {isSaving ? "Saving..." : "Save Profile"}
                                </button>
                            ) : (
                                <button type="button" onClick={() => setIsLocked(false)} className="px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg transition">
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SchoolProfile;