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
    const existingPerson = persons.find((person) => person.name === newName);
    const confirmReplacement = existingPerson
      ? window.confirm(
          `${newName} already added to phonebook, replace the old number with a new one?`
        )
      : false;
    if (existingPerson && confirmReplacement) {
      replaceExistingNumber(existingPerson.id);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService.create(personObject).then((initialDetails) => {
        setPersons(persons.concat(initialDetails));
        setNewName('');
        setNewNumber('');
      });
    }
  };

  const replaceExistingNumber = (id) => {
    const person = persons.find((person) => person.id === id);
    const updatedPerson = { ...person, number: newNumber };
    personService.update(id, updatedPerson).then((returnedDetails) => {
      setPersons(persons.map((p) => (p.id === id ? returnedDetails : p)));
      setNewName('');
      setNewNumber('');
    });
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (personToDelete && window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error('Error deleting person:', error);
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
      <Persons
        persons={persons}
        filterValue={filterValue}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
