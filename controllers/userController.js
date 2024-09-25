import User from '../models/userModel.js';

async function handleSignup(req, res) {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect('/user/signin');
}

async function handleSignin(req, res) {
  const { email, password } = req.body;
  try {
    const token = await User.matchPassword(email, password);

    return res.cookie('token', token).redirect('/');
  } catch (error) {
    return res.render('signin', {
      error: error.message,
    });
  }
}

async function handleLogout(req, res) {
  res.clearCookie('token').redirect('/');
}

export { handleSignup, handleSignin, handleLogout };
