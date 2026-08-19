const express = require("express");

const {
  createReview,
  getReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");

const {
  createReviewSchema,
  updateReviewSchema,
  reviewIdSchema,
  getReviewsQuerySchema,
} = require("../validations/review.validation");

const router = express.Router();

const validate = (schema, data) => {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const validationError = new Error("Validation failed");
    validationError.statusCode = 400;
    validationError.details = error.details.map(
      (detail) => detail.message
    );

    throw validationError;
  }

  return value;
};

router.post("/createReview", async (req, res, next) => {
  try {
    req.body = validate(createReviewSchema, req.body);
    createReview(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.get("/getReviews", async (req, res, next) => {
  try {
    req.query = validate(getReviewsQuerySchema, req.query);
    getReviews(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.get("/getSingleReview/:id", async (req, res, next) => {
  try {
    req.params = validate(reviewIdSchema, req.params);
    getSingleReview(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.patch("/updateReview/:id", async (req, res, next) => {
  try {
    req.params = validate(reviewIdSchema, req.params);
    req.body = validate(updateReviewSchema, req.body);

    updateReview(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.delete("/deleteReview/:id", async (req, res, next) => {
  try {
    req.params = validate(reviewIdSchema, req.params);
    deleteReview(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;