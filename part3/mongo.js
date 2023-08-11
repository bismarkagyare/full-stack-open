/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];
const dbName = 'phonebookDB';

const url = `mongodb+srv://bismarkagyare54:${password}@phonebookcluster.vri7zmh.mongodb.net/${dbName}?retryWrites=true&w=majority`;

console.log('Connecting to the database...');

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  // List all entries in the phonebook
  console.log('Phonebook entries:');
  Person.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  // Add a new entry to the phonebook
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then(() => {
    console.log(`Added ${name} with number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log('Usage: node mongo.js <password>');
  console.log('Usage: node mongo.js <password> <name> <number>');
  process.exit(1);
}
