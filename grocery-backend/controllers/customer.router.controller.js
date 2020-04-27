const Customer = require("../models/customer.model");
const Seller = require("../models/seller.model");
const Product = require("../models/product.model");

const addCustomerController = (req, res, next) => {
  Customer.findOne({ personalDetail: { email: req.body.email } })
    .then((customer) => {
      if (customer) {
        let err = new Error(`You're already registered.`);
        err.status = 409;
        err.statusText = "Conflict";
        next(err);
      } else {
        Customer.create({ personalDetail: req.body })
          .then((customer) => {
            res.statusCode = 201;
            res.statusText = "Created";
            res.setHeader("Content-Type", "application/json");
            res.json({
              customer,
            });
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
};

const getCustomerController = (req, res, next) => {
  Customer.findOne({ _id: req.query.id || req.params.id })
    .then((customer) => {
      if (customer) {
        res.statusCode = 200;
        res.statusMessage = "OK";
        res.setHeader("Content-Type", "application/json");
        res.json({
          customer,
        });
      } else {
        let err = new Error(`Internal Server Error`);
        err.status = 500;
        err.statusText = "Internal Server Error";
        next(err);
      }
    })
    .catch((err) => next(err));
};

// TODO: Here we can improve to find more nearest store to the customer
const getAllSellersController = (req, res, next) => {
  Customer.findOne({ _id: req.query.id || req.params.id })
    .then((customer) => {
      let customerState = customer.address.pincode.toString()[0];
      Seller.find({
        "storeDetail.address.pincode": {
          $gt: customerState * 100000,
          $lt: (customerState + 1) * 100000,
        },
      })
        .sort({ "storeDetail.address.pincode": 1 })
        .populate([{ path: "products.root", model: Product }])
        .then((sellers) => {
          res.statusCode = 200;
          res.statusMessage = "OK";
          res.setHeader("Content-Type", "application/json");
          res.json({
            sellers,
          });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

const updateCustomerDetailController = (req, res, next) => {
  Customer.findOneAndUpdate(
    { _id: req.query.id || req.params.id },
    { $set: { [req.body.dataType]: req.body.data } },
    { new: true }
  )
    .then((customer) => {
      if (customer) {
        res.statusCode = 200;
        res.statusMessage = "OK";
        res.setHeader("Content-Type", "application/json");
        res.json({
          customer,
        });
      } else {
        let err = new Error(`Unable to update, please try again.`);
        err.status = 500;
        err.statusText = "Internal Server Error";
        next(err);
      }
    })
    .catch((err) => next(err));
};

const getCartController = (req, res, next) => {
  Customer.findOne({ _id: req.query.id || req.params.id })
    .then((customer) => {
      if (customer) {
        res.statusCode = 200;
        res.statusMessage = "OK";
        res.setHeader("Content-Type", "application/json");
        res.json({
          cart: customer.cart,
        });
      } else {
        let err = new Error(`Internal Server Error`);
        err.status = 500;
        err.statusText = "Internal Server Error";
        next(err);
      }
    })
    .catch((err) => next(err));
};

const updateCartController = (req, res, next) => {
  Customer.findOne({ _id: req.query.id || req.params.id })
    .then((customer) => {
      if (customer) {
        let cartProducts = req.body.products;
        Seller.findById(req.body.storeId)
          .populate([{ path: "products.root", model: Product }])
          .then((seller) => {
            // * Find all the products of store in the cart, to retrieve all detail
            let storeProducts = [...seller.products];
            cartProducts = cartProducts.map((product) => {
              let currentProduct = storeProducts.filter(
                (storeProduct) => storeProduct._id.toString() === product.id
              )[0];

              let newProduct = {
                id: product.id,
                variantId: product.variantId,
                quantity: product.quantity,
                name: currentProduct.root.name,
                value: currentProduct.variants.filter(
                  (variant) => variant._id.toString() == product.variantId
                )[0].value,
                price: currentProduct.variants.filter(
                  (variant) => variant._id.toString() == product.variantId
                )[0].price,
              };
              return newProduct;
            });
            let newCart = {
              storeId: req.body.storeId,
              products: cartProducts,
              deliveryCharge: 50,
            };
            customer.cart = newCart;
            customer
              .save()
              .then((customer) => {
                res.statusCode = 200;
                res.statusMessage = "OK";
                res.setHeader("Content-Type", "application/json");
                res.json({
                  newCart: customer.cart,
                });
              })
              .catch((err) => next(err));
          })
          .catch((err) => next(err));
      } else {
        let err = new Error(`Unable to update, please try again.`);
        err.status = 500;
        err.statusText = "Internal Server Error";
        next(err);
      }
    })
    .catch((err) => next(err));
};

exports.addCustomerController = addCustomerController;
exports.getCustomerController = getCustomerController;
exports.getAllSellersController = getAllSellersController;
exports.updateCustomerDetailController = updateCustomerDetailController;
exports.getCartController = getCartController;
exports.updateCartController = updateCartController;
