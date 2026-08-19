const Review = require("../models/review.model");

const createReview = async (data) => {
  const review = new Review(data);

  return await review.save();
};

const getReviews = async (query) => {
  const {
    status,
    minRating,
    page = 1,
    limit = 10,
  } = query;

  const filter = {};

  if (status) {
    filter.status = status;
  }

  if (minRating) {
    filter.rating = { $gte: minRating };
  }

  const skip = (page - 1) * limit;

  const reviews = await Review.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Review.countDocuments(filter);

  return {
    reviews,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getSingleReview = async (id) => {
  const review = await Review.findById(id);

  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }

  return review;
};

const updateReview = async (id, data) => {
  const review = await Review.findById(id);

  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }

  Object.assign(review, data);

  return await review.save();
};

const deleteReview = async (id) => {
  const review = await Review.findByIdAndDelete(id);

  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }

  return review;
};

module.exports = {
  createReview,
  getReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};