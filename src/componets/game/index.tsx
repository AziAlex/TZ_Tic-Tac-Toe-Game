import {Component} from "react";

import {Header, UserGameWrap} from "../index";

import styles from "./style.module.scss";

export class Game extends Component {
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