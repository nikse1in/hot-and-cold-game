'use client';

import { useState } from 'react';

interface MenuProps {
    onGiveUp: () => void;
    onReset: () => void;
    onSort: (sort: 'time' | 'rank') => void;
    currentSort: 'time' | 'rank';
}

export default function Menu({ onGiveUp, onReset, onSort, currentSort }: MenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (action: () => void) => {
        action();
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                title="Menu"
            >
                ☰
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Menu */}
                    <div className="absolute right-0 top-12 z-20 bg-gray-900 border border-white/10 rounded-lg shadow-xl min-w-[180px] animate-slide-in">
                        <button
                            onClick={() => handleOptionClick(() => onSort(currentSort === 'time' ? 'rank' : 'time'))}
                            className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors border-b border-white/10"
                        >
                            Sort by {currentSort === 'time' ? 'Rank' : 'Time'}
                        </button>
                        <button
                            onClick={() => handleOptionClick(onReset)}
                            className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors border-b border-white/10"
                        >
                            Reset Cache
                        </button>
                        <button
                            onClick={() => handleOptionClick(onGiveUp)}
                            className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors text-red-400"
                        >
                            Give Up
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
