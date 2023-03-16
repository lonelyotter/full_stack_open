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

router.get("/", async (req, res) => {
  const readingLists = await ReadingList.findAll({});

  res.json(readingLists);
});

router.put("/:id", async (req, res, next) => {
  if (!req.decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const id = req.params.id;
  const readingList = await ReadingList.findByPk(id);

  if (!readingList) {
    return res.status(404).json({ error: "reading list not found" });
  }

  if (readingList.userId !== req.decodedToken.id) {
    return res
      .status(401)
      .json({ error: "can not update other user's reading list" });
  }

  const unread = req.body.unread;

  readingList.unread = unread;
  try {
    const savedReadingList = await readingList.save();
    res.json(savedReadingList);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
