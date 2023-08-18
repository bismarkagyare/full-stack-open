const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length);
}, 100000);

test('the first blog is about react patterns', async () => {
  const response = await api.get('/api/blogs');

  const titles = response.body.map((r) => r.title);
  expect(titles).toContain('React patterns');
}, 100000);

test('unique identifier prooperty is named id', async () => {
  const response = await api.get('/api/blogs');
  const ids = response.body.map((r) => r.id);
  ids.forEach((id) => {
    expect(id).toBeDefined();
  });
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
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

// test('likes value defaults to 0 if missing', async () => {
//   const newBlog = {
//     title: 'TDD harms architecture',
//     author: 'Robert C. Martin',
//     url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
//   };

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/);

//   const response = await api.get('/api/blogs');
//   const blogObjects = response.body;

//   const updatedBlogObjects = blogObjects.map((obj) => {
//     if (!obj.likes) {
//       return { ...obj, likes: 0 };
//     }
//     return obj;
//   });

//   updatedBlogObjects.forEach((obj) => {
//     expect(obj.likes).toBe(0);
//   });
// });

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

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToView = blogsAtStart[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(resultBlog).toEqual(blogToView);
});

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.notesInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialNotes.length - 1);

  const titles = blogsAtEnd.map((r) => r.title);

  expect(titles).not.toContain(blogToDelete.title);
});

afterAll(async () => {
  await mongoose.connection.close();
});
