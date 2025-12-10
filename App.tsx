import React, { useState, useCallback } from 'react';
import Lobby from './components/Lobby';
import GameRoom from './components/GameRoom';
import { Player, GameState, Difficulty } from './types';
import { PUZZLES } from './data/puzzles';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);

  const handleStartGame = (players: Player[], difficulty: Difficulty) => {
    // Filter puzzles by difficulty if possible, else pick random
    const suitablePuzzles = PUZZLES.filter(p => p.difficulty === difficulty);
    const pool = suitablePuzzles.length > 0 ? suitablePuzzles : PUZZLES;
    const randomPuzzle = pool[Math.floor(Math.random() * pool.length)];

    const newGame: GameState = {
      roomId: 'LOCAL-SESSION',
      puzzleId: randomPuzzle.id,
      players: players,
      grid: {},
      status: 'playing',
      difficulty: difficulty
    };

    setGameState(newGame);
  };

  const handleNextLevel = () => {
    if (!gameState) return;
    
    // Find a new puzzle of the same difficulty, excluding the current one
    const currentId = gameState.puzzleId;
    const currentDifficulty = gameState.difficulty;
    
    const sameDiffPuzzles = PUZZLES.filter(p => p.difficulty === currentDifficulty && p.id !== currentId);
    // If we exhausted specific difficulty, try any other puzzle
    const pool = sameDiffPuzzles.length > 0 ? sameDiffPuzzles : PUZZLES.filter(p => p.id !== currentId);
    
    // Pick random from pool, or fallback to index 0 if pool empty (only 1 puzzle total)
    const nextPuzzle = pool.length > 0 
      ? pool[Math.floor(Math.random() * pool.length)] 
      : PUZZLES[0];

    setGameState(prev => {
        if (!prev) return null;
        return {
            ...prev,
            puzzleId: nextPuzzle.id,
            grid: {}, // Reset grid for new game
            status: 'playing'
        };
    });
  };

  const handleUpdateGrid = useCallback((x: number, y: number, char: string) => {
    setGameState(prev => {
      if (!prev) return null;
      const key = `${x}-${y}`;
      return {
        ...prev,
        grid: { ...prev.grid, [key]: char }
      };
    });
  }, []);

  const handleBulkUpdateGrid = useCallback((updates: Record<string, string>) => {
    setGameState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        grid: { ...prev.grid, ...updates }
      };
    });
  }, []);

  const handleExit = () => {
    setGameState(null);
  };

  if (!gameState) {
    return <Lobby onStartGame={handleStartGame} />;
  }

  return (
    <GameRoom 
      gameState={gameState} 
      onExit={handleExit} 
      onNextLevel={handleNextLevel}
      onUpdateGrid={handleUpdateGrid}
      onBulkUpdateGrid={handleBulkUpdateGrid}
    />
  );
};

export default App;