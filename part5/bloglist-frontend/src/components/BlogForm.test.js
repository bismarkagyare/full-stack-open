import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';
jest.mock('../styles/Blog.css', () => ({}));

test('A new blog is created', () => {
  const addBlog = jest.fn();

  const component = render(<BlogForm addBlog={addBlog} />);

  const input = component.container.querySelector('.input');
  const form = component.container.querySelector('form');

  fireEvent.change(input, {
    target: { value: 'React Patterns' },
  });
  fireEvent.submit(form);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe('React Patterns');
});
