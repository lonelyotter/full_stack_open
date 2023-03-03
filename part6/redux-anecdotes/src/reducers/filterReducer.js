const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    default:
      return state;
  }
};

export const filterAnecdotes = (filterWords) => {
  return {
    type: "SET_FILTER",
    payload: filterWords,
  };
};

export default filterReducer;
