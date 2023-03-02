const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  return blogs.reduce((favorite, blog) => {
    if (favorite.likes < blog.likes) {
      return blog;
    } else {
      return favorite;
    }
  });
};

lodash = require("lodash");

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const authors = lodash.countBy(blogs, "author");
  const author = lodash.maxBy(Object.keys(authors), (o) => authors[o]);
  return { author: author, blogs: authors[author] };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const authors = lodash.groupBy(blogs, "author");
  const author = lodash.maxBy(Object.keys(authors), (o) => {
    return lodash.sumBy(authors[o], "likes");
  });
  return {
    author: author,
    likes: lodash.sumBy(authors[author], "likes"),
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
