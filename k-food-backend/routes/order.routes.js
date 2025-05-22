const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.post("/", orderController.create); // đặt hàng
router.get("/", orderController.getAll); // admin xem
router.get("/user/:id", orderController.getByUser); // user xem
router.put("/:id/status", orderController.updateStatus); // cập nhật trạng thái

module.exports = router;
