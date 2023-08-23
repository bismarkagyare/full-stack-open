import React, { useState, useEffect } from 'react';
import Blog from '../components/Blog';
import blogService from '../services/blogs';
import loginService from '../services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [likes, setLikes] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  //prettier-ignore
  useEffect(() => {
    blogService
      .getAll()
      .then((initialBlogs) => {
        setBlogs(initialBlogs)
      });
  }, []);

  //prettier-ignore
  const addBlog = (e) => {
    e.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: likes,
    };

    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setTitle('');
        setAuthor('');
        setUrl('');
        setLikes('');
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = loginService.login({ username, password });
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };

  const blogForm = () => {
    return (
      <form onSubmit={addBlog}>
        <h2>create new blogs</h2>
        <div>
          title
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          likes
          <input
            type="text"
            value={likes}
            name="likes"
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    );
  };

  return (
    <div>
      <h2>Blogs</h2>
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          {blogForm()}
        </div>
      )}

      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
