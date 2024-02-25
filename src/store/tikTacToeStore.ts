import {makeAutoObservable} from "mobx";
import type {GameState, Player} from "./type";
import {isNull} from "util";

class TicTacToeStore {
  state: GameState = {
    turn: 'x',
    moves: Array(9).fill(null),
    score: {
      x: 0,
      o: 0,
    },
    winConditions: null,
    gameStatus: 'started',
    messages: []
  }


  constructor() {
    makeAutoObservable(this);
  }

  makeMove = (index: number) => {
    if (this.state.moves[index] || this.state.gameStatus === 'ended') return

    this.state.moves[index] = this.state.turn;

    const winner = this.checkWinner();

    if (winner) {
      this.state.gameStatus = 'ended';
      this.state.score[winner.user] += 1;
      this.state.winConditions = winner.winConditions
    } else {
      this.state.turn = this.state.turn === 'x' ? 'o' : 'x';
    }
  }


  nextGame = () => {
    this.state.turn = this.getFirstTurnPlayer();
    this.state.moves = Array(9).fill(null);
    this.state.winConditions = null;
    this.state.gameStatus = 'started';
  }

  resetGame = () => {
    this.nextGame()
    this.state.score = {
      x: 0,
      o: 0,
    };
    this.state.messages = [];
  }

  sendMessage = (message: string, player: Player) => {
    this.state.messages.push({
      player,
      message,
      date: new Date(),
    })
  }

  private checkWinner(): null | { user: Player, winConditions: number[] } {
    const {moves} = this.state;
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (moves[a] && (moves[a] === moves[b]) && (moves[a] === moves[c])) {
        return {user: moves[a] as Player, winConditions: condition};
      }
    }

    if (moves.every(move => move !== null)) {
      this.state.gameStatus = 'draw';
      this.state.score.x += 1;
      this.state.score.o += 1;
      return null; // Ничья
    }

    if (this.state.gameStatus === 'started') {
      this.state.gameStatus = 'active';
    }
    return null; // Игра продолжается
  }

  private getFirstTurnPlayer(): Player {
    const movesList = this.state.moves.filter(move => move !== null);
    const isEvenMoves = movesList.length % 2 === 0;

    // Определяем, кто первый начал ходить
    if (isEvenMoves) {
      return this.state.turn === "x" ? "o" : "x";
    }
    return this.state.turn === "x" ? "x" : "o";
  }
}

const TicTacToeState = new TicTacToeStore();
export default TicTacToeState;
