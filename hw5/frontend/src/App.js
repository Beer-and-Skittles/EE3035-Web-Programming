// import logo from './logo.svg';
import './App.css';
import {start, guess, restart} from './axios'
import React, {useState} from 'react';

function App() {

  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');

  const startGame = () => {
    setHasStarted(true);
    start();
  }

  const restartGame = () => {
    setHasWon(false);
    setNumber('');
    setStatus('');
    restart();
  }

  const handleGuess = async () => {
    document.getElementById("inputBox").value = '';
    const response = await guess(number);
    setStatus(response);
    
    if(response === 'Equal'){
      setHasWon(true);
    }else{
      setNumber('');
    }
  }

  const handleInput = () => {
    let content = document.getElementById("inputBox").value;
    setNumber(content);
  }

  const startMenu = (
  <div>
    <button onClick={startGame}>start game</button>
  </div>
  );

  const gameMode = (
  <div>
    <p>Guess a number between 1 to 100</p>
    <input onChange={handleInput} id='inputBox'></input>
    <button onClick={handleGuess} disabled={!number}>guess!</button>
    <p>{status}</p>
  </div>
  );

  const winningMode = (
  <div>
    <p>you won! the number was {number}.</p>
    <button onClick={restartGame}>restart</button>
  </div>
  );


  return (
    <div className="App">
      {hasStarted ? (hasWon? winningMode:gameMode) : startMenu}
    </div>
  );
}

export default App;
