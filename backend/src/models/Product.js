import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  discount: { type: String },
  category: { type: String, required: true }, // e.g., 'men', 'women', 'kids'
  size: [{ type: String }], // ['Small', 'Medium', 'Large']
  color: [{ type: String }], // ['White', 'Red', 'Blue']
  rating: { type: Number, default: 4.5 }
}, { timestamps: true });

export const ProductModel = mongoose.model('Product', productSchema);