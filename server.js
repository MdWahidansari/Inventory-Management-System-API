const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Connect MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
