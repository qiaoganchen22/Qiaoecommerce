const { prisma } = require("./client.js");
const {
  supermarket_items,
  item_prices,
  item_descriptions,
  item_quantities,
  img_url,
  users,
  reviews,
  ratings,
  orders,
  items,
  cart,
  cart_items,
  messages,
  contact_me,
} = require("./data.js");
const bcrypt = require("bcryptjs");

const addProducts = async () => {
  try {
    console.log("Adding products...");
    const products = [];
    for (let i = 0; i < supermarket_items.length; i++) {
      products.push({
        p_name: supermarket_items[i],
        p_price: item_prices[i],
        p_description: item_descriptions[i],
        p_amount: item_quantities[i],
        p_image: img_url[i],
      });
    }
    await prisma.products.createMany({
      data: products,
    });
    console.log("Products added!");
  } catch (error) {
    console.error(error);
  }
};

const addUsers = async () => {
  try {
    console.log("Adding users...");
    const salt = bcrypt.genSaltSync(8);
    const hashPassword = bcrypt.hashSync("password", salt);
    for (let x of users) x.u_password = hashPassword;
    await prisma.users.createMany({
      data: users,
    });
    console.log("Users added!");
  } catch (error) {
    console.error(error);
  }
};

const addReviews = async () => {
  try {
    console.log("Adding reviews...");
    await prisma.reviews.createMany({
      data: reviews,
    });
    console.log("Reviews added!");
  } catch (error) {
    console.error(error);
  }
};

const addRatings = async () => {
  try {
    console.log("Adding ratings...");
    await prisma.rating.createMany({ data: ratings });
    console.log("Ratings added!");
  } catch (error) {
    console.error(error);
  }
};

const addOrders = async () => {
  try {
    console.log("Adding orders...");
    await prisma.orders.createMany({ data: orders });
    await prisma.items.createMany({ data: items });
    console.log("Orders added!");
  } catch (error) {
    console.error(error);
  }
};

const addCart = async () => {
  try {
    console.log("Adding cart...");
    await prisma.cart.createMany({ data: cart });
    await prisma.cart_items.createMany({ data: cart_items });
    console.log("Cart added!");
  } catch (error) {
    console.error(error);
  }
};

const addMessages = async () => {
  try {
    console.log("Adding messages...");
    await prisma.messages.createMany({ data: messages });
    console.log("Messages added!");
  } catch (error) {
    console.error(error);
  }
};

const addContactMe = async () => {
  try {
    console.log("Adding contact me...");
    await prisma.contact_me.create({ data: contact_me });
    console.log("Contact me added!");
  } catch (error) {
    console.error(error);
  }
};

const clearTable = async () => {
  try {
    console.log("Clearing tables...");
    await prisma.contact_me.deleteMany();
    await prisma.messages.deleteMany();
    await prisma.cart_items.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.items.deleteMany();
    await prisma.orders.deleteMany();
    await prisma.rating.deleteMany();
    await prisma.reviews.deleteMany();
    await prisma.products.deleteMany();
    await prisma.users.deleteMany();
    await prisma.$executeRaw`alter sequence "contact_me_c_id_seq" restart with 1`;
    await prisma.$executeRaw`alter sequence "messages_m_id_seq" restart with 1`;
    await prisma.$executeRaw`alter sequence "cart_items_ci_id_seq" restart with 1`;
    await prisma.$executeRaw`alter sequence "cart_c_id_seq" restart with 1`;
    await prisma.$executeRaw`alter sequence "items_i_id_seq" restart with 1`;
    await prisma.$executeRaw`alter sequence "orders_o_id_seq" restart with 1`;
    await prisma.$executeRaw`alter sequence "rating_r_id_seq" restart with 1`;
    await prisma.$executeRaw`alter sequence "reviews_r_id_seq" restart with 1`;
    await prisma.$executeRaw`alter sequence "products_p_id_seq" restart with 1`;
    await prisma.$executeRaw`alter sequence "users_u_id_seq" restart with 1`;
    console.log("Tables cleared!");
  } catch (error) {
    console.error(error);
  }
};

const run = async () => {
  await clearTable();
  await addProducts();
  await addUsers();
  await addReviews();
  await addRatings();
  await addOrders();
  await addCart();
  await addMessages();
  await addContactMe();
};

run();
