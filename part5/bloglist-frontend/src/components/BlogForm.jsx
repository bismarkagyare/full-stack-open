import { useState } from 'react';

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [likes, setLikes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: likes,
    };
    addBlog(blogObject);
    setTitle('');
    setAuthor('');
    setUrl('');
    setLikes('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>create new blogs</h2>
      <div>
        title
        <input
          type="text"
          value={title}
          name="title"
          id="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="author"
          id="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="url"
          id="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div>
        likes
        <input
          type="text"
          value={likes}
          name="likes"
          id="likes"
          onChange={({ target }) => setLikes(target.value)}
        />
      </div>
      <button id="submit-btn" type="submit">
        create
      </button>
    </form>
  );
};

export default BlogForm;
