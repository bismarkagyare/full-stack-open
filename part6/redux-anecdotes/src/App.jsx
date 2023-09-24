import { useEffect } from 'react';
import NewAnecdote from './components/AnecdoteForm';
import Anecdotes from './components/AnecdotesList';
import Filter from './components/Filter';
import anecdoteService from './services/anecdotes';
import { setAnecdotes } from './reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  //prettier-ignore
  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Anecdotes />
      <h2>create new</h2>
      <NewAnecdote />
    </div>
  );
};

export default App;
