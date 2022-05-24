import { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([
	{ name: 'Arto Hellas', number: '040-123456', id: 1 },
	{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
	{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
	{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]);
    const [displayArray, setDisplayArray] = useState(persons);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterValue, setFilterValue] = useState('');

    const handleNewNameChange = function(e){
        setNewName(e.target.value);
    };

    const handleNewNumberChange = function(e){
        setNewNumber(e.target.value);
    };

    const _shallowEqual = function(first, second){
        const firstKeys = Object.getOwnPropertyNames(first);
        const secondKeys = Object.getOwnPropertyNames(second);

        // check for length equality for early return
        if(firstKeys.length !== secondKeys.length) return false;

        // check for key equality and value equality
        return firstKeys.every(key => first[key] === second[key]);
    };

    const _isAdded = function(person){
        // shallow equality will work well enough for our needs
        // this is because the topology of the data is flat

        let containsPerson = false;
        for(let i of persons){
            if(_shallowEqual(person, i)) containsPerson = true;
        }
        return containsPerson;     
    };
    
    const handleFormSubmit = function(e){
        e.preventDefault();
        
        const newPerson = { name: newName, number: newNumber };

        if(!_isAdded(newPerson)){
            setPersons(persons.concat(newPerson));
            setNewName('');
            setNewNumber('');
        } else {
            alert(`${newName} is already added to phonebook`);
        }
    };

    const _filterPersons = function(string, personArray){
        return personArray.filter(({name}) => name.toLowerCase().includes(string.toLowerCase()));
    };

    const handleFilterChange = function(e){
        if(!!e.target.value){
            setDisplayArray(_filterPersons(e.target.value, persons));
        } else {
            setDisplayArray(persons);
        }
        setFilterValue(e.target.value);
    };

    return (
        <div>
          <h2>Phonebook</h2>
          <p>filter shown with <input value={filterValue} onChange={handleFilterChange}/> </p>
          <h2>Add a new person</h2>
          <form>
            <div>
              Name: <input value={newName} onChange={handleNewNameChange} />
              <br/>
              Input: <input value={newNumber} onChange={handleNewNumberChange}/>
            </div>
            <div>
              <button type="submit" onClick={handleFormSubmit}>add</button>
            </div>
          </form>
          <h2>Numbers</h2>
          <ul>
            {displayArray.map(person => <li key={person.name}>{person.name} {person.number}</li> )}
          </ul>
        </div>
    );
};

export default App;
