const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");

router.get("/:foodId", reviewController.getReviewsByFoodId);
router.post("/", reviewController.addReview);

module.exports = router;
