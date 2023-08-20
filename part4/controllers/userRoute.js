const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || !password) {
    response.status(400).json({ error: 'both name and password is required' });
  }

  if (username.length < 3 || password.length < 3) {
    response
      .status(400)
      .json({ error: 'both should be at least 3 characters' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, name, passwordHash });
  const savedUser = user.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
