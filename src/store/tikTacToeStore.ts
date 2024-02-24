import {makeAutoObservable} from "mobx";
import type {GameState, Player} from "./type";

class TicTacToeStore {
  state: GameState = {
    turn: 'x',
    moves: Array(9).fill(null),
    score: {
      x: 0,
      o: 0,
    },
    gameStatus: 'started',
  }


  constructor() {
    makeAutoObservable(this);
  }

  nextGame = () => {
    this.state.turn = 'x';
    this.state.moves = Array(9).fill(null);
    this.state.gameStatus = 'started';
  }

  resetGame = () => {
    this.nextGame()
    this.state.score = {
      x: 0,
      o: 0,
    };
  }
}

const TicTacToeState = new TicTacToeStore();
export default TicTacToeState;
