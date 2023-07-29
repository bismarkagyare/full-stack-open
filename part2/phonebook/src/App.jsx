/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');

  //prettier-ignore
  const hook = () => {
    personService
      .getAll()
      .then(initialDetails => {
        setPersons(initialDetails)
      });
  };

  useEffect(hook, []);

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

      personService.create(personObject).then((initialDetails) => {
        setPersons(persons.concat(initialDetails));
        setNewName('');
        setNewNumber('');
      });
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
