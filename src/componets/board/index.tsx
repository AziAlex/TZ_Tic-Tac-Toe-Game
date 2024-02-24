import {Component} from "react";
import {observer} from "mobx-react";
import TicTacToeState from "../../store/tikTacToeStore";
import styles from "./styles.module.scss";
import clsx from "clsx";
import {Player} from "../../store/type";

interface Props {
  user: Player
}

@observer
export class Board extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {state, makeMove} = TicTacToeState;

    return (
      <ul className={styles.board}>
        {state.moves.map((move, index) => (
          <li
            key={index}
            className={clsx(styles.cell)}
            data-player={move && `player-${move}`}
            onClick={() => this.props.user === state.turn && makeMove(index)}
          >
          </li>
        ))}
      </ul>
    );
  }
}