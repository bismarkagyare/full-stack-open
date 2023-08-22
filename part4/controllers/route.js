const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
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

blogRouter.post('/', async (request, response) => {
  try {
    const body = request.body;
    const token = request.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    response.status(500).json({ error: 'An error occurred' });
  }
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

blogRouter.delete('/:id', async (request, response) => {
  const body = request.body;
  const token = body.token;

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.id;

    const user = await User.findById(userId);
    if (!user) {
      response.status(401).json({ error: 'invalid token' });
    }

    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      response.status(401).json({ error: 'blog not found' });
    }

    if (blog.user.toString() === userId) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      return response.status(403).json({ error: 'unauthorized' });
    }
  } catch (error) {
    return response.status(401).json({ error: 'invalid token' });
  }
});

module.exports = blogRouter;
