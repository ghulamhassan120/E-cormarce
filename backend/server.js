import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { UserRouter } from './src/routes/authRoutes.js';
import dns from 'node:dns'
import connectDB from './src/config/db.js'
import { productRoutes } from './src/routes/productRoutes.js';
dns.setServers(['8.8.8.8','1.1.1.1'])
// Environment variables configure karein
dotenv.config();
// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes Mounting
app.use('/api/auth', UserRouter);
app.use('/api/products', productRoutes); 

// Test Route
app.get('/', (req, res) => {
  res.send('SHOP.CO Backend is running successfully!');
});

Port configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
