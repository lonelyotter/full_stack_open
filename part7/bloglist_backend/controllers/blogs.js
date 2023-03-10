const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blog);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = request.user;

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: "title or url missing",
    });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
    comments: [],
  });

  const savedBlog = await (
    await blog.save()
  ).populate("user", { username: 1, name: 1 });
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() === user._id.toString()) {
    user.blogs = user.blogs.filter((b) => b.toString() !== blog._id.toString());
    await user.save();
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    response.status(401).json({ error: "blog does not exist" });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate("user", { username: 1, name: 1 });
  response.json(updatedBlog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const comment = request.body.comment;
  const blog = await Blog.findById(request.params.id);
  blog.comments = blog.comments.concat(comment);
  const updatedBlog = await blog.save();
  response.json(updatedBlog);
});

module.exports = blogsRouter;
