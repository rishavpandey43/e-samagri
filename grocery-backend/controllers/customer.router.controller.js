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

exports.addCustomerController = addCustomerController;
exports.getCustomerController = getCustomerController;
exports.getAllSellersController = getAllSellersController;
exports.updateCustomerDetailController = updateCustomerDetailController;
