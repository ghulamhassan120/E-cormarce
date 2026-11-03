const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns =require("node:dns");
const DBConnect = require('./config/db');
const router = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const { OrderRoutes } = require('./routes/orderRoute');
const orderRoutes = require('./routes/orderRoute');
require('dotenv').config();

const app = express();
dns.setServers(['8.8.8.8','1.1.1.1'])
app.use(express.json());
app.use(cors());

// Database Connection
DBConnect()
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', router);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', orderRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});