const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");

const {
    createError,
    badRequest,
    unauthorized,
    forbidden,
    notFound,
    conflict
} = require("./src/utils/apiError");

const {
    notFound: notFoundMiddleware,
    errorHandler
} = require("./src/middlewares/errorHandler");

const app = express();

app.use(express.json());


// Home route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Assignment 5 Error Handling API"
    });
});


// Test 400
app.get("/test/400", (req, res, next) => {
    next(badRequest("Invalid request"));
});


// Test 401
app.get("/test/401", (req, res, next) => {
    next(unauthorized("Token is required"));
});


// Test 403
app.get("/test/403", (req, res, next) => {
    next(forbidden("Admin access required"));
});


// Test 404 error
app.get("/test/404", (req, res, next) => {
    next(notFound("Review not found"));
});


// Test 409
app.get("/test/409", (req, res, next) => {
    next(
        conflict("This email already exists", [
            {
                field: "email",
                message: "This email already exists"
            }
        ])
    );
});


// Test 500
app.get("/test/500", (req, res, next) => {
    next(new Error("Something went wrong"));
});


// 404 middleware - must come after routes
app.use(notFoundMiddleware);


// Error middleware - must be last
app.use(errorHandler);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});