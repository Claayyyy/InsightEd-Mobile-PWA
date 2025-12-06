import React from 'react';
import { useNavigate } from 'react-router-dom';

const Enrolment = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/school-forms');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Enrolment per Grade Level data saved!');
        goBack();
    };
    
    const formFields = [
        { label: "Grade 1", type: "number" }, { label: "Grade 2", type: "number" },
        { label: "Grade 3", type: "number" }, { label: "Grade 4", type: "number" },
        { label: "Grade 5", type: "number" }, { label: "Grade 6", type: "number" },
        { label: "Grade 7", type: "number" }, { label: "Grade 8", type: "number" },
        { label: "Grade 9", type: "number" }, { label: "Grade 10", type: "number" },
        { label: "Grade 11", type: "number" }, { label: "Grade 12", type: "number" }
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
                        📊 Enrolment per Grade Level
                    </h1>
                    <div className="w-6"></div> 
                </header>

                {/* --- Form Body --- */}
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <p className="text-gray-500 text-sm mb-6 border-b pb-4">
                            Total number of enrollees for Grades 1 through 12.
                        </p>
                        
                        {/* Custom Grid Layout (3 columns) */}
                        <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                            {formFields.map((field, index) => (
                                <div key={index}>
                                    <label className="block text-gray-700 text-xs font-bold mb-1">
                                        {field.label}
                                    </label>
                                    <input 
                                        type={field.type} 
                                        min="0"
                                        placeholder="0"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004A99] text-sm"
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

export default Enrolment;