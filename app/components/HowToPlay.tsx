'use client';

interface HowToPlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function HowToPlay({ isOpen, onClose }: HowToPlayProps) {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/70 z-40 animate-slide-in"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-gray-900 border border-white/10 rounded-xl max-w-lg w-full p-6 animate-slide-in">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">How to Play</h2>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="space-y-4 text-gray-300">
                        <p>
                            Guess the secret word by typing any word you think is related.
                            <strong className="text-white"> Rank (#)</strong> shows how close your guess is
                            compared to all other words. <strong className="text-white">Lower is better.</strong>
                        </p>

                        <div className="bg-black/30 rounded-lg p-4">
                            <p className="font-semibold text-white mb-2">Examples:</p>
                            <ul className="space-y-1 text-sm">
                                <li>• Secret word: <strong className="text-white">car</strong></li>
                                <li className="ml-4">truck → <span className="rank-hot">#12</span> (very close)</li>
                                <li className="ml-4">tire → <span className="rank-warm">#344</span> (close-ish)</li>
                                <li className="ml-4">banana → <span className="rank-cold">#45,333</span> (far)</li>
                            </ul>
                        </div>

                        <p className="text-sm">
                            The rank is based on how AI models see the relationships between words.
                            Antonyms can be "close" (cold ↔ hot), and words can be close based on
                            structure (hotdog → hot).
                        </p>

                        <button
                            onClick={onClose}
                            className="btn btn-primary w-full mt-4"
                        >
                            Got it!
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
