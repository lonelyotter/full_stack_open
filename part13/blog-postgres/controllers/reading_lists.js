const router = require("express").Router();

const { Blog, User, ReadingList } = require("../models");

router.post("/", async (req, res) => {
  const { blogId, userId } = req.body;
  console.log(blogId, userId);
  const blog = await Blog.findByPk(blogId);
  const user = await User.findByPk(userId);
  if (!blog || !user) {
    return res.status(404).json({ error: "blog or user not found" });
  }
  const existingReadingList = await ReadingList.findOne({
    where: { blogId, userId },
  });
  if (existingReadingList) {
    return res.status(400).json({ error: "reading list already exists" });
  }
  const readingList = await ReadingList.create({ blogId, userId });
  res.json(readingList);
});

module.exports = router;
