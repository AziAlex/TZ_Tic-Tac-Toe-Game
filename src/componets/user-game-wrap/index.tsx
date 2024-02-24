import {Component} from "react";
import {Board} from "../board";
import {observer} from "mobx-react";
import TicTacToeState from "../../store/tikTacToeStore";
import {GameStatus, Player} from "../../store/type";

import styles from './styles.module.scss';

interface Props {
  user: Player
}

@observer
export class UserGameWrap extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  getStatusTitle = (status: GameStatus, turn: Player) => {
    const isX = turn === this.props.user;

    const statusMessages: { [key in GameStatus]: string } = {
      started: isX ? 'Game started! Your turn:' : 'Game started! Wait your opponent.',
      active: isX ? 'Your turn:' : 'Wait your opponent.',
      ended: isX ? 'You win!' : 'You lose!',
      draw: 'Draw!'
    };

    return statusMessages[status];
  }

  componentDidUpdate() {
    const {gameStatus} = TicTacToeState.state

    if (gameStatus === 'ended') {
      setTimeout(() => {
        TicTacToeState.nextGame()
      }, 5000)
    }
  }

  render() {
    const {gameStatus, turn} = TicTacToeState.state
    return (
      <div className={styles.gameWrap}>
        <h2 className={styles.title}>{this.getStatusTitle(gameStatus, turn)}</h2>
        <Board user={this.props.user}/>
      </div>
    );
  }
}