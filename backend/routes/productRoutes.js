const productRoutes = require('express').Router();
const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;
// Cloudinary config (Apni credentials yahan ya .env mein lagayein)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
// 1. CREATE Product (Admin ke liye - Naya product add karne ke liye)
productRoutes.post('/', async (req, res) => {
  console.log("Incoming Product Data:", req.body);
 try {
    const { name, price, originalPrice, description, images, category, stock,colors,sizes } = req.body;

    const newProduct = new Product({
      name,
      price,
      originalPrice,
      description,
      images, 
      category,
      stock,
      colors,
      sizes
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "Product added successfully!", product: savedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET ALL Products (Homepage aur Category page ke liye)
productRoutes.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. GET SINGLE Product (Product Detail page ke liye - ID se)
productRoutes.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found!" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. UPDATE Product (Product edit karne ke liye)
productRoutes.put('/:id',async (req, res) => {
  try {
    const { name, price, originalPrice, description, images, category, stock } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, originalPrice, description, images, category, stock },
      { returnDocument: 'after' } 
    );

    if (!updatedProduct) return res.status(404).json({ error: "Product not found!" });

    res.status(200).json({ message: "Product updated successfully!", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. DELETE Product (Product remove karne ke liye)
productRoutes.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = productRoutes;