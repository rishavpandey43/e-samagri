const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sellerSchema = new Schema(
  {
    personalDetail: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    storeDetail: {
      name: { type: String, required: false },
      address: {
        street: { type: String, required: false },
        landmark: { type: String, required: false },
        city: { type: String, required: false },
        pincode: { type: Number, required: false },
        // loc: {
        //   longitude: { type: String, required: false },
        //   latitude: { type: String, required: false },
        // },
      },
      panCard: { type: String, required: false },
      gstNumber: { type: String, required: false },
      document: { type: Buffer, required: false },
      verified: { type: Boolean, required: false },
      rating: { type: Number, required: false },
    },
    bankDetail: {
      name: { type: String, required: false },
      accountNumber: { type: Number, required: false },
      ifscCode: { type: String, required: false },
      branchName: { type: String, required: false },
      verified: { type: Boolean, required: false },
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    products: [
      {
        root: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        variants: [
          {
            value: { type: String, required: false },
            price: { type: Number, required: false },
            stock: { type: Number, required: false },
          },
        ],
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