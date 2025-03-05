/*
  Warnings:

  - You are about to drop the column `first_name` on the `Lecturer` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `Lecturer` table. All the data in the column will be lost.
  - Added the required column `first_name_en` to the `Lecturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name_ka` to the `Lecturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name_Ka` to the `Lecturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name_en` to the `Lecturer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lecturer" DROP COLUMN "first_name",
DROP COLUMN "last_name",
ADD COLUMN     "first_name_en" TEXT NOT NULL,
ADD COLUMN     "first_name_ka" TEXT NOT NULL,
ADD COLUMN     "last_name_Ka" TEXT NOT NULL,
ADD COLUMN     "last_name_en" TEXT NOT NULL;
