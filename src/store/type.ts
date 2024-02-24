export type Player = 'x' | 'o';
export type GameStatus = 'active' | 'ended' | 'draw' | 'started';

export interface GameState {
  turn: Player;
  moves: (Player | null)[]; // Изменение типа для массива moves
  score: { [key in Player]: number };
  gameStatus: GameStatus;
}