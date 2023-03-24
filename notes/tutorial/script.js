//When building and running the most simple of react apps there are a few steps you must takes.

//1. npm i react react-dom react-scripts

//2. create a src folder and put an index.js file in it. In the file put the following code:

import { useState } from 'react'
import {createRoot} from 'react-dom/client'
import Square from '../notes/tutorial/Square'

//The DOM container reactDOM will utilize to render the component tree into the DOM
let container = document.getElementById('root')

//createRoot takes the container above and sets it as the root container 
let root = createRoot(container)

//calls render on the root, and passes in the main parent component of the app. render renders whatever is passed to it
//Into the root container
root.render(
    <Square/>
)

//In order to grab the container that will be utilized in createRoot, we need an html file, and that file has to be placed
//in a public folder. The convention is for this container to have an id of root. 

//In order to run the app you need to run react-scripts start. You can turn this into a script in the package.json.

// "scripts": {
//     "start": "react-scripts start"
//   },

//Now you just do npm start.

//lastly, you need to define the primary entry point of the program by adding main to package.json and setting it index.js

// "main": "./index.js",

//All components need to be in the src folder to be rendered. 



//Components are used to render, manage, and update the UI elements in your app.

//ReactDom is reacts library for talking to the DOM.



//React components cannot return multiple adjacent jsx elements, they need a singular parent wrapper, you can use 
//a fragment <> </> if you would not like to pollute the DOM with a div.

export default function Square() {
    return (
      <>
        <button className="square">X</button>
        <button className="square">X</button>
      </>
    );
  }


  
  //If you are getting to a place where code is getting duplicated and messy, and requires the same logic over and over
  // than you may want to extract it into a component

  export default function Board() {
    return (
      <>
        <div className="board-row">
          <button className="square">1</button>
          <button className="square">2</button>
          <button className="square">3</button>
        </div>
        <div className="board-row">
          <button className="square">4</button>
          <button className="square">5</button>
          <button className="square">6</button>
        </div>
        <div className="board-row">
          <button className="square">7</button>
          <button className="square">8</button>
          <button className="square">9</button>
        </div>
      </>
    );
  }

  export default function Board() {
    return (
      <>
        <div className="board-row">
          <Square/>
          <Square/>
          <Square/>
        </div>
        <div className="board-row">
          <Square/>
          <Square/>
          <Square/>
        </div>
        <div className="board-row">
          <Square/>
          <Square/>
          <Square/>
        </div>
      </>
    );
  }



  //State is a react components way of remembering things 

function Square() {
  const [value, setValue] = useState()

  function handleClick(){
    setValue('X')
  }

  return (
    <button onClick={handleClick} className='square'>{value}</button>
  )
}

//By calling this set function from the onClick event handler youre telling reeact to rerender the Square component
//whenever <button/> is clicked. After the update the state value is 'x' so you see x on the screen. 

//Each Square has its own private state, the value variable of each instance is completely independent from the others.
//When you call a set function in a component React automatically rerenders the children of that compoennt too.



//Get in the habit of using React dev tools more. They allow you to see the props and state of a component. 



//If you need to collect the state data of all of a components children, or have two sibling components communicate with
//eachother, you should lift the state of the children up to the parent, and pass the state along with the handler '
//function down to the children as props.

//For collecting the data of multiple children, you should use an array for the parent state.

import Square from "./Square";

export default function Board() {
  //Array() is a constructor, passing it a number determines the length of the constructed array.
  //fill is an array method that populates each indice of the array with a given value.
  //The useState call around it gives acces to a squares variable that uses this array as its initial value.
  //setSquares is a setter function that allows us to update the value of squares.
  const [squares, setSquares] = useState(Array(9).fill(null))
  return (
    <>
      <div className="board-row">
        <Square value={1}/>
        <Square value={2}/>
        <Square value={3}/>
      </div>
      <div className="board-row">
        <Square value={4}/>
        <Square value={5}/>
        <Square value={6}/>
      </div>
      <div className="board-row">
        <Square value={7}/>
        <Square value={8}/>
        <Square value={9}/>
      </div>
    </>
  );
}

//Now the Board component needs to pass the null value of the squares array to each Square component it corresponds to.

export default function Board() {
  //Array() is a constructor, passing it a number determines the length of the constructed array.
  //fill is an array method that populates each indice of the array with a given value.
  //The useState call around it gives acces to a squares variable that uses this array as its initial value.
  //setSquares is a setter function that allows us to update the value of squares.
  const [squares, setSquares] = useState(Array(9).fill(null))
  return (
    <>
      <div className="board-row">
        <Square value={squares[0]}/>
        <Square value={squares[1]}/>
        <Square value={squares[2]}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]}/>
        <Square value={squares[4]}/>
        <Square value={squares[5]}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]}/>
        <Square value={squares[7]}/>
        <Square value={squares[8]}/>
      </div>
    </>
  );
}

