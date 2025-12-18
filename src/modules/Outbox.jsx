// src/modules/Outbox.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOutbox, deleteFromOutbox } from '../db';

const Outbox = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [isSyncing, setIsSyncing] = useState(false);
    const [statusMap, setStatusMap] = useState({}); // Tracks status of each item: 'waiting', 'syncing', 'success', 'error'

    // 1. Load Pending Items
    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        const data = await getOutbox();
        setItems(data.reverse()); // Show newest first
    };

    // 2. The Sync Process
    const handleSyncAll = async () => {
        if (!navigator.onLine) {
            alert("⚠️ You are still offline! Connect to the internet to sync.");
            return;
        }

        setIsSyncing(true);

        // Loop through each item and try to upload
        for (const item of items) {
            // Update UI to show "Spinning" for this specific card
            setStatusMap(prev => ({ ...prev, [item.id]: 'syncing' }));

            try {
                // A. Send to Server
                const response = await fetch(item.url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item.payload)
                });

                if (response.ok) {
                    // B. Success! Delete from Local DB
                    await deleteFromOutbox(item.id);
                    setStatusMap(prev => ({ ...prev, [item.id]: 'success' }));
                } else {
                    throw new Error("Server rejected data");
                }
            } catch (error) {
                console.error("Sync failed for item", item.id, error);
                setStatusMap(prev => ({ ...prev, [item.id]: 'error' }));
            }
        }

        // Refresh list after small delay (to let user see the green checks)
        setTimeout(() => {
            loadItems();
            setIsSyncing(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-32">
            {/* Header */}
            <div className="bg-white p-4 shadow-sm flex items-center gap-3 sticky top-0 z-10">
                <button onClick={() => navigate(-1)} className="text-2xl text-gray-600">&larr;</button>
                <h1 className="text-xl font-bold text-gray-800">Outbox ({items.length})</h1>
            </div>

            <div className="p-5">
                {/* Sync Button */}
                <button 
                    onClick={handleSyncAll} 
                    disabled={isSyncing || items.length === 0}
                    className={`w-full py-4 rounded-xl font-bold text-white shadow-lg mb-6 flex items-center justify-center gap-2 transition-all
                    ${items.length === 0 ? 'bg-gray-300' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}
                    `}
                >
                    {isSyncing ? (
                        <><span>🔄</span> Syncing...</>
                    ) : (
                        <><span>☁️</span> Sync Now</>
                    )}
                </button>

                {/* List of Items */}
                <div className="space-y-3">
                    {items.length === 0 ? (
                        <div className="text-center py-20 opacity-50">
                            <div className="text-6xl mb-4">✅</div>
                            <p>All clear! No pending uploads.</p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-gray-800">{item.label || "Untitled Form"}</h3>
                                    <p className="text-xs text-gray-400">
                                        {new Date(item.timestamp).toLocaleString()}
                                    </p>
                                    {statusMap[item.id] === 'error' && (
                                        <p className="text-xs text-red-500 font-bold mt-1">Failed to upload. Try again.</p>
                                    )}
                                </div>

                                {/* Status Icon */}
                                <div className="text-xl">
                                    {statusMap[item.id] === 'syncing' && <span className="animate-spin inline-block">⏳</span>}
                                    {statusMap[item.id] === 'success' && <span>✅</span>}
                                    {statusMap[item.id] === 'error' && <span>❌</span>}
                                    {!statusMap[item.id] && <span className="text-gray-300">⏳</span>}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Outbox;