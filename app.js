import 'dotenv/config';

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { userRouter } from './routes/userRoute.js';
import { connectToDatabase } from './connection.js';
import authenticateCookie from './middlewares/auth.js';
import blogRouter from './routes/blogRoute.js';
import { getBlogs } from './controllers/blogController.js';
import commentRoute from './routes/commentRoute.js';

const app = express();
const PORT = process.env.PORT || 8080;
// db Url
const dbUrl = process.env.MONGO_URL;

// midleware
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authenticateCookie('token'));
app.use(express.static(path.resolve('./public')));

// Routes
app.get('/', getBlogs);

app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/comment', commentRoute);

// connect to db
connectToDatabase(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on Port ${PORT} & connected to db`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
