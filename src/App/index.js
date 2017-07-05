import React, { Component } from 'react';
import cN from 'classnames';
import TicTacToe from '../TicTacToe';
import * as ai from '../ai';
import './style.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      tempname: '',
      username: ''
    };
  }

  changeName(tempname) {
    this.setState({ tempname });
  }

  setUsername(event) {
    event.preventDefault();
    this.setState((prevState) => ({ username: prevState.tempname }));
  }

  render() {
    const { username, tempname } = this.state;
    return (
      <div className={cN('app-wrapper', {'app-wrapper_logged-in': username})}>
        { username
          ? <TicTacToe ai={ai} username={username} />
          : <Login 
              setUsername={(event) => this.setUsername(event)} 
              changeName={(event) => this.changeName(event)} 
              tempname={tempname} />
        }
      </div>
    );
  }
}

const Login = ({ setUsername, changeName, tempname }) => {
  const buttonDisabled = !tempname;
  return (
    <form className="app-form" onSubmit={(event) => setUsername(event) }>
      <input type="text"
        className="input-join"
        placeholder="Enter a name"
        value={tempname}
        onChange={(event) => changeName(event.target.value)} />
      <button className="button" disabled={buttonDisabled}>Start Playing</button>
    </form>
  )
}