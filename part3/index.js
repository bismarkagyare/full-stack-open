require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

app.use(express.static('dist'));
app.use(express.json());
app.use(cors());
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

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get('/info', (req, res) => {
  const timestamp = res.locals.timestamp;
  const personsCount = res.locals.personsCount;
  res.send(
    `Phonebook has info for ${personsCount} people<br>The request was received at: ${timestamp}`
  );
});

app.post('/api/persons', (req, res) => {
  // Extract the body of the req
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({
      error: 'both name and number is required',
    });
  }

  Person.findOne({ name: name })
    .then((existingPerson) => {
      if (existingPerson) {
        res.status(409).json({ error: 'Name already exists' });
      } else {
        const person = new Person({
          name: name,
          number: number,
        });

        person.save().then((savedPerson) => {
          res.json(savedPerson);
        });
      }
    })
    .catch((error) => {
      console.log('Error checking existing person:', error.message);
      res.status(500).send('Internal Server Error');
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
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
