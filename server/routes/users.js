const express = require("express");
const Order = require("../models/user");

const userRouter = express.Router();

userRouter.get("/users", async (req, res) => {
  const orders = await Order.find().select("-__v");

  try {
    res.json(orders);
  } catch (error) {
    res.json({ status: "error" });
  }
});

userRouter.post("/users", async (req, res) => {
  const { name, phone, order, status } = req.body;
  const newOrder = new Order({
    name,
    phone,
    order: JSON.stringify(order),
    status,
  });
  try {
    await newOrder.save();
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error" });
  }
});

module.exports = userRouter;
