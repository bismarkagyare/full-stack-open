const blogRouter = require('express').Router();
const Blog = require('../models/blog');

// blogRouter.get('/', (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(204);
  }
});

// blogRouter.post('/', (request, response) => {
//   const blog = new Blog(request.body);
//   blog.save().then((savedBlog) => {
//     response.status(201).json(savedBlog);
//   });
// });

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body;
  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = blogRouter;
