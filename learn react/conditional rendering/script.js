//Your components will often neeed to display different things based on conditions. In React you can conditionally
//render JSX with JS if statements and &&, ? : operators.

//Lets say you have this code 

function Item({ name, isPacked }) {
    return <li className="item">{name}</li>;
  }
  
  export default function PackingList() {
    return (
      <section>
        <h1>Sally Ride's Packing List</h1>
        <ul>
          <Item 
            isPacked={true} 
            name="Space suit" 
          />
          <Item 
            isPacked={true} 
            name="Helmet with a golden leaf" 
          />
          <Item 
            isPacked={false} 
            name="Photo of Tam" 
          />
        </ul>
      </section>
    );
  }

//We can use the boolean prop passed to Item as the condition for what is rendered by the component.

if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;

//We are creating branching logic with the above code, in React, control flow is handled by JS.

//In some conditions you may not want a component to return anything at all, but a comopnent must return something,
//so in this case return null.

function Item({ name, isPacked }) {
    if (isPacked) {
      return null;
    }
    return <li className="item">{name}</li>;
  }
  
  export default function PackingList() {
    return (
      <section>
        <h1>Sally Ride's Packing List</h1>
        <ul>
          <Item 
            isPacked={true} 
            name="Space suit" 
          />
          <Item 
            isPacked={true} 
            name="Helmet with a golden leaf" 
          />
          <Item 
            isPacked={false} 
            name="Photo of Tam" 
          />
        </ul>
      </section>
    );
  }

//Generally though returning nothing from a component based on its props is not best practice. You would instead
//conditionally include or exclude the component from its parents JSX.

if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;

//Both of the above render outputs are very similar, which could make your code harder to maintain. What if you
//wanted to change the className? youd have to do it in two different places. We want to make this more DRY.

//JS has a syntax for writing conditional expressions you can use in return statements. The ternary operator.

//So, instead of the above conditional render we could do this. 

return (
    <li className="item">
      {isPacked ? name + ' ✔' : name}
    </li>
  );

//It is now more DRY, because there is only one return statement, but it achieves the same result.

//These two approaches are entirely equivalent.

//If you want to add nested jsx for each result you should wrap them in parens.

function Item({ name, isPacked }) {
    return (
      <li className="item">
        {isPacked ? (
          <del>
            {name + ' ✔'}
          </del>
        ) : (
          name
        )}
      </li>
    );
  }

//This style works well for simple conditons, but it can make your components less readable if you have to much 
//coditional logic. If this occurs consider extracting things into sub components to clean things up. You can use
//tools like variables and functions to tidy up complex code as well. 

//If you run into a situation where youd like to conditionally render something if true otherwise render nothing
//you should use && 

return (
    <li className="item">
      {name} {isPacked && '✔'}
    </li>
  );

//The && returns the value of right hand operand if the condition is true, but if the condition is false it returns
//false. React treats false like a hole in the code just like null or undefined and doesnt render anything.

//Be careful about putting numbers on the left side of &&, to test the condition it automatically coerces its left side
//to a boolean. However if the left side is a 0 it makes the whole expression a 0. and React will render that. 

//For example:

messageCount && <p>New messages</p> //If messageCount is 0 this would render 0

//solution:

messageCount > 0 && <p>New messages</p> //The left side now evaluates to a boolean, so nothing will be rendered if 0.



//When the shortcuts get in the way of writing plain code use an if statement and conditionally reassign a variable.

//Start by assigning the variable the default content you want to render, then conditionally reassigning it.

//This style is the most verbose, but also the most flexible and declarative.

function Item({ name, isPacked }) {
    let itemContent = name;
    if (isPacked) {
      itemContent = (
        <del>
          {name + " ✔"}
        </del>
      );
    }
    return (
      <li className="item">
        {itemContent}
      </li>
    );
  }
  
  export default function PackingList() {
    return (
      <section>
        <h1>Sally Ride's Packing List</h1>
        <ul>
          <Item 
            isPacked={true} 
            name="Space suit" 
          />
          <Item 
            isPacked={true} 
            name="Helmet with a golden leaf" 
          />
          <Item 
            isPacked={false} 
            name="Photo of Tam" 
          />
        </ul>
      </section>
    );
  }
  