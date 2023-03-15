import React from "react";
import SingleTodo from "./SingleTodo";

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo);
  };

  const onClickComplete = (todo) => () => {
    completeTodo(todo);
  };

  return (
    <>
      {todos
        .map((todo) => (
          <SingleTodo
            todo={todo}
            onClickDelete={onClickDelete}
            onClickComplete={onClickComplete}
          />
        ))
        .reduce((acc, cur) => [...acc, <hr />, cur], [])}
    </>
  );
};

export default TodoList;
