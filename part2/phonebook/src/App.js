import { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ]);
    const [newName, setNewName] = useState('');

    const handleInputChange = function(e){
        setNewName(e.target.value);
    };
    const handleFormSubmit = function(e){
        e.preventDefault();
        
        const newPerson = { name: newName };
        
        setPersons(persons.concat(newPerson));
        setNewName('');
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
