/*
  Warnings:

  - The primary key for the `NewsMedia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `course_media_id` on the `NewsMedia` table. All the data in the column will be lost.
  - The required column `news_media_id` was added to the `NewsMedia` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "NewsMedia" DROP CONSTRAINT "NewsMedia_pkey",
DROP COLUMN "course_media_id",
ADD COLUMN     "news_media_id" TEXT NOT NULL,
ADD CONSTRAINT "NewsMedia_pkey" PRIMARY KEY ("news_media_id");

-- CreateTable
CREATE TABLE "NewsMediaAssn" (
    "news_media_assn_id" TEXT NOT NULL,
    "news_id" TEXT NOT NULL,
    "news_media_id" TEXT NOT NULL,

    CONSTRAINT "NewsMediaAssn_pkey" PRIMARY KEY ("news_media_assn_id")
);

-- AddForeignKey
ALTER TABLE "NewsMediaAssn" ADD CONSTRAINT "NewsMediaAssn_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "News"("news_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsMediaAssn" ADD CONSTRAINT "NewsMediaAssn_news_media_id_fkey" FOREIGN KEY ("news_media_id") REFERENCES "NewsMedia"("news_media_id") ON DELETE RESTRICT ON UPDATE CASCADE;
