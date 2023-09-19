import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdote);
  const filter = useSelector((state) => state.filter);

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );
  const sortedAnecdotes = [...filteredAnecdotes].sort(
    (a, b) => b.votes - a.votes
  );

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(voteAnecdote(anecdote.id))}
        />
      ))}
    </div>
  );
};

export default Anecdotes;
