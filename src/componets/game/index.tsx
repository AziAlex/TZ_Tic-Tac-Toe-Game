import {Component} from "react";
import {Header} from "../header";
import {UserGameWrap} from "../user-game-wrap";
import styles from "./style.module.scss";

class Game extends Component {
  render() {
    return (
      <>
        <Header/>
        <div className={styles.game}>
          <UserGameWrap user='x'/>
          <UserGameWrap user='o'/>
        </div>
      </>
    );
  }
}

export default Game;