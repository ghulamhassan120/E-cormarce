const router = require('express').Router();
const { SignController, LoginController, GetUser, LogoutController } = require('../controller/authController');
const verifyToken = require('../middleware/auth.middleware');
const User = require('../models/User');

router.post('/signup',SignController);
router.post('/login',LoginController);
router.get('/getuser', verifyToken,GetUser);
router.post('/logout', verifyToken, LogoutController);

// 1. GET ALL USERS 
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Password chupa kar bhejenge
    const formattedUsers = users.map(user => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    }));
    res.status(200).json(formattedUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 2. DELETE USER 
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;