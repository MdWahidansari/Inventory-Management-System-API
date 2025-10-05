const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  increaseStock,
  decreaseStock,
  getLowStock,
} = require("../controllers/productController");

//CRUD Routes
router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

//Stock Management Routes
router.post("/:id/increase", increaseStock);
router.post("/:id/decrease", decreaseStock);

// Low Stock Route
router.get("/low-stock/all", getLowStock);

module.exports = router;
