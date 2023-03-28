//Setting state queues a render, but the state isnt actually updated until after the render. Sometimes though youd like
//to update state multiple times in one render. SO you should understand how React batches state updates.

//You might expect clicking the button would increment number 3 times, since setNumber is called 3 times

import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}

//However each render's state value's are fixed, no matter how many times you call the setter function.

//But there is one other factor at play. React waits until all code in the event handlers has finished before processing
//your state updates. This is why the rerender only happens after all three setNumber calls. 

//This is like a waiter who doesnt run off to the kitchen after you tell them your first dish. They wait to hear your 
//whole order, any changes, and even take orders from others at the table.

//This lets update multiple state variables, even from multiple components without causing too many rerenders. But this 
//also means your UI wont update until the event handler and all its code have completed. This behaviour, known as batching
// (Because your batching multiple state updates into just one big update) makes your app run much faster. It also helps
//avoid weird half finished renders. 

//React does not batch across multiple intentional events, such as a click. It only batches when its safe to do so. Such
//as all from one event driven render.



//If you would like to update a state multiple times in a single render you can pass a callback to the setter function
//that calculates the next state based on the previous state in the queue. setNumber(prev => prev + 1)

//It is a way to tell React "Do something with the state value, instead of just replacing it."

//This button acutally does increment by 3

import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}

//prev => prev + 1 is called an updater function.

//React queues this function to be run after all the handler code
//During the next render, React goes through the queue and gives you the final updated state.

//setNumber(n => n + 1): n => n + 1 is a function. React adds it to a queue.
// setNumber(n => n + 1): n => n + 1 is a function. React adds it to a queue.
// setNumber(n => n + 1): n => n + 1 is a function. React adds it to a queue.

//When you call useState on the next render React goes through the queue. It takes the state value from the previous
//render and passes it into the first updater, the value returned from that is then passed to the next updater, and so
//on. The value returned from the final updater in the queue is now the value stored as state and that value is given
//for the snapshot of this render. 

//If you update state after replacing it, it works the same as if you updated it twice.

<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
}}></button>

//When you dont pass an updater function to state, the state value is replaced with the expression you pass. 

//If you replace a state after you update it, the replaced value is the new value, because youre effectively reassigning

(<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
  setNumber(42);
}}></button>)

//Updater functions are called at rendering, so they must be pure, and only return the result. No side effects.

//In strict mode react will run each updater twice, but discard the second to help you find mistakes.

//convention for the updater function is to name its param with first letters of the state it corresponds to 
//or prevState.

