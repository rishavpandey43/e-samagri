const Seller = require("../models/seller.model");
const Product = require("../models/product.model");

const addSellerController = (req, res, next) => {
  Seller.findOne({ personalDetail: { email: req.body.email } })
    .then((seller) => {
      if (seller) {
        let err = new Error(`You're already registered.`);
        err.status = 409;
        err.statusText = "Conflict";
        next(err);
      } else {
        Seller.create({ personalDetail: req.body })
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
      if (seller) {
        res.statusCode = 200;
        res.statusMessage = "OK";
        res.setHeader("Content-Type", "application/json");
        res.json({
          seller,
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

const updateSellerDetailController = (req, res, next) => {
  Seller.findOneAndUpdate(
    { _id: req.query.id || req.params.id },
    { $set: { [req.body.dataType]: req.body.data } },
    { new: true }
  )
    .then((seller) => {
      if (seller) {
        res.statusCode = 200;
        res.statusMessage = "OK";
        res.setHeader("Content-Type", "application/json");
        res.json({
          seller,
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

const addNewProductController = (req, res, next) => {
  Product.findOne({ name: req.body.general.name })
    .then((product) => {
      if (product) {
        // * If product exist in DB, then only add it to particular seller
        Seller.findOne({
          $and: [
            { _id: req.query.id || req.params.id },
            { products: { $elemMatch: { root: product._id } } },
          ],
        })
          .then((seller) => {
            if (seller) {
              let err = new Error(`Product already exist to your store`);
              err.status = 409;
              err.statusText = "Conflict";
              next(err);
            } else {
              // * If seller with duplicate product is not found, find that seller again and update products to it's DB
              Seller.findOne({ _id: req.query.id || req.params.id })
                .then((seller) => {
                  seller.products.push({
                    ...req.body.sellerSpecific,
                    root: product._id,
                  });
                  seller
                    .save()
                    .then((seller) => {
                      res.statusCode = 200;
                      res.statusMessage = "OK";
                      res.setHeader("Content-Type", "application/json");
                      res.json({
                        successMessage: "Product has been added successfull",
                      });
                    })
                    .catch((err) => next(err));
                })
                .catch((err) => next(err));
            }
          })
          .catch((err) => next(err));
      } else {
        // * If product doesn't exist, create a new one, and add to respective seller
        Product.create({ ...req.body.general })
          .then((product) => {
            Seller.findOne({
              $and: [
                { _id: req.query.id || req.params.id },
                { products: { $elemMatch: { root: product._id } } },
              ],
            })
              .then((seller) => {
                if (seller) {
                  let err = new Error(`Product already added to your store`);
                  err.status = 409;
                  err.statusText = "Conflict";
                  next(err);
                } else {
                  // * If seller with duplicate product is not found, find that seller again and update products to it's DB
                  Seller.findOne({ _id: req.query.id || req.params.id })
                    .then((seller) => {
                      seller.products.push({
                        ...req.body.sellerSpecific,
                        root: product._id,
                      });
                      seller
                        .save()
                        .then((seller) => {
                          res.statusCode = 200;
                          res.statusMessage = "OK";
                          res.setHeader("Content-Type", "application/json");
                          res.json({
                            successMessage:
                              "Product has been added successfull",
                          });
                        })
                        .catch((err) => next(err));
                    })
                    .catch((err) => next(err));
                }
              })
              .catch((err) => next(err));
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
};

const getAllProductsController = (req, res, next) => {
  Seller.findOne({ _id: req.query.id || req.params.id })
    .populate([{ path: "products.root", model: Product }])
    .then((seller) => {
      if (!seller) {
        let err = new Error(`Seller not found with this ID`);
        err.status = 404;
        err.statusText = "Not Found";
        next(err);
      }
      res.statusCode = 200;
      res.statusMessage = "OK";
      res.setHeader("Content-Type", "application/json");
      res.json({
        products: seller.products,
      });
    })
    .catch((err) => next(err));
};

exports.addSellerController = addSellerController;
exports.getSellerController = getSellerController;
exports.updateSellerDetailController = updateSellerDetailController;
exports.addNewProductController = addNewProductController;
exports.getAllProductsController = getAllProductsController;
