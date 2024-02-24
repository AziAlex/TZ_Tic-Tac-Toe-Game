import {Component} from "react";
import {observer} from "mobx-react";
import {Header} from "../header";

// @observer
class Game extends Component {

  render() {
    return (
      <div>
        <Header/>
      </div>
    );
  }
}

export default Game;