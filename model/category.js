const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, default: null, trim: true, required: true },
  desc: { type: String, default: null, trim: true },
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
