//Just like when updating an object state you want to keep array state immutable, so you should pass in a new array 
//or a copy of the old one.

//Some ways to update array state without mutation.

//Use non mutating methods to pass in a new copy of the array, such as filter, map, and slice. 

//When adding items avoid push and unshift, instead do concat or [itemBeg, ...arr, itemEnd] syntax

//When removing items avoid pop, shift, and splice. instead do filter or slice.

//When replacing items avoid splice, or arr[i] assignment. instead do map

//When sorting avoid reverse or sort directly on the state. instead copy the array first and reverse or sort on the copy.



//Slice and splice are named very similarily, but are different. Slice lets you copy a part of or the whole array.
//Splice mutates parts of the array.



//If youd like to insert into a specific index of an array you shhould use ... along with slice.

import { useState } from 'react';

let nextId = 3;
const initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState(
    initialArtists
  );

  function handleClick() {
    const insertAt = 1; // Could be any index
    const nextArtists = [
      // Items before the insertion point:
      ...artists.slice(0, insertAt),
      // New item:
      { id: nextId++, name: name },
      // Items after the insertion point:
      ...artists.slice(insertAt)
    ];
    setArtists(nextArtists);
    setName('');
  }

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleClick}>
        Insert
      </button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}



//You shouldnt mutate state directly, but you can copy state, and mutate the copy.

import { useState } from 'react';

const initialList = [
  { id: 0, title: 'Big Bellies' },
  { id: 1, title: 'Lunar Landscape' },
  { id: 2, title: 'Terracotta Army' },
];

export default function List() {
  const [list, setList] = useState(initialList);

  function handleClick() {
    const nextList = [...list];
    nextList.reverse();
    setList(nextList);
  }

  return (
    <>
      <button onClick={handleClick}>
        Reverse
      </button>
      <ul>
        {list.map(artwork => (
          <li key={artwork.id}>{artwork.title}</li>
        ))}
      </ul>
    </>
  );
}

//However, copying is a shallow operation. You only copy the object your referencing, but not the objects that that object
//references. So the below code actually mutates the state. This is because when you copy an array of objects your not
//copying the objects in the array your copying references to those objects. So mutating that object in the copy would
//mutate it in the original as well. 

const nextList = [...list];
nextList[0].seen = true; // Problem: mutates list[0]
setList(nextList);

//nextList[0] and list[0] point to the same object. So by changing nextList[0].seen you are also changing list[0].seen 
//You can solve this similarily to how you should update nested objects.



//If you have to update state more than a few levels deep you should use Immer.


