const express = require("express");
const ordersRouter = express.Router();
const { loggedIn } = require("../middleware/validate.js");
const { prisma } = require("../../db/client.js");

//requires users to be logged in
ordersRouter.use(loggedIn, (req, res, next) => {
  if (!req.user)
    return res.status(401).send({ error: "You must be logged in." });
  next();
});

//get: gets all successfull orders
ordersRouter.get("/orders/complete", async (req, res, next) => {
  try {
    const { u_id } = req.user;
    const orders = await prisma.orders.findMany({
      where: { o_u_id: u_id, AND: { o_status: "complete" } },
    });
    return res.send(orders);
  } catch (error) {
    next(error);
  }
});

//get: gets all cancelled orders
ordersRouter.get("/orders/cancel", async (req, res, next) => {
  try {
    const { u_id } = req.user;
    const orders = await prisma.orders.findMany({
      where: { o_u_id: u_id, AND: { o_status: "cancel" } },
    });
    return res.send(orders);
  } catch (error) {
    next(error);
  }
});

//get: get all items in order
ordersRouter.get("/orders/order/details/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    //validate if order exist
    const order = await prisma.orders.findFirst({
      where: { o_id: Number(id) },
    });
    if (!order) return res.status(400).send({ error: "Order not found." });
    const items = await prisma.items.findMany({
      where: { i_o_id: Number(id) },
      include: {
        products: { select: { p_name: true, p_image: true, p_price: true } },
      },
    });
    return res.send(items);
  } catch (error) {
    next(error);
  }
});

//put: cancel order if same day
ordersRouter.put("/orders/order/cancel/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { u_id } = req.user;
    //validate order and user
    let order = await prisma.orders.findFirst({
      where: {
        o_id: Number(id),
        AND: { o_u_id: u_id, AND: { o_status: "complete" } },
      },
    });
    if (!order) return res.status(400).send({ error: "Something went wrong." });
    const date = new Date().toJSON();
    //validate date
    if (date.substring(0, 10) !== order.o_date.toJSON().substring(0, 10))
      return res.status(400).send({ error: "Cancellation date has past." });
    order = await prisma.orders.update({
      where: { o_id: order.o_id },
      data: { o_status: "cancel", o_total: 0 },
    });
    //send message
    await prisma.messages.create({
      data: {
        m_sender: "System",
        m_message: `Your order #${order.o_id} was successfully cancelled!`,
        m_title: `Order #${order.o_id}`,
        m_u_id: u_id,
      },
    });
    return res.send(order);
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
