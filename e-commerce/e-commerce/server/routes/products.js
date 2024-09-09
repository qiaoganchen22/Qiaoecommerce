const express = require("express");
const productsRouter = express.Router();
const { prisma } = require("../../db/client.js");
const { loggedIn } = require("../middleware/validate.js");

//get: all products
productsRouter.get("/products/all", async (req, res, next) => {
  try {
    const allProducts = await prisma.products.findMany();
    return res.send(allProducts);
  } catch (error) {
    next(error);
  }
});

//get: single product based on product id
productsRouter.get("/products/single/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.products.findFirst({
      where: { p_id: Number(id) },
    });
    return product
      ? res.send(product)
      : res.status(404).send({ error: "Product does not exist." });
  } catch (error) {
    next(error);
  }
});

//get: product reviews based on product id
productsRouter.get("/products/single/reviews/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const reviews = await prisma.reviews.findMany({
      where: { r_p_id: Number(id) },
      orderBy: { r_date: "desc" },
      include: { users: { select: { u_username: true } } },
    });
    return res.send(reviews);
  } catch (error) {
    next(error);
  }
});

//get: product ratings based on product id
productsRouter.get("/products/single/ratings/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const ratings = await prisma.rating.findMany({
      where: { r_p_id: Number(id), AND: { r_deleted: false } },
      include: { users: { select: { u_username: true } } },
    });
    //include average rating for product in response
    let avgRating = 0;
    ratings.forEach((rating) => (avgRating += rating.r_rating));
    avgRating /= ratings.length;
    return res.send({ ratings, avgRating: Number(avgRating.toFixed(2)) || 0 });
  } catch (error) {
    next(error);
  }
});

//post: user can add item to cart
productsRouter.post(
  "/produts/addcart/item/:id",
  loggedIn,
  async (req, res, next) => {
    try {
      if (!req.user)
        return res.status(400).send({ error: "You must be logged in." });
      const { id } = req.params;
      const { u_id } = req.user;
      //check if item exist
      const product = await prisma.products.findFirst({
        where: { p_id: Number(id) },
      });
      if (!product)
        return res.status(400).send({ error: "Item does not exist." });
      //check if user has a cart
      let cart = await prisma.cart.findFirst({ where: { c_u_id: u_id } });
      //if not create a cart
      if (!cart) cart = await prisma.cart.create({ data: { c_u_id: u_id } });
      //if item exist in cart increase item count
      let item = await prisma.cart_items.findFirst({
        where: { ci_c_id: cart.c_id, AND: { ci_p_id: Number(id) } },
      });
      if (item)
        item = await prisma.cart_items.update({
          where: { ci_id: item.ci_id, AND: { ci_p_id: Number(id) } },
          data: { ci_count: item.ci_count + 1 },
        });
      //else add item to cart
      else
        item = await prisma.cart_items.create({
          data: { ci_c_id: cart.c_id, ci_p_id: Number(id), ci_count: 1 },
        });
      return res.send({ cart, item });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = productsRouter;
