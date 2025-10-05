// InventoryService handles stock addition and removal logic

class InventoryService {
  //Increase the stock quantity of a product by the given amount.
  async increaseStock(product, amount) {
    if (amount <= 0) throw new Error("amount must be positive");
    product.stock_quantity += amount;
    await product.save();
    return product;
  }

  // Decrease the stock quantity of a product by the given amount.
  async decreaseStock(product, amount) {
    if (amount <= 0) throw new Error("amount must be positive");
    
    if (amount > product.stock_quantity) {
      throw new Error("amount must be grater then stok quantity");
    }
    product.stock_quantity -= amount;
    await product.save();
    return product;
  }
}

module.exports = InventoryService;
