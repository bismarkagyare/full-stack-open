const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(initialBlogs.length);
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

test('a valid blog is added', async () => {
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
  expect(response.body).toHaveLength(initialBlogs.length + 1);
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

afterAll(async () => {
  await mongoose.connection.close();
});
