//JSX is a syntax extension of JS, and allows you to write HTML like markup into a JS file.

//For many years, content was marked up in HTML, design in CSS, and logic in JS, all in seperate files. 
//But as the web became more interactive, logic increasingly determined content. JS became in charge of HTML.
//This is why in React rendering logic and markup live in the same file as components. 

//Keeping a button's rendering logic and markup together ensure they stay in sync on every edit. 
//Conversely, things that are unrelated to eachother, such as a button's and sidebar's markup
//stay seperate from eachother, making it safe to change either of them on their own.

//Each React component is a JS function that may return some markup that is rendered into the browser.
//React uses JSX to represent that markup. JSX may look a lot like HTML, but its actually a syntax extension
//of JS that evaluates to an object at runtime. 

//Rules of JSX:

//1. you can only return a single JSX element from a component, if you wnat to return multiple wrap them all in
//a single element, such as a div. If you dont want to pollute the DOM with additional div's use a React fragment
// <> </>.

//The reason you cant return multiple JSX elements from a component is they evaluate to objects at runtime. You 
//cant return two objects from a function, youd have to wrap them in a single array. Its the same concept.



//2. JSX requires all tags to be explicitly closed. <img/>, instead of <img>, and <li>Apple</li> instead of <li>Apple.



//3. Attributes written in JSX turn into keys on the object the JSX evaluates to. So you have to camelcase attributes,
//and not use reserved words such as class.





