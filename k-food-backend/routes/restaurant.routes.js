const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurant.controller");

// API: GET /api/restaurants/user/:userId
router.get("/user/:userId", restaurantController.getByUserId);

module.exports = router;
