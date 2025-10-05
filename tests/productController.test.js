const {
  increaseStock,
  decreaseStock,
  __setInventoryService,
} = require("../controllers/productController");
const Product = require("../models/Product");

// Mock InventoryService

const inventoryServiceMock = {
  increaseStock: jest.fn(async (product, amount) => {
    product.stock_quantity += amount;
    return product;
  }),
  decreaseStock: jest.fn(async (product, amount) => {
    if (amount > product.stock_quantity) throw new Error("Not enough stock");
    product.stock_quantity -= amount;
    return product;
  }),
};

// Inject mock into controller
__setInventoryService(inventoryServiceMock);

// Helper: Mock Product

function createMockProduct() {
  return {
    _id: "123",
    name: "Test Product",
    description: "Test description",
    stock_quantity: 10,
    low_stock_threshold: 5,
    save: jest.fn().mockResolvedValue(true),
  };
}

// Tests

describe("Inventory Controller Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("increase stock", async () => {
    const product = createMockProduct();
    Product.findById = jest.fn().mockResolvedValue(product);

    const req = { params: { id: "123" }, body: { amount: 5 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await increaseStock(req, res);

    expect(inventoryServiceMock.increaseStock).toHaveBeenCalledWith(product, 5);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ stock_quantity: 15 })
    );
  });

  test("decrease stock", async () => {
    const product = createMockProduct();
    Product.findById = jest.fn().mockResolvedValue(product);

    const req = { params: { id: "123" }, body: { amount: 3 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await decreaseStock(req, res);

    expect(inventoryServiceMock.decreaseStock).toHaveBeenCalledWith(product, 3);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ stock_quantity: 7 })
    );
  });

  test("cannot remove more stock than available", async () => {
    const product = createMockProduct();
    Product.findById = jest.fn().mockResolvedValue(product);

    const req = { params: { id: "123" }, body: { amount: 20 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await decreaseStock(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Not enough stock" })
    );
  });
});
