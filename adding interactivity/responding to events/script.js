//React lets you add event handlers to your jSx. event handlers are your own functions, which will be called
//in response to interactions, such as clicking, hovering, focusing inputs, etc. 

//To add an event handler you create it as a function, and add it to the specified JSX tag as one of the predetermined
//event props specified by HTML standard.

export default function Button() {
    function handleClick() {
      alert('You clicked me!');
    }
  
    return (
      <button onClick={handleClick}>
        Click me
      </button>
    );
  }

//The handleClick function above is an event handler. Event handlers are generally defined within a component, and
//conventionally start with the word 'handle' followed by a descriptive name for what they handle.

//alternatively you can define the event handler inline for the prop.

<button onClick={function handleClick() {
  alert('You clicked me!');
}}></button>

//Event handlers should be passed and not called.
//When you pass an event handler as a callback, React will remember it and call it when the element has been interacted
//with in the way specified by the event prop.

(<button onClick={handleClick}></button>)

//If you were to call it when you pass it to the event prop, it would immediately be run when the component renders.

(<button onClick={handleClick()}></button>)

//If you need to call the handler, to pass it some sort of argument, then call it from an anonymous function, and pass
//the anonymous function to the event prop

(<input onChange={(e) => handleClick(e)}></input>)



//Often times youll want a parent component to specify a components event handler.

//Say you have two different kinds of buttons, one that plays a movie, and one that uploads an image.
//We could have a general Button component that takes in children and an event handler as props, and then two
//componnets that each render that Button component passing it the children and event handler meant for the kind
//of button they represent.

function Button({ onClick, children }) {
    return (
      <button onClick={onClick}>
        {children}
      </button>
    );
  }
  
  function PlayButton({ movieName }) {
    function handlePlayClick() {
      alert(`Playing ${movieName}!`);
    }
  
    return (
      <Button onClick={handlePlayClick}>
        Play "{movieName}"
      </Button>
    );
  }
  
  function UploadButton() {
    return (
      <Button onClick={() => alert('Uploading!')}>
        Upload Image
      </Button>
    );
  }
  
  export default function Toolbar() {
    return (
      <div>
        <PlayButton movieName="Kiki's Delivery Service" />
        <UploadButton />
      </div>
    );
  }

  //Doing things this way retains the single responsibility principle. As well as makes things more declarative.

  //If you use a design system its common for buttons to contain styling but not specify behaviour, this where components
  //like PlayButton and UploadButton come into play to pass the behaviour down. 



  //React elements like <button> only support browser event names for their event props, but you can name your Component
  //event props whatever youd like. 
  //The convention is for Componnet event props to start with 'on' followed by a descriptive name of what the event is.

  export default function App() {
    return (
      <Toolbar
        onPlayMovie={() => alert('Playing!')}
        onUploadImage={() => alert('Uploading!')}
      />
    );
  }
  
  function Toolbar({ onPlayMovie, onUploadImage }) {
    return (
      <div>
        <Button onClick={onPlayMovie}>
          Play Movie
        </Button>
        <Button onClick={onUploadImage}>
          Upload Image
        </Button>
      </div>
    );
  }
  
  function Button({ onClick, children }) {
    return (
      <button onClick={onClick}>
        {children}
      </button>
    );
  }

  

  //Event handlers will catch events from any children your componnent has.
  //Events bubble or propagate up the tree. They start where the event happened, and then go up from there.

  //In the code below, if you click either button the onClick for the button will run first, and then the one for the
  //div.The click event is triggered on the button when you click it, since the button is a child of the div its click
  //event propagates up to the div, and triggers its click event handler as well.

  export default function Toolbar() {
    return (
      <div className="Toolbar" onClick={() => {
        alert('You clicked on the toolbar!');
      }}>
        <button onClick={() => alert('Playing!')}>
          Play Movie
        </button>
        <button onClick={() => alert('Uploading!')}>
          Upload Image
        </button>
      </div>
    );
  }

  //All events propagate in React, except for onScroll, which only works on the JSX tag you attach it to.



  //Event handlers recieve an event object as their only argument. By convention its called e. You can use this object
  //to read info about the event. 

  //That event object also allows you to stop the propagation. If you want to prevent an event from reaching a parent
  //component. you need to call e.stopPropagation()

  function Button({ onClick, children }) {
    return (
      <button onClick={e => {
        e.stopPropagation();
        onClick();
      }}>
        {children}
      </button>
    );
  }
  
  export default function Toolbar() {
    return (
      <div className="Toolbar" onClick={() => {
        alert('You clicked on the toolbar!');
      }}>
        <Button onClick={() => alert('Playing!')}>
          Play Movie
        </Button>
        <Button onClick={() => alert('Uploading!')}>
          Upload Image
        </Button>
      </div>
    );
  }

  

  //Some browser events have default behaviour associated with them, for example a form submit event which happens
  //when a button is clicked inside of it reloads the page by default.

  //You can call e.preventDefault() to stop this.

  export default function Signup() {
    return (
      <form onSubmit={e => {
        e.preventDefault();
        alert('Submitting!');
      }}>
        <input />
        <button>Send</button>
      </form>
    );
  }



  //Event handlers are the best place for side effects.

  //Unlike components event handler functions dont need to be pure, so its a great place to change something.
  //For example, change an inputs value based on typing, or change a list on button press. However to change 
  //some data you first need a place to store it. In react this is done by using state



  //If state in a parent component is unexpectedly being changed when interacting with a child its because of propagation.

  

