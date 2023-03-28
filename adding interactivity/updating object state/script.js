//State can hold any kind of value, including objects, but you shouldnt change objects you hold in state directly.
//Instead, when you want to update an object, you need to create a new one (or make a copy of the state one) and 
//pass that in as the new state object.

//Primitive values as state are immutable (read-only) and you trigger a rerender with setState to replace the value.

const [x, setX] = useState(0);
setX(5);

//The x state changed from 0 to 5, but the 0 itself did not change. It is not possible to mutate primitvie values in JS.

//Objects on the other hand can be mutated, so you could technically do this.

const [position, setPosition] = useState({ x: 0, y: 0 });

position.x = 5;

//However, even though objects in React state are technically mutable, you should treat them as if they are immutable.
//like primitives, instead of mutating them you should always replace them with a new object. 

//You should treat any state whether its primitve or non-primitive value as read-only.

//The below code doesnt work, because we are mutating the object state directly. For React to know a change has been 
//made and it should queue a rerender that change need to be passed to setState

import { useState } from 'react';
export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        position.x = e.clientX;
        position.y = e.clientY;
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}

//When using setPosition instead of mutating the state of the current render we tell React to:
//Replace position with the new object
//Queue up a rerender 


 
//Code like this is an issue, because it mutates an existing object in state making the component impure

position.x = e.clientX;
position.y = e.clientY;

//But like this is fine, because youre mutating a local object you just created.

const nextPosition = {};
nextPosition.x = e.clientX;
nextPosition.y = e.clientY;
setPosition(nextPosition);

//It is completely equivalent to this:

setPosition({
    x: e.clientX,
    y: e.clientY
  });

//Local mutations are okay, because no other code references it yet at the time of mutation (local variables are redefined
//every render) Changing it isnt going to accidentally impact something that relies on it. You can even do local mutations
//while rendering. (Any code at the top level of the function that will run anytime the function is called is code that 
//happens while rendering.). While mutations that happen in event handlers are side effects, meaning they dont happen during
//rendering.



//Usually you would pass in a completely fresh object when you wish to update the state, but often times you want to only
//update apart of the state, but maintain the previous values of the rest. 

//In the code below the inputs dont work, because we're mutating the state directly. This doesnt trigger a rerender.

import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    person.firstName = e.target.value;
  }

  function handleLastNameChange(e) {
    person.lastName = e.target.value;
  }

  function handleEmailChange(e) {
    person.email = e.target.value;
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}

//Even if we were to pass in the mutated state to the setter function to trigger a rerender this would not cause an 
//update, because objects are passed by reference, not by value. So React would take the mutated object and compare
//it to the non mutated object of the previous render and see no difference. They both reference the same object in
//memory.

//This wouldnt cause an update on the screen. 
function handleFirstNameChange(e) {
    person.firstName = e.target.value;
    setPerson(person)
  }

//The reliable way to change only a part of an objects state is to pass in a new object assigning the properties you
//want to change a new value, and the ones you dont the values of the state of the previous render.

setPerson({
    firstName: e.target.value, // New first name from the input
    lastName: person.lastName,
    email: person.email
  });

//You can use the object spread syntax to make this a bit easier, and more declarative.

setPerson({
    ...person,
    firstName: e.target.value, // New first name from the input, replaces the firstName property added by ...person.
  });


//For large forms, keeping all data grouped into a single state object is convenient, over making seperate state for 
//each input.

//Just make sure to update it correctly.

import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    setPerson({
      ...person,
      firstName: e.target.value
    });
  }

  function handleLastNameChange(e) {
    setPerson({
      ...person,
      lastName: e.target.value
    });
  }

  function handleEmailChange(e) {
    setPerson({
      ...person,
      email: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}

//Keep in mind the ... syntax is shallow, it only copies things one level deep. If you want to update a nested property
//youll have to use it multiple times.

//If youd like to have one event handler that updates multiple different properties of the state in one place. You can
//use index signature syntax. This allows you to specify a property with dynamic name. 

function handleChange(e) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value
    });
  }

//e.target.name refers to the name property given to the <input/>, so make sure to supply that and ensure it is the same
//name as the property that controls the input.



//Consider a nested object like this:

const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

//If you wanted to update city you would update it through mutation like this person.artwork.city.

//But in React you treat state as immutable, so you would first need a new artwork object pre populated with data 
//from the old one. And a new person object that points the new artwork object

const newArtwork = {...person.artwork, city: 'Geneva'}
const newPerson = {...person, artwork: newArtwork}

setPerson(newPerson)

//This is how you update nested objects in react.

//Or written in a single call you could do 

setPerson({
    ...person,
    artwork: {
        ...person.artwork,
        city: 'Geneva'
    }
})



//Objects arent really nested, they may appear so in code, but in reality youre looking at two different objects

let obj = {
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  };

//is actually:

let obj1 = {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  };
  
  let obj2 = {
    name: 'Niki de Saint Phalle',
    artwork: obj1
  };

//The obj1 is not inside obj2, for example, obj3 could also point at it.
  
  let obj3 = {
    name: 'Copycat',
    artwork: obj1
  };

  //If you were to mutate obj3.artwork, it would also effect the object everywhere else that its referenced.
  //This is because obj2.artwork, and obj1 are all the same object.

  //So you shouldnt look at them as nested objects,they are all seperate objects in memory referencing eachother with
  //a property.



  //If youd like your nested updates to be more concise, you can use useImmer instead of useState. It allows you to use
  //the more concise mutation syntax without actually mutating the state.



  //There are a few reasons mutating state is not recommended in React.

  //1. Debugging
  //If you use console.log and dont mutate state, your past logs wont get altered by recent state, so you can clearly see
  //how state has changed between renders.

  //2. Optimization
  //Common optimization strats in React rely on skipping work if prev props or state are the same in the next render.
  //If you never mutate state it is very fast to check if there were any changes. if prevObj === obj you can be sure
  //that nothing changed inside it. But if you mutated prevObj the values could be different than obj, but React wouldnt
  //know because comparisons between objects are done by reference to their spot in memory, not by value.

  //3. New features
  //The new features being implemented rely on state being treated like a snapshot. If youre mutating past versions of
  //state it may prevent you from using new features.

  //4. Requirement changes
  //Some features like implementing undo/redo, showing a history of changes, or letting a user reset a form to earlier 
  //values are much easier to implement if you have access to previous state that wasnt mutated.

  //5. Simpler implementation
  //Because React does not rely on mutation, it does not need to do anything special with your objects. It does not need 
  //to hijack their properties, always wrap them into Proxies, or do other work at initialization as many “reactive” 
  //solutions do. This is also why React lets you put any object into state—no matter how large—without additional 
  //performance or correctness pitfalls.

  //You can often get away with mutation of state, but it is never advised, to enable you to use new features in the future.

  

  //If something unexpected changes, there is a mutation.

  //Remember, you should never mutate state, even if the object the state references is not referenced anywhere else.
  //Also, state mutations will not be reflected on the screen until a later unrelated state update triggers a rerender.

  //React compares the reference of prev state objec/arrays to the new ones. It doesnt actually compare the values inside.
  
  


