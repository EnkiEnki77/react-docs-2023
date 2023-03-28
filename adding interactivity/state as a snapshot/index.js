//State variables may look like regular variables you read and write to. However, state behaves more like a snapshot
//in time. Setting state doesnt reassign that variable it triggers a rerender, and initializes a new variable with 
//that value

//For an interface to react to a user event you have to first update the state.

//In the below example when you hit send, the event calls a setter function to update state, this setter function also 
//tells React to rerender the component.

import { useState } from 'react';

export default function Form() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('Hi!');
  if (isSent) {
    return <h1>Your message is on its way!</h1>
  }
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setIsSent(true);
      sendMessage(message);
    }}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

function sendMessage(message) {
  // ...
}

//What happens when the button is clicked

//1. The onSubmit event handler executes
//2. It calls setIsSent, which updates isSent to true, and queues React to rerender the component.
//3. React rerenders the components according to the new isSent value.
//4. React compares the UI of the previous render, and the UI of the new render. If they are different
//React updates the DOM in the most minimal way it can to match the new render.



//Rendering means that React is calling the function of your component, the JSX you return from that component is like 
//a snapshot of the UI in time. It's props, event handlers, and local variables were all calculated using its state at 
//the time of render.

//The UI snapshot you return is interactive. It returns logic like event handlers that specify what happens in response
//to user input. React updates the screen to match the snapshot, and hooks up the event handlers. As a result clicking 
//a button will trigger the click handler from your JSX.

//When React rerenders your component 

//1.React calls your component function again 
//2.The component returns a new snapshot
//3.React then updates the screen to match the snapshot youve returned.

//As a components memory state doesnt dissapear after a function returns like a normal variable. State lives in React
//itself, as if on a shelf. Outside of your function (This is why mutating state is considered impure, or a side effect)
//When React calls your component it gives it a snapshot of the state for that particular render.

//Your component returns a snapshot of the UI all with a fresh set of props and event handlers in its JSX all calculated
//using the state values from that render.

//You tell React to update the state
//React updates the state value
//React passes a snapshot of the state value into your component.

//I think when you call the setter function it updates the state right there and then, but the actual rerender is 
//queued for when the call stack is empty. This means the rest of the code to be run operates off of the snapshot of 
//the state that was given for that render. React only gives a new snapshot of the state when it calls the main component
//function. So internally React holds the new state value, but the state variable we have access to only holds the snap
//shot of the state for that render. 

//For example, in the code below, you would think clicking the button would increment the state to 3. But no.
//It increments it to 1 but 3 times.

import { useState } from 'react';

export default function Counter() {
    //number is a snapshot of the state that was given by React for this render.
    //This value only ever updates at the beginning of each render
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        //setNumber is called, it evaluates the expression 0 + 1, it assigns the state stored by React as being 1.
        //It then tells React to Queue up a rerender for when the call stack is empty. 
        setNumber(number + 1);
        //The setNumber above reassigned the number state in React, but the number variable we have access to is 
        //just a snapshot given by React at the beginning of each render. Since the rerender queued hasnt happended
        //yet number is still the snapshot given for this render. THis setNumber again assigns the state to 1
        setNumber(number + 1);
        //This setNumber does the same as above and assigns the state to 1.
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}

//Setting state only changes it for the next render. During the first render number is 0, so its still 0 
//even after setNumber(0 + 1) has been called.

//Even though this code will increment by 5 in one click the alert will show the number 0, because the rerenders
//triggered the setter function call are asynchronous.

import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        alert(number);
      }}>+5</button>
    </>
  )
}

//State variables will always evaluate to whatever value was passed by react for that render. SO you could look 
//at your code like this. 

setNumber(0 + 5);
alert(0);

//In this example the alert is made async through a setTimeout

import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          alert(number);
        }, 3000);
      }}>+5</button>
    </>
  )
}

//Even though alert doesnt end up being called until after the component rerenders number still ends being 0 in alert.
//This is because when the callback in setTimeout is returned from setTImeout and put on the callback queue it creates
//closure around its surrounding lexical scope environment. And at the time of that closure number was 0. 

//You could also look at it as the alert was scheduled with number assigned the value of 0.

//A state variables value never changes in a render, even if the event handlers code is asynchronous.

//This allows your event handlers to be less prone to timing mistakes, even if the state is changed before the async
//code runs it runs with the snapshot of state it was queued up with.





