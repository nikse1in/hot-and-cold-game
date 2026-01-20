'use client';

import { Guess } from '@/lib/gameLogic';
import { useState } from 'react';

interface GuessHistoryProps {
    guesses: Guess[];
    sortBy: 'time' | 'rank';
}

export default function GuessHistory({ guesses, sortBy }: GuessHistoryProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    if (guesses.length === 0) {
        return null;
    }

    // Sort guesses
    const sortedGuesses = [...guesses].sort((a, b) => {
        if (sortBy === 'time') {
            return b.timestamp - a.timestamp; // Newest first
        } else {
            return a.rank - b.rank; // Best rank first
        }
    });

    // Pagination
    const totalPages = Math.ceil(sortedGuesses.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentGuesses = sortedGuesses.slice(startIndex, endIndex);

    const getRankColor = (rank: number) => {
        if (rank === 0) return 'text-green-400 font-bold';
        if (rank < 100) return 'rank-hot';
        if (rank < 1000) return 'rank-warm';
        if (rank < 10000) return 'rank-cool';
        return 'rank-cold';
    };

    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Your Guesses</h3>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="space-y-2">
                    {currentGuesses.map((guess, index) => (
                        <div
                            key={`${guess.word}-${guess.timestamp}`}
                            className="flex justify-between items-center py-2 border-b border-white/5 last:border-0 animate-slide-in"
                        >
                            <span className="font-medium">{guess.word}</span>
                            <span className={`font-mono ${getRankColor(guess.rank)}`}>
                                {guess.rank === 0 ? '✓ WINNER' : `#${guess.rank.toLocaleString()}`}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-white/10">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="btn btn-secondary px-3 py-1 text-sm disabled:opacity-30"
                        >
                            ‹
                        </button>
                        <span className="text-sm text-gray-400">
                            {currentPage} / {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="btn btn-secondary px-3 py-1 text-sm disabled:opacity-30"
                        >
                            ›
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
