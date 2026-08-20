const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`,
        errors: []
    });
};

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal server error";
    let errors = err.errors || [];

    // Mongoose CastError
    if (err.name === "CastError") {
        statusCode = 400;
        message = `Invalid value for '${err.path}'`;
        errors = [];
    }

    // Mongoose ValidationError
    else if (err.name === "ValidationError") {
        statusCode = 400;

        errors = Object.values(err.errors).map((error) => ({
            field: error.path,
            message: error.message
        }));

        message = "Validation failed";
    }

    // MongoDB duplicate key error
    else if (err.code === 11000) {
        statusCode = 409;
        message = "This email already exists";

        const field = Object.keys(err.keyValue || {})[0];

        errors = field
            ? [
                  {
                      field,
                      message: `${field} already exists`
                  }
              ]
            : [];
    }

    res.status(statusCode).json({
        success: false,
        message,
        errors,
        ...(process.env.NODE_ENV !== "production" && {
            stack: err.stack
        })
    });
};

module.exports = {
    notFound,
    errorHandler
};