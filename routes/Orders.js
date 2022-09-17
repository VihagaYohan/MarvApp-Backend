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

<<<<<<< HEAD
router.route('/:id').get(Auth,getOrderById)
.put(Auth,updateOrder)
.put(Auth,deleteOrder)
=======
router
  .route("/:id")
  .get(Auth, getOrderById)
  .put(Auth, updateOrder)
  .delete(Auth, deleteOrder);
>>>>>>> 955bc21cfd2d1fcd8db340d6efd63fd33058779a

module.exports = router;
