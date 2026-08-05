const validateProduct = (req, res, next) => {
  const { name, SKU, description, price, category } = req.body;

  if (!name || !SKU || !description || !price || !category) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  next();
};

module.exports = {
  validateProduct,
};