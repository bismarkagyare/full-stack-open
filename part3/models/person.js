const mongoose = require('mongoose');

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      minLength: 3,
      required: true,
    },
    number: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Custom validation logic
          return /^\d{2,3}-\d+$/.test(value);
        },
        message: 'Invalid phone number format',
      },
    },
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
