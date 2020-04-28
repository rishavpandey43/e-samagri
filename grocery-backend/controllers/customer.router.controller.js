const dotenv = require("dotenv");

// * configure dotenv to access environment variables
dotenv.config();

const authy = require("authy")(process.env.TWILIO_PROD_API_KEY);

const Customer = require("../models/customer.model");
const Seller = require("../models/seller.model");
const Product = require("../models/product.model");

exports.requestPhoneOTP = (req, res, next) => {
  Customer.findOne({ "personalDetail.phone": req.query.phone })
    .then((customer) => {
      if (customer) {
        let err = new Error(`You're already registered.`);
        err.status = 409;
        err.statusText = "Conflict";
        next(err);
      } else {
        authy.register_user("demo@email.com", req.query.phone, "91", function (
          error,
          response
        ) {
          if (error) {
            let err = new Error(`Internal Server Error`);
            err.status = 500;
            err.statusText = "Internal Server Error";
            next(err);
          } else {
            authy.request_sms(response.user.id, (force = true), function (
              otpError,
              otpResponse
            ) {
              if (otpError) {
                let err = new Error(`Internal Server Error`);
                err.status = 500;
                err.statusText = "Internal Server Error";
                next(err);
              } else {
                res.statusCode = 201;
                res.statusText = "Created";
                res.setHeader("Content-Type", "application/json");
                res.json({
                  authyId: response.user.id,
                });
              }
            });
          }
        });
      }
    })
    .catch((err) => next(err));
};

exports.register = (req, res, next) => {
  Customer.findOne({ "personalDetail.phone": req.query.phone })
    .then((customer) => {
      if (customer) {
        let err = new Error(`You're already registered.`);
        err.status = 409;
        err.statusText = "Conflict";
        next(err);
      } else {
        authy.verify(req.body.authyId, req.body.otp, function (
          error,
          response
        ) {
          if (error) {
            let err = new Error(
              `OTP you entered was wrong, please enter correct otp to continue`
            );
            err.status = 500;
            err.statusText = "Internal Server Error";
            next(err);
          } else {
            Customer.create({
              personalDetail: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                authyId: req.body.authyId,
              },
            })
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
        });
      }
    })
    .catch((err) => next(err));
};

exports.addCustomerController = (req, res, next) => {
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

exports.getCustomerController = (req, res, next) => {
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
exports.getAllSellersController = (req, res, next) => {
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

exports.updateCustomerDetailController = (req, res, next) => {
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

exports.getCartController = (req, res, next) => {
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

exports.updateCartController = (req, res, next) => {
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
