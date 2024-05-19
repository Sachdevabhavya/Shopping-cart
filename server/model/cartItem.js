const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  qty: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("cartItem", cartItemSchema);
