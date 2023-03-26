//React lets you combine your markup, JS, and CSS into custom components, reusable UI elements for your app.

//Just like HTML you can compose, order, and nest componoents to describe your UI.

//As your project grows you will realize many of your designs can be composed by reusing components you already wrote,
//speeding up development. 

//You can even quick start dev by using a component library like material or chakra UI



//### Defining a component.

//Traditionally you would markup your content, and add interactivity by sprinkling in some JS. This was great when 
//interactivity was just a nice to have feature. Now it is expected in many sites and all apps. 

//React puts interactivity first while still using the same technology, a React component is a function that you can
//sprinkle with markup 

export default function Profile() {
    return (
      <img
        src="https://i.imgur.com/MK3eW3Am.jpg"
        alt="Katherine Johnson"
      />
    )
  }


//Here's how to create a component.

//Step 1: Export the component.

//The export default prefix is standard JS syntax. It lets you mark the main function in a js file, so that you can later
//import it to other files. 

//Step 2: Define the function.

//React components are regular JS functions, but they must be named with a capital letter or they wont work. 

export default function Profile(){

}

//Step 3: Add markup

//The component returns an <img/> tag with src and alt attributes. The tag looks like HTML, but its actually JS under 
//the hood. This syntax is called JSX, and it allows you to embed markup into JS.

export default function Profile(){
    return (
        <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson"/>
    )
}

// Return statements can be written all in one line, but if your markup is nested you should wrap it in parens. 



//### Using a component.

//Once you define a component you can nest it as many times as youd like into other components using the JSX syntax.

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

  //If a tag is lowercase React knows we're referring to an HTML tag. If its uppercase its a component that evaluates
  //to HTML tags.

  // When React sees a component like this.

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

  //It tells the browser to look like this.

  <section>
    <h1>Amazing scientists</h1>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </section>
  
