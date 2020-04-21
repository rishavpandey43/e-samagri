const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sellerSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    storeDetail: {
      name: { type: String, required: false },
      category: [{ type: String, required: false }],
      address: {
        name: { type: String, required: false },
        street: { type: String, required: false },
        city: { type: String, required: false },
        pinCode: { type: Number, required: false },
        // loc: {
        //   longitude: { type: String, required: false },
        //   latitude: { type: String, required: false },
        // },
      },
      document: { type: Buffer, required: false },
      verified: { type: Boolean, required: false },
      rating: { type: Number, required: false },
    },
    bankDetail: {
      name: { type: String, required: false },
      accountNum: { type: Number, required: false },
      ifscCode: { type: String, required: false },
      branchName: { type: String, required: false },
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    products: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        variants: [
          {
            value: { type: String, required: false },
            price: { type: String, required: false },
          },
        ],
        stock: { type: Number, required: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const groceryDB = mongoose.connection.useDb("grocery_db");

const Seller = groceryDB.model("Seller", sellerSchema);

module.exports = Seller;
