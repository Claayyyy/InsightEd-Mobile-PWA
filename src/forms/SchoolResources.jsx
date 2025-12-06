import React from 'react';
import { useNavigate } from 'react-router-dom';

const SchoolResources = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/school-forms');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('School Resources data saved!');
        goBack();
    };
    
    // Note: This uses the compact-grid data which pairs Working/Repair items
    const formFields = [
        { label: "Laptops (Working)", type: "number" }, { label: "Laptops (Repair)", type: "number", highlight: true },
        { label: "Chairs (Good)", type: "number" }, { label: "Chairs (Repair)", type: "number", highlight: true },
        { label: "Desks (Good)", type: "number" }, { label: "Desks (Repair)", type: "number", highlight: true },
        { label: "E-Carts (Working)", type: "number" }, { label: "E-Carts (Repair)", type: "number", highlight: true },
        { label: "Toilets (Working)", type: "number" }, { label: "Toilets (Repair)", type: "number", highlight: true },
        { label: "Printers (Working)", type: "number" }, { label: "Printers (Repair)", type: "number", highlight: true },
        { label: "TVs (Working)", type: "number" }, { label: "TVs (Repair)", type: "number", highlight: true },
        { label: "Science Labs", type: "number" },
        { label: "Computer Labs", type: "number" },
        { label: "TVL Labs", type: "number" },
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
                        💻 School Resources
                    </h1>
                    <div className="w-6"></div> 
                </header>

                {/* --- Form Body --- */}
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <p className="text-gray-500 text-sm mb-6 border-b pb-4">
                            Inventory of equipment and facilities.
                        </p>
                        
                        {/* Tighter Grid Layout (3 columns) */}
                        <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                            {formFields.map((field, index) => (
                                <div key={index} className={`${field.highlight ? 'bg-red-50 p-2 rounded-lg border border-red-200' : ''} ${index >= formFields.length - 3 ? 'md:col-span-1 col-span-1' : ''}`}>
                                    <label className={`block text-gray-700 text-xs font-bold mb-1 ${field.highlight ? 'text-red-700' : ''}`}>
                                        {field.label}
                                    </label>
                                    <input 
                                        type={field.type} 
                                        min="0"
                                        placeholder="0"
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004A99] text-sm transition
                                            ${field.highlight ? 'border-red-400 bg-red-100' : 'border-gray-300'}
                                        `}
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

export default SchoolResources;