const express = require("express");

const customerRouterController = require("../controllers/customer.router.controller");

const customerRouter = express.Router(); // initialize express router

customerRouter
  .post("/add-customer", customerRouterController.addCustomerController)
  .get("/get-customer", customerRouterController.getCustomerController)
  .put(
    "/update-customer",
    customerRouterController.updateCustomerDetailController
  );

module.exports = customerRouter;
