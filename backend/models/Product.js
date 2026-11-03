const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  rating: { type: Number, default: 4.5 },
  description: { type: String,required: true },
  images: [{ type: String }], 
  colors: [{ type: String }], 
  sizes: [{ type: String }],  
  category: { type: String, required: true ,enum: ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans']},
  stock: { type: Number,required: true, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);