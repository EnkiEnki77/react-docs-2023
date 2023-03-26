import { useState } from "react";
import Square from "./Square";

export default function Board({squares, xIsNext, onPlay}) {
  var status;
  var winnerLine;
  var rowsAndSquares = [squares.slice(0, 3), squares.slice(3, 6), squares.slice(6, 9)]

  {let winner = calculateWinner(squares)

    if(winner != null){
      status = `Winner: ${winner[0]}`
      winnerLine = winner[1]
    }else{
      status = `Next player: ${xIsNext ? 'X' : 'O'}`
    }
  }

  function handleClick(i){
   
    var moveRowCol;
    if(i == 0){
      moveRowCol = [1,1]
  }else if(i == 1){
      moveRowCol = [1,2]
  }else if(i == 2){
      moveRowCol = [1,3]
  }else if(i == 3){
      moveRowCol = [2,1]
  }else if(i == 4){
      moveRowCol = [2,2]
  }else if(i == 5){
      moveRowCol = [2,3]
  }else if(i == 6){
      moveRowCol = [3,1]
  }else if(i == 7){
      moveRowCol = [3,2]
  }else{
      moveRowCol = [3,3]
  }
    
    var nextSquares = squares.slice()
    
    if (squares[i][0] != null || calculateWinner(squares)) {
      return;
    }
    if(xIsNext === true){
      
      nextSquares[i] = ['X', moveRowCol]
    }else{
      
      nextSquares[i] = ['O', moveRowCol]
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

      
      
      if (squares[a][0] && squares[a][0] === squares[b][0] && squares[a][0] === squares[c][0]) {
        return [squares[a][0], lines[i]];
      }
    }
    
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
                  return <Square winner={winnerLine && winnerLine.includes(index) ? true : false} key={index} value={square[0]} onSquareClick={() => handleClick(index)} />
                })
              }
            </div>
          )
        })
      }
    </>
  );
}