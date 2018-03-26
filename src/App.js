import React, { Component } from 'react';
import ChessBoard from './components/ChessBoard';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__title">Chess</h1>
        </header>
        <main className="App__main-content">
          <ChessBoard />
        </main>
      </div>
    );
  }
}

export default App;
