import React, { useState, useEffect } from 'react';
import Blog from '../components/Blog';
import Notification from '../components/Notification';
import LoginForm from '../components/LoginForm';
import BlogForm from '../components/BlogForm';
import blogService from '../services/blogs';
import loginService from '../services/login';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [likes, setLikes] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
        setSuccessMessage('a new blog is added')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 4000);
      })
      .catch((error) => {
        console.error('Error adding blog:', error);
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
    } catch (error) {
      setErrorMessage('wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
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
              <LoginForm
                handleLogin={handleLogin}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
              />
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
              <BlogForm
                addBlog={addBlog}
                title={title}
                setTitle={setTitle}
                author={author}
                setAuthor={setAuthor}
                url={url}
                setUrl={setUrl}
                likes={likes}
                setLikes={setLikes}
              />
              <button onClick={() => setBlogFormVisible(false)}>Cancel</button>
            </div>
          )}
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
