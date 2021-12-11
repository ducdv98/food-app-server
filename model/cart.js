const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  amount: {
    type: Number,
    required: true,
    validate: (value) => {
      if (value <= 0) {
        throw new Error({ error: "Amount must not be less than 0" });
      }
    },
  },
  note: { type: String },
});

const cartSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  items: [cartItemSchema],
});

const CartItem = mongoose.model("cartItem", cartItemSchema);
const Cart = mongoose.model("cart", cartSchema);

module.exports = {
  Cart,
  CartItem,
};
