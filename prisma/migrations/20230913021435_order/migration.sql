/*
  Warnings:

  - The primary key for the `OrderItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[numberOrder]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `Ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_of_measurement` to the `Ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value_per_serving` to the `Ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_date` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `method_of_preparation` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `of_menu` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `base_max_amount` to the `Revenues` table without a default value. This is not possible if the table is not empty.
  - Added the required column `base_min_amount` to the `Revenues` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Unit_of_measurement" AS ENUM ('ml', 'l', 'g', 'kg', 'u');

-- CreateEnum
CREATE TYPE "Order_type" AS ENUM ('programmed', 'coffe');

-- CreateEnum
CREATE TYPE "Method_of_preparation" AS ENUM ('roast', 'frozen');

-- CreateEnum
CREATE TYPE "Homologate" AS ENUM ('EM_HOMOLOGACAO', 'APROVADO', 'REPROVADO');

-- DropForeignKey
ALTER TABLE "RevenuePerClient" DROP CONSTRAINT "RevenuePerClient_fk_client_fkey";

-- AlterTable
ALTER TABLE "CategoryOrderItem" ADD COLUMN     "time" TIME;

-- AlterTable
ALTER TABLE "Ingredient_control" ADD COLUMN     "unit_of_measurement" "Unit_of_measurement";

-- AlterTable
ALTER TABLE "Ingredients" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "unit_of_measurement" "Unit_of_measurement" NOT NULL,
ADD COLUMN     "value_per_serving" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Ingredients_Revenues" ADD COLUMN     "unit_of_measurement" "Unit_of_measurement";

-- AlterTable
ALTER TABLE "ItemMenu" ADD COLUMN     "max_amount" INTEGER,
ADD COLUMN     "min_amount" INTEGER;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "amount_of_tray" INTEGER,
ADD COLUMN     "order_type" "Order_type";

-- AlterTable
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_pkey",
ADD COLUMN     "delivery_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "homologate" "Homologate" DEFAULT 'EM_HOMOLOGACAO',
ADD COLUMN     "method_of_preparation" "Method_of_preparation" NOT NULL,
ADD COLUMN     "of_menu" BOOLEAN NOT NULL,
ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("fk_revenue", "fk_order", "fk_categoryOrderItem");

-- AlterTable
ALTER TABLE "Revenues" ADD COLUMN     "base_max_amount" INTEGER NOT NULL,
ADD COLUMN     "base_min_amount" INTEGER NOT NULL,
ADD COLUMN     "order_type" "Order_type";

-- CreateTable
CREATE TABLE "OrderBatch" (
    "id" TEXT NOT NULL,
    "invoice_file" TEXT NOT NULL,
    "invoice_number" TEXT NOT NULL,
    "numberOrderBatch" SERIAL NOT NULL,
    "fk_client" TEXT NOT NULL,
    "fk_user_open_orderbatch" TEXT NOT NULL,

    CONSTRAINT "OrderBatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderBatchItem" (
    "fk_order" TEXT NOT NULL,
    "fk_orderBatch" TEXT NOT NULL,
    "is_removed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "OrderBatchItem_pkey" PRIMARY KEY ("fk_order","fk_orderBatch")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderBatchItem_fk_order_key" ON "OrderBatchItem"("fk_order");

-- CreateIndex
CREATE UNIQUE INDEX "Order_numberOrder_key" ON "Order"("numberOrder");

-- AddForeignKey
ALTER TABLE "RevenuePerClient" ADD CONSTRAINT "RevenuePerClient_fk_client_fkey" FOREIGN KEY ("fk_client") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderBatch" ADD CONSTRAINT "OrderBatch_fk_client_fkey" FOREIGN KEY ("fk_client") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderBatch" ADD CONSTRAINT "OrderBatch_fk_user_open_orderbatch_fkey" FOREIGN KEY ("fk_user_open_orderbatch") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderBatchItem" ADD CONSTRAINT "OrderBatchItem_fk_order_fkey" FOREIGN KEY ("fk_order") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderBatchItem" ADD CONSTRAINT "OrderBatchItem_fk_orderBatch_fkey" FOREIGN KEY ("fk_orderBatch") REFERENCES "OrderBatch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
