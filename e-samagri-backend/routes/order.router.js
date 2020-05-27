const express = require('express');

const authenticate = require('../middlewares/authenticate');

const orderRouterController = require('../controllers/order.router.controller');

const orderRouter = express.Router(); // initialize express router

orderRouter
  .get(
    '/get-all-orders-customer',
    authenticate.verifyUserToken,
    orderRouterController.getAllOrdersCustomer
  )
  .post(
    '/place-order',
    authenticate.verifyUserToken,
    orderRouterController.placeOrder
  )
  .get(
    '/get-all-orders-seller',
    authenticate.verifyUserToken,
    orderRouterController.getAllOrdersSeller
  )
  .put(
    '/process-order-seller',
    authenticate.verifyUserToken,
    orderRouterController.processOrderSeller
  )
  .get(
    '/get-delivery-not-assigned-orders-deliveryAgent',
    authenticate.verifyUserToken,
    orderRouterController.getDeliveryNotAssignedOrders
  )
  .get(
    '/get-all-orders-deliveryAgent',
    authenticate.verifyUserToken,
    orderRouterController.getAllOrdersDeliveryAgent
  )
  .put(
    '/process-order-deliveryAgent',
    authenticate.verifyUserToken,
    orderRouterController.processOrderDeliveryAgent
  );

module.exports = orderRouter;
