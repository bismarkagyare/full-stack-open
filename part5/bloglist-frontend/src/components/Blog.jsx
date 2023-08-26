import React, { useState } from 'react';
import '../styles/Blog.css';

const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="blog">
      <h3 className="blog-title">
        {blog.title}{' '}
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? 'hide' : 'view'}
        </button>
      </h3>
      {showAll && (
        <>
          <p className="blog-author">By {blog.author}</p>
          <p className="blog-url">
            URL:
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </a>
          </p>
          <p className="blog-likes">
            Likes: {blog.likes} <button>like</button>
          </p>
        </>
      )}
    </div>
  );
};

export default Blog;
