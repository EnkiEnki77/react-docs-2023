//React is a js lib for rendering ui, ui is built from React elements, React lets you combine React elements into reusable
//nestable components.

//React apps are built from isolated pieces of ui called components. Components are js functions that return React elements
//React elements are js objects that React uses to tell the DOM how it should construct the hierarchy of the UI on the 
//screen. 

function Profile() {
    return (
      <img
        src="https://i.imgur.com/MK3eW3As.jpg"
        alt="Katherine Johnson"
      />
    );
  }
  
  export default function Gallery() {
    return (
      <section>
        <h1>Amazing scientists</h1>
        <Profile />
        <Profile />
        <Profile />
      </section>
    );
  }



  //###Importing and exporting components

  //You can declare many components in one file, but large files become hard to navigate. 

  //To solve this you can export a component from its own file, and then import it into another to be utilized with
  //JSX syntax.



  //###Writing markup with JSX

  //Each React component is a function that may contain some markup that React renders into the browser. React components
  //use a syntax extension called JSX to represent that markup. JSX looks alot like HTML, but it is stricter, and can 
  //display dynamic info. 

  