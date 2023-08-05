const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
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

//add timestamp middleware
const addTimestampAndPersonsCount = (req, res, next) => {
  res.locals.timestamp = new Date().toLocaleString();
  res.locals.personsCount = persons.length;
  next();
};

app.use(addTimestampAndPersonsCount);

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/', (req, res) => {
  res.send('<h1>hi there, im learning express</h1>');
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

//prettier-ignore
const generatedId = () => {
  const maxId = persons.length > 0 
    ? Math.max(...persons.map(p => p.id))
    : 0;
  return maxId + 1;
};

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

  const person = {
    name: name,
    number: number,
    id: generatedId(),
  };

  persons = persons.concat(person);

  console.log(req.body);
  res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.get('/info', (req, res) => {
  const timestamp = res.locals.timestamp;
  const personsCount = res.locals.personsCount;
  res.send(
    `Phonebook has info for ${personsCount} people<br>The request was received at: ${timestamp}`
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
