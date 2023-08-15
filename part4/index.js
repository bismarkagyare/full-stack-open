const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const blogs = [
  {
    title: 'Modern Family',
    author: 'Phil Dunphy',
    url: 'www.modernfamily.com',
    likes: 23,
  },
  {
    title: 'Game of Thrones',
    author: 'George Martin',
    url: 'www.gameofthrones.com',
    likes: 12,
  },
];

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/blogs', (request, response) => {
  response.json(blogs);
});

app.post('/api/blogs', (request, response) => {
  const blog = request.body;
  console.log(blog);
  response.json(blog);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
