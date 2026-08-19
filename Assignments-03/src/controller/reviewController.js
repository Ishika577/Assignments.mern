const reviewService = require("../service/reviewService");

const createReview = async (req, res) => {
  const review = await reviewService.createReview(req.body);
  res.status(201).send({ success: true, review });
};

const getReviews = async (req, res) => {
  const result = await reviewService.getReviews(req.query);
  res.status(200).send({ success: true, ...result });
};

const updateReview = async (req, res) => {
  const review = await reviewService.updateReview(req.params.id, req.body);

  if (!review) {
    return res.status(404).send({ success: false, message: "Review not found" });
  }

  res.status(200).send({ success: true, review });
};

const deleteReview = async (req, res) => {
  const review = await reviewService.deleteReview(req.params.id);

  if (!review) {
    return res.status(404).send({ success: false, message: "Review not found" });
  }

  res.status(200).send({ success: true, review });
};

module.exports = {
  createReview,
  getReviews,
  updateReview,
  deleteReview
};
