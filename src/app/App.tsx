import React from 'react';

import {Game} from "../componets";

import './styles/index.scss';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Game/>
      </div>
    );
  }
}

export default App;