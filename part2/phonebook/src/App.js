import { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ]);
    const [newName, setNewName] = useState('');

    const handleInputChange = function(e){
        setNewName(e.target.value);
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
        
        const newPerson = { name: newName };

        if(!_isAdded(newPerson)){
            setPersons(persons.concat(newPerson));
            setNewName('');
        } else {
            alert(`${newName} is already added to phonebook`);
        }
    };

    return (
        <div>
          <h2>Phonebook</h2>
          <form>
            <div>
              Name: <input value={newName} onChange={handleInputChange} />
            </div>
            <div>
              <button type="submit" onClick={handleFormSubmit} >add</button>
            </div>
          </form>
          <h2>Numbers</h2>
          <ul>
            {persons.map(person => <li key={person.name}>{person.name}</li> )}
          </ul>
        </div>
    );
};

export default App;
