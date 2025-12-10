import React, { useRef, useEffect } from 'react';
import { PuzzleData } from '../types';

interface Props {
  puzzle: PuzzleData;
  gridState: Record<string, string>;
  onCellChange: (x: number, y: number, char: string) => void;
  focusedCell: { x: number, y: number } | null;
  setFocusedCell: (cell: { x: number, y: number } | null) => void;
  solution?: Record<string, string>; // Optional solution for correctness highlighting
}

const Grid: React.FC<Props> = ({ puzzle, gridState, onCellChange, focusedCell, setFocusedCell, solution }) => {
  const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

  // Create a map of valid cells for O(1) lookup
  const validCells = new Set<string>();
  const cellNumbers = new Map<string, number>();

  puzzle.words.forEach((word, index) => {
    let cx = word.startX;
    let cy = word.startY;
    const key = `${cx}-${cy}`;
    if (!cellNumbers.has(key)) {
      cellNumbers.set(key, index + 1); // 1-based index for clue reference
    }

    for (let i = 0; i < word.answer.length; i++) {
      validCells.add(`${cx}-${cy}`);
      if (word.direction === 'across') cx++;
      else cy++;
    }
  });

  // Focus management
  // CRITICAL FIX: Add gridState to dependencies to ensure focus persists after external updates (like hints)
  useEffect(() => {
    if (focusedCell) {
      const key = `${focusedCell.x}-${focusedCell.y}`;
      const input = inputRefs.current.get(key);
      if (input) {
         // Use a small timeout to ensure DOM is ready after re-render if needed, though usually direct focus works
         input.focus();
      }
    }
  }, [focusedCell, gridState]);

  const handleKeyDown = (e: React.KeyboardEvent, x: number, y: number) => {
    let dx = 0;
    let dy = 0;

    switch (e.key) {
      case 'ArrowUp': dy = -1; break;
      case 'ArrowDown': dy = 1; break;
      case 'ArrowLeft': dx = -1; break;
      case 'ArrowRight': dx = 1; break;
      case 'Backspace':
        if (!gridState[`${x}-${y}`]) {
           // Move back if empty
           dx = -1; // Default to left
        } else {
           onCellChange(x, y, '');
           return; 
        }
        break;
      default: return;
    }

    // Attempt to move focus
    const nextX = x + dx;
    const nextY = y + dy;
    const nextKey = `${nextX}-${nextY}`;
    
    if (validCells.has(nextKey)) {
      setFocusedCell({ x: nextX, y: nextY });
      e.preventDefault();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, x: number, y: number) => {
    const val = e.target.value.slice(-1).toUpperCase();
    
    if (/^[A-Z]$/.test(val) || val === '') {
      onCellChange(x, y, val);
      
      // Auto-advance logic
      if (val !== '') {
        const rightKey = `${x + 1}-${y}`;
        const downKey = `${x}-${y + 1}`;
        
        if (validCells.has(rightKey)) {
          setFocusedCell({ x: x + 1, y });
        } else if (validCells.has(downKey)) {
          setFocusedCell({ x, y: y + 1 });
        }
      }
    }
  };

  const renderCells = () => {
    const cells = [];
    for (let y = 0; y < puzzle.height; y++) {
      for (let x = 0; x < puzzle.width; x++) {
        const key = `${x}-${y}`;
        const isValid = validCells.has(key);
        const cellNum = cellNumbers.get(key);
        const val = gridState[key] || '';
        const isFocused = focusedCell?.x === x && focusedCell?.y === y;
        
        // Determine status color
        let statusColor = '';
        if (solution && val) {
          if (val === solution[key]) {
            statusColor = 'text-green-400 bg-green-900/20'; // Correct
          } else {
            statusColor = 'text-red-400 bg-red-900/20'; // Incorrect
          }
        }
        
        // Focus overrides background
        if (isFocused) statusColor = 'bg-cyan-900/40 text-cyan-300';

        if (!isValid) {
          cells.push(
            <div key={key} className="bg-black/40 border border-slate-900 w-full h-full" />
          );
        } else {
          cells.push(
            <div key={key} className="relative w-full h-full">
              {cellNum && (
                <span className="absolute top-0.5 left-0.5 text-[0.5rem] md:text-[0.6rem] text-slate-500 font-mono leading-none z-10 pointer-events-none">
                  {cellNum}
                </span>
              )}
              <input
                ref={(el) => {
                  if (el) inputRefs.current.set(key, el);
                  else inputRefs.current.delete(key);
                }}
                type="text"
                maxLength={1}
                value={val}
                onFocus={() => setFocusedCell({ x, y })}
                onKeyDown={(e) => handleKeyDown(e, x, y)}
                onChange={(e) => handleChange(e, x, y)}
                className={`
                  w-full h-full text-center text-lg md:text-xl font-bold uppercase caret-transparent
                  focus:outline-none transition-all duration-150 font-mono
                  ${isFocused 
                    ? 'border-2 border-cyan-400 shadow-[inset_0_0_10px_#0891b2] z-20' 
                    : 'border border-slate-700 hover:border-slate-500'}
                  ${statusColor || 'bg-slate-800 text-white'}
                `}
              />
            </div>
          );
        }
      }
    }
    return cells;
  };

  return (
    <div 
      className="grid gap-[1px] bg-slate-900 border-2 border-slate-700 p-1 shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-sm"
      style={{
        gridTemplateColumns: `repeat(${puzzle.width}, minmax(0, 1fr))`,
        aspectRatio: `${puzzle.width}/${puzzle.height}`
      }}
    >
      {renderCells()}
    </div>
  );
};

export default Grid;