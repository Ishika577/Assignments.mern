const express = require("express");

const app = express();

app.use(express.json());

const getReview = async (req, res, next) => {
    try {
        const review = await ReviewModel.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
                errors: []
            });
        }

        res.json({
            success: true,
            data: review
        });
    } catch (error) {
        next(error);
    }
};


// Routes should come before error middleware
app.use("/reviews", reviewRouter);


// 404 middleware
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        errors: []
    });
});


// Error middleware must be last
app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: err.message || "Internal server error",
        errors: []
    });
});