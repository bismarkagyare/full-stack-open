const Blog = ({ blog }) => {
  return (
    <div>
      {blog.title} {blog.author} {blog.url} {blog.likes}
    </div>
  );
};

export default Blog;
