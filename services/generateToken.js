import jwt from 'jsonwebtoken';

const secret = 'abhiMisti@123321';

function createToken(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profileImgURL: user.profileImgURL,
    role: user.role,
  };
  const token = jwt.sign(payload, secret);
  return token;
}

function verifyToken(token) {
  const payload = jwt.verify(token, secret);
  return payload;
}

export { createToken, verifyToken };
