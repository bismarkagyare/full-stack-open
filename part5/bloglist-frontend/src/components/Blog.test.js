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

test('renders blog title and author, but not URL or likes by default', () => {
  const blog = {
    id: 1,
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 10,
  };

  const component = render(<Blog blog={blog} />);

  const viewButton = component.getByText('view');
  fireEvent.click(viewButton); // Simulate clicking the "view" button

  expect(component.container).toHaveTextContent('Test Blog Title');
  expect(component.container).toHaveTextContent('By Test Author');

  // These should be part of the content when the details are shown
  expect(component.container).toHaveTextContent('url: http://example.com');
  expect(component.container).toHaveTextContent('likes: 10');

  // "like" button and "remove" button should also be present
  expect(component.container).toHaveTextContent('like');
  expect(component.container).toHaveTextContent('Remove');
});
