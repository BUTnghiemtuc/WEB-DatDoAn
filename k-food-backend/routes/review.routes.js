const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");

router.get("/:foodId", reviewController.getByFoodId);
router.post("/", reviewController.create);

module.exports = router;
