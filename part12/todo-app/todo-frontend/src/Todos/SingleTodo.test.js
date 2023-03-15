import React from "react";
import { render, screen } from "@testing-library/react";
import SingleTodo from "./SingleTodo";
import userEvent from "@testing-library/user-event";

test("renders a todo", async () => {
  const onClickDelete = jest.fn();
  const onClickComplete = jest.fn();
  const todo = { text: "test", done: false };
  render(
    <SingleTodo
      todo={todo}
      onClickDelete={onClickDelete}
      onClickComplete={onClickComplete}
    />
  );

  const deleteButton = screen.getByText("Delete");
  userEvent.click(deleteButton);
  expect(onClickDelete).toHaveBeenCalledWith(todo);
});
