import { useSelector, useDispatch } from "react-redux";

import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filterWords }) => {
    return anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filterWords.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes);
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));
    const anecdote = anecdotes.find((a) => a.id === id);
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
  };

  return (
    <div>
      {" "}
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
