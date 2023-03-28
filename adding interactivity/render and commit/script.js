//Imagine your components are cooks in the kitchen assembling dishes from different ingredients, and React
//is the waiter that puts in requests from customers and brings them thier orders. This process of 
//requesting and serving UI has 3 steps.

//1. Triggering a render (delivering guests order to the kitchen)
//2. Rendering an order (preparing the food)
//3. Commiting to the DOM (placing order on table)



//There are two reason for a componnet to render

//1. It's the components initial render
//2. The componnet or one of it's ancestors state has changed.

//When your app starts, you need to trigger the initial render. It is done through the createRoot API with the target DOM
//node, and then calling its render method with your root component as the argument

import App from './App.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<App />);

//This renders your root component into the target DOM node.

//Once a component renders you can trigger additionally renders for a component and its children by updating its state
//with ther state setter function. Updating your components state automatically queues a render. Imagine rerenders as
//a customer ordering additional items after their initial order based on the state of their hunger/thirst.

//1. State is updated (customer orders)
//2. Triggers rerender (waiter brings order to cooks)
//3. Components are rendered (customer given order)



//After you trigger a render React calls your components to figure out what to display on screen. "Rendering" is React 
//calling your components. 

//On initial render React will call the root component. 

//For subsequent renders React will call the function component whose state update triggered the render.

//This process is recursive, if the updated component returns some other component React will render that component next
//And if that component returns a componnet React will render that component, etc. The process will continue until there
//are no more nested components, and React knows exactly what should be shown on the screen 


//During a rerender React will calculate which componnets require changes, if any have changed since the previous render.
//it wont do anything with that info until the commit phase.

//Rendering must always be a pure calculation. 

//In strictmode React calls components twice, which can help surface bugs caused by components used impurely.



//Aftering rendering (calling your components) React will modify the DOM.

//For the initial render React will use the apendChild() DOM api to put all the DOM nodes it has created on screen.

//For rerenders, React will apply the minimum necessary operations (calculated at call of the component) to make the 
//DOM match the latest rendering output.

//React only changes the DOM nodes if there's a difference between renders.



//The final step, after React renders the component, and commits it to the DOM, the browser repaints the screen.

