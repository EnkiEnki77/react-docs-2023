//React components communicate with eachother by passing props. Every parent component can pass some data to its
//children through props. 

//Props might remind you of HTML attributes, but you can pass any js value through them, including objects, arrays
//and functions.

//Props are the info you pass to a jsx tag, for example src, alt, className, etc. are some of the props you can pass
//to an image.

function Avatar() {
    return (
      <img
        className="avatar"
        src="https://i.imgur.com/1bX5QH6.jpg"
        alt="Lin Lanying"
        width={100}
        height={100}
      />
    );
  }

//The props you can pass to your JSX markup are predefined, ReactDOM conforms to HTML standard. But you can pass any 
//props you want to components. 

//In this code Profile isnt passing any props to its child Avatar.

export default function Profile() {
    return (
      <Avatar />
    );
  }

//You can pass props to a component in two steps.

//1. First step is to pass the props to the child Component.

export default function Profile() {
    return (
      <Avatar
        person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
        size={100}
      />
    );
  }

//2. Next you have to read the props inside the child component.

//props are passed to components as a single object called props.

function Avatar(props) {
    props.person
    props.size
    // person and size are available here
  }

//You can destructure this object in order to get access to the individual props

function Avatar({ person, size }) {
    // person and size are available here
  }

//You can think of props as the arguments you pass to your components.



//If youd like to give a default value for a prop if no value is given, but the component relies on that prop.
//you can destructure the props object, and assign a default to your props.

function Avatar({ person, size = 100 }) {
    // ...
  }

//The default is only used if the prop is not passed, or it has the value undefined.



//Sometimes passing props can be very repetiive, which can make things more legible, but if youd like to be more concise
//you can forward a components props to its children without specifiying an explicit prop name. Because the component
//doesnt use any of its own props directly it can make sense to use a more concise spread syntax.

function Profile(props) {
    return (
      <div className="card">
        <Avatar {...props} />
      </div>
    );
  }

//This forwards all of Profile's props to avatar without having to individually pass them.

//Use spread syntax sparingly, if youre using it on every other component it often means something is wrong. That maybe
//You should be passing just normal JSX over a component. 



//When you nest content inside a JSX tag, the parent component recieves that content as a prop called children. 

import Avatar from './Avatar.js';

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}

//When using this pattern of creating a wrapper componnet that renders a children prop it doesnt need to know what its
//rendering. It can wrap anything.

//You can think of a component with a children prop as having a hole that can be filled in by its parents with arbitrary
//JSX. Its often used for visual wrappers, panels, grids, etc. 



//Props reflect a components data at any point in time, but theyre not always static. If theyre state that belongs to a 
//parent the value of the prop changes with the value of the state. 

//However, props are immutable. When a componnet needs to change its props in response to user interaction or new data
//it has to ask its parent to pass it different props, a new props object. Its old props object will be cast aside, and
//eventually JS will reclaim the memory allocated for them. Every render a component recieves new props.

//Props are read only, you should never try to reassign them, functions are meant to be pure functions. Meaning they
//do not mutate data outside of themselves, and given the same input will always return the same output (meaning arguments
//are immutable.)


