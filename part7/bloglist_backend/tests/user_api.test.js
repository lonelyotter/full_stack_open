const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");

jest.setTimeout(100000);

const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("root", 10);
  const user = User({
    username: "root",
    name: "root",
    passwordHash,
  });
  await user.save();
});

test("creation succeeds with a fresh username", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "test",
    name: "test",
    password: "test",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

  const usernames = usersAtEnd.map((user) => user.username);
  expect(usernames).toContain(newUser.username);
});

test("creation fails with proper statuscode and message if username has already been taken", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "root",
    name: "root",
    password: "root",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/)
    .expect((res) => {
      expect(res.body.error).toContain("`username` to be unique");
    });

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toHaveLength(usersAtStart.length);
});

test("creation fails with proper statuscode and message if username is too short", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "te",
    name: "test",
    password: "test",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/)
    .expect((res) => {
      expect(res.body.error).toContain(
        "username must be at least 3 characters long"
      );
    });

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toHaveLength(usersAtStart.length);
});

test("creation fails with proper statuscode and message if password is too short", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "test",
    name: "test",
    password: "te",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/)
    .expect((res) => {
      expect(res.body.error).toContain(
        "password must be at least 3 characters long"
      );
    });

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toHaveLength(usersAtStart.length);
});

afterAll(async () => {
  await mongoose.connection.close();
});
