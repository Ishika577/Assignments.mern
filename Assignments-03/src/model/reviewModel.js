const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "title is required"],
			minlength: [3, "title must be at least 3 characters"],
			maxlength: [80, "title cannot be more than 80 characters"],
			trim: true
		},
		comment: {
			type: String,
			required: [true, "comment is required"],
			minlength: [10, "comment must be at least 10 characters"],
			maxlength: [500, "comment cannot be more than 500 characters"],
			trim: true
		},
		rating: {
			type: Number,
			required: [true, "rating is required"],
			min: [1, "rating must be between 1 and 5"],
			max: [5, "rating must be between 1 and 5"],
			validate: {
				validator: Number.isInteger,
				message: "rating must be a whole number"
			}
		},
		reviewerName: {
			type: String,
			required: [true, "reviewerName is required"],
			minlength: [2, "reviewerName must be at least 2 characters"],
			maxlength: [50, "reviewerName cannot be more than 50 characters"],
			trim: true
		},
		status: {
			type: String,
			enum: {
				values: ["pending", "approved", "rejected"],
				message: "{VALUE} is not a valid status"
			},
			default: "pending"
		},
		isVerifiedPurchase: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model("review", reviewSchema);
