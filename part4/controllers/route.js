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

module.exports = blogRouter;
