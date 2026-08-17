import { createProduct, getProductById, getProducts } from "../controllers/productController.js";
import express from 'express'
const productRoutes = express.Router();

productRoutes.route('/').get(getProducts).post(createProduct);
productRoutes.route('/:id').get(getProductById);

export {productRoutes}