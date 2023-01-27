const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");

jest.setTimeout(100000);

const Blog = require("../models/blog");
const User = require("../models/user");

describe("previous deprecated test", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });
  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("the unique identifier property of the blog posts is named id", async () => {
    const blogs = await helper.blogsInDb();
    expect(blogs[0].id).toBeDefined();
  });

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
  });

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
  });

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
  });

  test("delete a blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });

  test("update a blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);

    const savedBlog = await Blog.findById(blogToUpdate.id);
    expect(savedBlog.likes).toBe(updatedBlog.likes);
  });
});

describe("current test", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("root", 10);
    const user = User({
      username: "root",
      name: "root",
      passwordHash,
    });
    await user.save();
  });

  test("a valid blog can be added", async () => {
    const loginUser = {
      username: "root",
      password: "root",
    };

    const login = await api
      .post("/api/login")
      .send(loginUser)
      .expect("Content-Type", /application\/json/);

    const token = login.body.token;

    const newBlog = {
      title: "Test Blog",
      author: "Test Author",
      url: "http://test.com",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain("Test Blog");
  });

  test("adding a blog fails if a token is not provided", () => {
    const newBlog = {
      title: "Test Blog",
      author: "Test Author",
      url: "http://test.com",
      likes: 0,
    };

    api.post("/api/blogs").send(newBlog).expect(401);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
