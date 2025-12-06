import React from 'react';
import { useNavigate } from 'react-router-dom';

const MaterialInventory = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">
            <div className="bg-slate-700 p-6 pt-12 rounded-b-[2rem] shadow-lg text-white mb-6">
                 <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-sm text-slate-300 hover:text-white">← Back</button>
                <h1 className="text-2xl font-bold">Material Inventory</h1>
                <p className="text-slate-300 text-sm">Stockpile of construction items.</p>
            </div>

            <form className="px-6 space-y-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                    
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Item Name</label>
                        <input type="text" className="w-full p-3 bg-slate-50 rounded-xl border border-gray-200" placeholder="e.g. Cement Bags" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Quantity</label>
                            <input type="number" className="w-full p-3 bg-slate-50 rounded-xl border border-gray-200" placeholder="0" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Unit</label>
                            <select className="w-full p-3 bg-slate-50 rounded-xl border border-gray-200">
                                <option>Pieces</option>
                                <option>Bags</option>
                                <option>Liters</option>
                                <option>Meters</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Storage Location</label>
                        <input type="text" className="w-full p-3 bg-slate-50 rounded-xl border border-gray-200" placeholder="e.g. Warehouse B" />
                    </div>
                </div>

                <button type="button" onClick={() => alert("Inventory Updated")} className="w-full bg-slate-700 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-slate-800 transition">
                    Update Stock
                </button>
            </form>
        </div>
    );
};

export default MaterialInventory;