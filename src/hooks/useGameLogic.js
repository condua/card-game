import { useState, useCallback } from 'react';
import { sounds } from '../utils/audioEngine';

export function useGameLogic(studentsManager) {
    const [gameState, setGameState] = useState('idle'); // idle, selecting, revealing, result
    const [activeCards, setActiveCards] = useState([]);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const [revealedStudent, setRevealedStudent] = useState(null);
    const [isSoundOn, setIsSoundOn] = useState(true);

    const playSound = useCallback((soundName) => {
        if (isSoundOn && sounds[soundName]) sounds[soundName]();
    }, [isSoundOn]);

    // Tạo ra bàn chơi với số lượng thẻ cố định (vd: 12 thẻ hoặc số học sinh hiện có nếu ít hơn)
    const initializeBoard = useCallback(() => {
        const eligible = studentsManager.getEligibleStudents();
        const boardSize = Math.min(12, Math.max(eligible.length, 4)); // Ít nhất 4, nhiều nhất 12 thẻ hiển thị

        // Tạo thẻ ảo cho bàn chơi
        const cards = Array.from({ length: boardSize }).map((_, i) => ({
            id: `card-${i}`,
            isFlipped: false,
            isWinner: false,
        }));
        setActiveCards(cards);
        setGameState('idle');
        setRevealedStudent(null);
        setSelectedCardId(null);
    }, [studentsManager.students]);

    const startGame = () => {
        if (studentsManager.getEligibleStudents().length === 0) {
            alert("Tất cả học sinh đã được gọi! Vui lòng làm mới danh sách.");
            return;
        }
        playSound('start');
        setGameState('selecting');
    };

    const selectCard = (cardId, isRandom = false) => {
        if (gameState !== 'selecting') return;

        const eligible = studentsManager.getEligibleStudents();
        if (eligible.length === 0) return;

        playSound('flip');
        setGameState('revealing');

        // Randomly pick a winner card if "Random" button is pressed, else use clicked card
        const targetCardId = isRandom
            ? activeCards[Math.floor(Math.random() * activeCards.length)].id
            : cardId;

        setSelectedCardId(targetCardId);

        // Pick random student from eligible list
        const randomStudent = eligible[Math.floor(Math.random() * eligible.length)];
        setRevealedStudent(randomStudent);

        // Animation Delay
        setTimeout(() => {
            playSound('reveal');
            setGameState('result');
            setActiveCards(prev => prev.map(c =>
                c.id === targetCardId ? { ...c, isFlipped: true, isWinner: true } : c
            ));
        }, 1000); // Đợi thẻ xoay 3D xong
    };

    const handleStudentResult = (status) => {
        if (revealedStudent) {
            studentsManager.updateStatus(revealedStudent.id, status);
        }
        initializeBoard(); // Reset bàn chơi cho vòng mới
    };

    return {
        gameState,
        activeCards,
        selectedCardId,
        revealedStudent,
        isSoundOn,
        setIsSoundOn,
        playSound,
        initializeBoard,
        startGame,
        selectCard,
        handleStudentResult
    };
}