//Now we have to remove the local state of the Square component, and set it up to take in the value passed to it by
//Board.

function Square({value}) {
  return <button className="square">{value}</button>;
}

//Now we need to update Square to be able to change its corresponding state in Board. State is private to the componnet
//its born, so we cant directly change Board's state from Square. Instead we'll create a function in Board that changes
//its state, and pass that function down to Square to be used as a click handler. 

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick() {
    //We create a copy of the squares array using slice.
    const nextSquares = squares.slice();
    //Change the first index to 'x'
    nextSquares[0] = "X";
    //Update the state with the new copy of the array. Calling the setter function triggers a rerender of the component
    //that owns the state, along with all of its children. 
    setSquares(nextSquares);
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={handleClick} />
      </div>
    </>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

//When you pass the handleClick function to Square, it still has access to all the state info of Board because of closure

//Now we can add an x to the board, but only the upper left square, because handleClick is hard coded.

//We need to update the handleClick function to take in a param that tells Board which Square was clicked. This will 
//allow us to update any square.

function handleClick(i) {
  const nextSquares = squares.slice();
  nextSquares[i] = "X";
  setSquares(nextSquares);
}

//You could try telling handleClick which square its being passed to directly in the Board JSX like this

<Square value={squares[0]} onSquareClick={handleClick(0)} />

//This wont work though, because when you put parens on function you call it, and since its being passed as the value
//of a prop that function call is apart of the render process of the component. So every time the component renders
//it calls handleClick, but handleClick calls setSquares which rerenders Board, creating an infinite loop. This is why
//you dont want to put parens on functions you pass as props. 

//Instead, pass an anonymous function that calls handleClick. This will fix the infinite loop problem, because the 
//anonymous function is not being called

(<Square value={squares[0]} onSquareClick={() => handleClick(0)} />)

//Now we can update the Square components for Board to each take in a handleClick call that knows which Square it corresponsds
//to 

return (
  <>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
    </div>
  </>
);

//Now you can once again add a x to any square, but all of the state for the squares is handled in Board.

//The parent board component passes props down to all of its children Square componnets, these props are an individual
//state value the Square component utilizes in its markup, and a click handler function used to ask board to update 
//the value of the state passed to the Square. When the Square is clicked it calls that handler function in Board.
//The handler function calls the state set function, which rerenders Board, because Board rerenders, so does all of its
//Square children. All passed the new value the state was updated to. 

//In React its conventional to use onSomething for props that represent events, and handleSomething for the functions
//that handle those events. 



// ### Why immutability is important

//In handleClick we create a copy of the squares array, and update that before passing that to the setter function.
//This is to maintain immutability of the state. The setter function should be the only thing updating the state.
//You should never directly update it yourself.

function handleClick() {
  const nextSquares = squares.slice();
  nextSquares[0] = "X"; 
  setSquares(nextSquares);
}

//There are generally two approaches to changing data. The first is to mutate the data by directly changing the data's
//value. The second is to replace the data with a new copy which has the desired changes. 

//mutation:
const squares = [null, null, null, null, null, null, null, null, null];
squares[0] = 'X';
// Now `squares` is ["X", null, null, null, null, null, null, null, null];

//Changing data without mutation:
const squares = [null, null, null, null, null, null, null, null, null];
const nextSquares = ['X', null, null, null, null, null, null, null, null];
// Now `squares` is unchanged, but `nextSquares` first element is 'X' rather than `null`

//The result is exactly the same, but by not mutating the initial data you gain some benefits.

//It makes complex features such as undo/redo much easier to implement. Not directly mutating state allows you to retain 
//access to previous state, and reuse it later. 

//There's also another benefit, by default all child components rerender when the state of their parent changes, even
//if the child's state didnt change at all. In some cases you may want to avoid rerendering parts of the component tree
//that obviously werent affected by the state change. Keeping state immutable makes it very cheap to compare current state
//with previous state to see what components actually need to be rerendered. 



// ### Taking turns

//We now need to determine who's turn it is and mark the board accordingly. To do this, the Board needs another piece of 
//state.

function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  // ...
}

//Each time a move is made (the squares state is updated) the xIsNext state will be flipped, determining who's turn it is
//To achieve this, update the handleClick function to also update xIsNext. The value squares is set to will depend on
//what the value of xIsNext is at the time handleClick is called. 

function handleClick(i){
  var nextSquares = squares.slice()

  if(xIsNext === true){
    nextSquares[i] = 'X'
  }else{
    nextSquares[i] = 'O'
  }

  setSquares(nextSquares)
  setXIsNext(!xIsNext)
}

//Now clicks on the squares alternate between x and o, but there's an issue. You can override a previous move by clicking
//the square again. 

//To fix this, check if the square has already been filled, and return from handleClick early if it has. 

