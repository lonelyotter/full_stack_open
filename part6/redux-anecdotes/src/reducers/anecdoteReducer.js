import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    updateAnecdote(state, action) {
      const id = action.payload.id;
      const updatedAnecdote = action.payload;
      return state.map((a) => (a.id !== id ? a : updatedAnecdote));
    },
  },
});

export const { setAnecdotes, appendAnecdote, updateAnecdote } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes;
    const anecdoteToVote = anecdotes.find((a) => a.id === id);
    const updatedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1,
    };
    const returnedAnecdote = await anecdoteService.update(id, updatedAnecdote);
    dispatch(updateAnecdote(returnedAnecdote));
  };
};

export default anecdoteSlice.reducer;
