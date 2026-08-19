const express = require("express");

const router = express.Router();

const validationMiddleware = require("../middleware/validationMiddleware");

const {
  createReviewSchema,
  getReviewsSchema,
  reviewIdSchema,
  updateReviewSchema
} = require("../validationSchema/reviewValidationSchema");

const reviewController = require("../controller/reviewController");

router.post(
  "/createReview",
  validationMiddleware(createReviewSchema),
  reviewController.createReview
);

router.get(
  "/getReviews",
  validationMiddleware(getReviewsSchema, "query"),
  reviewController.getReviews
);

router.patch(
  "/updateReview/:id",
  validationMiddleware(reviewIdSchema, "params"),
  validationMiddleware(updateReviewSchema),
  reviewController.updateReview
);

router.delete(
  "/deleteReview/:id",
  validationMiddleware(reviewIdSchema, "params"),
  reviewController.deleteReview
);

module.exports = router;