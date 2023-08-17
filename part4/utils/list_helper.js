const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  let favorite = blogs[0];
  for (const blog of blogs) {
    if (blog.likes > favorite.likes) {
      favorite = blog;
    }
  }

  return favorite;
};

const mostBlogs = (blogs) => {
  const authorCounts = _.countBy(blogs, 'author');

  const topAuthor = _.maxBy(
    _.keys(authorCounts),
    (author) => authorCounts[author]
  );

  const maxBlogs = authorCounts[topAuthor];

  return { author: topAuthor, blogs: maxBlogs };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };

// const mostBlogs = (blogs) => {
//   if (blogs.length === 0) return null;

//   const authorCount = {};

//   blogs.forEach((blog) => {
//     if (authorCount[blog.author]) {
//       authorCount[blog.author]++;
//     } else {
//       authorCount[blog.author] = 1;
//     }
//   });

//   let topAuthor = '';
//   let maxBlogs = 0;

//   for (const author of authorCount) {
//     if (authorCount[author] > maxBlogs) {
//       topAuthor = author;
//       maxBlogs = authorCount[author];
//     }
//   }

//   return { author: topAuthor, blogs: maxBlogs };
// };
