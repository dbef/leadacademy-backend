/*
  Warnings:

  - A unique constraint covering the columns `[application_id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Order_application_id_key" ON "Order"("application_id");
