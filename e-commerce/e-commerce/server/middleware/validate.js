const jwt = require("jsonwebtoken");
const { prisma } = require("../../db/client.js");

//validate to make sure user is logged in and check if user is admin
const loggedIn = async (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

  try {
    //validate token
    req.user = jwt.verify(token, process.env.JWT);
    const user = await prisma.users.findFirst({
      where: { u_id: req.user.u_id },
    });
    //if user is deleted
    if (user.u_deleted) req.user = null;
    //checks if user is admin
    else user.u_admin ? (req.user.isAdmin = true) : (req.user.isAdmin = false);
  } catch {
    req.user = null;
  }
  next();
};

module.exports = { loggedIn };
