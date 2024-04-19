/*
  Warnings:

  - Added the required column `fk_user` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "fk_user" TEXT NOT NULL,
ADD COLUMN     "numberOrder" SERIAL NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
