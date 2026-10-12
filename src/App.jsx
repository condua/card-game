import React, { useState, useEffect } from 'react';
import { useStudents } from './hooks/useStudents';
import { useGameLogic } from './hooks/useGameLogic';

import { GameHeader } from './components/layout/GameHeader';
import { GameControls } from './components/layout/GameControls';
import { CardBoard } from './components/game/CardBoard';
import { StudentReveal } from './components/game/StudentReveal';
import { StudentManager } from './components/modals/StudentManager';

export default function App() {
  const studentsManager = useStudents();
  const game = useGameLogic(studentsManager);
  const [isManagerOpen, setIsManagerOpen] = useState(false);

  // Khởi tạo bàn chơi khi mới load hoặc khi danh sách thay đổi
  useEffect(() => {
    if (game.gameState === 'idle') {
      game.initializeBoard();
    }
  }, [studentsManager.students, game.gameState]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-game-dark relative overflow-hidden font-sans">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none -z-10" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-game-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-game-secondary/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <GameHeader
        eligibleCount={studentsManager.getEligibleStudents().length}
        totalCount={studentsManager.students.length}
        isSoundOn={game.isSoundOn}
        toggleSound={() => game.setIsSoundOn(!game.isSoundOn)}
        toggleFullscreen={toggleFullscreen}
        openSettings={() => setIsManagerOpen(true)}
      />

      {/* Main Game Area */}
      <CardBoard
        cards={game.activeCards}
        gameState={game.gameState}
        selectedCardId={game.selectedCardId}
        revealedStudent={game.revealedStudent}
        onSelectCard={(id) => game.selectCard(id, false)}
      />

      {/* Reveal Overlay Modal (Khi lật bài thành công) */}
      {game.gameState === 'result' && (
        <StudentReveal
          student={game.revealedStudent}
          onAction={game.handleStudentResult}
        />
      )}

      {/* Bottom Controls */}
      <GameControls
        gameState={game.gameState}
        onStart={game.startGame}
        onRandomSelect={() => game.selectCard(null, true)}
        onReset={() => {
          studentsManager.resetAllStatus();
          game.initializeBoard();
        }}
        openManager={() => setIsManagerOpen(true)}
      />

      {/* Student Manager Modal */}
      {isManagerOpen && (
        <StudentManager
          studentsManager={studentsManager}
          onClose={() => {
            setIsManagerOpen(false);
            game.initializeBoard();
          }}
        />
      )}
    </div>
  );
}