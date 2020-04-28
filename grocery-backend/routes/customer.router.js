const express = require("express");

const customerRouterController = require("../controllers/customer.router.controller");

const customerRouter = express.Router(); // initialize express router

customerRouter
  .get("/request-phone-otp", customerRouterController.requestPhoneOTP)
  .post("/register", customerRouterController.register)
  .post("/add-customer", customerRouterController.addCustomerController)
  .get("/get-customer", customerRouterController.getCustomerController)
  .get("/get-all-sellers", customerRouterController.getAllSellersController)
  .put(
    "/update-customer",
    customerRouterController.updateCustomerDetailController
  )
  .get("/get-cart", customerRouterController.getCartController)
  .put("/update-cart", customerRouterController.updateCartController);

module.exports = customerRouter;
