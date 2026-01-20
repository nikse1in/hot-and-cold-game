import { getSimilarityRank } from './openai';
import { getCurrentWord } from './wordConfig';

export interface Guess {
    word: string;
    rank: number;
    timestamp: number;
}

export interface GameState {
    guesses: Guess[];
    isComplete: boolean;
    attempts: number;
    startedAt: number;
}

/**
 * Process a new guess
 */
export async function processGuess(
    word: string,
    currentState: GameState
): Promise<{ guess: Guess; isWin: boolean }> {
    const normalizedWord = word.toLowerCase().trim();
    const targetWord = getCurrentWord().word;

    // Check if already guessed
    const alreadyGuessed = currentState.guesses.some(
        (g) => g.word.toLowerCase() === normalizedWord
    );

    if (alreadyGuessed) {
        throw new Error('Already guessed this word!');
    }

    // Check if it's the winning word
    const isWin = normalizedWord === targetWord.toLowerCase();

    let rank: number;
    if (isWin) {
        rank = 0; // Winner!
    } else {
        rank = await getSimilarityRank(normalizedWord, targetWord);
    }

    const guess: Guess = {
        word: normalizedWord,
        rank,
        timestamp: Date.now(),
    };

    return { guess, isWin };
}

/**
 * Get feedback message based on rank
 */
export function getFeedbackMessage(rank: number): string {
    if (rank === 0) return 'WINNER! 🎉';
    if (rank < 100) return 'Very hot! 🔥🔥🔥';
    if (rank < 500) return 'Hot! 🔥🔥';
    if (rank < 1000) return 'Getting warmer... 🔥';
    if (rank < 5000) return 'Warm';
    if (rank < 10000) return 'Cool';
    if (rank < 15000) return 'Cold ❄️';
    if (rank < 20000) return 'Very cold! ❄️❄️';
    return 'Freezing! ❄️❄️❄️';
}

/**
 * Calculate progress percentage (0-100)
 * Based on best guess so far
 */
export function getProgress(guesses: Guess[]): number {
    if (guesses.length === 0) return 0;

    const bestRank = Math.min(...guesses.map((g) => g.rank));
    if (bestRank === 0) return 100;

    // Map rank to progress (lower rank = higher progress)
    const progress = Math.max(0, Math.min(100, 100 - (bestRank / 300)));
    return progress;
}
