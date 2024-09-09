const express = require("express");
const usersRouter = express.Router();
const { prisma } = require("../../db/client.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loggedIn } = require("../middleware/validate.js");

//post: user login
usersRouter.post("/users/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    //validate fields
    if (!username || !password)
      return res
        .status(401)
        .send({ error: "Username or password is not correct." });
    //validate username
    const user = await prisma.users.findFirst({
      where: { u_username: username },
    });
    //validate password
    if (!user || !bcrypt.compareSync(password, user.u_password))
      return res
        .status(401)
        .send({ error: "Username or password is not correct." });
    //validate user account status
    if (user.u_deleted)
      return res.status(400).send({ error: "Your account has been deleted." });
    //create token for user session
    const token = jwt.sign({ u_id: user.u_id }, process.env.JWT, {
      expiresIn: "24h",
    });
    //prevent password form being sent in response
    delete user.u_password;
    return res.send({ user, token });
  } catch (error) {
    next(error);
  }
});

//post: register a new user
usersRouter.post("/users/register", async (req, res, next) => {
  try {
    const { username, firstname, lastname, password } = req.body;
    //validate fields
    if (!username || firstname?.length < 1 || lastname?.length < 1 || !password)
      return res.status(400).send({ error: "All fields are required." });
    //validate username length
    if (username.length < 8 || username.length > 20)
      return res
        .status(400)
        .send({ error: "Username must be between 8 and 20 characters." });
    //check if username is available
    let user = await prisma.users.findFirst({
      where: { u_username: username },
    });
    if (user)
      return res.status(400).send({ error: "Username is unavailable." });
    //validate password length
    if (password.length < 8)
      return res
        .status(400)
        .send({ error: "Password must be atleast 8 characters." });
    //encrypt password to store in db
    const salt = bcrypt.genSaltSync(8);
    const hashPassword = bcrypt.hashSync(password, salt);
    //create user
    user = await prisma.users.create({
      data: {
        u_firstname: firstname,
        u_lastname: lastname,
        u_username: username,
        u_password: hashPassword,
      },
    });
    //create token for user to allow user to be signed in on account creation
    const token = jwt.sign({ u_id: user.u_id }, process.env.JWT, {
      expiresIn: "24h",
    });
    //prevent password from being sent in response
    delete user.u_password;
    //create system message (email) to be sent to user
    const message = {
      m_u_id: user.u_id,
      m_title: "Account Created",
      m_message: "Your account was successfully created.",
      m_sender: "System",
    };
    await prisma.messages.create({
      data: message,
    });
    return res.send({ user, token });
  } catch (error) {
    next(error);
  }
});

//put: update user info
usersRouter.put("/users/update", loggedIn, async (req, res, next) => {
  try {
    const { firstname, lastname, password } = req.body;
    //validate if user is logged in
    if (!req.user)
      return res.status(401).send({ error: "You must be logged in." });
    //extract user id from req
    const { u_id } = req.user;
    const data = {};
    //validate password
    if (password) {
      if (password.length < 8)
        return res
          .status(400)
          .send({ error: "Password must be atleast 8 characters." });
      const salt = bcrypt.genSaltSync(8);
      const hashPassword = bcrypt.hashSync(password, salt);
      data.u_password = hashPassword;
    }
    //check if firstname and lastname is being updated
    if (firstname?.length > 0) data.u_firstname = firstname;
    if (lastname?.length > 0) data.u_lastname = lastname;
    //update db if atleast 1 data is being changed
    if (Object.keys(data).length > 0) {
      const user = await prisma.users.update({
        where: { u_id },
        data: data,
      });
      //prevent password from being sent in response
      delete user.u_password;
      //send a system message to user
      const message = {
        m_u_id: u_id,
        m_title: "Account Updated",
        m_message: "Your account was successfully updated.",
        m_sender: "System",
      };
      await prisma.messages.create({ data: message });
      return res.send(user);
    }
    return res.status(400).send({ error: "No changes made." });
  } catch (error) {
    next(error);
  }
});

//put: close user account
usersRouter.put("/users/closeaccount", loggedIn, async (req, res, next) => {
  try {
    //validate user is logged in
    if (!req.user)
      return res.status(401).send({ error: "You must be logged in." });
    const { u_id } = req.user;
    await prisma.users.update({
      where: { u_id },
      data: { u_deleted: true },
    });
    //send system message (data keeping)
    const message = {
      m_u_id: u_id,
      m_title: "Account Deleted",
      m_message: "Your account was successfully deleted.",
      m_sender: "System",
    };
    await prisma.messages.create({ data: message });
    return res.send();
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
