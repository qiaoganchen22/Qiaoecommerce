const express = require("express");
const { loggedIn } = require("../middleware/validate");
const { prisma } = require("../../db/client");
const reviewsRouter = express.Router();

//requires user to be logged in to perform any review actions
reviewsRouter.use(loggedIn, (req, res, next) => {
  if (!req.user)
    return res.status(401).send({ error: "You must be logged in." });
  next();
});

//get: all reviews by user
reviewsRouter.get("/reviews/all", async (req, res, next) => {
  try {
    const { u_id } = req.user;
    //retrieves all reviews made by user, order by date
    const reviews = await prisma.reviews.findMany({
      where: { r_u_id: u_id },
      orderBy: { r_date: "desc" },
      include: { products: { select: { p_name: true } } },
    });
    return res.send(reviews);
  } catch (error) {
    next(error);
  }
});

//post: create new review
reviewsRouter.post("/reviews/new/product/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { u_id } = req.user;
    const { review } = req.body;
    //validate review
    if (!review || review?.length < 1)
      return res.status(400).send({ error: "Reviews cannot be empty." });
    //validate product
    const product = await prisma.products.findFirst({
      where: { p_id: Number(id) },
    });
    if (!product)
      return res.status(400).send({ error: "Product does not exist." });
    const _review = await prisma.reviews.create({
      data: { r_p_id: Number(id), r_u_id: u_id, r_review: review },
      include: { users: { select: { u_username: true } } },
    });
    return res.send(_review);
  } catch (error) {
    next(error);
  }
});

//put: update review
reviewsRouter.put("/reviews/update/review/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { u_id } = req.user;
    const { new_review } = req.body;
    //validate review id, user is creator, review status
    let review = await prisma.reviews.findFirst({
      where: {
        r_id: Number(id),
        AND: { r_u_id: u_id, AND: { r_deleted: false } },
      },
    });
    if (!review)
      return res.status(400).send({ error: "Something went wrong." });
    //validate new review
    if (!new_review || new_review?.length < 1)
      return res.status(400).send({ error: "Reviews cannot be empty." });
    review = await prisma.reviews.update({
      where: { r_id: Number(id) },
      data: { r_review: new_review, r_edited: true },
      include: { users: { select: { u_username: true } } },
    });
    return res.send(review);
  } catch (error) {
    next(error);
  }
});

//delete: delete review
reviewsRouter.delete("/reviews/delete/review/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { u_id } = req.user;
    //validate review id, user is creator, review status
    let review = await prisma.reviews.findFirst({
      where: {
        r_id: Number(id),
        AND: { r_u_id: u_id, AND: { r_deleted: false } },
      },
    });
    if (!review)
      return res.status(400).send({ error: "Something went wrong." });
    //update review status
    review = await prisma.reviews.update({
      where: { r_id: Number(id) },
      data: { r_deleted: true },
    });
    return res.send(review);
  } catch (error) {
    next(error);
  }
});

module.exports = reviewsRouter;
