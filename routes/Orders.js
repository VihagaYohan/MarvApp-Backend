const express = require("express");
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/Orders");
const Auth = require("../middleware/Auth");

const router = express.Router();

router.route("/").get(Auth, getAllOrders).post(Auth, createOrder);

router
  .route("/:id")
  .get(Auth, getOrderById)
  .put(Auth, updateOrder)
  .delete(Auth, deleteOrder);

module.exports = router;
