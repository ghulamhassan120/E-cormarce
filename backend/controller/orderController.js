const Order = require("../models/Order");

// 1. Saare orders get karne ke liye (Admin ke liye)
const getAllOrdersController = async (req, res) => {
  try {
    // Populate ke zariye user ki details bhi sath le aayein
    const orders = await Order.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Order ka status update karne ke liye (e.g., Pending -> Shipped / Delivered)
const updateOrderStatusController = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body; // 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId, 
      { status }, 
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found!" });
    }

    res.status(200).json({ message: "Order status updated successfully!", order: updatedOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports={getAllOrdersController,updateOrderStatusController}