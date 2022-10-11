/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    let revealedCount = 0;

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum);
        setBoard(newBoard.board);
        setMineLocations(newBoard.mineLocations);
        setNonMineCount(boardSize * boardSize - mineNum);
        setRemainFlagNum(mineNum);
        revealedCount = 0;
    }

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {

        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;

        // revealed, cannot add flag
        if(board[x][y].revealed){
            return;

        // can add flag, add flag
        }else if(!board[x][y].flagged && remainFlagNum > 0){
          
            const updatedBoard = board.slice();
            updatedBoard[x][y].flagged = true;
            setBoard(updatedBoard);
            setRemainFlagNum(remainFlagNum => remainFlagNum - 1);

            // check if win
            if(remainFlagNum === 1){
                for(let idX=0; idX<boardSize; idX++){
                    for(let idY=0; idY<boardSize; idY++){
                        if(board[idX][idY].flagged && board[idX][idY].value !== '💣'){
                            return;
                        }
                    }
                }
                setWin(true);
            }
        
        // flagged, remove flag
        }else if(board[x][y].flagged){
            const updatedBoard = board.slice();
            updatedBoard[x][y].flagged = false;
            setBoard(updatedBoard);
            setRemainFlagNum(remainFlagNum + 1);
        }

    };

    const revealCell = (x, y) => {
    
        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let newBoard = JSON.parse(JSON.stringify(board));

        // is mine, gameover
        if(board[x][y].value === '💣'){
        
            setGameOver(true);

            const updatedBoard = board.slice();
            for(let idX=0; idX<boardSize; idX++){
                for(let idY=0; idY<boardSize; idY++){
                    updatedBoard[idX][idY].revealed = true;
                }
            }
            setBoard(updatedBoard);
        
        // not mine, reveal
        }else if(board[x][y].revealed === false){

            const updatedBoard = board.slice();
            updatedBoard[x][y].revealed = true;
            setBoard(updatedBoard);

            revealedCount += 1;
            if(revealedCount === setNonMineCount){
                setWin(true);
                return;
            }

            if(board[x][y].value === 0){
                if(x-1 >= 0 && board[x-1][y].revealed === false && board[x-1][y].value !== '💣'){
                    revealCell(x-1,y);
                }
                if(x+1 < boardSize && board[x+1][y].revealed === false && board[x+1][y].value !== '💣'){
                    revealCell(x+1,y);
                }
                if(y-1 >= 0 && board[x][y-1].revealed === false && board[x][y-1].value !== '💣'){
                    revealCell(x,y-1);
                }
                if(y+1 < boardSize && board[x][y+1].revealed === false && board[x][y+1].value !== '💣'){
                    revealCell(x,y+1);
                }
            }
        }
    
    };

    const cellRender = board.map((row,x) => (
        <div id={'row'+x} style={{display:'flex'}}>
        {row.map( (val,y) => (
            <Cell rowIdx={x} colIdx={y} detail={board[x][y]} 
            updateFlag={updateFlag} revealCell={revealCell}/>
        ))}
        </div>
    ));
    
    return (
        <div className='boardPage' >
            <div className='boardWrapper' >
                <div className="boardContainer">
                    <Dashboard remainFlagNum={remainFlagNum}
                    gameOver={gameOver||win}/>
                    {cellRender}
                </div>
                {(gameOver || win) ? <Modal restartGame={restartGame} backToHome={backToHome} win={win}/> : null}
                
            </div>
        </div>
    );



}

export default Board