const Seller = require("../models/seller.model");

const addSellerController = (req, res, next) => {
  Seller.findOne({ email: req.body.email })
    .then((seller) => {
      if (seller) {
        let err = new Error(`You're already registered.`);
        err.status = 409;
        err.statusText = "Conflict";
        next(err);
      } else {
        Seller.create(req.body)
          .then((seller) => {
            res.statusCode = 201;
            res.statusText = "created";
            res.setHeader("Content-Type", "application/json");
            res.json({
              seller,
            });
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
};

const getSellerController = (req, res, next) => {
  Seller.findOne({ _id: req.query.id || req.params.id })
    .then((seller) => {
      res.statusCode = 200;
      res.statusText = "ok";
      res.setHeader("Content-Type", "application/json");
      res.json({
        seller,
      });
    })
    .catch((err) => next(err));
};

exports.addSellerController = addSellerController;
exports.getSellerController = getSellerController;
