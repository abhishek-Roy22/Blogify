import { verifyToken } from '../services/generateToken.js';

function authenticateCookie(cookie) {
  return (req, res, next) => {
    const tokenValue = req.cookies[cookie];
    if (!tokenValue) {
      return next();
    }

    try {
      const userPayload = verifyToken(tokenValue);
      req.user = userPayload;
    } catch (error) {
      throw new Error('Invalid Token');
    }

    return next();
  };
}

export default authenticateCookie;
