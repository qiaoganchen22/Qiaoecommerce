const supermarket_items = [
  "bread",
  "milk",
  "eggs",
  "cheese",
  "yogurt",
  "apples",
  "bananas",
  "potatoes",
  "tomatoes",
  "onions",
  "carrots",
  "lettuce",
  "chicken",
  "beef",
  "pasta",
  "rice",
  "cereal",
  "cookies",
  "orange juice",
  "toilet paper",
];

const item_prices = [
  2.5, 1.99, 2.29, 4.5, 0.99, 0.75, 0.59, 1.49, 2.99, 1.19, 0.99, 1.29, 5.99,
  8.99, 1.79, 2.49, 3.49, 2.99, 3.29, 6.99,
];

const item_descriptions = [
  "A staple food made from flour, water, and yeast, often used for sandwiches or toast.",
  "A nutritious liquid produced by mammals, commonly consumed as a beverage or used in cooking and baking.",
  "Nutrient-rich food produced by female animals, commonly used in cooking, baking, and as a standalone dish.",
  "A dairy product made from milk curd, typically aged and used as a flavorful ingredient or snack.",
  "A fermented dairy product with a creamy texture, often consumed as a snack or used in cooking and baking.",
  "Fruits with a crisp texture and sweet or tart flavor, commonly eaten raw or used in various dishes and desserts.",
  "Long, curved fruits with a soft, creamy texture and sweet flavor, often eaten raw or used in smoothies and baking.",
  "Starchy tuber vegetables with versatile culinary uses, such as boiling, baking, frying, or mashing.",
  "Juicy fruits with a tangy flavor, commonly used fresh in salads, sandwiches, sauces, and soups.",
  "A pungent vegetable with layers of edible bulbs, used to add flavor to a wide range of savory dishes.",
  "Crunchy root vegetables with a sweet flavor, often eaten raw as a snack or cooked in various dishes.",
  "Leafy green vegetables with a mild flavor and crisp texture, commonly used as a base for salads and sandwiches.",
  "A popular poultry meat with a mild flavor and tender texture, commonly cooked in various ways, such as grilling, roasting, or frying.",
  "Red meat derived from cattle, known for its rich flavor and versatility in cooking, such as steaks, roasts, and burgers.",
  "Staple food made from durum wheat flour, commonly boiled and served with sauce or used in casseroles and salads.",
  "Staple grain with a mild flavor and versatile culinary uses, commonly boiled and served as a side dish or base for various recipes.",
  "Ready-to-eat breakfast food made from grains, often served with milk and enjoyed for its convenience and nutrition.",
  "Sweet baked treats made from dough, typically containing sugar, flour, and other ingredients, enjoyed as snacks or desserts.",
  "Citrus juice extracted from oranges, known for its refreshing taste and high vitamin C content, commonly consumed as a beverage.",
  "Soft paper product used for personal hygiene, primarily for cleaning oneself after using the toilet.",
];

const item_quantities = [
  4, 8, 2, 3, 6, 5, 7, 9, 1, 10, 3, 8, 2, 6, 4, 7, 5, 9, 3, 10,
];

