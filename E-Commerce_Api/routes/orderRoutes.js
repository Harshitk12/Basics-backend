const express = require("express");
const { createOrder, getUserOrders, updateOrderStatus } = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, getUserOrders);
router.patch("/:id/status", protect, updateOrderStatus);

module.exports = router;
