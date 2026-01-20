'use client';

import { useState, useEffect } from 'react';
import { getCurrentWord } from '@/lib/wordConfig';
import { GameState, Guess, getFeedbackMessage, getProgress } from '@/lib/gameLogic';
import GuessInput from './components/GuessInput';
import GuessHistory from './components/GuessHistory';
import ProgressBar from './components/ProgressBar';
import Menu from './components/Menu';
import HowToPlay from './components/HowToPlay';

export default function Home() {
    const [gameState, setGameState] = useState<GameState>({
        guesses: [],
        isComplete: false,
        attempts: 0,
        startedAt: Date.now(),
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [feedbackMessage, setFeedbackMessage] = useState('Keep it rolling!');
    const [showHowToPlay, setShowHowToPlay] = useState(false);
    const [sortBy, setSortBy] = useState<'time' | 'rank'>('time');
    const [playerId, setPlayerId] = useState<string>('');
    const [stats, setStats] = useState({ totalPlayers: 0, successRate: 0 });

    const currentWord = getCurrentWord();

    // Generate or load player ID
    useEffect(() => {
        let id = localStorage.getItem('playerId');
        if (!id) {
            id = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('playerId', id);
        }
        setPlayerId(id);
    }, []);

    // Fetch real stats
    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await fetch('/api/stats');
                if (response.ok) {
                    const data = await response.json();
                    setStats({
                        totalPlayers: data.totalPlayers,
                        successRate: data.successRate,
                    });
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        }
        fetchStats();
        const interval = setInterval(fetchStats, 10000); // Update every 10s
        return () => clearInterval(interval);
    }, []);

    // Load game state from localStorage
    useEffect(() => {
        const saved = localStorage.getItem(`game-${currentWord.weekNumber}`);
        if (saved) {
            const parsed = JSON.parse(saved);
            setGameState(parsed);
            if (parsed.guesses.length > 0) {
                const bestGuess = parsed.guesses.reduce((best: Guess, curr: Guess) =>
                    curr.rank < best.rank ? curr : best
                );
                setFeedbackMessage(getFeedbackMessage(bestGuess.rank));
            }
        }
    }, [currentWord.weekNumber]);

    // Save game state to localStorage
    useEffect(() => {
        localStorage.setItem(`game-${currentWord.weekNumber}`, JSON.stringify(gameState));
    }, [gameState, currentWord.weekNumber]);

    // Update player progress on server
    useEffect(() => {
        if (gameState.guesses.length > 0 && playerId) {
            const bestRank = Math.min(...gameState.guesses.map(g => g.rank));
            fetch('/api/stats', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    playerId,
                    bestRank,
                    guessCount: gameState.attempts,
                    isComplete: gameState.isComplete,
                }),
            }).catch(err => console.error('Error updating progress:', err));
        }
    }, [gameState, playerId]);

    const handleGuess = async (word: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/guess', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ word, gameState }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Failed to process guess');
                setIsLoading(false);
                return;
            }

            const { guess, isWin } = data;

            setGameState((prev) => ({
                ...prev,
                guesses: [...prev.guesses, guess],
                isComplete: isWin,
                attempts: prev.attempts + 1,
            }));

            setFeedbackMessage(getFeedbackMessage(guess.rank));

            if (isWin) {
                setTimeout(() => {
                    alert(`🎉 Congratulations! You found the word in ${gameState.attempts + 1} guesses!`);
                }, 300);
            }
        } catch (err) {
            setError('Failed to process guess. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGiveUp = () => {
        if (confirm(`The word was "${currentWord.word}". Start a new game?`)) {
            handleReset();
        }
    };

    const handleReset = () => {
        setGameState({
            guesses: [],
            isComplete: false,
            attempts: 0,
            startedAt: Date.now(),
        });
        setFeedbackMessage('Keep it rolling!');
        setError(null);
    };

    const handleSort = (newSort: 'time' | 'rank') => {
        setSortBy(newSort);
    };

    const progress = getProgress(gameState.guesses);

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <header className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <h1 className="text-4xl md:text-5xl font-bold">
                            <span className="hot-gradient">HOT</span>
                            <span className="cold-gradient">COLD</span>
                        </h1>
                        <span className="text-xl text-gray-400">🧊</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowHowToPlay(true)}
                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            title="How to Play"
                        >
                            ℹ️
                        </button>
                        <Menu
                            onGiveUp={handleGiveUp}
                            onReset={handleReset}
                            onSort={handleSort}
                            currentSort={sortBy}
                        />
                    </div>
                </header>

                {/* Game Title */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-center mb-2">
                        Can you guess the secret word?
                    </h2>
                    <p className="text-gray-400 text-center text-sm">
                        Hot and cold #{currentWord.weekNumber}
                    </p>
                </div>

                {/* Input */}
                <GuessInput
                    onGuess={handleGuess}
                    isLoading={isLoading}
                    isDisabled={gameState.isComplete}
                    error={error}
                />

                {/* Feedback */}
                {gameState.guesses.length > 0 && (
                    <div className="text-center my-4">
                        <p className="text-lg font-medium">{feedbackMessage}</p>
                        <p className="text-gray-400 text-sm mt-1">Guesses: {gameState.attempts}</p>
                    </div>
                )}

                {/* Progress Bar */}
                {gameState.guesses.length > 0 && (
                    <ProgressBar
                        progress={progress}
                        currentPlayerId={playerId}
                        bestRank={Math.min(...gameState.guesses.map(g => g.rank))}
                    />
                )}

                {/* Guess History */}
                <GuessHistory
                    guesses={gameState.guesses}
                    sortBy={sortBy}
                />

                {/* How to Play Button (Mobile) */}
                <div className="mt-6 text-center">
                    <button
                        onClick={() => setShowHowToPlay(true)}
                        className="btn btn-secondary"
                    >
                        How to Play
                    </button>
                </div>

                {/* Stats */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                        {stats.totalPlayers > 0
                            ? `${stats.successRate.toFixed(0)}% of ${stats.totalPlayers} ${stats.totalPlayers === 1 ? 'player has' : 'players have'} succeeded`
                            : 'Be the first to play!'
                        }
                    </p>
                </div>
            </div>

            {/* How to Play Modal */}
            <HowToPlay
                isOpen={showHowToPlay}
                onClose={() => setShowHowToPlay(false)}
            />
        </div>
    );
}
