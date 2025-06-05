-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "days_attending" INTEGER;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "day_price" DOUBLE PRECISION DEFAULT 450;