const img_url = [
  "https://res.cloudinary.com/day4sl0qg/image/upload/v1715736890/pexels-photo-1586947_zxyqzg.jpg",
  "https://res.cloudinary.com/day4sl0qg/image/upload/v1715736887/pexels-pixabay-248412_u0jayb.jpg",
  "https://res.cloudinary.com/day4sl0qg/image/upload/v1715736887/pexels-pixabay-162712_oxz8pt.jpg",
  "https://res.cloudinary.com/day4sl0qg/image/upload/v1715736883/pexels-irita-306801_ufaqsr.jpg",
  "https://res.cloudinary.com/day4sl0qg/image/upload/v1715736888/pexels-pixabay-414262_va9z8d.jpg",
  "https://res.cloudinary.com/day4sl0qg/image/upload/v1715736891/pexels-suzyhazelwood-1510392_xi5prb.jpg",
  "https://res.cloudinary.com/day4sl0qg/image/upload/v1715736883/pexels-akio-1093038_g2rmcx.jpg",
  "https://res.cloudinary.com/day4sl0qg/image/upload/v1715736889/pexels-pixabay-144248_mjtni4.jpg",
  "https://res.cloudinary.com/day4sl0qg/image/upload/v1715736891/pexels-wdnet-96616_zxck9q.jpg",
  "https://res.cloudinary.com/day4sl0qg/image/upload/v1715736889/pexels-pixabay-533342_i7xmn0.jpg",
  "https://res.cloudinary.com/day4sl0qg/image/upload/v1715736886/pexels-mali-143133_gkzrno.jpg",
  "https://res.cloudinary.com/day4sl0qg/image/upload/v1715736887/pexels-nc-farm-bureau-mark-2893639_kzwp5q.jpg",
  "https://res.cloudinary.com/day4sl0qg/image/upload/v1715736885/pexels-harry-dona-2338407_jacvys.jpg",
  "https://res.cloudinary.com/day4sl0qg/image/upload/v1715736885/pexels-mali-65175_n4bc4j.jpg",
  "https://res.cloudinary.com/day4sl0qg/image/upload/v1715736885/pexels-enginakyurt-1438672_kbgsru.jpg",
  "https://res.cloudinary.com/day4sl0qg/image/upload/v1715736891/pexels-suzyhazelwood-1306548_rmxd82.jpg",
  "https://res.cloudinary.com/day4sl0qg/image/upload/v1715736885/pexels-jeshoots-216951_vcjsgm.jpg",
  "https://res.cloudinary.com/day4sl0qg/image/upload/v1715736885/pexels-fotios-photos-230325_bamk9g.jpg",
  "https://res.cloudinary.com/day4sl0qg/image/upload/v1715736885/pexels-jeshoots-3603_wqancf.jpg",
  "https://res.cloudinary.com/day4sl0qg/image/upload/v1715736890/pexels-vlada-karpovich-3958198_hfk76z.jpg",
];

const users = [
  {
    u_username: "andrew123",
    u_firstname: "andrew",
    u_lastname: "lin",
    u_admin: true,
  },
  {
    u_username: "peter123",
    u_firstname: "peter",
    u_lastname: "chen",
    u_admin: false,
  },
];

const reviews = [
  { r_u_id: 1, r_p_id: 1, r_review: "Yummy!" },
  { r_u_id: 1, r_p_id: 2, r_review: "Yummy!" },
  { r_u_id: 1, r_p_id: 3, r_review: "Yummy!" },
  { r_u_id: 1, r_p_id: 5, r_review: "Yummy!", r_edited: true },
  { r_u_id: 2, r_p_id: 1, r_review: "Yuck!" },
  { r_u_id: 2, r_p_id: 3, r_review: "Yuck!" },
  { r_u_id: 2, r_p_id: 5, r_review: "Yuck!", r_deleted: true },
];

const ratings = [
  {
    r_u_id: 1,
    r_p_id: 1,
    r_rating: 5,
  },
  {
    r_u_id: 1,
    r_p_id: 2,
    r_rating: 4,
    r_deleted: true,
  },
  {
    r_u_id: 2,
    r_p_id: 1,
    r_rating: 4,
  },
];

const orders = [
  {
    o_u_id: 1,
    o_total: 0,
    o_status: "cancel",
    o_card: "0000000000000000",
    o_address: "0",
  },
  {
    o_u_id: 1,
    o_total: 7.29,
    o_status: "complete",
    o_card: "1234567890111161",
    o_address: "White House, White Street 11111",
  },
];

const items = [
  {
    i_o_id: 1,
    i_p_id: 1,
    i_count: 2,
  },
  {
    i_o_id: 1,
    i_p_id: 3,
    i_count: 1,
  },
  {
    i_o_id: 2,
    i_p_id: 1,
    i_count: 2,
  },
  {
    i_o_id: 2,
    i_p_id: 3,
    i_count: 1,
  },
];

const cart = [{ c_u_id: 1 }];

const cart_items = [
  { ci_c_id: 1, ci_p_id: 1, ci_count: 1 },
  { ci_c_id: 1, ci_p_id: 2, ci_count: 2 },
  { ci_c_id: 1, ci_p_id: 3, ci_count: 1 },
];

const messages = [
  {
    m_sender: "System",
    m_message: "Your account has been created successfully!",
    m_title: "Account Info",
    m_u_id: 1,
    m_seen: true,
    m_deleted: true,
  },
  {
    m_sender: "System",
    m_message: "Your order #1 was successfully cancelled!",
    m_title: "Order #1",
    m_u_id: 1,
    m_seen: true,
  },
  {
    m_sender: "System",
    m_message: "Your account has been created successfully!",
    m_title: "Account Info",
    m_u_id: 2,
  },
  {
    m_sender: "System",
    m_message: "Your order #2 has been completed!",
    m_title: "Order #2",
    m_u_id: 1,
  },
];

const contact_me = { c_email: "test@test.test", c_message: "test" };

module.exports = {
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
};
