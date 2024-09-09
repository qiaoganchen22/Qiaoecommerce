const express = require("express");
const contactRouter = express.Router();
const { prisma } = require("../../db/client.js");

//post: creates a message on db, guest and logged in user are able to do this
contactRouter.post("/contact/me", async (req, res, next) => {
  try {
    const { email, message } = req.body;
    if (!email || !message || email?.length < 0 || message?.length < 0)
      return res.status(400).send({ error: "All fields are required." });
    await prisma.contact_me.create({
      data: { c_email: email, c_message: message },
    });
    return res.send();
  } catch (error) {
    next(error);
  }
});

module.exports = contactRouter;
