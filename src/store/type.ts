export type Player = 'x' | 'o';
export type GameStatus = 'active' | 'ended' | 'draw' | 'started';

export interface Message {
  player: Player;
  message: string;
  date: Date
}

export interface GameState {
  turn: Player;
  moves: (Player | null)[];
  score: { [key in Player]: number };
  gameStatus: GameStatus;
  messages: Message[];
  winConditions: number[] | null;
}