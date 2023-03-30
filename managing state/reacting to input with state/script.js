//React uses a declarative way to describe the UI. Instead of manipulating the individual pieces directly
//You describe the different states that your component can be in. And switch between those states based on user input.

//Imagine imperative UI as being UI where you have to tell JS what to do every step of the way in every interaction.
//Like riding with someone and having to give them direections.
//The imperative approach becomes extremely complex as your app grows.

//React was built to solve this problem. In React you dont directly manipulate the DOM like in the imperative approach.
//Meaning you dont manually enable, disable, show or hide components directly. Instead, you declare what you want to 
//show, and React figures out how to update the UI. You dont actually do the updates to the UI yourself. Think of it 
//like getting in a taxi and telling them where you want to go, but not having to goive the directions yourself. 



//There are 5 steps to thinking about UI declaratively.

//1. Identify your components visual states.
//2. Determine what triggers those state changes.
//3. Represent the state in memory with useState.
//4. Remove any non essential state variables.
//5. Connect the event handlers to set the state.



//Step 1.
//In computer science you may hear about a state machine being in one of several states.
//If you work with a designer you may see mockups of different visual states. 
//React stands at the intersection of design and computer science. So both of these ideas are sources of inspiration.

//First you must visualize all the different states of the UI the user might see. 

//Empty: form has a disabled submit button.
//Typing: form has an enabled submit button.
//Submitting: form is completely disabled loading spinner shown.
//Success: "thankyou" message shown instead of form.
//Error: Same as typing state, but with an extra error message.

//Just like a designer you want to mock up the different states before you add logic. 

//Here is a mock for just the visual part of the form.

export default function Form({
    status = 'empty'
  }) {
    if (status === 'success') {
      return <h1>That's right!</h1>
    }
    return (
      <>
        <h2>City quiz</h2>
        <p>
          In which city is there a billboard that turns air into drinkable water?
        </p>
        <form>
          <textarea />
          <br />
          <button>
            Submit
          </button>
        </form>
      </>
    )
  }

  
//You can then manually edit the passed in prop to test out the visual state. 

//Mocking lets you quickly iterate on the UI before you wire up any logic. 

//Here's a more fleshed out version still controlled by the success prop.

export default function Form({
    // Try 'submitting', 'error', 'success':
    status = 'empty'
  }) {
    if (status === 'success') {
      return <h1>That's right!</h1>
    }
    return (
      <>
        <h2>City quiz</h2>
        <p>
          In which city is there a billboard that turns air into drinkable water?
        </p>
        <form>
          <textarea disabled={
            status === 'submitting'
          } />
          <br />
          <button disabled={
            status === 'empty' ||
            status === 'submitting'
          }>
            Submit
          </button>
          {status === 'error' &&
            <p className="Error">
              Good guess but a wrong answer. Try again!
            </p>
          }
        </form>
        </>
    );
  }

  

  //If a component has alot of visual states it can be convenient to show them all on one page. 

  import Form from './Form.js';

let statuses = [
  'empty',
  'typing',
  'submitting',
  'success',
  'error',
];

export default function App() {
  return (
    <>
      {statuses.map(status => (
        <section key={status}>
          <h4>Form ({status}):</h4>
          <Form status={status} />
        </section>
      ))}
    </>
  );
}

//Pages like this are often called living style guides or storybooks



//Step 2.
//You can trigger updates to state in response to two kinds of input.
//Human input like clicking button, typing, navigating a link
//Or computer inputs, a network response arriving, a timeout completing, an image loading.

//In both cases you must set a state variable to update the UI.

//If we take the form as an example.

//Changing the text input (human) shuold it switch it from an empty state to typing and back depending on if the field
//is empty or not. 
//Clicking the submit button should switch to submitting state.
//Successful network response (computer) should switch it to the success state.
//Unsuccessful network response should switch it to the error state.

//Human inputs require event handlers.

//To help visualize the flow of the state in the component draw each state on paper as a circle, and each change 
//between two states as an arow. This will help you sort bugs in state flows long before implementation.



//Step 3.
//Next represent your visual states in memory with useState.
//Each state represents a moving piece, and you want as few moving pieces as possible. More complexity leads to more bugs.

//Start with the state that absolutely must be there. 

//For example, youll need to store the answer for the input, and the last error, if it exists.

// const [answer, setAnswer] = useState('');
// const [error, setError] = useState(null);

//Then youll need a state variable that represents which one of the visual states you want to display.
//Youll need to experiment with the best way to do this.

//If you struggle finding the best way to do this. Start by making a state for each individual visual state.

const [isEmpty, setIsEmpty] = useState(true);
const [isTyping, setIsTyping] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [isError, setIsError] = useState(false);

//You will likely have to refactor your state to get it right.



//Step 5.
//You want to avoid duplication in state content, so that you only track what is essential. Refactoring state structure
//will make components easier to understand, avoid duplication, and avoid unintentional meanings. 
//Your goal is to avoid cases where your state doesnt represent valid UI youd like your user to see. 
//For example youd never want to show an error message and diable an input at the same time otherwise they wouldnt be
//able to fix it. 


//Questions you should ask yourself about your state.
//Does this state create a paradox? For example isTyping and isSubmitting cant both be true. A paradox usually means the
//state isnt constrained enough. There are four possible combinations of two booleans, but only three correspond to valid
//states 
//To eliminate the possibility of typing, submitting, or success states being true at the same time which would be a paradox
//we could combine them together into a single status state which must be one of the three. 

//Is the same info available in another state variable already? Another paradox, isEmpty and isTyping cant be true at the
//same time. By making them seperate states you risk them going out of sync and causing bugs. Instead you can remove isEmpty
//and check if answer's length is === to 0 or not.

//Can you get the answer from the inverse of a state? You dont need isError either, because you can check error !== null
//instead.

//After cleanup we're left with 3 essential state variables.

const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
const [status, setStatus] = useState('typing'); // 'typing', 'submitting', or 'success'

//You know they are essential, because you cant remove them without breaking functionality.



//Another thing you can do to eliminate impossible states is to use a reducer.

//The three states above are enough, but there are still some intermediate states that dont make much sense.
//For example having a non null error when the status is success. To model the state more precisely extract into a
//reducer. Reducers let you unify multiple states into a single object, and consolidate all the related logic. 



//Step 5. 
//Lastly, create event handlers that update the state.

import { useState } from 'react';

export default function Form() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  if (status === 'success') {
    return <h1>That's right!</h1>
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button disabled={
          answer.length === 0 ||
          status === 'submitting'
        }>
          Submit
        </button>
        {error !== null &&
          <p className="Error">
            {error.message}
          </p>
        }
      </form>
    </>
  );
}

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'lima'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}



//Declarative programming means describing the UI for each visual state rather than micromanagaing the UI (imperative)

//When developoing a component

//1. Identiify all possible visual states.
//2. Determine the different human and computer triggers for those states.
//3. Model the state into memory with useState.
//4. Remove non essential state to avoid bugs and paradoxes.
//5. Implement the event handlers that update the state.

