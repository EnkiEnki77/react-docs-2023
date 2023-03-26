//There are 5 steps you should follow when building an app with a React mindset

//1. Break the UI design into a component hierarchy.

//Start by drawing boxes around every component and subcomponent in the design and naming them. 
//Then arrange them into a hierarchy.

//When deciding what should be a component, use the single responsibility principle, same principle you should use when
//composing objects/functions. Components should ideally do one thing. If it grows it should be decomposed into 
//subcomponents.



//2. Build a static version in React.

//The easiest approach is to build a static version of your app based on the component hierarchy you outline, but 
//withiout any activity. Building the static UI requires alot of typing, but not much thinking. Whereas adding interactivity
//requires a lot of thinking but not necessarily much typing.

//Dont use state at all in the static build, state is reserved for interactivity with data that changes over time. 

//Do render your data model throughout your components using props though. 

//The component at the top of the hierarchhy tree should take in the data model and pass it to its children as props to
//be utilized. This is called unidirectional data flow, because the data flows down from the top level component to the
//one's below it in the tree. 



//3. Find the minimal but complete representation of state.

//To make your UI interactive you need to allow users to change your data model. You achieve this through state. 

//State is the minimal set of changing data your app needs to remember. The most important principle for structuring 
//state is to keep it DRY. Figure out the absolute minimal representation of state your app needs. And compute everything
//else on demand. 

//For example, if building a shopping list you can store the items as an array in state. If you also need to display the
//number of items in the list dont make the number another state - instead, read the length of your array. 

//Make a list of all the different data in your app, and think about which should be state, and which shouldnt.

// The original list of products
// The search text the user has entered
// The value of the checkbox
// The filtered list of products

//Ask yourself these questions:
//Does it remain unchanged overtime? If so, its not state.
//Is it passed in from a parent via props? If so, its not state.
//Can you compute it based on state or props that already exist? If so it isnt state. 



//4. Identify where your state should live.

//After identifying minimal state of the application, you need to identify which components should own the state.

//For each piece of state:
//Identify every component that renders something based on that state.
//Find their closest common parent component, that should be where the state lives.
//If you cant find a common parent it makes sense to place the state, then create a component strictly for that purpose,
//and add it to the hierarchy above the components that need the state.

//To create a state variable use the useState hook, hooks are special functions that allow you to hook into React.

//Once you find a place for the state live, pass it to any children components that need it as props.

//You can display the value of state by passing to the value prop of inputs, or the child of other React elements,
//but to actually change the state based on user interactions you have to utilize an event prop, and pass that prop
//an event handler that calls the setter function for the state youd like to change. 

<button onClick={activateLasers}>
  Activate Lasers
</button>

//This is the final step in thinking in react.



//5. Add inverse data flow.

//Your app will render correctly with props and state flowing down the hierarchy. But to change the state according
//to user input you need to allow your child componnets that utilize state passed from their parents as props to update
//that state. 

//Only the component that owns the state can call the setter function that updates it, so in order to enable the 
//children to ask their parent to update that state you have to create an event handler function in the parent, 
//and pass it down to the child as a prop. The child then utilizes that handler in an event prop on of its elements.





//Props vs. state:

//There are two types of model data in React, props and state.

//Props are like arguments you pass to a function. They let a parent component pass data to a child component and change
//its appearance. For example a form can pass a color prop to a button 

//State is like a components memory. It allows a component to keep track of data, and change it based on interactions by
//a user. For example, a button might keep track of isHovered state.

//Props and state are different, butt they work together. A parent componeent might keep some data in state so it can 
//change it, but then pass it down to a child as props

