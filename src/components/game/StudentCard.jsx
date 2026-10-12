import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/helpers';

import CARD_BACK_IMAGE from '../../assets/card-back.jpg'; // Hình ảnh mặt sau của thẻ

export function StudentCard({ card, gameState, isSelected, revealedStudent, onClick }) {
    const [isHovered, setIsHovered] = useState(false);

    // Trạng thái cho phép tương tác
    const isInteractive = gameState === 'selecting' && !card.isFlipped;
    const isRevealing = isSelected && gameState === 'revealing';
    const isResult = isSelected && gameState === 'result';
    const isFaded = gameState === 'result' && !isSelected;

    // Variants cho hoạt ảnh rung lắc & nứt trước khi lật
    const shakeShatterVariants = {
        idle: { x: 0, y: 0, scale: 1, rotate: 0 },
        shaking: {
            x: [0, -4, 4, -6, 6, -4, 4, 0],
            y: [0, 4, -4, 6, -6, 4, -4, 0],
            scale: 1.1,
            rotate: [0, -2, 2, -3, 3, -1, 1, 0],
            filter: ['brightness(1)', 'brightness(1.5)', 'brightness(2)', 'brightness(1.2)'],
            transition: { duration: 0.8, ease: "easeInOut" } // Rung trong 0.8s trước khi lật
        }
    };

    return (
        <motion.div
            className={cn(
                "relative w-40 h-56 sm:w-48 sm:h-64 cursor-pointer preserve-3d perspective-1000",
                !isInteractive && "cursor-default"
            )}
            onMouseEnter={() => isInteractive && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => isInteractive && onClick(card.id)}
            animate={isFaded ? { opacity: 0.4, scale: 0.95 } : { opacity: 1 }}
            layout
        >
            {/* Container chính của thẻ, xử lý xoay 3D */}
            <motion.div
                className="w-full h-full relative preserve-3d"
                variants={shakeShatterVariants}
                animate={isRevealing ? "shaking" : "idle"}
                style={{
                    rotateY: isResult ? 180 : 0,
                    transition: "rotateY 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                    // Phóng to khi được lật (ở trạng thái result)
                    scale: isResult ? 1.5 : (isHovered && isInteractive ? 1.05 : 1),
                    zIndex: (isRevealing || isResult) ? 50 : 10
                }}
            >
                {/* === MẶT SAU THẺ (Mặt có hình ảnh) === */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.5)] border-2 border-yellow-700/50"
                    style={{
                        backgroundImage: `url('${CARD_BACK_IMAGE}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {/* Lớp phủ sáng khi hover */}
                    <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: (isHovered && isInteractive) ? 0.2 : 0 }}
                    />

                    {/* Hiệu ứng NỨT VỠ bằng hình ảnh/SVG chớp nhoáng (Giả lập bằng các tia chớp SVG) */}
                    <AnimatePresence>
                        {isRevealing && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: [0, 1, 0.5, 1], scale: 1.1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                className="absolute inset-0 flex items-center justify-center mix-blend-color-dodge pointer-events-none"
                            >
                                {/* Vẽ vài tia nứt bằng SVG */}
                                <svg viewBox="0 0 100 150" className="w-full h-full stroke-white stroke-2 fill-none drop-shadow-[0_0_10px_#fff]">
                                    <path d="M50 0 L45 30 L60 50 L40 70 L55 90 L40 120 L50 150"
                                        strokeDasharray="200"
                                        strokeDashoffset="200">
                                        <animate attributeName="stroke-dashoffset" values="200;0" dur="0.4s" fill="freeze" />
                                    </path>
                                    <path d="M100 50 L70 60 L60 50 L45 75 L10 80"
                                        strokeDasharray="150"
                                        strokeDashoffset="150">
                                        <animate attributeName="stroke-dashoffset" values="150;0" dur="0.5s" delay="0.2s" fill="freeze" />
                                    </path>
                                    <path d="M0 100 L30 110 L40 90 L60 110 L90 130"
                                        strokeDasharray="150"
                                        strokeDashoffset="150">
                                        <animate attributeName="stroke-dashoffset" values="150;0" dur="0.3s" delay="0.4s" fill="freeze" />
                                    </path>
                                </svg>
                                {/* Quầng sáng vụ nổ */}
                                <div className="absolute inset-0 bg-radial-gradient from-white via-game-glow/50 to-transparent opacity-50 animate-pulse-glow" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* === MẶT TRƯỚC THẺ (Hiển thị tên học sinh) === */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.8)] border-4 border-game-glow flex flex-col items-center justify-center bg-game-board relative"
                    style={{ transform: "rotateY(180deg)" }} // Lật mặt này ra sau mặc định
                >
                    {/* Nền fantasy cho mặt trước */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-b from-game-primary/20 to-game-secondary/20" />

                    {/* Vòng tròn năng lượng xoay */}
                    <div className="absolute w-[150%] h-[150%] border-4 border-dashed border-game-glow/40 rounded-full animate-[spin_10s_linear_infinite] opacity-50" />

                    <div className="relative z-10 text-center px-4">
                        <span className="text-xs sm:text-sm text-game-glow uppercase font-bold tracking-widest block mb-2 drop-shadow-md">
                            Hôm nay tới lượt
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow-[0_0_10px_#c084fc] break-words">
                            {revealedStudent ? revealedStudent.name : '???'}
                        </h2>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}