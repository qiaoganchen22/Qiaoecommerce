const express = require("express");
const { loggedIn } = require("../middleware/validate");
const { prisma } = require("../../db/client");
const ratingsRouter = express.Router();

//requires users to be logged in
ratingsRouter.use(loggedIn, (req, res, next) => {
  if (!req.user)
    return res.status(401).send({ error: "You must be logged in." });
  next();
});

//get: get all ratings for user
ratingsRouter.get("/ratings/all", async (req, res, next) => {
  try {
    const { u_id } = req.user;
    //ignore deleted ratings
    const ratings = await prisma.rating.findMany({
      where: { r_u_id: u_id, AND: { r_deleted: false } },
      include: { products: { select: { p_name: true } } },
    });
    return res.send(ratings);
  } catch (error) {
    next(error);
  }
});

//post: add rating
ratingsRouter.post("/ratings/new/product/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { u_id } = req.user;
    const { rating_score } = req.body;
    //validate product
    const product = await prisma.products.findFirst({
      where: { p_id: Number(id) },
    });
    if (!product)
      return res.status(400).send({ error: "Product does not exist." });
    //validate rating does not exist or deleted
    let rating = await prisma.rating.findFirst({
      where: {
        r_p_id: Number(id),
        AND: { r_u_id: u_id, AND: { r_deleted: false } },
      },
    });
    if (rating)
      return res.status(400).send({ error: "You already rated this item." });
    //validate rating score to be between 0 and 6 exclusive and whole number
    if (
      !Number.isInteger(Number(rating_score)) ||
      Number(rating_score) < 1 ||
      Number(rating_score) > 5
    )
      return res.status(400).send({ error: "Rating range error." });
    rating = await prisma.rating.create({
      data: {
        r_p_id: Number(id),
        r_u_id: u_id,
        r_rating: Number(rating_score),
      },
      include: { users: { select: { u_username: true } } },
    });
    return res.send(rating);
  } catch (error) {
    next(error);
  }
});

//put: edit rating
ratingsRouter.put("/ratings/update/rating/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { u_id } = req.user;
    const { rating_score } = req.body;
    //validate rating exist, not deleted, and user is creator
    let rating = await prisma.rating.findFirst({
      where: {
        r_id: Number(id),
        AND: { r_deleted: false, AND: { r_u_id: u_id } },
      },
    });
    if (!rating)
      return res.status(400).send({
        error: "Something went wrong.",
      });
    //validate rating score is between 0 and 6 exclusive and whole number
    if (
      !Number.isInteger(Number(rating_score)) ||
      Number(rating_score) < 0 ||
      Number(rating_score) > 5
    )
      return res.status(400).send({ error: "Rating range error." });
    rating = await prisma.rating.update({
      where: { r_id: Number(id) },
      data: { r_rating: Number(rating_score) },
      include: { users: { select: { u_username: true } } },
    });
    return res.send(rating);
  } catch (error) {
    next(error);
  }
});

//delete: remove rating
ratingsRouter.delete("/ratings/delete/rating/:id", async (req, res, next) => {
  try {
    const { u_id } = req.user;
    const { id } = req.params;
    //validate rating exist and user is creator and not deleted
    let rating = await prisma.rating.findFirst({
      where: {
        r_id: Number(id),
        AND: { r_u_id: u_id, AND: { r_deleted: false } },
      },
    });
    if (!rating)
      return res.status(400).send({
        error: "Something went wrong.",
      });
    rating = await prisma.rating.update({
      where: { r_id: Number(id) },
      data: { r_deleted: true },
    });
    return res.send(rating);
  } catch (error) {
    next(error);
  }
});

module.exports = ratingsRouter;
