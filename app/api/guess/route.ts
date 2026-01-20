import { NextRequest, NextResponse } from 'next/server';
import { processGuess } from '@/lib/gameLogic';
import { GameState } from '@/lib/gameLogic';

export async function POST(request: NextRequest) {
    try {
        const { word, gameState } = await request.json();

        if (!word || typeof word !== 'string') {
            return NextResponse.json(
                { error: 'Invalid word provided' },
                { status: 400 }
            );
        }

        const { guess, isWin } = await processGuess(word, gameState);

        return NextResponse.json({
            guess,
            isWin,
        });
    } catch (error) {
        console.error('Error processing guess:', error);

        if (error instanceof Error && error.message === 'Already guessed this word!') {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to process guess' },
            { status: 500 }
        );
    }
}
