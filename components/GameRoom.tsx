import React, { useMemo, useState, useEffect } from 'react';
import { GameState, PuzzleData, AvatarType } from '../types';
import { PUZZLES } from '../data/puzzles';
import Grid from './Grid';
import { Dna, FlaskConical, CircleDot, Atom, Users, LogOut, Award, Lightbulb, Eye, Play } from 'lucide-react';

interface Props {
  gameState: GameState;
  onExit: () => void;
  onNextLevel: () => void;
  onUpdateGrid: (x: number, y: number, char: string) => void;
  onBulkUpdateGrid: (updates: Record<string, string>) => void;
}

const GameRoom: React.FC<Props> = ({ gameState, onExit, onNextLevel, onUpdateGrid, onBulkUpdateGrid }) => {
  const [focusedCell, setFocusedCell] = useState<{ x: number; y: number } | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Derive puzzle and solution immediately from props/state
  const { puzzle, solution } = useMemo(() => {
    const p = PUZZLES.find(p => p.id === gameState.puzzleId);
    if (!p) return { puzzle: null, solution: {} };

    const sol: Record<string, string> = {};
    p.words.forEach(word => {
      let cx = word.startX;
      let cy = word.startY;
      for (const char of word.answer) {
        sol[`${cx}-${cy}`] = char.toUpperCase();
        if (word.direction === 'across') cx++;
        else cy++;
      }
    });
    return { puzzle: p, solution: sol };
  }, [gameState.puzzleId]);

  // Set initial focus
  useEffect(() => {
    if (puzzle && puzzle.words.length > 0 && !focusedCell) {
       setFocusedCell({ x: puzzle.words[0].startX, y: puzzle.words[0].startY });
    }
  }, [puzzle]); 
  
  // Check for completion
  const isComplete = useMemo(() => {
     if (!solution || Object.keys(solution).length === 0) return false;
     for (const key in solution) {
         if (gameState.grid[key] !== solution[key]) return false;
     }
     return true;
  }, [gameState.grid, solution]);

  // Delayed modal effect
  useEffect(() => {
    let timer: any;
    if (isComplete) {
      // Wait 2 seconds before showing the modal to allow users to see the answers
      timer = setTimeout(() => {
        setShowCompletionModal(true);
      }, 2000);
    } else {
      setShowCompletionModal(false);
    }
    return () => clearTimeout(timer);
  }, [isComplete]);

  const handleHint = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!focusedCell) {
        // If nothing focused, try to focus the first empty cell of the first word
        if (puzzle && puzzle.words.length > 0) {
            const first = puzzle.words[0];
            setFocusedCell({x: first.startX, y: first.startY});
        }
        return;
    }
    
    const key = `${focusedCell.x}-${focusedCell.y}`;
    const correctChar = solution[key];
    
    if (correctChar) {
      onUpdateGrid(focusedCell.x, focusedCell.y, correctChar);
    }
  };

  const handleRevealAll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (Object.keys(solution).length === 0) return;
    onBulkUpdateGrid(solution);
  };

  if (!puzzle) return <div className="text-white bg-black h-screen flex items-center justify-center font-mono">Loading Genome Sequence...</div>;

  // Custom Icon rendering
  const BirdIcon = ({size}: {size: number}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3"/><path d="M14 17.75V21"/><path d="M7 18a6 6 0 0 0 3.84-10.61"/></svg>
  );
  
  const getAvatarIcon = (type: AvatarType) => {
    switch (type) {
      case AvatarType.OWL: return <BirdIcon size={20} />;
      case AvatarType.DNA: return <Dna size={20} />;
      case AvatarType.BEAKER: return <FlaskConical size={20} />;
      case AvatarType.CELL: return <CircleDot size={20} />;
      case AvatarType.ATOM: return <Atom size={20} />;
      default: return <BirdIcon size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row text-white overflow-hidden relative">
      
      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
           <div className="bg-slate-900 border-2 border-fuchsia-500 rounded-2xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(217,70,239,0.3)] text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-lime-500"></div>
              
              <h2 className="text-3xl md:text-4xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 mb-2">
                SEQUENCE DECODED
              </h2>
              
              <div className="my-8">
                 <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-fuchsia-900/30 border border-fuchsia-500 mb-4 animate-bounce">
                    <Dna size={40} className="text-fuchsia-400" />
                 </div>
                 <p className="text-xl text-white font-mono uppercase tracking-widest font-bold">Excellent Work!</p>
                 <p className="text-slate-400 text-sm mt-3 font-mono">The genetic structure has been fully analyzed and verified.</p>
              </div>
    
              <div className="flex flex-col gap-3">
                 <button onClick={onNextLevel} className="w-full px-6 py-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-xl font-bold font-mono uppercase shadow-[0_0_20px_rgba(192,38,211,0.4)] transition-all flex items-center justify-center gap-2 group">
                    <Play size={18} fill="currentColor" className="group-hover:translate-x-1 transition-transform" /> Start Next Sequence
                 </button>
                 <button onClick={onExit} className="w-full px-6 py-3 border border-slate-700 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 font-mono uppercase transition-all text-xs tracking-widest">
                    Return to Base
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* LEFT: Game Board */}
      <div className="flex-1 flex flex-col p-4 md:p-6 overflow-y-auto relative">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-slate-800 pb-4 gap-4">
          <div>
            <h2 className="text-3xl font-bold font-mono neon-text-cyan flex items-center gap-2 tracking-tighter">
              <span className="text-fuchsia-500">LAB SESSION:</span> {gameState.difficulty.toUpperCase()}
            </h2>
            <p className="text-xs text-lime-400 font-mono tracking-[0.2em] uppercase mt-1">TOPIC: {puzzle.topic}</p>
          </div>
          <div className="flex flex-wrap gap-2">
             <div className="hidden lg:flex px-3 py-2 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-cyan-400 items-center gap-2">
                <Users size={14} /> {gameState.players.length} Active
             </div>

             <button 
               type="button"
               onMouseDown={(e) => e.preventDefault()}
               onClick={handleHint}
               className="px-4 py-2 bg-yellow-900/20 border border-yellow-500/50 rounded text-xs font-mono text-yellow-400 hover:bg-yellow-900/40 hover:text-yellow-200 flex items-center gap-2 transition-all shadow-[0_0_10px_rgba(234,179,8,0.2)] active:scale-95 cursor-pointer"
             >
               <Lightbulb size={16} /> HINT
             </button>

             <button 
               type="button"
               onMouseDown={(e) => e.preventDefault()}
               onClick={handleRevealAll}
               className="px-4 py-2 bg-fuchsia-900/20 border border-fuchsia-500/50 rounded text-xs font-mono text-fuchsia-400 hover:bg-fuchsia-900/40 hover:text-fuchsia-200 flex items-center gap-2 transition-all shadow-[0_0_10px_rgba(217,70,239,0.2)] active:scale-95 cursor-pointer"
             >
               <Eye size={16} /> REVEAL
             </button>

             <button onClick={onExit} className="px-4 py-2 bg-red-900/20 border border-red-500/50 rounded text-xs font-mono text-red-400 hover:bg-red-900/40 flex items-center gap-2 transition-all active:scale-95">
               <LogOut size={16} /> EXIT
             </button>
          </div>
        </header>

        {/* Grid Container */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] p-2 relative">
           <div className="mb-2 text-xs font-mono text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800">
             <span className="text-yellow-400 mr-1">ℹ️</span> Click a cell on the grid to select it, then press <strong>HINT</strong> to reveal the letter.
           </div>
          <div className="w-full max-w-2xl shadow-[0_0_50px_rgba(34,211,238,0.1)] rounded-xl bg-slate-900/30 backdrop-blur p-4 border border-slate-800">
            <Grid 
              puzzle={puzzle} 
              gridState={gameState.grid} 
              onCellChange={onUpdateGrid} 
              focusedCell={focusedCell}
              setFocusedCell={setFocusedCell}
              solution={solution}
            />
          </div>
        </div>
      </div>

      {/* RIGHT: Sidebar (Clues & Players) */}
      <div className="w-full md:w-96 bg-slate-900 border-l border-slate-800 flex flex-col h-[40vh] md:h-screen shadow-2xl z-20">
        
        {/* Players Strip */}
        <div className="p-5 border-b border-slate-800 bg-slate-950">
           <div className="flex justify-between items-end mb-3">
              <h3 className="text-xs font-bold text-slate-500 font-mono uppercase tracking-widest">Team Roster</h3>
              <span className="text-[10px] text-fuchsia-400 font-mono flex items-center gap-1"><Award size={12}/> {gameState.players.reduce((acc, p) => acc + p.score, 0)} XP</span>
           </div>
           
           <div className="grid grid-cols-2 gap-2">
             {gameState.players.map(p => (
               <div key={p.id} className="flex items-center gap-3 bg-slate-900 p-2 rounded border border-slate-800">
                 <div className="w-8 h-8 rounded-full bg-slate-800 text-cyan-400 border border-cyan-900 flex items-center justify-center shadow-[0_0_5px_rgba(6,182,212,0.3)]">
                    {getAvatarIcon(p.avatar)}
                 </div>
                 <div className="flex flex-col overflow-hidden">
                    <span className="text-xs font-mono text-white truncate w-full">{p.name}</span>
                    <span className="text-[9px] font-mono text-slate-500">GENETICIST</span>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Clues */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-slate-900/50">
          <div className="mb-8">
            <h3 className="text-sm font-bold text-cyan-400 font-mono mb-3 uppercase border-b border-cyan-900/50 pb-2 flex items-center gap-2 sticky top-0 bg-slate-900/90 backdrop-blur py-2 z-10">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span> Across
            </h3>
            <ul className="space-y-4">
              {puzzle.words.filter(w => w.direction === 'across').map((word) => (
                 <li 
                    key={word.id} 
                    onClick={() => setFocusedCell({ x: word.startX, y: word.startY })}
                    className="text-sm group cursor-pointer hover:bg-slate-800 p-2 rounded-lg transition-all border border-transparent hover:border-slate-700"
                 >
                   <div className="flex gap-2">
                      <span className="font-bold text-fuchsia-400 font-mono min-w-[1.5rem]">{word.id}</span>
                      <span className="text-slate-300 group-hover:text-white transition-colors leading-relaxed font-mono text-xs md:text-sm">{word.clue}</span>
                   </div>
                 </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-lime-400 font-mono mb-3 uppercase border-b border-lime-900/50 pb-2 flex items-center gap-2 sticky top-0 bg-slate-900/90 backdrop-blur py-2 z-10">
              <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></span> Down
            </h3>
            <ul className="space-y-4">
              {puzzle.words.filter(w => w.direction === 'down').map((word) => (
                 <li 
                    key={word.id}
                    onClick={() => setFocusedCell({ x: word.startX, y: word.startY })}
                    className="text-sm group cursor-pointer hover:bg-slate-800 p-2 rounded-lg transition-all border border-transparent hover:border-slate-700"
                 >
                   <div className="flex gap-2">
                      <span className="font-bold text-fuchsia-400 font-mono min-w-[1.5rem]">{word.id}</span>
                      <span className="text-slate-300 group-hover:text-white transition-colors leading-relaxed font-mono text-xs md:text-sm">{word.clue}</span>
                   </div>
                 </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRoom;