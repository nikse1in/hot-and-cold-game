'use client';

import { useState, FormEvent } from 'react';

interface GuessInputProps {
    onGuess: (word: string) => Promise<void>;
    isLoading: boolean;
    isDisabled: boolean;
    error: string | null;
}

export default function GuessInput({ onGuess, isLoading, isDisabled, error }: GuessInputProps) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const word = inputValue.trim();
        if (!word) return;

        await onGuess(word);
        setInputValue('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-3">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Try banana"
                    className="input flex-1"
                    disabled={isDisabled || isLoading}
                />
                <button
                    type="submit"
                    className="btn btn-primary px-8"
                    disabled={isDisabled || isLoading || !inputValue.trim()}
                >
                    {isLoading ? '...' : 'Guess'}
                </button>
            </div>
            {error && (
                <p className="text-red-400 text-sm mt-2 animate-slide-in">{error}</p>
            )}
        </form>
    );
}
