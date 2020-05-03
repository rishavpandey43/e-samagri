const express = require("express");

const middleWares = require("../middlewares/authenticate");

const orderRouterController = require("../controllers/order.router.controller");

const orderRouter = express.Router(); // initialize express router

orderRouter
  .get(
    "/get-all-orders-customer",
    middleWares.verifyUserToken,
    orderRouterController.getAllOrdersCustomer
  )
  .post(
    "/place-order",
    middleWares.verifyUserToken,
    orderRouterController.placeOrder
  )
  .get(
    "/get-all-orders-seller",
    middleWares.verifyUserToken,
    orderRouterController.getAllOrdersSeller
  )
  .put(
    "/process-order",
    middleWares.verifyUserToken,
    orderRouterController.processOrderSeller
  )
  .put(
    "/process-order-deliveryAgent",
    middleWares.verifyUserToken,
    orderRouterController.processOrderDeliveryAgent
  );

module.exports = orderRouter;
