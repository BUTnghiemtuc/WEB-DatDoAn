const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

// Tạo đơn hàng mới
router.post("/", orderController.create);

// Lấy tất cả đơn hàng
router.get("/", orderController.getAll);

// Lấy đơn hàng theo ID
router.get("/:id", orderController.getById);

// Lấy đơn hàng của 1 user
router.get("/user/:id", orderController.getByUser);

// Cập nhật trạng thái đơn
router.put("/:id/status", orderController.updateStatus);

module.exports = router;
