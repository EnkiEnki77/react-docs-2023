import React, { useState } from 'react'
import Board from './Board'

function Game() {
    const [history, setHistory] = useState([Array(9).fill([null, [null, null]])]);
    const [currentMove, setCurrentMove] = useState(0);
    const [descending, setDescending] = useState(false);
    const [movePos, setMovePos] = useState([]);
    const currentSquares = history[currentMove];
    var xIsNext = currentMove % 2 === 0;
    var moveRowCol;
    
    var moves = history.map((squares, i, arr) => {
        var description;
        var prevSquares = arr[i - 1] 
        var newMove = squares.filter((square, j) => prevSquares != null && prevSquares[j][0] == null && square[0] != null)
        
        if(i === currentMove){
            description = `You are at move #${i}`
        }
        else if(i > 0){
            description = `Go to move #${i}`
        }else {
            description = `Go to beginning of game`
        }

        return (
            <li key={i} style={{display: 'flex', gap: '20px'}}>
                {i === currentMove ? 
                 <p>{description}</p> :
                 <button onClick={() => jumpTo(i)}>{description}</button>
                }
                {newMove[0] != null &&
                 <p>{`Row: ${newMove[0][1][0]} Column: ${newMove[0][1][1]}`}</p>
                }      
            </li>
        )
    })

    var movesReversed = history.map((squares, i, arr) => {
        var description;
        var prevSquares = arr[i - 1] 
        var newMove = squares.filter((square, j) => prevSquares != null && prevSquares[j][0] == null && square[0] != null)
       
        if(i === currentMove){
            description = `You are at move #${i}`
        }
        else if(i > 0){
            description = `Go to move #${i}`
        }else {
            description = `Go to beginning of game`
        }

        
        
        
        return (
            <li key={i}>
                {i === currentMove ? 
                 <p>{description}</p> :
                 <button onClick={() => jumpTo(i)}>{description}</button>
                }
                {newMove[0] != null &&
                 <p>{`Row: ${newMove[0][1][0]} Column: ${newMove[0][1][1]}`}</p>
                } 
            </li>
        )
    }).reverse()

    function handlePlay(nextSquares, ) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1)
     
        
      }

    function jumpTo(nextMove){
        setCurrentMove(nextMove)
    }

    function handleMoveOrder(){    
        setDescending(!descending)
    }

    return (
        <div className="game">
          <div className="game-board">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
          </div>
          <div className="game-info">
            <ol>{descending ? movesReversed : moves}</ol>
            <button onClick={handleMoveOrder}>Sort moves: {descending ? 'ascending':'descending'}</button>
          </div>
        </div>
      );
}

export default Game