function handleClick(i){
  var nextSquares = squares.slice()

  if(squares[i] == null){
    return
  }
  if(xIsNext === true){
    nextSquares[i] = 'X'
  }else{
    nextSquares[i] = 'O'
  }

  setSquares(nextSquares)
  setXIsNext(!xIsNext)
}



// ### Declaring a winner

//Now we need to determine the winner, to do this create a helper function that takes in the squares state, and
//returns either x, o, or null every time board renders. 

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
    //destructures current line to be able to grab individual spaces.
    const [a, b, c] = lines[i];
    //checks if squares has anything in first square of line, and then checks if first space of line are equal to 2nd
    //and 3rd square of line. If they are than returns value in square 
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  //If no winning line was found returns null
  return null;
}

//Just like if a square is already filled, we want to return early if a player has won

function handleClick(i) {
  if (squares[i] || calculateWinner(squares)) {
    return;
  }
  const nextSquares = squares.slice();
  //...
}

//To determine winner we need a status section.

var status;

{
  let winner = calculateWinner(squares)

  if(winner === true){
    status = `Winner: ${winner}`
  }else{
    status = `Next player: ${xIsNext ? 'X' : 'O'}`
  }
}



// ###Adding time travel

//If you mutated the squares array state time travel capability would be difficult to implement. But since we created
//copies of the state with slice and treated the original as immutable, we can save each iteration of the state, and use
//those. 

//To do this we'll make another state, and call it history. We'll use this state to store all the iterations
//of the squares state. So it will be an of array's that all have 9 indexes. We'll also lift up the xIsNext state
//from Board.

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
}
 
//To render the squares for the current move youll want to grab the last squares array from the history. You
//dont need to state for this, theres already enough info to grab it during rendering. 

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];
  // ...
}

//Next we'll create a handlePlay function which will be called from the Board component to update the game. Pass
//thaat function as well as the XIsNext and currentSquares variables to Board

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    // TODO
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
    </div>
  )
}

//Now we need to update Board to utilize its props

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    //...
  }
  // ...
}

//First delete the state from Board, and replace the calls to set those state in handleClick with a single call to 
//onPlay

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }
  //...
}

//Now the board componnet is fully controlled by the props passed to it, but you have to configure handlePlay to get 
//the game working again.

//What do you do in handlePlay? Well Board used to call setSquares with an updated array. Now it passes that array to 
//onPlay. We want to maintain all arrays passed to onPlay by board in the history state, so we can start by setting
//history to a new array that contains the new array passed from Board as well as all the old ones from history.
//Appending the new array to history like this will allow the Game component to rerender, rerendering Board, etc. 
//We also want handlePlay to toggle xIsNext, just like Board used to do.

export default function Game() {
  //...
  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }
  //...
}

//At this point the game should be working just as it was before



// ###Showing the past moves

//React elements like <button/> are really just basic js objects. You can pass them around in your application in 
//any way a typical object could. So to render multiple items in react you can use an array of react elements.

//We already have a history array, so to transform that array into an array of react elements that utilize that data
//we use array.map.

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    // TODO
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}



// ###Picking a key

//When you render a list react stores some info about each rendered list item. When you update a list react needs to know
//what has changed, did you add, remove, reorder, or update the items? 

//React is a computer and wont know whether a list item was intended to be a completely new item or an old one that was
//just reordered/updated. So to differentiate between siblings each list item needs a unique key. Do not use index as the
//key though, this is not necessarily static it will change if items are reordered.

//When a list is rerendered react takes each list item's key and searches the previous list's items for that key. If its
//a new key react creates a new component, if its no longer there react destroys the component. If a matching key is found
//the component is moved or stays in place. 

//Keys tell react about the identity of each component allowing react to maintain state between rerenders. If a components
//key changes the component will be destroyed and rerendered with a new state, thats why you shouldnt use indexes. 

//key is a special and reserved property in React. When an element is created, react extracts the key property and stores
//it directly on the returned object. Even though key may look its used as props, React automatically uses key to decide
//which components to update. Theres no way to access key as a prop. 

//Its recommended you utilize the data your list of elements is created from for the keys, an id for example. 

//Keys do not need to be globally unique, they only need to be unique



// ###Implementing time travel

//In the games history each past move has a unique item associated with it, its the sequential number of the move.
//Moves will never be reordered, deleted, or inserted, so its safe to use the move index as the key.

const moves = history.map((squares, move) => {
  //...
  return (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>{description}</button>
    </li>
  );
});

//To keep track of what move the player is currently viewing Game needs another state variable.

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[history.length - 1];
  //...
}

//Next we need to create the jumpTo function and use it to change the currentMove state, it should also change 
//xIsNext based on if the number passed to jumpTo is even. 

export default function Game() {
  // ...
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }
  //...
}



// ###Cleanup

//If you pay attention, xIsNext is always true when currentMove is even and false when its odd, this means you can use
//currentMove to control the value of xIsNext.

//This means you dont need xIsNext to be state, and you should always avoid redundant state. It causes more bugs in your
//code.




















