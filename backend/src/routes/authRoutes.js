import express from 'express'
const UserRouter = express.Router();
import {registerUser,loginUser, get_me_Controller} from '../controllers/authController.js'
import  protect from '../middleware/authMiddleware.js';
UserRouter.post('/signup', registerUser);
UserRouter.post('/login', loginUser);

UserRouter.get('/profile', protect, get_me_Controller);
export {UserRouter}