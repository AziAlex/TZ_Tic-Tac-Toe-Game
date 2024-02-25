import {Component} from "react";
import {Board} from "../board";
import {observer} from "mobx-react";
import {Chat} from "../chat";
import TicTacToeState from "../../store/tikTacToeStore";
import IconChat from "../asets/svg/IconChat.svg";
import type {GameStatus, Player} from "../../store/type";

import styles from './styles.module.scss';

interface Props {
  user: Player
}

interface State {
  chatActive: boolean
}

@observer
export class UserGameWrap extends Component<Props, State> {
  state: State = {
    chatActive: false
  }

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

    if (gameStatus === 'ended' || gameStatus === 'draw') {
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
        <button
          className={styles.chatBurger}
          onClick={() => this.setState({chatActive: !this.state.chatActive})}
        >
          <img src={IconChat} alt="Chat burger"/>
        </button>
        <Chat user={this.props.user} chatActive={this.state.chatActive}/>
      </div>
    );
  }
}