import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { CheckCircle, XCircle, RotateCw } from 'lucide-react';

export function StudentReveal({ student, onAction }) {
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!student) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center pb-20 bg-black/60 backdrop-blur-sm pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Pháo giấy */}
            <Confetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={false}
                numberOfPieces={400}
                gravity={0.15}
                colors={['#8b5cf6', '#ec4899', '#c084fc', '#fbbf24', '#ffffff']}
            />

            <motion.div
                className="bg-game-board/90 border border-game-glow p-8 rounded-3xl shadow-[0_0_50px_rgba(139,92,246,0.6)] text-center max-w-lg w-full mb-10"
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
            >
                <h3 className="text-xl text-gray-300 mb-2">Xin chúc mừng (hoặc chia buồn)</h3>
                <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-game-glow to-game-secondary mb-8 drop-shadow-lg">
                    {student.name}
                </h1>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => onAction('done')}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-full font-bold text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:scale-105"
                    >
                        <CheckCircle size={20} /> Hoàn Thành
                    </button>
                    {/* <button
                        onClick={() => onAction('absent')}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 rounded-full font-bold text-white transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:scale-105"
                    >
                        <XCircle size={20} /> Vắng Mặt
                    </button>
                    <button
                        onClick={() => onAction('skip')}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-500 rounded-full font-bold text-white transition-all hover:scale-105"
                    >
                        <RotateCw size={20} /> Gọi Lại Sau
                    </button> */}
                </div>
            </motion.div>
        </motion.div>
    );
}