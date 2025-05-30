const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food.controller");

// GET /api/foods
router.get("/", foodController.getAll);

// GET /api/foods/:id
router.get("/:id", foodController.getById);

router.get("/restaurant/:id", foodController.getByRestaurant);

// POST /api/foods
router.post("/", foodController.create);

// PUT /api/foods/:id
router.put("/:id", foodController.update);

// DELETE /api/foods/:id
router.delete("/:id", foodController.remove);

module.exports = router;
