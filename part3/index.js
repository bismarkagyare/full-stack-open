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
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
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

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  // Check if there's a person with the same name as the updated name
  Person.findOne({ name: name })
    .then((existingPerson) => {
      // If a person with the same name exists, and it's not the same person being updated
      if (existingPerson && existingPerson.id.toString() !== req.params.id) {
        // Send a 409 Conflict response indicating that the name already exists
        return res.status(409).json({ error: 'Name already exists' });
      }

      // If the name is unique or the same person is being updated, proceed to update
      const person = {
        name: name,
        number: number,
      };

      // Update the person's information in the database
      Person.findByIdAndUpdate(req.params.id, person, {
        new: true,
        runValidators: true,
        context: 'query',
      })
        .then((updatedPerson) => {
          // Send the updated person's information as the response
          res.json(updatedPerson);
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
