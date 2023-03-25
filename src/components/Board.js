import { useState } from "react";
import Square from "./Square";

export default function Board({squares, xIsNext, onPlay}) {
  var status;
  var rowsAndSquares = [squares.slice(0, 3), squares.slice(3, 6), squares.slice(6, 9)]

  {let winner = calculateWinner(squares)

    if(winner != null){
      status = `Winner: ${winner}`
    }else{
      status = `Next player: ${xIsNext ? 'X' : 'O'}`
    }
  }

  function handleClick(i){
    var nextSquares = squares.slice()
    
    if (squares[i] != null || calculateWinner(squares)) {
      return;
    }
    if(xIsNext === true){
      nextSquares[i] = 'X'
    }else{
      nextSquares[i] = 'O'
    }
  
    onPlay(nextSquares)
  }

  function calculateWinner(squares) {
    //all possible winning lines
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    //loops through array of lines
    for (let i = 0; i < lines.length; i++) {
      var [a, b, c] = lines[i];
      
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
 
  return (
    <>
      <div>{status}</div>
      {
        rowsAndSquares.map((row, i, arr) => {
          return (
            <div key={i} className="board-row">
              {row.map((square, j, arr) => {
                  let index = i === 2 ? j + 6 : i === 1 ? j + 3 : j
                  return <Square key={index} value={square} onSquareClick={() => handleClick(index)} />
                })
              }
            </div>
          )
        })
      }
    </>
  );
}