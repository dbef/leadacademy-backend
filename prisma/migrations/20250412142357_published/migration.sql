-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "is_published" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "NewsMedia" (
    "course_media_id" TEXT NOT NULL,
    "news_id" TEXT NOT NULL,
    "media_url" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsMedia_pkey" PRIMARY KEY ("course_media_id")
);

-- CreateTable
CREATE TABLE "News" (
    "news_id" TEXT NOT NULL,
    "title_ka" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "description_ka" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "hashtags" TEXT,
    "short_des_ka" TEXT,
    "short_des_en" TEXT,
    "keywords_ka" TEXT,
    "keywords_en" TEXT,

    CONSTRAINT "News_pkey" PRIMARY KEY ("news_id")
);

-- AddForeignKey
ALTER TABLE "NewsMedia" ADD CONSTRAINT "NewsMedia_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "News"("news_id") ON DELETE RESTRICT ON UPDATE CASCADE;
