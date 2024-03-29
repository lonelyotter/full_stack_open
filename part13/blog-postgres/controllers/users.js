const router = require("express").Router();

const { User, Blog } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
        attributes: { exclude: ["userId"] },
      },
    ],
  });
  res.json(users);
});

router.get("/:id", async (req, res, next) => {
  try {
    let where = {};
    if (req.query.read) {
      where.unread = req.query.read === "false";
    }

    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["id"] },
      include: [
        {
          model: Blog,
          as: "readings",
          attributes: { exclude: ["userId"] },
          through: { as: "readinglists", attributes: ["id", "unread"], where },
        },
      ],
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });
    user.username = req.body.username;
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
