import { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({filterValue, filterChangeHandler}) => {
    return (
        <div>
          filter input by: 
          <input
            value={filterValue}
            onChange={filterChangeHandler}
          />
        </div>
    );
};

const PersonForm = ({newName, handleNewNameChange, newNumber, handleNewNumberChange, handleFormSubmit}) => {
    return (
        <form>
          <div>
            Name: <input value={newName} onChange={handleNewNameChange} />
             <br/>
            Number: <input value={newNumber} onChange={handleNewNumberChange}/>
          </div>
          <div>
            <button type="submit" onClick={handleFormSubmit}>add</button>
          </div>
        </form>
    );
};

const Persons = ({person}) => {
    return (
        <li key={person.name}>{person.name} {person.number}</li>
    );
};


// DUMMY DATA
/*
  { name: 'Arto Hellas', number: '040-123456', id: 1 },
  { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
*/

const App = () => {
    const [persons, setPersons] = useState([
    ]);
    const [displayArray, setDisplayArray] = useState(persons);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/persons')
            .then((res) => {
                setPersons(res.data);
                // quick hack to set the displayArray to the personArray
                setDisplayArray(res.data);
            });
    }, []);

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
          <Filter
            filterValue={filterValue}
            filterChangeHandler={handleFilterChange}
          />
          <h2>Add a new person</h2>
          <PersonForm
            newName={newName}
            handleNewNameChange={handleNewNameChange}
            newNumber={newNumber}
            handleNewNumberChange={handleNewNumberChange}
            handleFormSubmit={handleFormSubmit}
          />
          <h2>Numbers</h2>
          <ul>
            {displayArray.map(person => <Persons person={person} key={person.name} /> )}
          </ul>
        </div>
    );
};

export default App;
