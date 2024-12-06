const express = require("express");
const {
  postOrder,
  orderList,
  orderDetails,
  userOrders,
} = require("../controllers/orderController");
const router = express.Router();

router.post("/postorder", postOrder);
router.get("/orderlist", orderList);
router.get("/orderdetails/:id", orderDetails);
router.get("/userorders/:userId", userOrders);

module.exports = router;
