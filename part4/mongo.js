const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];
const dbName = 'bloglistDB';

const url = `mongodb+srv://bismarkagyare100:${password}@cluster0.up4nj7p.mongodb.net/${dbName}?retryWrites=true&w=majority`;

console.log('Connecting to the database...');

mongoose.set('strictQuery', false);
mongoose.connect(url);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

if (process.argv.length === 3) {
  // list all entries in the blog
  console.log('Blog entries');
  Blog.find({}).then((blogs) => {
    blogs.forEach((blog) => {
      console.log(blog.title, blog.author, blog.url, blog.likes);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 7) {
  const title = process.argv[3];
  const author = process.argv[4];
  const url = process.argv[5];
  const likes = process.argv[6];

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
  });

  blog.save().then(() => {
    console.log(`Added a new blog to the list`);
    mongoose.connection.close();
  });
} else {
  console.log('Usage: node mongo.js <password>');
  console.log('Usage: node mongo.js <password> <name> <number>');
  process.exit(1);
}
