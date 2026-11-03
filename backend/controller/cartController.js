const Cart = require("../models/Cart");

const cartAddController= async (req, res) => {
  const { userId, productId, quantity, size, color } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId && item.size === size && item.color === color
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity || 1;
      } else {
        cart.items.push({ productId, quantity: quantity || 1, size, color });
      }

      await cart.save();
      return res.status(200).json({ message: "Cart updated successfully!", cart });
    } else {
      const newCart = new Cart({
        userId,
        items: [{ productId, quantity: quantity || 1, size, color }]
      });

      const savedCart = await newCart.save();
      return res.status(201).json({ message: "Product added to cart!", cart: savedCart });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const cartGetController=async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    if (!cart) {
      return res.status(200).json({ items: [] });
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const cartRemoveController=async (req, res) => {
  console.log("DELETE REQUEST BODY:", req.body);
  const { userId, productId, size, color } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found!" });
console.log("Current Cart Items before delete:", cart.items);
    // Jis item ki ID, size aur color match na ho, usay chor kar baqi sab rakh lein
    cart.items = cart.items.filter(
      (item) => (item.productId.toString() !== productId )
    );

    await cart.save();
    res.status(200).json({ message: "Item removed successfully!", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
module.exports={cartAddController,cartGetController,cartRemoveController}