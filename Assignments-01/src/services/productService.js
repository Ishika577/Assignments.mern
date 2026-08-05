const ProductModel = require("../models/ProductModel");

// Create Product
const createProductService = async (data) => {
  const { name, SKU, description, price, category } = data;

  const existingProduct = await ProductModel.findOne({ SKU });

  if (existingProduct) {
    throw new Error("Product with this SKU already exists");
  }

  const product = await ProductModel.create({
    name,
    SKU,
    description,
    price,
    category,
  });

  return product;
};

// Get All Products
const getAllProductsService = async (page, limit) => {
  const products = await ProductModel.find()
    .select("-__v")
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  return products;
};

// Get Product By Id
const getProductByIdService = async (id) => {
  const product = await ProductModel.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

// Update Product
const updateProductService = async (id, data) => {
  const product = await ProductModel.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

// Delete Product
const deleteProductService = async (id) => {
  const product = await ProductModel.findByIdAndDelete(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

module.exports = {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
};