import React from 'react';
import { motion } from 'framer-motion';
import { StudentCard } from './StudentCard';

export function CardBoard({ cards, gameState, selectedCardId, revealedStudent, onSelectCard }) {
    // Stagger animation cho thẻ xuất hiện
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50, rotateX: 45 },
        show: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    return (
        <div className="flex-1 w-full flex items-center justify-center p-8 relative z-10">
            <motion.div
                className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {cards.map((card) => (
                    <motion.div key={card.id} variants={itemVariants}>
                        <StudentCard
                            card={card}
                            gameState={gameState}
                            isSelected={card.id === selectedCardId}
                            revealedStudent={card.id === selectedCardId ? revealedStudent : null}
                            onClick={onSelectCard}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}