-- CreateTable
CREATE TABLE "CampusMediaAssn" (
    "campus_media_assn_id" TEXT NOT NULL,
    "campus_id" TEXT NOT NULL,
    "media_id" TEXT NOT NULL,

    CONSTRAINT "CampusMediaAssn_pkey" PRIMARY KEY ("campus_media_assn_id")
);

-- CreateTable
CREATE TABLE "CampusFileAssn" (
    "campus_media_assn_id" TEXT NOT NULL,
    "campus_id" TEXT NOT NULL,
    "media_id" TEXT NOT NULL,

    CONSTRAINT "CampusFileAssn_pkey" PRIMARY KEY ("campus_media_assn_id")
);

-- CreateTable
CREATE TABLE "Campus" (
    "campus_id" TEXT NOT NULL,
    "campus_name_ka" TEXT NOT NULL,
    "campus_name_en" TEXT NOT NULL,
    "maps_url" TEXT,
    "description_ka" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campus_pkey" PRIMARY KEY ("campus_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Campus_campus_name_ka_key" ON "Campus"("campus_name_ka");

-- CreateIndex
CREATE UNIQUE INDEX "Campus_campus_name_en_key" ON "Campus"("campus_name_en");

-- AddForeignKey
ALTER TABLE "CampusMediaAssn" ADD CONSTRAINT "CampusMediaAssn_campus_id_fkey" FOREIGN KEY ("campus_id") REFERENCES "Campus"("campus_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampusMediaAssn" ADD CONSTRAINT "CampusMediaAssn_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media"("media_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampusFileAssn" ADD CONSTRAINT "CampusFileAssn_campus_id_fkey" FOREIGN KEY ("campus_id") REFERENCES "Campus"("campus_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampusFileAssn" ADD CONSTRAINT "CampusFileAssn_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media"("media_id") ON DELETE RESTRICT ON UPDATE CASCADE;
