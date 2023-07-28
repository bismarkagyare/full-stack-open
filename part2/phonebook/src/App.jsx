/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Filter from './Components/Filter';
import PersonForm from './Components/PersonForm';
import Persons from './Components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '983-3459083', id: 1 },
    { name: 'Kawtar Barouti', number: '337-2345876', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const addName = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  };

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterInput = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterValue} onChange={handleFilterInput} />
      <h2>Add a new item</h2>
      <PersonForm
        onSubmit={addName}
        newName={newName}
        handleNameInput={handleNameInput}
        newNumber={newNumber}
        handleNumberInput={handleNumberInput}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterValue={filterValue} />
    </div>
  );
};

export default App;
