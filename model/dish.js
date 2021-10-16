const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, default: null, trim: true, required: true },
  desc: { type: String, default: null, trim: true },
  ingredient: { type: String, default: null, trim: true },
  category: { type: String, default: null, trim: true, required: true },
  price: { type: Number, default: 0, required: true },
  images: [String],
});

const Dish = mongoose.model("dish", dishSchema);

module.exports = Dish;
