import { PUZZLES } from '../data/puzzles';
import { GameState, Player, AvatarType, Difficulty } from '../types';

// This mock service simulates Firestore real-time updates.
// In a real app, replace `localStorage` / `setTimeout` with `onSnapshot` / `setDoc`.

class MockFirebaseService {
  private subscribers: Record<string, Function[]> = {};
  private state: Record<string, GameState> = {};

  constructor() {
    // Initialize some mock data if needed
  }

  generateRoomId(): string {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
  }

  async createRoom(player: Player): Promise<string> {
    const roomId = this.generateRoomId();
    // Randomly select one of the 20 puzzles
    const randomPuzzle = PUZZLES[Math.floor(Math.random() * PUZZLES.length)];
    
    const initialState: GameState = {
      roomId,
      puzzleId: randomPuzzle.id,
      players: [player],
      grid: {}, // Empty grid initially
      status: 'waiting',
      difficulty: randomPuzzle.difficulty || Difficulty.LOW
    };
    
    this.state[roomId] = initialState;
    return roomId;
  }

  async joinRoom(roomId: string, player: Player): Promise<boolean> {
    if (!this.state[roomId]) return false;
    this.state[roomId].players.push(player);
    this.notify(roomId);
    return true;
  }

  subscribe(roomId: string, callback: (data: GameState) => void) {
    if (!this.subscribers[roomId]) {
      this.subscribers[roomId] = [];
    }
    this.subscribers[roomId].push(callback);
    
    // Initial callback
    if (this.state[roomId]) {
      callback(this.state[roomId]);
    }

    return () => {
      this.subscribers[roomId] = this.subscribers[roomId].filter(cb => cb !== callback);
    };
  }

  updateGrid(roomId: string, x: number, y: number, char: string, playerId: string) {
    if (!this.state[roomId]) return;
    
    // Simple optimistic update
    const key = `${x}-${y}`;
    this.state[roomId].grid[key] = char.toUpperCase();
    
    this.notify(roomId);
  }

  private notify(roomId: string) {
    if (this.subscribers[roomId]) {
      this.subscribers[roomId].forEach(cb => cb({ ...this.state[roomId] }));
    }
  }
}

export const db = new MockFirebaseService();