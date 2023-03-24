import { useState } from "react";
import Square from "./Square";

export default function Board({squares, xIsNext, onPlay}) {
  var status;

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
      
      <div className="board-row">
        {squares.slice(0, 3).map((square, i, arr) => {
            console.log(i)
            return <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
          })
        }
      </div>
      <div className="board-row">
        {squares.slice(3, 6).map((square, i, arr) => {
          console.log(i + 3)
            return <Square key={i + 3} value={square} onSquareClick={() => handleClick(i + 3)} />
          })
        }
      </div>
      <div className="board-row">
        {squares.slice(6, 9).map((square, i, arr) => {
          console.log(i + 6)
            return <Square key={i + 6} value={square} onSquareClick={() => handleClick(i + 6)} />
          })
        }
      </div>
    </>
  );
}