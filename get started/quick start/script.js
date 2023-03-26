//React apps are made up of components. components are pieces of the UI which have their own logic and appearance. 
//They can be as small as a button, or as big as an entire page. 

//React components are functions that return React elements (markup)

function MyButton() {
    return (
      <button>I'm a button</button>
    );
  }

//After youve created a component, you can nest it into another component as JSX, because components return jsx.

export default function MyApp() {
    return (
      <div>
        <h1>Welcome to my app</h1>
        <MyButton />
      </div>
    );
  }

//Components must always start with a capital letter, while jsx tags are lower case, this is how they are differentiated

//export default denotes the main component of the file. The convention is for each componnet to occupy its own file.



//The HTML like syntax above is called JSX, and it is a syntax extension to JS. Its optional in React, but most applications
//use it for its convenience. Your components cannot return multiple JSX tags. You have to wrap them into a shared parent.

function AboutPage() {
    return (
      <>
        <h1>About</h1>
        <p>Hello there.<br />How do you do?</p>
      </>
    );
  }

  

  //In React you specify a CSS class with the keyword className, it works the same way as class in HTML

  function AboutPage() {
    return (
      <>
        <h1 className="avatar">About</h1>
        <p>Hello there.<br />How do you do?</p>
      </>
    );
  }



  //JSX allows you to put markup into your JS, curly braces allow you to escape back into JS, and embed a JS expression
  //of some sort into your markup. For example, the value in user.name will be displayed in the markup 

  return (
    <h1>
        {user.name}
    </h1>
  )

  //You can also escape into JS in your attributes, but have to use curly braces instead of quotes.
  //Escaping to JS with curly braces utilizes the value the expression evaluates to on execution as a string.

  return (
    <img
      className="avatar"
      src={user.imageUrl}
    />
  );    

  //You can put any kind of JS expression into curly braces, even more complex ones such as string concatenation.

  const user = {
    name: 'Hedy Lamarr',
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
    imageSize: 90,
  };
  
  export default function Profile() {
    return (
      <>
        <h1>{user.name}</h1>
        <img
          className="avatar"
          src={user.imageUrl}
          alt={'Photo of ' + user.name}
          style={{
            width: user.imageSize,
            height: user.imageSize
          }}
        />
      </>
    );
  }

  
  //You can use the style attribute when your css requires JS variables, it takes in an object with its properties 
  //specifying the css props youd like to define. 



  //In React you write conditions in the same way you would JS.

  //You can use if statements to conditionally include JSX.

  let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return (
  <div>
    {content}
  </div>
);

//If you prefer more compact code use the ternary operator, which unlike if statements works in jsx.

(<div>
  {isLoggedIn ? (
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>)

//If you dont need the else branch of the statement just use the && operator, if true it always evaluates to the right
//hand operand. 

(<div>
  {isLoggedIn && <AdminPanel />}
</div>)

//All of this also works for conditionally rendering attributes as well.



//In React you can use array.map to create lists of components and individually pass them the data in the array.

const products = [
    { title: 'Cabbage', id: 1 },
    { title: 'Garlic', id: 2 },
    { title: 'Apple', id: 3 },
  ];

  const listItems = products.map(function listOfProducts(product){
    return (
        <li key={product.id}>
            {product.title}
        </li>
    )
  })

  return (
    <ul>
        {listItems}
    </ul>
  )

  //Each item in a list should have a unique key passed to them, so that React can keep track of changes if you insert,
  //delete, or reorder elments of the list. This key should generally come from the data, avoid using the array index as
  //this is not guaranteed to stay the same. 



  //You can respond to events by passing event handler functions to an event attribute on a tag. You should not call
  //theese functions, they are passed down as callbacks and called by react at the time of the event being triggered.
  //The convention for event handlers is to start with the word handle and describe the event theyre handling.

  function myButton(){
    function handleClick(){
        alert(
            "You clicked me"
        )
    }

    return(
        <button onClick={handleClick}>
            Click me
        </button>
    )
  }



  //Often you want a component to remember some info and display it, such as how many times a button has been clicked.
  //To do this add state to your component.

  //To add state you have to import useState from the React module. 

  import {useState} from 'react'

  //useState itself is a module, and it gives you access to a state variable, along with a function to update it
  //The convention for nameing them is something and setSomething. 
  //The value passed to useState itself is the value the state variable starts at by default.
  //When you want to change the state variable call the setter function, and pass it the new value.
  //Calling the setter function updates your state and causes the parent function to rerender so that new state
  //can be displayed. 

  function myButton(){
    const [count, setCount] = useState(0)

    function handleClick(){
        setCount(count + 1)
    }

    return(
        <button onClick={handleClick}>
            Clicked {count} times
        </button>
    )
  }

  //If you render a component multiple times each one will get its own seperate state.

  export default function myApp(){
    return (
        <div>
            <h1>Counters that update seperately</h1>
            <MyButton/>
            <MyButton/>
        </div>
    )
  }

  //functions starting with use are called hooks, useState is a built in React hook.
  //You can also write your own hooks by combing the other ones.

  //Hooks are more restrictive than other functions you can only use them at the top level of a component or other hook
  //If you want to use them in a condition or loop extract a new component and put it there.



  //Above it was talked about that you can render multiple components all with their own contained state, but often times
  //we want components that all have a shared state, and update together. To achieve this you have to lift the state up
  //to the nearest shared parent along with the event handler, and pass the data/event handler back down as a prop.
  //To update the shared state pass the event handler prop to the event attribute the same way you would with a confined
  //state.

  export default function MyApp() {
    const [count, setCount] = useState(0);
  
    function handleClick() {
      setCount(count + 1);
    }
  
    return (
      <div>
        <h1>Counters that update together</h1>
        <MyButton count={count} onClick={handleClick} />
        <MyButton count={count} onClick={handleClick} />
      </div>
    );
  }

  function myButton({count, onClick}){
    function handleClick(){
        setCount(count + 1)
    }

    return(
        <button onClick={onClick}>
            Clicked {count} times
        </button>
    )
  }

