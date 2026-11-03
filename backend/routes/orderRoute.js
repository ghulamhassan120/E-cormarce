const { getAllOrdersController, updateOrderStatusController } = require('../controller/orderController');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

const orderRoutes = require('express').Router();
orderRoutes.post('/create', async (req, res) => {
  const { userId, shippingAddress, paymentMethod } = req.body;
  try {
    let cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty!" });
    }

   // Total Amount calculate karne ka secure tareeqa
const totalAmount = cart.items.reduce((acc, item) => {
  // Check karein ke price mojood hai ya nahi, warna 0 lein
  const itemPrice = item.productId && item.productId.price ? Number(item.productId.price) : (item.price || 0);
  const qty = Number(item.quantity) || 1;
  
  return acc + (itemPrice * qty);
}, 0);

console.log("Calculated Total Amount:", totalAmount); // 👈 Console log lagakar check kar lein ke kya value aa rahi hai

    const newOrder = new Order({
      userId,
      items: cart.items,
      shippingAddress,
      paymentMethod,
      totalAmount:totalAmount,
      status: 'Pending'
    });

    await newOrder.save();

    await Cart.findOneAndDelete({ userId });

    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

orderRoutes.get('/admin/all', getAllOrdersController);
orderRoutes.put('/admin/status/:orderId', updateOrderStatusController);


orderRoutes.get('/dashboard-stats', async (req, res) => {
  try {
    const orders = await Order.find();

    const totalEarning = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

    const totalOrders = orders.length;

    const totalIncome = Math.round(totalEarning / 1000) + 200; 
    const secondaryIncome = Math.round(totalOrders * 1.5);

    res.status(200).json({
      totalEarning,
      totalOrders,
      totalIncome,
      secondaryIncome
    });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

orderRoutes.get('/order-stats', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const earningsData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$totalAmount" } // Yahan apne order model ki price wali field ka naam likhein (jaise totalAmount ya totalPrice)
        }
      }
    ]);

    const totalEarning = earningsData.length > 0 ? earningsData[0].totalEarnings : 0;

    // 3. Response bhejna frontend ko
    res.status(200).json({
      totalOrders,
      totalEarning,
      chartData: [
        { day: '1', val: totalOrders } // Aap ise apne hisab se adjust kar sakte hain
      ]
    });

  } catch (err) {
    console.error("MongoDB Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

orderRoutes.get('/growth-stats', async (req, res) => {
  try {
    // 1. Saare orders ka total sum (Total Growth) nikalna
    const orders = await Order.find();
    const totalGrowth = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

    // 2. MongoDB Aggregation se mahino (months) ke mutabiq real data group karna
    const monthlyData = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" }, // Order ki date ke hisab se month (1-12)
          investment: { $sum: "$totalAmount" }, // Ya apni marzi ki calculation
          profit: { $sum: { $multiply: ["$totalAmount", 0.4] } }, // Example profit calculation
          loss: { $sum: 0 },
          maintenance: { $sum: 0 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // 3. Database se real popular products / orders nikalna
    const popularProducts = orders.slice(0, 5).map(order => ({
      name: order.shippingAddress?.fullName || "Custom Order",
      price: `$${order.totalAmount || 0}.00`,
      profit: 'Verified',
      isPositive: true
    }));

    res.status(200).json({
      totalGrowth,
      growthData: monthlyData,
      popularStocks: popularProducts,
      stockChartData: orders.map((o, idx) => ({ day: `${idx + 1}`, val: o.totalAmount || 10 }))
    });

  } catch (err) {
    console.error("MongoDB Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports=orderRoutes