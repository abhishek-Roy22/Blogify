import { Router } from 'express';
import { createBlog, getBlog, upload } from '../controllers/blogController.js';
import { model } from 'mongoose';

const blogRouter = Router();

blogRouter.get('/createBlog', (req, res) => {
  return res.render('CreateBlog', {
    user: req.user,
  });
});

// get single blog
blogRouter.get('/:id', getBlog);

blogRouter.post('/', upload.single('coverImage'), createBlog);

export default blogRouter;
