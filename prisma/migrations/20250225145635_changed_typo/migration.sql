/*
  Warnings:

  - You are about to drop the column `last_name_Ka` on the `Lecturer` table. All the data in the column will be lost.
  - Added the required column `last_name_ka` to the `Lecturer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lecturer" DROP COLUMN "last_name_Ka",
ADD COLUMN     "last_name_ka" TEXT NOT NULL;
