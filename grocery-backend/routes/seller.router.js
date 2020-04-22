const express = require("express");

const sellerRouterController = require("../controllers/sellers.router.controller");

const sellerRouter = express.Router(); // initialize express router

sellerRouter
  .post("/add-seller", sellerRouterController.addSellerController)
  .get("/get-seller", sellerRouterController.getSellerController)
  .put("/update-seller", sellerRouterController.updateSellerDetailController)
  .post("/add-new-product", sellerRouterController.addNewProductController);

module.exports = sellerRouter;
