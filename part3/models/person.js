const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;
console.log('Connecting to ', url);

mongoose
  .connect(url)
  .then((result) => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.log('Error connecting to database', error.message);
  });

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      minLength: 3,
      required: true,
    },
    number: String,
  },
  {
    collection: 'people',
  }
);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
