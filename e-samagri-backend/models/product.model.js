const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    shopType: { type: Number, required: true },
    category: { type: Number, required: true },
    type: { type: String, required: true },
    brand: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const groceryDB = mongoose.connection.useDb('e_samagri_db');

const Product = groceryDB.model('product', productSchema);

module.exports = Product;
