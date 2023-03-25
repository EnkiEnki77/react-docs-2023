import React, { useState } from 'react'

function Square({value, onSquareClick, winner}) {

  console.log(winner)

  return (
    <button style={{color: winner ? 'blue' : 'black' }} onClick={onSquareClick} className='square'>{value}</button>
  )
}

export default Square