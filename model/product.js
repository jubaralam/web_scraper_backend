const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, default: "N/A" },
  rating: { type: String, default: "N/A" },
  discount: { type: String, default: "N/A" },
  image: { type: String, default: "N/A" },
  scrapedAt: { type: Date, default: Date.now }, // Timestamp for when data was scraped
});




// Create model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
