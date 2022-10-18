/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import Row from "./Row";
import './css/Board.css';
import React from "react";
import CurRow from "./CurRow";
// import  { useEffect, useState } from 'react';

// turn is 0
// guesses is Array of 6
// curGuess is empty char

const Board = ({ turn, guesses, curGuess }) => {

    // useEffect(() => {
    //     alert(typeof(guesses[0]));
    // },[]);

    const rowRender = guesses.map((guess, idx) => (
        (turn === idx) ?
        <CurRow id={idx} key={idx} rowIdx={idx} curGuess={curGuess}></CurRow>
        : <Row id={idx} key={idx} rowIdx={idx} guess={guess}></Row>
    ));

    return (
        <div className="Board-container">
            {/* TODO 2-2: show 6 rows (map function is recommended) and defined row's key.
                Hint: Use `CurRow` instead of `Row` when you are passing `curGuess` into it. */}
            {rowRender}
        </div>
    )
};
export default Board;
