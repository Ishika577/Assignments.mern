const ReviewModel = require("../model/reviewModel");

const createReview = async (data) => {
  const alreadyReviewed = await ReviewModel.findOne({
    reviewerName: data.reviewerName,
    title: data.title
  });

  if (alreadyReviewed) {
    throw new Error("aap ye review pehle de chuke ho");
  }

  const review = await ReviewModel.create(data);

  return review;
};

const getReviews = async (queryParams) => {
  const { status, minRating, page = 1, limit = 10 } = queryParams;

  const filter = {};

  if (status) {
    filter.status = status;
  }

  if (minRating) {
    filter.rating = { $gte: minRating };
  }

  const skip = (page - 1) * limit;

  const [reviews, total] = await Promise.all([
    ReviewModel.find(filter).skip(skip).limit(limit),
    ReviewModel.countDocuments(filter)
  ]);

  return {
    reviews,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  };
};

const updateReview = async (id, data) => {
  const review = await ReviewModel.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  );

  return review;
};

const deleteReview = async (id) => {
  const review = await ReviewModel.findByIdAndDelete(id);

  return review;
};

module.exports = {
  createReview,
  getReviews,
  updateReview,
  deleteReview
};