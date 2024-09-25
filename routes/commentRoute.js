import { Router } from 'express';
import Comment from '../models/commentModel.js';

const commentRoute = Router();

commentRoute.post('/:blogId', async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

export default commentRoute;
