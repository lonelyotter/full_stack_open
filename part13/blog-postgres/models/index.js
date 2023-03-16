const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./reading_list");
const BlogReadingList = require("./blog_reading_list");

User.hasMany(Blog);
Blog.belongsTo(User);

ReadingList.belongsToMany(Blog, {
  through: BlogReadingList,
});

Blog.belongsToMany(ReadingList, {
  through: BlogReadingList,
});

module.exports = {
  Blog,
  User,
  ReadingList,
  BlogReadingList,
};
