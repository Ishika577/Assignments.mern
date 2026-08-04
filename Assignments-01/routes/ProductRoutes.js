const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductControllers");

const router = express.Router();

router.post("/", authMiddleware, createProduct);

router.get("/", authMiddleware, getAllProducts);

router.get("/:id", authMiddleware, getProductById);

router.patch("/:id", authMiddleware, updateProduct);

router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;