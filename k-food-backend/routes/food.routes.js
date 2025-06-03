const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food.controller");

// GET /api/foods
router.get("/", foodController.getAll);

router.get("/by-user/:userId", foodController.getByUserId); // 👈 THÊM DÒNG NÀY TRƯỚC
router.get("/restaurant/:id", foodController.getByRestaurant);

router.get("/:id", foodController.getById);

// POST /api/foods
router.post("/", foodController.create);

// PUT /api/foods/:id
router.put("/:id", foodController.update);

router.put("/:id/status", foodController.updateAvailability);

// DELETE /api/foods/:id
router.delete("/:id", foodController.remove);

module.exports = router;
