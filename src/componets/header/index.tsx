import {Component} from "react";
import {observer} from "mobx-react";

import TicTacToeState from "../../store/tikTacToeStore";

import styles from './styles.module.scss';

@observer
export class Header extends Component {
  render() {
    const {score} = TicTacToeState.state

    return (
      <div className={styles.header}>
        <h3 className={styles.player}>Player 1</h3>
        <div className={styles.scoreContainer}>
          <h2 className={styles.score}>Score: <span>{score.x}</span>:<span>{score.o}</span></h2>
          <button
            className={styles.resetButton}
            onClick={() => TicTacToeState.resetGame()}
          >Reset
          </button>
        </div>
        <h3 className={styles.player}>Player 2</h3>
      </div>
    );
  }
}
