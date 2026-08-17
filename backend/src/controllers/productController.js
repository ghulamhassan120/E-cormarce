
// @desc    Get all products

import { ProductModel } from "../models/Product.js";

// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product (Admin use ke liye)
// @route   POST /api/products
const createProduct = async (req, res) => {
  try {
    const { name, image, price, originalPrice, discount, category, size, color, rating } = req.body;

    const createdProduct =  await ProductModel.create({
      name,
      image,
      price,
      originalPrice,
      discount,
      category,
      size,
      color,
      rating
    });

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getProducts, getProductById, createProduct };