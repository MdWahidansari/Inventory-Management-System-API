const Product = require("../models/Product");
const InventoryService = require("../services/InventoryService");

// Default inventory service instance
let inventoryService = new InventoryService();

// allows injecting mock service for Jest tests
function __setInventoryService(mock) {
  inventoryService = mock;
}

// CRUD Operations
// Create a new product
async function createProduct(req, res) {
  try {
    const { name, description, stock_quantity, low_stock_threshold } = req.body;
    const product = new Product({
      name,
      description,
      stock_quantity,
      low_stock_threshold,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Get all products
async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get single product by Id
async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Update product
async function updateProduct(req, res) {
  try {
    const updates = req.body;
    if (updates.stock_quantity < 0)
      return res
        .status(400)
        .json({ message: "Stock quantity cannot be negative" });

    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Delete product
async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Stock Operations
//Increase stock quantity for a product
async function increaseStock(req, res) {
  try {
    const { amount } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const updated = await inventoryService.increaseStock(product, amount);
    res.json(updated);
  } catch (err) {
    res.status(400)
    .json({ message: `Failed to increase stock: ${error.message}` });
  }
}

// Decrease stock quantity for a product
async function decreaseStock(req, res) {
  try {
    const { amount } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const updated = await inventoryService.decreaseStock(product, amount);
    res.json(updated);
  } catch (err) {
    res.status(400)
   .json({ message: err.message });
  }
}

// Low-stock products
async function getLowStock(req, res) {
  try {
    const products = await Product.find({
      $expr: { $lt: ["$stock_quantity", "$low_stock_threshold"] },
    });
    res.json(products);
  } catch (err) {
    res.status(500)
    .json({
        message: `Failed to retrieve low-stock products: ${err.message}`,
      });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  increaseStock,
  decreaseStock,
  getLowStock,
  // for Jest testing
  __setInventoryService,
};
