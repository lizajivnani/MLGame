export enum AvatarType {
  OWL = 'OWL',
  DNA = 'DNA',
  BEAKER = 'BEAKER',
  CELL = 'CELL',
  ATOM = 'ATOM'
}

export enum Difficulty {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HARD = 'Hard'
}

export interface Player {
  id: string;
  name: string;
  avatar: AvatarType;
  score: number;
}

export interface WordData {
  id: string; // e.g., "1-across"
  answer: string;
  clue: string;
  startX: number; // 0-indexed column
  startY: number; // 0-indexed row
  direction: 'across' | 'down';
}

export interface PuzzleData {
  id: number;
  topic: string;
  width: number;
  height: number;
  words: WordData[];
  difficulty?: Difficulty;
}

export interface GameState {
  roomId: string; // Just a session ID for local play
  puzzleId: number;
  players: Player[];
  grid: Record<string, string>; // key: "x-y", value: char
  status: 'waiting' | 'playing' | 'completed';
  difficulty: Difficulty;
}