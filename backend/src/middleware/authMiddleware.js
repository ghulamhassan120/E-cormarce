import { User } from "../models/User.js";
import jwt from 'jsonwebtoken'

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Header se token nikalna ("Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Token decode karke user id verify karna
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // User ko request object mein attach kar dena (password ke baghair)
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default protect