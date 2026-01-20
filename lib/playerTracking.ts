export interface PlayerProgress {
    id: string;
    bestRank: number;
    guessCount: number;
    isComplete: boolean;
    timestamp: number;
}

export interface GameStats {
    totalPlayers: number;
    completedPlayers: number;
    successRate: number;
    activePlayers: PlayerProgress[];
}

// In-memory storage for players (in production, use a database)
const players = new Map<string, PlayerProgress>();

/**
 * Add or update a player's progress
 */
export function updatePlayerProgress(playerId: string, bestRank: number, guessCount: number, isComplete: boolean) {
    players.set(playerId, {
        id: playerId,
        bestRank,
        guessCount,
        isComplete,
        timestamp: Date.now(),
    });
}

/**
 * Get all player progress for visualization
 */
export function getAllPlayers(): PlayerProgress[] {
    // Remove players older than 24 hours
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);

    for (const [id, player] of players.entries()) {
        if (player.timestamp < oneDayAgo) {
            players.delete(id);
        }
    }

    return Array.from(players.values());
}

/**
 * Get game statistics
 */
export function getGameStats(): GameStats {
    const allPlayers = getAllPlayers();
    const completedPlayers = allPlayers.filter(p => p.isComplete).length;

    return {
        totalPlayers: allPlayers.length,
        completedPlayers,
        successRate: allPlayers.length > 0 ? (completedPlayers / allPlayers.length) * 100 : 0,
        activePlayers: allPlayers,
    };
}

/**
 * Get player's relative position (0-100 for progress bar)
 */
export function getPlayerPosition(bestRank: number): number {
    // Convert rank to position on progress bar
    // Lower rank = better position (higher on bar)
    // Rank 1 = 100%, Rank 300+ = 0%
    const position = Math.max(0, Math.min(100, 100 - (bestRank / 3)));
    return position;
}
