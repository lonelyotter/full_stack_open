import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("when blog is created, callback has correct data", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const blogToCreate = {
    title: "The title of the blog",
    author: "Song Haochen",
    url: "https://www.google.com",
  };

  const titleInput = screen.getByPlaceholderText("title of the blog");
  await user.type(titleInput, blogToCreate.title);

  const authorInput = screen.getByPlaceholderText("author of the blog");
  await user.type(authorInput, blogToCreate.author);

  const urlInput = screen.getByPlaceholderText("url of the blog");
  await user.type(urlInput, blogToCreate.url);

  const createButton = screen.getByText("create");
  await user.click(createButton);

  expect(createBlog.mock.calls[0][0]).toEqual(blogToCreate);
});
