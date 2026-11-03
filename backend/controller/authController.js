const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SignController= async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();
    
    res.status(201).json({ 
      message: "User registered successfully!", 
      userId: savedUser._id 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
const LoginController=async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ 
      message: "Login successful",
      token, 
      userId: user._id,
      user:{
        name: user.name,
        email: user.email,
        role: user.role 
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
const GetUser= async (req, res) => {
  try {
    // Password chhor kar baqi sari details nikal lenge
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
const LogoutController=async (req, res) => {
  try {
    // JWT stateless hota hai, isliye server-side par token ko frontend (localStorage) 
    // par delete karna hota hai. Yahan hum success response bhejenge.
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports={SignController,LoginController,GetUser,LogoutController}