import React from 'react';
import { motion } from 'framer-motion';
import { Play, Shuffle, RotateCcw, Users } from 'lucide-react';

export function GameControls({ gameState, onStart, onRandomSelect, onReset, openManager }) {
    return (
        <div className="w-full flex justify-center gap-4 p-6 z-20">
            {gameState === 'idle' && (
                <motion.button
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onStart}
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-game-primary to-game-glow rounded-full font-black text-xl text-white shadow-[0_0_30px_rgba(139,92,246,0.5)] uppercase tracking-widest border border-white/20"
                >
                    <Play fill="currentColor" /> Bắt đầu chọn
                </motion.button>
            )}

            {gameState === 'selecting' && (
                <motion.button
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onRandomSelect}
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-game-secondary to-rose-500 rounded-full font-black text-xl text-white shadow-[0_0_30px_rgba(236,72,153,0.5)] uppercase tracking-widest border border-white/20"
                >
                    <Shuffle /> Chọn ngẫu nhiên
                </motion.button>
            )}

            <button
                onClick={openManager}
                className="flex items-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 rounded-full font-bold text-white transition-colors uppercase tracking-wider text-sm"
            >
                <Users size={18} /> Quản lý danh sách
            </button>

            <button
                onClick={onReset}
                className="flex items-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/15 rounded-full font-bold text-gray-300 hover:text-white transition-colors uppercase tracking-wider text-sm"
                title="Làm mới vòng lặp học sinh"
            >
                <RotateCcw size={18} /> Bắt đầu vòng mới
            </button>
        </div>
    );
}