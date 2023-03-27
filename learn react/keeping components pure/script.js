//Keeping components pure allows you to avoid an entire class of bugs

//A pure function is a function that doesnt change any objects or variables that existed before it was called.
//And if it has the same input it will always have the same output.

function double(number) {
    return 2 * number;
  }

double(3) //this will be 6, always. Because double is a pure function.

//React assumes that its components are pure functions, so any props passed to those components as arguments should be 
//read only. 

//Components should not be altering data that exists outside of its definition. 



//In React there are three kinds of inputs you can read while rendering, props, state, and context. You should always
//treat them as read-only. 

//If you want to change something in response to user input you should set state instead of writing to a variable. 
//You should never change preexisting data while your component is rendering. 

//React offers a strict mode in which it calls each comopnent function twice during development. By calling each component
//twice React helps find components that break these rules. 

//breaks rules on being pure:
let guest = 0;

function Cup() {
  // Bad: changing a preexisting variable!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

 function TeaSet() {
  return (
    <>
      <Cup /> //Guest would be 2 instead of 1, because function is called twice by Strictmode
      <Cup /> //Guest would be 4 instead of 2
      <Cup /> //Guest would be 6 instead of 3
    </>
  );}


  //follows rules for being pure:

  function Cup({ guest }) {
    return <h2>Tea cup for guest #{guest}</h2>;
  }
  
   function TeaSet() {
    return (
      <>
        <Cup guest={1} /> //Guest would be 1, function is resilient to being called twice by Strictmode.
        <Cup guest={2} /> //Guest would be 2
        <Cup guest={3} /> //Guest would be 3
      </>
    )}

//Strictmode has no effect in production mode.



//In pure functions local mutation is fine, mutation of variables that were created during the same render as the 
//function (variables that were born in the function)

function Cup({ guest }) {
    return <h2>Tea cup for guest #{guest}</h2>;
  }
  
  export default function TeaGathering() {
    let cups = [];
    for (let i = 1; i <= 12; i++) {
      cups.push(<Cup key={i} guest={i} />);
    }
    return cups;
  }



//While functional programming relies heavily on purity at some point something has to change. These changes, updating
//the screen, starting an animation, changing the data, etc. are called side effects. Theyre things that happen on the 
//side, not during rendering. 

//In React side effects generally belong in event handlers. Event handlers are functions React runs when you perform
//an action, when you click a button for example. Even though they are defined in your component event handlers dont
//run during rendering, so they dont need to be pure. 

//If you cant find a proper event handler for your side effects you can attach it to a useEffect call in your comopnent
//But this should be your last resort. This tells React to execute it later after rendering, when side effects are allowed.
//When possible try to express your logic with rendering alone.

// Writing pure functions takes some habit and discipline. But it also unlocks marvelous opportunities:

// Your components could run in a different environment—for example, on the server! Since they return the same result 
//for the same inputs, one component can serve many user requests.
// You can improve performance by skipping rendering components whose inputs have not changed. This is safe because pure
// functions always return the same results, so they are safe to cache.
// If some data changes in the middle of rendering a deep component tree, React can restart rendering without wasting 
//time to finish the outdated render. Purity makes it safe to stop calculating at any time.
// Every new React feature we’re building takes advantage of purity. From data fetching to animations to performance, 
//keeping components pure unlocks the power of the React paradigm.

//Finish this section.
