import { Router } from 'express';
import {
  handleSignup,
  handleSignin,
  handleLogout,
} from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/signin', (req, res) => {
  return res.render('signin');
});

userRouter.get('/signup', (req, res) => {
  return res.render('signup');
});

userRouter.post('/signup', handleSignup);
userRouter.post('/signin', handleSignin);
userRouter.get('/logout', handleLogout);

export { userRouter };
