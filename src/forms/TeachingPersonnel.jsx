import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeachingPersonnel = () => {
    const navigate = useNavigate();

    const goBack = () => {
        // Navigates back to the main list of forms
        navigate('/school-forms');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for actual data submission logic
        alert('Teaching Personnel data saved!');
        goBack();
    };
    
    // Fields for Teaching Personnel form, based on SchoolForms.jsx
    const formFields = [
        { label: "Total Elementary School (ES) Teachers", key: "es_teachers", type: "number" },
        { label: "Total Junior High School (JHS) Teachers", key: "jhs_teachers", type: "number" },
        { label: "Total Senior High School (SHS) Teachers", key: "shs_teachers", type: "number" }
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
                        Teaching Personnel
                    </h1>
                    <div className="w-6"></div> {/* Spacer */}
                </header>

                {/* --- Form Section --- */}
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
                    <p className="text-gray-600 mb-6 border-b pb-4">
                        Please provide a summary count of the teaching staff by level.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6">
                            {formFields.map((field) => (
                                <div key={field.key} className="form-group">
                                    <label htmlFor={field.key} className="block text-sm font-medium text-gray-700 mb-1">
                                        {field.label}
                                    </label>
                                    <input
                                        id={field.key}
                                        name={field.key}
                                        type={field.type} 
                                        min="0"
                                        placeholder="0"
                                        // You would typically add value and onChange here for state management
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004A99] text-base transition"
                                    />
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
        </div>
    );
};

export default TeachingPersonnel;