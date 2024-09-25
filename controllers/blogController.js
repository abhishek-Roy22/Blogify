import Blog from '../models/blogModel.js';
import multer from 'multer';
import path from 'path';
import Comment from '../models/commentModel.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

export const upload = multer({ storage: storage });

const createBlog = async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
};

// get all blogs
const getBlogs = async (req, res) => {
  const Blogs = await Blog.find({});
  res.render('Home', {
    user: req.user,
    blogs: Blogs,
  });
};

// get a single blog
const getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('createdBy');
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    'createdBy'
  );
  return res.render('BlogDetails', {
    user: req.user,
    blog,
    comments,
  });
};

export { createBlog, getBlog, getBlogs };
