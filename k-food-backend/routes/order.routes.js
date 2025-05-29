const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.post("/", orderController.create);
router.get("/", orderController.getAll);
router.get("/:id", orderController.getById);
router.get("/user/:id", orderController.getByUser);
router.put("/:id/status", orderController.updateStatus);

module.exports = router;
