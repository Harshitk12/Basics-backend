const Order = require("../models/Order");
const Product = require("../models/Product"); 

exports.createOrder = async (req, res) => {
  try {
    const { products } = req.body;
    const userId = req.user.id;

    let totalPrice = 0;

    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (typeof product.price !== "number") {
        return res.status(400).json({ error: "Invalid product price" });
      }

      totalPrice += product.price * item.quantity;
    }

    const order = new Order({
      user: userId,
      products,
      totalPrice,
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Order creation failed" });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("products.product");
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatus = ["Pending", "Completed", "Cancelled"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ error: "Failed to update order status" });
  }
};
