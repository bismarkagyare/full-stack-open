import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';
jest.mock('../styles/Blog.css', () => ({}));

// test('renders blog', () => {
//   const blog = {
//     title: 'Blog Test',
//     author: 'Mark',
//     url: 'www.mark.com',
//     likes: 12,
//   };

//   render(<Blog blog={blog} />);

//   const title = screen.getByText('Blog Test');
//   expect(title).toBeDefined();
// });

describe('Blog components tests', () => {
  const blog = {
    id: 1,
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 10,
  };

  const mockLikeBlog = jest.fn();
  const mockDeleteBlog = jest.fn();

  test('clicking the view button displays the details', () => {
    const component = render(
      <Blog
        blog={blog}
        handleLike={mockLikeBlog}
        handleRemove={mockDeleteBlog}
      />
    );

    const button = component.getByText('view');
    fireEvent.click(button);

    expect(component.container).toHaveTextContent('http://example.com');
    expect(component.container).toHaveTextContent('10');
    expect(component.container).toHaveTextContent('Test Author');
  });

  test('renders title', () => {
    const component = render(
      <Blog
        blog={blog}
        handleLike={mockLikeBlog}
        handleRemove={mockDeleteBlog}
      />
    );

    expect(component.container).toHaveTextContent('Test Blog Title');
  });
});
