require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const Blog = require('./models/blog');

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);
  blog.save().then((savedBlog) => {
    response.status(201).json(savedBlog);
  });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
