require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));
app.use(morgan('dev'));

morgan.token('req-body', (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :req-body'
  )
);

const addTimestampAndPersonsCount = (req, res, next) => {
  res.locals.timestamp = new Date().toLocaleString();
  res.locals.personsCount = persons.length;
  next();
};

app.get('/', (req, res) => {
  res.send('<h1>hi there, im learning express</h1>');
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log('Error fetching person:', error.message);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/info', (req, res) => {
  const timestamp = res.locals.timestamp;
  const personsCount = res.locals.personsCount;
  res.send(
    `Phonebook has info for ${personsCount} people<br>The request was received at: ${timestamp}`
  );
});

app.post('/api/persons', (req, res) => {
  //extract the body of the req
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({
      error: 'both name and number is required',
    });
  }

  const existingPerson = persons.find((person) => person.name === name);
  if (existingPerson) {
    res.status(409).json({ error: 'Name already exist' });
  }

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Internal Server Error');
    });
});

app.use(addTimestampAndPersonsCount);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
