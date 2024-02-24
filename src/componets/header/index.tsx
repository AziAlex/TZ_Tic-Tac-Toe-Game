import {observer} from "mobx-react";
import {Component} from "react";
import styles from './styles.module.scss';

@observer
export class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <h3 className={styles.player}>Player 1</h3>
        <div className={styles.scoreContainer}>
          <h2 className={styles.score}>Score: <span>0</span>:<span>0</span></h2>
          <button className={styles.resetButton}>Reset</button>
        </div>
        <h3 className={styles.player}>Player 2</h3>
      </div>
    );
  }
}
