import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      PLAYER_ONE: "1",
      PLAYER_TWO: "2",
      PLAYER_ONE_SYMBOL: "X",
      PLAYER_TWO_SYMBOL: "O",
      currentTurn: "X",
      board: [
        "","","","","","","","",""
      ],
      winner: null,
      begin: false,
      timeCounter: 10,
      timeout: false,
    }
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }

  clickCell(index) {
    if(this.state.board[index] === "" && !this.state.winner) {
      this.state.board[index] = this.state.currentTurn;
      this.state.timeCounter = 10;
      this.setState({
        currentTurn: this.state.currentTurn === this.state.PLAYER_ONE_SYMBOL ? this.state.PLAYER_TWO_SYMBOL : this.state.PLAYER_ONE_SYMBOL,
        winner: this.checkForWinner(),
      })
    }
  }

  checkForWinner() {
    var currentTurn = this.state.currentTurn;
    var symbols = this.state.board;
    var winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    var result = winningCombos.find(function(combo){
      if(symbols[combo[0]] !== "" && symbols[combo[1]] !== ""  && symbols[combo[2]] !== ""  && symbols[combo[0]] === symbols[combo[1]] && symbols[combo[1]] === symbols[combo[2]]) {
        return currentTurn;
      } else {
        return false
      }
    })
    if(result == undefined){
      return false;
    }else{
        result = this.state.board[result[0]] === 'X' ? this.state.PLAYER_ONE : this.state.PLAYER_TWO;
        this.state.begin = false;
        this.gameover();
        return result;
    }
  }
  gamebegin() {
    this.timer = setInterval(function() {
      var time = this.state.timeCounter;
      time -= 1;
      if(time < 0.5) {
        if(this.state.currentTurn === 'X'){
          this.setState({
            winner: this.state.PLAYER_TWO,
          })
        }else{
          this.setState({
            winner: this.state.PLAYER_ONE,
          })
        }
        this.setState({
          timeout: true,
          begin: false,
        })
        this.gameover();
      }
      this.setState({
        timeCounter: time
      });
    }.bind(this), 1000);
  }
  gameover() {
    clearInterval(this.timer);
  }
  clickBtn() {
    this.setState({
      board: [
        "","","","","","","","",""
      ],
      currentTurn: "X",
      winner: null,
      begin: true,
    })
    this.gamebegin();
  }

  handleChange1(event) {
    this.state.PLAYER_ONE = event.target.value;
  }
  handleChange2(event) {
    this.state.PLAYER_TWO = event.target.value;
  }
  render() {
    return (
      <div className="app-container">
        <div className="title">
          <h1>Tic-Tac-Toe</h1>
        </div>
        <div className="game-board">
        <div className="board">
        {this.state.board.map((cell, index) => {
          return <div onClick={() => this.clickCell(index)} className="square">{cell}</div>;
        })}
        </div>

        <div className="panel">
        <h2>{`NEW GAME`}</h2>
          <div className="clock">
            {`Please place your symbol within timeout:  `}
          </div>
          <div className="counter">
            {`${this.state.timeCounter}`}
          </div>
          <div className="game-panel">

          {this.state.winner ? <h2>{`The winner is  ${this.state.winner}!`}</h2> : null}
          <div>
          {this.state.begin ?
            <div>
              <h2>{`Player1: ${this.state.PLAYER_ONE} `}</h2>
              <h2>{`Player1: ${this.state.PLAYER_TWO} `}</h2>
            </div> :

            <div>
            <h2>{`Player1: `}<span><input type="text" onChange={this.handleChange1} /></span></h2>
            <h2>{`Player2: `}<span><input type="text" onChange={this.handleChange2} /></span></h2>
            <br />
            <input id="btn" type="button" value="START" onClick={() => this.clickBtn()} />
            </div>
          }
          </div>
          </div>
        </div>

        </div>
      </div>
    );
  }
}

export default App;
