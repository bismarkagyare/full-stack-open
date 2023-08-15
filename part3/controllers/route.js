const personsRouter = require('express').Router();
const Person = require('../models/person');

personsRouter.get('/', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

personsRouter.get('/:id', (req, res, next) => {
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

personsRouter.post('/', (req, res) => {
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

personsRouter.put('/:id', (req, res, next) => {
  const { name, number } = req.body;

  Person.findOne({ name: name })
    .then((existingPerson) => {
      if (existingPerson && existingPerson.id.toString() !== req.params.id) {
        return res.status(409).json({ error: 'Name already exists' });
      }

      const person = {
        name: name,
        number: number,
      };

      Person.findByIdAndUpdate(req.params.id, person, {
        new: true,
        runValidators: true,
        context: 'query',
      })
        .then((updatedPerson) => {
          res.json(updatedPerson);
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

personsRouter.delete('/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = personsRouter;
