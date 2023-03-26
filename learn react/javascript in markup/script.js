//Sometimes you want to add js logic or reference a dynamic value in your JSX. You do this by 
//wrapping the js in curly braces. Curly braces tell React youd like to escape into js land and embed the value 
//returned into the markup.

var greeting = 'Hello!'
return (
    <h1>{greeting}</h1>
)

//If youd like to pass string values to attributes you do so with single or double quotes.

export default function Avatar() {
    return (
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
    );
  }

//If youd like to dynamically pass a value you could do so with a js variable, this requires you to escape into js 
//land with curly braces though.

export default function Avatar() {
    const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
    const description = 'Gregorio Y. Zara';
    return (
      <img
        className="avatar"
        src={avatar}
        alt={description}
      />
    );
  }

//jsx is a special way to write js, so you can actually use js inside it, by wrapping the js in {}

export default function TodoList() {
    const name = 'Gregorio Y. Zara';
    return (
      <h1>{name}'s To Do List</h1>
    );
  }

//Any valid js expression will work inside curly braces, including function calls. 

const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(date);
}

export default function TodoList() {
  return (
    <h1>To Do List for {formatDate(today)}</h1>
  );
}

//If you see {{}} for your attributes, just know its an object being passed as the value

export default function TodoList() {
    return (
      <ul style={{
        backgroundColor: 'black',
        color: 'pink'
      }}>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    );
  }

//Again, you can utilize any valid js expression in {} for JSX, expressions are any block of js code that evaluates to 
//a value, this makes an object an expression. 

//To make your embedded expression more declarative you could define them all in an object, and pass that object around,
//instead of having individual varaiables.

const person = {
    name: 'Gregorio Y. Zara',
    theme: {
      backgroundColor: 'black',
      color: 'pink'
    }
  };

  export default function TodoList() {
    return (
      <div style={person.theme}>
        <h1>{person.name}'s Todos</h1>
        <img
          className="avatar"
          src="https://i.imgur.com/7vQD0fPs.jpg"
          alt="Gregorio Y. Zara"
        />
        <ul>
          <li>Improve the videophone</li>
          <li>Prepare aeronautics lectures</li>
          <li>Work on the alcohol-fuelled engine</li>
        </ul>
      </div>
    );
  }
  
