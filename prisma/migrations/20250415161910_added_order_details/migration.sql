-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_order_id_key" ON "Order"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_application_id_key" ON "Order"("application_id");
