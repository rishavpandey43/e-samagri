const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    orderedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    orderedFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String, required: true },
        value: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: String, required: true },
      },
    ],
    status: { type: String, required: true },
    paymentMode: { type: String, required: true },
    amount: {
      itemsPrice: { type: Number, required: true },
      deliveryCharge: { type: Number, required: true },
    },
    deliveryAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },
  },
  {
    timestamps: true,
  }
);

const groceryDB = mongoose.connection.useDb("grocery_db");

const Order = groceryDB.model("order", orderSchema);

module.exports = Order;
