/*
  Warnings:

  - You are about to drop the column `child_dob` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `child_email` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `child_lastname` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `child_name` on the `Application` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[student_pn]` on the table `Application` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[student_email]` on the table `Application` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `medical_terms` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parent_address` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parent_city` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parent_country` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parent_dob` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parent_gender` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parent_nationality` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `program` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_class` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_dob` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_email` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_gender` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_lastname` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_name` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_phone` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_pn` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `terms_and_conditions` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "child_dob",
DROP COLUMN "child_email",
DROP COLUMN "child_lastname",
DROP COLUMN "child_name",
ADD COLUMN     "additional_info" TEXT,
ADD COLUMN     "alergens" TEXT,
ADD COLUMN     "diet_restrictions" TEXT,
ADD COLUMN     "medical_terms" BOOLEAN NOT NULL,
ADD COLUMN     "medicaments" TEXT,
ADD COLUMN     "parent_address" TEXT NOT NULL,
ADD COLUMN     "parent_city" TEXT NOT NULL,
ADD COLUMN     "parent_country" TEXT NOT NULL,
ADD COLUMN     "parent_dob" TEXT NOT NULL,
ADD COLUMN     "parent_gender" TEXT NOT NULL,
ADD COLUMN     "parent_nationality" TEXT NOT NULL,
ADD COLUMN     "physical_disabilities" TEXT,
ADD COLUMN     "potential_roommate" TEXT,
ADD COLUMN     "program" TEXT NOT NULL,
ADD COLUMN     "student_class" TEXT NOT NULL,
ADD COLUMN     "student_dob" TEXT NOT NULL,
ADD COLUMN     "student_email" TEXT NOT NULL,
ADD COLUMN     "student_gender" TEXT NOT NULL,
ADD COLUMN     "student_lastname" TEXT NOT NULL,
ADD COLUMN     "student_name" TEXT NOT NULL,
ADD COLUMN     "student_phone" TEXT NOT NULL,
ADD COLUMN     "student_pn" TEXT NOT NULL,
ADD COLUMN     "terms_and_conditions" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Application_student_pn_key" ON "Application"("student_pn");

-- CreateIndex
CREATE UNIQUE INDEX "Application_student_email_key" ON "Application"("student_email");
