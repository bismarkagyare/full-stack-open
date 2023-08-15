const express = require('express');
const app = express();
const cors = require('cors');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const config = require('./utils/config');
const personsRouter = require('./controllers/route');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

logger.info('Connecting to ', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    logger.info('Connected to database');
  })
  .catch((error) => {
    logger.info('Error connecting to database', error.message);
  });

app.use(express.static('dist'));
app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);

const addTimestampAndPersonsCount = (req, res, next) => {
  res.locals.timestamp = new Date().toLocaleString();
  res.locals.personsCount = persons.length;
  next();
};

app.use('/api/persons', personsRouter);

app.use(addTimestampAndPersonsCount);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
