//Components often need to change whats on the screen based on interaction of some sort. Components need to remember things
//The memory of a component is called state.

import { useState } from "react";

//If we were to try to use a normal variable as the memory of our component it wouldnt work for two reasons.

//1. for updates to be displayed to the screen a rerender needs to happen. And normal variables do not persist across
//rerenders. Every time a render happens a new variable is created with the original value its initialized with.

//2. Even if you change the variable a rerender will not occur to show the change on the screen. React doesnt know
//to rerender unless setState is called.


//To update a componnet with new data, two things need to happen.

//1. The data needs to persist across rerenders

//2. The data changing needs to cause React to rerender.

//The useState hook achieves both of these things. It supplies a variable that has a closure over it, allowing it
//to persist across renders, and a setter function for assigning new values to that variable. When this setter function
//is called it also lets React know a rerender should occur.

//When you call useState you are telling React you want this component to remember something.



//Here's how useState works under the hood.

import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex(index + 1);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}


//1. Your component renders the first time, because you passed 0 as the initial value for index useState will
//return [0, setIndex]. React utilizes closure to remember 0 is the latest state.

//2. You update the state. When a user clicks the button it calls setIndex(index + 1), index is 0, so its setIndex(1)
//This tells React to remember index is 1 now, and trigger a rerender.

//3. Your second render React still sees useState(0), but since it remembers index is 1 now, it returns [1, setIndex]



//You can have as many variables of as many types as youd like.

import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}

//It is a good idea to have multiple state variables, if their state is unrelated, but if you find you often change 
// two state variables together, it might be easier to combine them to one. For example if you have a form with many
//fields it might be easier to have a single object than a state variable per field.



//The useState call does not recieve any info about which state it refers to, so how does it know which state to 
//return? 

//To enable their concise syntax hooks rely on a stable call order on every render of the same component. This is why
//hooks should only be called from the top level of a component, it allows them to be called in the same order every 
//time.

//Internally React holds an array of state pairs for every component. It also maintains the current pair index which
//is set to 0 before rendering. Each time you call useState React gives you the next state pair, and increments the index.

//Read this: https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e

//How useState works internally: https://codesandbox.io/s/63td7j?file=/index.js&utm_medium=sandpack



//State is local to a component instance on the screen, meaning if you render a componnet twice each one will have its
//own state.

import Gallery from './Gallery.js';

export default function Page() {
  return (
    <div className="Page">
      <Gallery />
      <Gallery />
    </div>
  );
}

//State is fully private to the component its defined in, parents cant change it. THis allows you to add or remove it
//without effecting surrounding components.

