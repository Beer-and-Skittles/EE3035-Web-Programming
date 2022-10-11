/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useEffect, useState } from 'react';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */ }) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.
  const [localMN, setlocalMN] = useState(10);
  const [localBS, setlocalBS] = useState(8)

  useEffect(() => {

    if(localMN > localBS * localBS){
      setError(true);
    }else{
      setError(false);
      mineNumOnChange(localMN);
      boardSizeOnChange(localBS);
    }
  });
  
  const toggleShowPanel = () => {
    if(showPanel){
      setShowPanel(false);
    }else{
      setShowPanel(true);
    }
  }

  const updateMN = () => {
    setlocalMN(document.getElementById('mine_num').value);
  }

  const updateBS = () => {
    setlocalBS(document.getElementById('board_size').value);
  }

  const alertError = () => {
    alert('mine number should not exceed the square of board size!');
  }

  const controlNumStyle = {
    color: error ? '#880000' : '#0f0f4b',
  };

  const controlPanel = (
    <div className='controlWrapper'>
      <div className='error'></div>
      <div className='controlPane'>
        <div className='controlCol'>
          <p className='controlTitle'>Mines Number</p>
          <input type='range' id='mine_num' step='1' min='1' max='30' defaultValue='10' onInput={updateMN}></input>
          <p className='controlNum' style={controlNumStyle}>{localMN}</p>
        </div>
      </div>
      <div className='controlPane'>
        <div className='controlCol'>
          <p className='controlTitle'>Board Size (nxn)</p>
          <input type='range' id='board_size' step='1' min='2' max='15' defaultValue='8' onInput={updateBS}></input>
          <p className='controlNum' style={controlNumStyle}>{localBS}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
      <button className='btn' onClick={error ? alertError : startGameOnClick}>Start Game</button>
      <div className='controlConatinaer'>
        <button className='btn' onClick={toggleShowPanel}>Difficulty Adjustment</button>
        {showPanel ? controlPanel : null}
      </div>

    </div>
  );

}
export default HomePage;   