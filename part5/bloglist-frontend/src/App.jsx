import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [sortedBlogs, setSortedBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const [blogFormVisible, setBlogFormVisible] = useState(false);

  //prettier-ignore
  useEffect(() => {
    blogService
      .getAll()
      .then((initialBlogs) => {
        setBlogs(initialBlogs)
        const sorted = sortBlogsByLikes(initialBlogs);
        setSortedBlogs(sorted);
      });
  }, []);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const sortBlogsByLikes = (blogs) => {
    return [...blogs].sort((a, b) => b.likes - a.likes);
  };

  //prettier-ignore
  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setSuccessMessage('a new blog is added')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 4000);
        setBlogFormVisible(false)
      })
      .catch((error) => {
        console.error('Error adding blog:', error);
      });
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setIsLoggedIn(true);
    } catch (error) {
      setErrorMessage('wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }
  };

  const handleLike = async (id) => {
    const blogToLike = blogs.find((blog) => blog.id === id);
    const updatedBlog = { ...blogToLike, likes: blogToLike.likes + 1 };

    try {
      //update the blog on the server side
      //returnedBlog is the result object if request is successful
      const returnedBlog = await blogService.update(id, updatedBlog);
      setBlogs(blogs.map((blog) => (blog.id === id ? returnedBlog : blog)));
      setSortedBlogs(sortBlogsByLikes(blogs));
    } catch (error) {
      console.error('Error handling like', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Do you really want to delete this blog?')) {
      try {
        await blogService.deleteBlog(id);
        setBlogs(blogs.filter((blog) => blog.id !== id));
        setSortedBlogs(sortBlogsByLikes(blogs));
      } catch (error) {
        console.error('Error deleting blog', error);
      }
    }
  };

  const logout = () => {
    blogService.setToken(null);
    window.localStorage.removeItem('loggedBlogUser');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />

      {!isLoggedIn ? (
        <div>
          {!loginVisible ? (
            <button onClick={() => setLoginVisible(true)}>Login</button>
          ) : (
            <div>
              <LoginForm handleLogin={handleLogin} />
              <button onClick={() => setLoginVisible(false)}>Cancel</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={logout}>logout</button>
          </p>

          {!blogFormVisible ? (
            <button onClick={() => setBlogFormVisible(true)}>New Blog</button>
          ) : (
            <div>
              <BlogForm addBlog={addBlog} />
              <button onClick={() => setBlogFormVisible(false)}>Cancel</button>
            </div>
          )}
        </div>
      )}

      <div>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
