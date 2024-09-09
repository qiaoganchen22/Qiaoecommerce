const express = require("express");
const cartRouter = express.Router();
const { prisma } = require("../../db/client.js");
const { loggedIn } = require("../middleware/validate.js");

//user must be logged in
cartRouter.use(loggedIn, (req, res, next) => {
  if (!req.user)
    return res.status(401).send({ error: "You must be logged in." });
  next();
});

//get: user can get their existing cart
cartRouter.get("/cart/getcart", async (req, res, next) => {
  try {
    const { u_id } = req.user;
    //get cart
    const cart = await prisma.cart.findFirst({
      where: { c_u_id: u_id },
    });
    //get cart items
    const items = await prisma.cart_items.findMany({
      where: { ci_c_id: cart.c_id },
      include: {
        products: { select: { p_name: true, p_image: true, p_price: true } },
      },
    });
    return res.send({ cart, items });
  } catch (error) {
    next(error);
  }
});

//validate cart item exist
const validate = async (id, i_id, u_id) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: { c_id: Number(id), AND: { c_u_id: u_id } },
    });
    if (!cart) return false;
    //validate item exist in cart
    let item = await prisma.cart_items.findFirst({
      where: { ci_c_id: Number(id), AND: { ci_p_id: Number(i_id) } },
    });
    if (!item) return false;
    return item;
  } catch (error) {
    return false;
  }
};

//clear cart if no items in cart
const clearCart = async (id) => {
  try {
    const cart = await prisma.cart_items.findMany({
      where: { ci_c_id: Number(id) },
    });
    if (!cart.length) await prisma.cart.delete({ where: { c_id: Number(id) } });
  } catch (error) {
    console.log(error);
  }
};

//put: user can increase item count
cartRouter.put("/cart/increase/cart/:id/item/:i_id", async (req, res, next) => {
  try {
    const { id, i_id } = req.params;
    const { u_id } = req.user;
    //validate cart exist and is for logged in user
    //validate item exist in cart
    let item = await validate(id, i_id, u_id);
    if (!item) return res.status(400).send({ error: "Something went wrong." });
    item = await prisma.cart_items.update({
      where: { ci_id: item.ci_id, AND: { ci_p_id: Number(i_id) } },
      data: { ci_count: item.ci_count + 1 },
    });
    return res.send(item);
  } catch (error) {
    next(error);
  }
});

//put: user can decrease item count
cartRouter.put("/cart/decrease/cart/:id/item/:i_id", async (req, res, next) => {
  try {
    const { id, i_id } = req.params;
    const { u_id } = req.user;
    //validate cart exist and is for logged in user
    //validate item exist in cart
    let item = await validate(id, i_id, u_id);
    if (!item) return res.status(400).send({ error: "Something went wrong." });
    //if item count is less than 2 remove item from cart
    if (item.ci_count < 2) {
      item = await prisma.cart_items.delete({
        where: { ci_id: item.ci_id, AND: { ci_p_id: Number(i_id) } },
      });
      await clearCart(id);
      return res.send(item);
    }
    //decrease item count
    item = await prisma.cart_items.update({
      where: { ci_id: item.ci_id, AND: { ci_p_id: Number(i_id) } },
      data: { ci_count: item.ci_count - 1 },
    });
    await clearCart(id);
    return res.send(item);
  } catch (error) {
    next(error);
  }
});

//delete: user can remove item from cart
cartRouter.delete(
  "/cart/remove/cart/:id/item/:i_id",
  async (req, res, next) => {
    try {
      const { id, i_id } = req.params;
      const { u_id } = req.user;
      //validate cart exist and is for logged in user
      //validate item exist in cart
      let item = await validate(id, i_id, u_id);
      if (!item)
        return res.status(400).send({ error: "Something went wrong." });
      item = await prisma.cart_items.delete({
        where: { ci_id: item.ci_id, AND: { ci_p_id: Number(i_id) } },
      });
      //if cart is empty clear cart
      await clearCart(id);
      return res.send(item);
    } catch (error) {
      next(error);
    }
  }
);

//delete: user can cancel entire cart
cartRouter.delete("/cart/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { u_id } = req.user;
    //validate if cart exist and is for logged in user
    let cart = await prisma.cart.findFirst({
      where: { c_id: Number(id), AND: { c_u_id: u_id } },
    });
    if (!cart) return res.status(400).send({ error: "Cart not found." });
    //remove all items
    await prisma.cart_items.deleteMany({ where: { ci_c_id: cart.c_id } });
    //remove cart
    cart = await prisma.cart.delete({ where: { c_id: Number(id) } });
    return res.send(cart);
  } catch (error) {
    next(error);
  }
});

//post: user can checkout cart
cartRouter.post("/cart/checkout/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { u_id } = req.user;
    const { card, address } = req.body;
    //validate card
    if (!card || card?.length !== 16)
      return res.status(400).send({ error: "Invalid card." });
    //validate address
    if (!address || address?.length < 1)
      return res.status(400).send({ error: "Invalid address." });
    //validate if cart exist and is for logged in user
    let cart = await prisma.cart.findFirst({
      where: { c_u_id: u_id, AND: { c_id: Number(id) } },
    });
    if (!cart) return res.status(400).send({ error: "Something went wrong." });
    //get all items from cart
    const items = await prisma.cart_items.findMany({
      where: { ci_c_id: cart.c_id },
      include: { products: { select: { p_price: true, p_amount: true } } },
    });
    //get sum
    let sum = 0;
    const order_items = [];
    items.forEach((item) => {
      sum += item.ci_count * Number(item.products.p_price);
    });
    //create order
    const order = {
      o_u_id: u_id,
      o_total: sum,
      o_card: card,
      o_address: address,
      o_status: "complete",
    };
    const new_order = await prisma.orders.create({ data: order });
    //create order items
    items.forEach((item) =>
      order_items.push({
        i_o_id: new_order.o_id,
        i_p_id: item.ci_p_id,
        i_count: item.ci_count,
      })
    );
    const new_order_items = await prisma.items.createMany({
      data: order_items,
    });
    //delete cart items
    await prisma.cart_items.deleteMany({ where: { ci_c_id: cart.c_id } });
    //delete cart
    await prisma.cart.delete({ where: { c_id: cart.c_id } });
    //create message
    const message = {
      m_sender: "System",
      m_message: `Your order #${new_order.o_id} has been completed!`,
      m_title: `Order #${new_order.o_id}`,
      m_u_id: u_id,
    };
    await prisma.messages.create({ data: message });
    return res.send({ new_order, new_order_items });
  } catch (error) {
    next(error);
  }
});

//post: add guest cart into user cart
cartRouter.post("/cart/addCart/guest", async (req, res, next) => {
  try {
    const { u_id } = req.user;
    const { data } = req.body;
    //check if user has cart
    //create cart if they do not

    //if no cart, add items to cart

    //if cart exist
  } catch (error) {
    next(error);
  }
});

module.exports = cartRouter;
