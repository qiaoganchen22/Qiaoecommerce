-- CreateEnum
CREATE TYPE "status" AS ENUM ('cancel', 'complete');

-- CreateTable
CREATE TABLE "cart" (
    "c_id" SERIAL NOT NULL,
    "c_u_id" INTEGER NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("c_id")
);

-- CreateTable
CREATE TABLE "cart_items" (
    "ci_id" SERIAL NOT NULL,
    "ci_p_id" INTEGER NOT NULL,
    "ci_count" INTEGER NOT NULL,
    "ci_c_id" INTEGER NOT NULL,

    CONSTRAINT "cart_items_pkey" PRIMARY KEY ("ci_id")
);

-- CreateTable
CREATE TABLE "contact_me" (
    "c_id" SERIAL NOT NULL,
    "c_email" VARCHAR(500) NOT NULL,
    "c_message" VARCHAR(5000) NOT NULL,
    "c_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_me_pkey" PRIMARY KEY ("c_id")
);

-- CreateTable
CREATE TABLE "items" (
    "i_id" SERIAL NOT NULL,
    "i_o_id" INTEGER NOT NULL,
    "i_p_id" INTEGER NOT NULL,
    "i_count" INTEGER NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("i_id")
);

-- CreateTable
CREATE TABLE "messages" (
    "m_id" SERIAL NOT NULL,
    "m_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "m_sender" VARCHAR(500) NOT NULL,
    "m_message" VARCHAR(5000) NOT NULL,
    "m_deleted" BOOLEAN DEFAULT false,
    "m_seen" BOOLEAN DEFAULT false,
    "m_title" VARCHAR(500) NOT NULL,
    "m_u_id" INTEGER NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("m_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "o_id" SERIAL NOT NULL,
    "o_u_id" INTEGER NOT NULL,
    "o_total" DECIMAL NOT NULL,
    "o_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "o_status" "status" NOT NULL,
    "o_card" VARCHAR(16) NOT NULL,
    "o_address" VARCHAR(2000) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("o_id")
);

-- CreateTable
CREATE TABLE "products" (
    "p_id" SERIAL NOT NULL,
    "p_name" VARCHAR(500) NOT NULL,
    "p_price" DECIMAL NOT NULL,
    "p_description" VARCHAR(5000) NOT NULL,
    "p_amount" INTEGER NOT NULL DEFAULT 0,
    "p_image" VARCHAR(5000) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("p_id")
);

-- CreateTable
CREATE TABLE "rating" (
    "r_id" SERIAL NOT NULL,
    "r_u_id" INTEGER NOT NULL,
    "r_p_id" INTEGER NOT NULL,
    "r_deleted" BOOLEAN DEFAULT false,
    "r_rating" INTEGER NOT NULL,

    CONSTRAINT "rating_pkey" PRIMARY KEY ("r_id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "r_id" SERIAL NOT NULL,
    "r_p_id" INTEGER NOT NULL,
    "r_u_id" INTEGER NOT NULL,
    "r_review" VARCHAR(5000) NOT NULL,
    "r_deleted" BOOLEAN DEFAULT false,
    "r_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "r_edited" BOOLEAN DEFAULT false,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("r_id")
);

-- CreateTable
CREATE TABLE "users" (
    "u_id" SERIAL NOT NULL,
    "u_username" VARCHAR(20) NOT NULL,
    "u_firstname" VARCHAR(50) NOT NULL,
    "u_lastname" VARCHAR(50) NOT NULL,
    "u_password" VARCHAR(5000) NOT NULL,
    "u_admin" BOOLEAN DEFAULT false,
    "u_deleted" BOOLEAN DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("u_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_u_username_key" ON "users"("u_username");

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_c_u_id_fkey" FOREIGN KEY ("c_u_id") REFERENCES "users"("u_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_ci_c_id_fkey" FOREIGN KEY ("ci_c_id") REFERENCES "cart"("c_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_ci_p_id_fkey" FOREIGN KEY ("ci_p_id") REFERENCES "products"("p_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_i_o_id_fkey" FOREIGN KEY ("i_o_id") REFERENCES "orders"("o_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_i_p_id_fkey" FOREIGN KEY ("i_p_id") REFERENCES "products"("p_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_m_u_id_fkey" FOREIGN KEY ("m_u_id") REFERENCES "users"("u_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_o_u_id_fkey" FOREIGN KEY ("o_u_id") REFERENCES "users"("u_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_r_p_id_fkey" FOREIGN KEY ("r_p_id") REFERENCES "products"("p_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_r_u_id_fkey" FOREIGN KEY ("r_u_id") REFERENCES "users"("u_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_r_p_id_fkey" FOREIGN KEY ("r_p_id") REFERENCES "products"("p_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_r_u_id_fkey" FOREIGN KEY ("r_u_id") REFERENCES "users"("u_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
