//You will often want to display multiple similar components from a collection of data. You can use the JS array methods to
//loop through the list of data and return a Component for each item in the list, as well as pass the data to those 
//components as props.

//There will be times you will need to show several instances of the same component using different data. From list of
//comments to galleries of images. In these situations store that data in arrays or objects and use array methods like
//filter or map to create lists of components out of them. 

//1. move the data into an array 

const people = [
    'Creola Katherine Johnson: mathematician',
    'Mario José Molina-Pasquel Henríquez: chemist',
    'Mohammad Abdus Salam: physicist',
    'Percy Lavon Julian: chemist',
    'Subrahmanyan Chandrasekhar: astrophysicist'
  ];

//2. map it into a list of components

const listItems = people.map(person => <li>{person}</li>)

//3. return the variable you assigned the list to from a component wrapping it in a <ul> if they are <li>
  
  export default function List() {
    
    return <ul>{listItems}</ul>;
  }



//This data can be structured even more. 

const peoples = [{
    id: 0,
    name: 'Creola Katherine Johnson',
    profession: 'mathematician',
  }, {
    id: 1,
    name: 'Mario José Molina-Pasquel Henríquez',
    profession: 'chemist',
  }, {
    id: 2,
    name: 'Mohammad Abdus Salam',
    profession: 'physicist',
  }, {
    name: 'Percy Lavon Julian',
    profession: 'chemist',  
  }, {
    name: 'Subrahmanyan Chandrasekhar',
    profession: 'astrophysicist',
  }];

  //Lets say you want a list of components from a list of data, but filtered based on a condition. You would use filter
  //for those over map. Its similar to map, but instead returns an array of only the items in the list of data that pass
  //a specified test. Then map over the filtered list to create an array of components out of the filtered list.

  const justChemists = peoples.filter(person => person.profession === 'chemist')
  const listOfChemists = chemists.map(person =>
    <li>
       <img
         src={getImageUrl(person)}
         alt={person.name}
       />
       <p>
         <b>{person.name}:</b>
         {' ' + person.profession + ' '}
         known for {person.accomplishment}
       </p>
    </li>
  );



//When you make a list of components with map you always need to pass a key prop to each list item.
//It should be a string or number that uniquely identifies it among the other list items.

//Keys tell React which array item each component corresponds to. This is important if your array items can move
//due to sorting, get inserted, or be deleted. A well chosen key helps React assert what happened, and make the proper
//updates to the DOM. 

//You should always include keys in the data you map over for the list. This ensures youre passing a static piece of data
//unique to each list item as the key. An example that would work would be giving an id property to each object in a list
//of objects, each id haveing a different number as its value. 

//If you need to render several dom nodes per list item, you can wrap them in a Fragment component, and pass the key to
//that

import { Fragment } from 'react';

// ...

const listItemss = people.map(person =>
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
);



//Keys must be unique among their list, but not among every list in the application. 

//Keys must not change, so you shouldnt determine them at render. 

//Keys allow React to differentiate components among their siblings in a list, even if their positon in that list changes.
//using the index of the list as the key would not work, becasue anytime a componnet repositioned it would have a different
//key.

//If you dont specify a key React will end up defaulting to index. 

//key is a reserverd keyword in React and you cannot use it as a prop that can be consumed by the component its passed to.

//Remember that if youre passing an object to a component as props, that instead of referencing each key as its own prop
//you can just forward the props and then destructure in the recieving component.

//Instead of
<Recipe  id={recipe.id} name={recipe.name} ingredient={recipe.ingredient}/>

//Do instead
(<Recipe {...recipe} />)

function Recipe({id, name, ingredient}){
    return
}


