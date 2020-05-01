const dotenv = require("dotenv");
const admin = require("firebase-admin");

// * configure dotenv to access environment variables
dotenv.config();

const Order = require("../models/order.model");
const Customer = require("../models/customer.model");
const Seller = require("../models/seller.model");

exports.getAllOrders = (req, res, next) => {
  Order.find()
    .populate([{ path: "orderedFrom", model: Seller }])
    .then((orders) => {
      if (orders) {
        res.statusCode = 200;
        res.statusText = "OK";
        res.setHeader("Content-Type", "application/json");
        res.json({
          orders,
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

exports.placeOrder = (req, res, next) => {
  let newOrder = req.body;
  newOrder.orderedBy = req.userId;
  Order.create(newOrder).then((order) => {
    if (order) {
      Customer.findById(order.orderedBy)
        .then((customer) => {
          customer.orders.push(order);
          customer
            .save()
            .then((customer) => {
              Seller.findById(order.orderedFrom)
                .then((seller) => {
                  seller.orders.push(order);
                  seller
                    .save()
                    .then((seller) => {
                      // * When order is placed, then also delete the cart from customer account.
                      customer.cart = {
                        storeId: null,
                        products: [],
                        deliveryCharge: null,
                      };
                      customer
                        .save()
                        .then((customer) => {
                          // * NOW ALERT TO SELLER
                          admin.messaging().sendToDevice(
                            seller.fcm.token,
                            {
                              data: {
                                orderId: JSON.stringify(order._id),
                                message: "You've received a new order",
                              },
                            },
                            {
                              // Required for background/quit data-only messages on iOS
                              contentAvailable: true,
                              // Required for background/quit data-only messages on Android
                              priority: "high",
                            }
                          );
                          res.statusCode = 200;
                          res.statusText = "OK";
                          res.setHeader("Content-Type", "application/json");
                          res.json({
                            order,
                            message: "Order placed successfully",
                          });
                        })
                        .catch((err) => next(err));
                    })
                    .catch((err) => next(err));
                })
                .catch((err) => next(err));
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    } else {
      let err = new Error(`Internal Server Error`);
      err.status = 400;
      err.statusText = "Internal Server Error";
      next(err);
    }
  });
};
