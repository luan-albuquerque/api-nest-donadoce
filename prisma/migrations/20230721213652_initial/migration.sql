/*
  Warnings:

  - You are about to drop the column `cpf` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `fone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `is_product` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `is_revenues` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `is_stock` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_cpf_key";

-- DropIndex
DROP INDEX "User_fone_key";

-- DropIndex
DROP INDEX "User_nickname_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cpf",
DROP COLUMN "fone",
DROP COLUMN "is_product",
DROP COLUMN "is_revenues",
DROP COLUMN "is_stock",
DROP COLUMN "name",
DROP COLUMN "nickname",
ADD COLUMN     "is_client" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_driver" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_production" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "corporate_name" TEXT NOT NULL,
    "name_fantasy" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "county" TEXT,
    "district" TEXT,
    "ie" TEXT NOT NULL,
    "uf" TEXT,
    "fone" TEXT,
    "address" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "accountable" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fone" TEXT,
    "address" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "used_in" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_t" TIMESTAMP(3),

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredients" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "amount_actual" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_t" TIMESTAMP(3),

    CONSTRAINT "Ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient_control" (
    "id" SERIAL NOT NULL,
    "fk_ingredient" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_output" BOOLEAN NOT NULL,
    "unitary_value" DOUBLE PRECISION,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Ingredient_control_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredients_Revenues" (
    "fk_ingredient" TEXT NOT NULL,
    "fk_revenues" TEXT NOT NULL,
    "amount_ingredient" INTEGER NOT NULL,

    CONSTRAINT "Ingredients_Revenues_pkey" PRIMARY KEY ("fk_ingredient","fk_revenues")
);

-- CreateTable
CREATE TABLE "Revenues" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "yield_per_quantity" INTEGER,
    "time_in_hours" INTEGER,
    "presumed_profit" DOUBLE PRECISION,
    "imagem" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_t" TIMESTAMP(3),
    "status" INTEGER NOT NULL,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Revenues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "corporate_name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fone" TEXT NOT NULL,
    "county" TEXT,
    "district" TEXT,
    "uf" TEXT,
    "address" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client_Company" (
    "fk_company" TEXT NOT NULL,
    "fk_client" TEXT NOT NULL,
    "fone" TEXT NOT NULL,
    "accountable" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_Company_pkey" PRIMARY KEY ("fk_client","fk_company")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" TEXT NOT NULL,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "dateMenu" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemMenu" (
    "fk_revenues" TEXT NOT NULL,
    "fk_menu" TEXT NOT NULL,
    "revenue_value_on_the_day" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ItemMenu_pkey" PRIMARY KEY ("fk_revenues","fk_menu")
);

-- CreateTable
CREATE TABLE "CategoryOrderItem" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "CategoryOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "dateOrder" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valueOrder" DOUBLE PRECISION NOT NULL,
    "fk_orderstatus" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderStatus" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "OrderStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "fk_order" TEXT NOT NULL,
    "fk_revenue" TEXT NOT NULL,
    "fk_categoryOrderItem" TEXT NOT NULL,
    "valueOrderItem" DOUBLE PRECISION NOT NULL,
    "dateOrderItem" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amountItem" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("fk_revenue","fk_order")
);

-- CreateTable
CREATE TABLE "RevenuePerClient" (
    "fk_revenue" TEXT NOT NULL,
    "fk_client" TEXT NOT NULL,
    "unique_value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RevenuePerClient_pkey" PRIMARY KEY ("fk_revenue","fk_client")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_cnpj_key" ON "Client"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Client_fone_key" ON "Client"("fone");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredients_description_key" ON "Ingredients"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Revenues_description_key" ON "Revenues"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Company_cnpj_key" ON "Company"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_Company_fone_key" ON "Client_Company"("fone");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient_control" ADD CONSTRAINT "Ingredient_control_fk_ingredient_fkey" FOREIGN KEY ("fk_ingredient") REFERENCES "Ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredients_Revenues" ADD CONSTRAINT "Ingredients_Revenues_fk_ingredient_fkey" FOREIGN KEY ("fk_ingredient") REFERENCES "Ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredients_Revenues" ADD CONSTRAINT "Ingredients_Revenues_fk_revenues_fkey" FOREIGN KEY ("fk_revenues") REFERENCES "Revenues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Company" ADD CONSTRAINT "Client_Company_fk_client_fkey" FOREIGN KEY ("fk_client") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Company" ADD CONSTRAINT "Client_Company_fk_company_fkey" FOREIGN KEY ("fk_company") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemMenu" ADD CONSTRAINT "ItemMenu_fk_menu_fkey" FOREIGN KEY ("fk_menu") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemMenu" ADD CONSTRAINT "ItemMenu_fk_revenues_fkey" FOREIGN KEY ("fk_revenues") REFERENCES "Revenues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_fk_orderstatus_fkey" FOREIGN KEY ("fk_orderstatus") REFERENCES "OrderStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_fk_categoryOrderItem_fkey" FOREIGN KEY ("fk_categoryOrderItem") REFERENCES "CategoryOrderItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_fk_order_fkey" FOREIGN KEY ("fk_order") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_fk_revenue_fkey" FOREIGN KEY ("fk_revenue") REFERENCES "Revenues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RevenuePerClient" ADD CONSTRAINT "RevenuePerClient_fk_client_fkey" FOREIGN KEY ("fk_client") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RevenuePerClient" ADD CONSTRAINT "RevenuePerClient_fk_revenue_fkey" FOREIGN KEY ("fk_revenue") REFERENCES "Revenues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
