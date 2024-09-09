const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cartRouter = require("./routes/cart.js");
const contactRouter = require("./routes/contact.js");
const messagesRouter = require("./routes/messages.js");
const ordersRouter = require("./routes/orders.js");
const productsRouter = require("./routes/products.js");
const ratingsRouter = require("./routes/ratings.js");
const reviewsRouter = require("./routes/reviews.js");
const usersRouter = require("./routes/users.js");

const server = express();
dotenv.config();
const port = process.env.PORT;

server.use(cors());
server.use(express.json());

server.use("/cart", cartRouter);
server.use("/contact", contactRouter);
server.use("/messages", messagesRouter);
server.use("/orders", ordersRouter);
server.use("/products", productsRouter);
server.use("/ratings", ratingsRouter);
server.use("/reviews", reviewsRouter);
server.use("/users", usersRouter);

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});
