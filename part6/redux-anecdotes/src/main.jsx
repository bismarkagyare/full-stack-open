import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import anecdoteReducer from './reducers/anecdoteReducer.js';
import filterReducer from './reducers/filterReducer.js';
import App from './App.jsx';

const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    filter: filterReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
