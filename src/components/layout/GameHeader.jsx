import React from 'react';
import { Volume2, VolumeX, Maximize, Settings, GraduationCap } from 'lucide-react';

export function GameHeader({
    eligibleCount,
    totalCount,
    isSoundOn,
    toggleSound,
    toggleFullscreen,
    openSettings
}) {
    return (
        <header className="w-full flex flex-col md:flex-row items-center justify-between p-4 md:px-8 z-20 bg-game-dark/50 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
                <div className="p-2 bg-game-primary/20 rounded-lg border border-game-primary/50">
                    <GraduationCap className="text-game-glow" size={32} />
                </div>
                <div>
                    <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-game-glow to-game-secondary tracking-wider">
                        STUDENT CARD CHALLENGE
                    </h1>
                    <p className="text-sm text-gray-400 font-medium">Ai sẽ là người trả bài hôm nay?</p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                    <span className="text-xs uppercase text-gray-500 font-bold tracking-widest">Chưa gọi</span>
                    <div className="text-2xl font-black text-white">
                        <span className="text-game-secondary">{eligibleCount}</span> / {totalCount}
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={toggleSound}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-gray-300 hover:text-white"
                        title="Bật/Tắt âm thanh"
                    >
                        {isSoundOn ? <Volume2 size={20} /> : <VolumeX size={20} className="text-red-400" />}
                    </button>
                    <button
                        onClick={toggleFullscreen}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-gray-300 hover:text-white"
                        title="Toàn màn hình"
                    >
                        <Maximize size={20} />
                    </button>
                    <button
                        onClick={openSettings}
                        className="p-3 bg-white/5 hover:bg-game-primary/20 hover:border-game-primary/50 border border-transparent rounded-full transition-all text-gray-300 hover:text-game-glow shadow-[0_0_10px_rgba(139,92,246,0)] hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                        title="Quản lý lớp học"
                    >
                        <Settings size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
}