import {Component} from "react";
import {observer} from "mobx-react";
import TicTacToeState from "../../store/tikTacToeStore";
import {Player} from "../../store/type";

import styles from "./styles.module.scss";
import clsx from "clsx";
import {getWinLineType} from "../lib/utils";

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
    const {winConditions} = state

    return (
      <ul className={clsx(styles.board, winConditions && styles[getWinLineType(winConditions)])}>
        {state.moves.map((move, index) => (
          <li
            key={index}
            className={styles.cell}
            data-player={move && `player-${move}`}
            onClick={() => this.props.user === state.turn && makeMove(index)}
          >
          </li>
        ))}
      </ul>
    );
  }
}