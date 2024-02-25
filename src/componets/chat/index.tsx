import {Component, createRef, RefObject} from "react";
import {observer} from "mobx-react";

import {Player} from "../../store/type";
import TicTacToeState from "../../store/tikTacToeStore";
import {formatDate} from "../lib/utils";
import IconSend from "../asets/svg/IconSend.svg";
import clsx from "clsx";

import styles from "./styles.module.scss"

interface Props {
  user: Player
  chatActive: boolean
}

interface State {
  message: string
}

@observer
export class Chat extends Component<Props, State> {
  state: State = {message: ""}
  private chatListRef: RefObject<HTMLUListElement>;

  constructor(props: Props) {
    super(props);
    this.chatListRef = createRef();
  }

  onSendMessage = () => {
    if (!this.state.message) return
    TicTacToeState.sendMessage(this.state.message, this.props.user)
    this.setState({message: ""})
  }

  componentDidUpdate() {
    if (TicTacToeState.state.messages.length && !this.state.message) {
      // Получаем последний элемент списка сообщений (новое сообщение)
      const lastMessage = this.chatListRef.current?.lastElementChild;
      // Прокручиваем скролл к последнему сообщению
      lastMessage?.scrollIntoView({behavior: 'smooth'});
    }
  }

  render() {
    const {state} = TicTacToeState

    return (
      <div className={clsx(styles.chatWrapper, {[styles.chatWrapperActive]: this.props.chatActive})}>
        <header className={styles.header}>
          <div className={styles.avatar}>
            <div data-player={`player-${this.props.user === "x" ? "x" : "o"}`}></div>
          </div>
          <span>Player {this.props.user === "x" ? "1" : "2"}</span>
        </header>
        <div className={styles.chat}>
          <ul className={styles.chatList} ref={this.chatListRef}>
            {state.messages.map((message, index) => (
              <li
                className={clsx(styles.message, styles[`player-${this.props.user === message.player ? "x" : "o"}`])}
                key={index}
              >
                <p>{message.message}</p>
                <span className={styles.time}>{formatDate(message.date)}</span>
              </li>
            ))}
          </ul>
          <form onSubmit={e => e.preventDefault()} className={styles.inputForm}>
            <input
              className={styles.input}
              value={this.state.message}
              placeholder="Enter your message"
              onChange={(e) => this.setState({message: e.target.value})}
            />
            <button
              className={styles.sendButton}
              onClick={this.onSendMessage}
            >
              <img src={IconSend} alt="send"/>
            </button>
          </form>
        </div>
      </div>
    );
  }
}
