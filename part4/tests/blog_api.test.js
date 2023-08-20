const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');

describe('Blog API tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
  });

  describe('GET /api/blogs', () => {
    test('returns blogs as JSON', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('returns all blogs', async () => {
      const response = await api.get('/api/blogs');
      expect(response.body).toHaveLength(helper.initialBlogs.length);
    });

    test('first blog is about react patterns', async () => {
      const response = await api.get('/api/blogs');
      const titles = response.body.map((r) => r.title);
      expect(titles).toContain('React patterns');
    });

    test('blogs have unique identifier named id', async () => {
      const response = await api.get('/api/blogs');
      const ids = response.body.map((r) => r.id);
      ids.forEach((id) => {
        expect(id).toBeDefined();
      });
    });
  });

  describe('addition of a blog', () => {
    test('adds a valid blog', async () => {
      const newBlog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
        likes: 10,
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const response = await api.get('/api/blogs');
      const titles = response.body.map((r) => r.title);
      expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
      expect(titles).toContain('First class tests');
    });

    test('likes property defaults to 0 if missing', async () => {
      const newBlog = {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      };

      const response = await api.post('/api/blogs').send(newBlog);

      expect(response.status).toBe(201);
      expect(response.body.likes).toBe(0);

      const allBlogs = await api.get('/api/blogs');
      const addedBlog = allBlogs.body.find(
        (blog) => blog.title === 'TDD harms architecture'
      );

      expect(addedBlog.likes).toBe(0);
    });

    test('missing title results in 400 Bad Request', async () => {
      const newBlog = {
        author: 'John Doe',
        url: 'http://example.com',
        likes: 10,
      };

      await api.post('/api/blogs').send(newBlog).expect(400);
    });

    test('missing url results in 400 Bad Request', async () => {
      const newBlog = {
        title: 'Test Blog',
        author: 'Jane Doe',
        likes: 10,
      };

      await api.post('/api/blogs').send(newBlog).expect(400);
    });
  });

  describe('viewing a specific blog', () => {
    test('can view a specific blog', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToView = blogsAtStart[0];

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      expect(resultBlog.body).toEqual(blogToView);
    });
  });

  describe('deletion of a blog', () => {
    test('can delete a blog', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

      const titles = blogsAtEnd.map((r) => r.title);

      expect(titles).not.toContain(blogToDelete.title);
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
