import React from 'react';
import { useNavigate } from 'react-router-dom';

const SchoolProfile = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/school-forms'); // Navigate back to the main forms list
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('School Profile data saved!');
        goBack(); // Navigate back after save
    };
    
    // You can copy the fields data for School Profile from SchoolForms.jsx here
    const formFields = [
        { label: "School ID", type: "text", placeholder: "e.g., 101234" },
        { label: "School Name", type: "text", placeholder: "e.g., Rizal High School" },
        { label: "Region", type: "select", options: ["NCR", "Region I", "Region II", "Region III", "Region IV-A", "Region IV-B", "Region V"] }, 
        { label: "Division", type: "select", options: ["City Schools Division", "Provincial Division"] },
        { label: "Curricular Offering", type: "select", options: ["K-12 Only", "STEM", "TVL", "Arts and Design", "Sports"] }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-4 md:p-8 pb-24 relative"> 
            <div className="max-w-xl mx-auto">
                
                {/* --- Header --- */}
                <header className="flex items-center justify-between mb-6">
                    <button 
                        onClick={goBack} 
                        className="text-[#004A99] hover:text-[#003B7A] transition duration-150 text-2xl"
                    >
                        &larr;
                    </button>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#CC0000]">
                        🏫 School Profile
                    </h1>
                    <div className="w-6"></div> 
                </header>

                {/* --- Form Body --- */}
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <p className="text-gray-500 text-sm mb-6 border-b pb-4">
                            General school identification and classification.
                        </p>
                        
                        {/* Render Fields (using a simple layout for this template) */}
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            {formFields.map((field, index) => (
                                <div key={index} className={field.type === 'select' && index >= 2 ? 'md:col-span-1' : ''}>
                                    <label className="block text-gray-700 text-xs font-bold mb-1">
                                        {field.label}
                                    </label>
                                    
                                    {field.type === 'select' ? (
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004A99] bg-white text-sm">
                                            <option value="">Select...</option>
                                            {field.options.map((opt, i) => (
                                                <option key={i} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input 
                                            type={field.type} 
                                            placeholder={field.placeholder || ''}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004A99] text-sm"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Form Footer Actions */}
                        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100 mt-6">
                            <button 
                                type="button" 
                                onClick={goBack}
                                className="px-5 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="px-5 py-2 rounded-lg bg-[#CC0000] text-white font-bold hover:bg-[#A30000] shadow-md transition transform active:scale-95"
                            >
                                Save & Finish
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* No need for BottomNav here as it's a form view, but you might add it if required. */}
        </div>
    );
};

export default SchoolProfile;