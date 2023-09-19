import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import anecdoteReducer from './reducers/anecdoteReducer.js';
import filterReducer from './reducers/filterReducer.js';
import App from './App.jsx';

const reducer = combineReducers({
  anecdote: anecdoteReducer,
  filter: filterReducer,
});
const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
