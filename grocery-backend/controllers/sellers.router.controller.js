const Seller = require("../models/seller.model");

const addSellerController = (req, res, next) => {
  Seller.findOne({ personalDetail: { email: req.body.personalDetail.email } })
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
            res.statusText = "Created";
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
      res.statusText = "OK";
      res.setHeader("Content-Type", "application/json");
      res.json({
        seller,
      });
    })
    .catch((err) => next(err));
};

const updateSellerDetailController = (req, res, next) => {
  Seller.findOneAndUpdate(
    { _id: req.query.id || req.params.id },
    { $set: { [req.body.dataType]: req.body.data } },
    { new: true }
  )
    .then((seller) => {
      res.statusCode = 201;
      res.statusMessage = "Created";
      res.setHeader("Content-Type", "application/json");
      res.json({
        seller,
      });
    })
    .catch((err) => next(err));
};

const updateSellerBankController = (req, res, next) => {
  Seller.findOneAndUpdate(
    { _id: req.query.id || req.params.id },
    { $set: { bankDetail: req.body } },
    { new: true }
  )
    .then((seller) => {
      res.statusCode = 201;
      res.statusMessage = "Created";
      res.setHeader("Content-Type", "application/json");
      res.json({
        seller,
      });
    })
    .catch((err) => next(err));
};

exports.addSellerController = addSellerController;
exports.getSellerController = getSellerController;
exports.updateSellerDetailController = updateSellerDetailController;
exports.updateSellerBankController = updateSellerBankController;
