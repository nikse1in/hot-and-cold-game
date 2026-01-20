'use client';

import { getPlayerPosition } from '@/lib/playerTracking';
import { useEffect, useState } from 'react';

interface ProgressBarProps {
    progress: number; // 0-100
    currentPlayerId: string;
    bestRank: number;
}

interface PlayerDot {
    id: string;
    position: number;
    isCurrentPlayer: boolean;
}

export default function ProgressBar({ progress, currentPlayerId, bestRank }: ProgressBarProps) {
    const [otherPlayers, setOtherPlayers] = useState<PlayerDot[]>([]);

    useEffect(() => {
        // Fetch other players' positions
        async function fetchPlayers() {
            try {
                const response = await fetch('/api/stats');
                if (response.ok) {
                    const data = await response.json();

                    // Convert player ranks to positions
                    const playerDots: PlayerDot[] = data.activePlayers
                        .filter((p: any) => !p.isComplete) // Only show active players
                        .map((p: any) => ({
                            id: p.id,
                            position: getPlayerPosition(p.bestRank),
                            isCurrentPlayer: p.id === currentPlayerId,
                        }))
                        .filter((p: PlayerDot) => p.position > 0); // Only show players with progress

                    setOtherPlayers(playerDots);
                }
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        }

        fetchPlayers();
        // Refresh every 5 seconds
        const interval = setInterval(fetchPlayers, 5000);

        return () => clearInterval(interval);
    }, [currentPlayerId, bestRank]);

    return (
        <div className="my-6">
            <div className="relative h-3 rounded-full progress-gradient overflow-visible">
                {/* Other players' dots */}
                {otherPlayers.map((player) => (
                    <div
                        key={player.id}
                        className="absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
                        style={{
                            left: `${player.position}%`,
                            transform: `translate(-50%, -50%)`,
                            zIndex: player.isCurrentPlayer ? 20 : 10,
                        }}
                        title={player.isCurrentPlayer ? 'You' : 'Other player'}
                    >
                        <span className={`text-sm opacity-60 ${player.isCurrentPlayer ? 'text-2xl opacity-100' : ''}`}>
                            {player.isCurrentPlayer ? '🧊' : '👤'}
                        </span>
                    </div>
                ))}

                {/* Current player's snowman */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-out z-30"
                    style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
                >
                    <span className="text-2xl drop-shadow-lg animate-pulse">🧊</span>
                </div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>❄️ Cold</span>
                <span className="text-gray-400">
                    {otherPlayers.length > 1 ? `${otherPlayers.length - 1} other players` : ''}
                </span>
                <span>🔥 Hot</span>
            </div>
        </div>
    );
}
