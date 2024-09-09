const express = require("express");
const messagesRouter = express.Router();
const { loggedIn } = require("../middleware/validate.js");
const { prisma } = require("../../db/client.js");

//require user to be logged in
messagesRouter.use(loggedIn, (req, res, next) => {
  if (!req.user)
    return res.status(401).send({ error: "You must be logged in." });
  next();
});

//get: get all non deleted messages
messagesRouter.get("/messages/all", async (req, res, next) => {
  try {
    const { u_id } = req.user;
    const messages = await prisma.messages.findMany({
      where: { m_u_id: u_id, AND: { m_deleted: false } },
    });
    return res.send(messages);
  } catch (error) {
    next(error);
  }
});

//put: update a message to seen
messagesRouter.put("/messages/seen/:id", async (req, res, next) => {
  try {
    const { u_id } = req.user;
    const { id } = req.params;
    //validate message exist, is for logged in user, not seen, and not deleted
    let message = await prisma.messages.findFirst({
      where: {
        m_id: Number(id),
        AND: {
          m_deleted: false,
          AND: { m_seen: false, AND: { m_u_id: u_id } },
        },
      },
    });
    if (!message)
      return res.status(400).send({ error: "Something went wrong." });
    message = await prisma.messages.update({
      where: { m_id: Number(id) },
      data: { m_seen: true },
    });
    return res.send(message);
  } catch (error) {
    next(error);
  }
});

//delete: delete a message
messagesRouter.delete("/messages/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { u_id } = req.user;
    //validate message exist, is for logged in user, and not deleted
    let message = await prisma.messages.findFirst({
      where: {
        m_id: Number(id),
        AND: { m_deleted: false, AND: { m_u_id: u_id } },
      },
    });
    if (!message)
      return res.status(400).send({ error: "Something went wrong." });
    message = await prisma.messages.update({
      where: { m_id: Number(id) },
      data: { m_deleted: true },
    });
    return res.send(message);
  } catch (error) {
    next(error);
  }
});

module.exports = messagesRouter;
