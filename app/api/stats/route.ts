import { NextRequest, NextResponse } from 'next/server';
import { getGameStats, updatePlayerProgress } from '@/lib/playerTracking';

export async function GET() {
    try {
        const stats = getGameStats();
        return NextResponse.json(stats);
    } catch (error) {
        console.error('Error getting stats:', error);
        return NextResponse.json(
            { error: 'Failed to get stats' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const { playerId, bestRank, guessCount, isComplete } = await request.json();

        if (!playerId || typeof bestRank !== 'number' || typeof guessCount !== 'number') {
            return NextResponse.json(
                { error: 'Invalid data provided' },
                { status: 400 }
            );
        }

        updatePlayerProgress(playerId, bestRank, guessCount, isComplete || false);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating progress:', error);
        return NextResponse.json(
            { error: 'Failed to update progress' },
            { status: 500 }
        );
    }
}
