const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
}, 100000);

test("the unique identifier property of the blog posts is named id", async () => {
  const blogs = await helper.blogsInDb();
  expect(blogs[0].id).toBeDefined();
}, 100000);

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://test.com",
    likes: 0,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).toContain("Test Blog");
}, 100000);

test("if the likes property is missing, it will default to the value 0", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://test.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
}, 100000);

test("if the title and url properties are missing, the backend responds with the status code 400 Bad Request", async () => {
  const newBlog1 = {
    author: "Test Author",
    url: "http://test.com",
    likes: 0,
  };

  const newBlog2 = {
    title: "Test Blog",
    author: "Test Author",
    likes: 0,
  };

  await api.post("/api/blogs").send(newBlog1).expect(400);
  await api.post("/api/blogs").send(newBlog2).expect(400);
}, 100000);

afterAll(async () => {
  await mongoose.connection.close();
});
