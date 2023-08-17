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

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const authorLikesCount = _.groupBy(blogs, 'author');

  const authorTotalLikes = _.mapValues(authorLikesCount, (blogsByAuthor) =>
    _.sumBy(blogsByAuthor, 'likes')
  );

  const mostLikedAuthor = _.maxBy(
    Object.keys(authorTotalLikes),
    (author) => authorTotalLikes[author]
  );

  return {
    author: mostLikedAuthor,
    likes: authorTotalLikes[mostLikedAuthor],
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };

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

// const mostLikes = (blogs) => {
//   if (blogs.length === 0) return null;

//   const authorLikesCount = {};

//   blogs.forEach((blog) => {
//     if (authorLikesCount[blog.author]) {
//       authorLikesCount[blog.author] += blog.likes;
//     } else {
//       authorLikesCount[blog.author] = blog.likes;
//     }
//   });

//   let mostLikedAuthor = '';
//   let totalLikesByAuthor = 0;

//   for (const author in authorLikesCount) {
//     if (authorLikesCount[author] > totalLikesByAuthor) {
//       mostLikedAuthor = author;
//       totalLikesByAuthor = authorLikesCount[author];
//     }
//   }

//   return { author: mostLikedAuthor, likes: totalLikesByAuthor };
// };
