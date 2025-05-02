/*
  Warnings:

  - You are about to drop the column `news_media_id` on the `NewsMediaAssn` table. All the data in the column will be lost.
  - You are about to drop the `NewsMedia` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `media_id` to the `NewsMediaAssn` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "NewsMedia" DROP CONSTRAINT "NewsMedia_news_id_fkey";

-- DropForeignKey
ALTER TABLE "NewsMediaAssn" DROP CONSTRAINT "NewsMediaAssn_news_media_id_fkey";

-- AlterTable
ALTER TABLE "NewsMediaAssn" DROP COLUMN "news_media_id",
ADD COLUMN     "media_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "NewsMedia";

-- AddForeignKey
ALTER TABLE "NewsMediaAssn" ADD CONSTRAINT "NewsMediaAssn_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media"("media_id") ON DELETE RESTRICT ON UPDATE CASCADE;
