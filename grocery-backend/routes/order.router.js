const express = require("express");

const middleWares = require("../middlewares/authenticate");

const orderRouterController = require("../controllers/order.router.controller");

const orderRouter = express.Router(); // initialize express router

orderRouter
  .get(
    "/get-all-orders",
    middleWares.verifyUserToken,
    orderRouterController.getAllOrders
  )
  .post(
    "/place-order",
    middleWares.verifyUserToken,
    orderRouterController.placeOrder
  );

module.exports = orderRouter;
