const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductControllers");

const {
  validateProduct,
} = require("../validations/productValidation");

const router = express.Router();

// Create Product
router.post(
  "/",
  authMiddleware,
  validateProduct,
  createProduct
);


router.get("/", authMiddleware, getAllProducts);


router.get("/:id", authMiddleware, getProductById);

router.patch("/:id", authMiddleware, updateProduct);

router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;