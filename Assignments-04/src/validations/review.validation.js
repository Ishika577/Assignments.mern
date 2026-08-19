const Joi = require("joi");

const createReviewSchema = Joi.object({
  title: Joi.string().trim().required(),

  comment: Joi.string().trim().required(),

  rating: Joi.number().integer().min(1).max(5).required(),

  status: Joi.string()
    .valid("pending", "approved", "rejected")
    .optional(),
});

const updateReviewSchema = Joi.object({
  title: Joi.string().trim(),

  comment: Joi.string().trim(),

  rating: Joi.number().integer().min(1).max(5),

  status: Joi.string().valid("pending", "approved", "rejected"),
}).min(1);

const reviewIdSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required(),
});

const getReviewsQuerySchema = Joi.object({
  status: Joi.string()
    .valid("pending", "approved", "rejected")
    .optional(),

  minRating: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .optional(),

  page: Joi.number()
    .integer()
    .min(1)
    .default(1),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10),
});

module.exports = {
  createReviewSchema,
  updateReviewSchema,
  reviewIdSchema,
  getReviewsQuerySchema,
};