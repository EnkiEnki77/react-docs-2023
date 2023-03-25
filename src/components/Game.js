import React, { useState } from 'react'
import Board from './Board'

function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [descending, setDescending] = useState(false);
    const currentSquares = history[currentMove];
    var xIsNext = currentMove % 2 === 0;
    var moves = history.map((squares, move, arr) => {
        var description;
        var listItem;
        if(move === currentMove){
            description = `You are at move #${move}`
        }
        else if(move > 0){
            description = `Go to move #${move}`
        }else {
            description = `Go to beginning of game`
        }
        
        
        return (
            <li key={move}>
                {move === currentMove ? 
                 <p>{description}</p> :
                 <button onClick={() => jumpTo(move)}>{description}</button>
                }
            </li>
        )
    })

    var movesReversed = history.map((squares, move, arr) => {
        var description;
        var listItem;
        if(move === currentMove){
            description = `You are at move #${move}`
        }
        else if(move > 0){
            description = `Go to move #${move}`
        }else {
            description = `Go to beginning of game`
        }
        
        
        return (
            <li key={move}>
                {move === currentMove ? 
                 <p>{description}</p> :
                 <button onClick={() => jumpTo(move)}>{description}</button>
                }
            </li>
        )
    }).reverse()

    function handlePlay(nextSquares) {
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
    
    
    console.log(movesReversed, moves)
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