-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lecturer" (
    "id" TEXT NOT NULL,
    "picture" TEXT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "biography_ka" TEXT NOT NULL,
    "biography_en" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lecturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "media_id" TEXT NOT NULL,
    "media_url" TEXT NOT NULL,
    "media_name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "media_size" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "folder_id" TEXT,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("media_id")
);

-- CreateTable
CREATE TABLE "MediaCourseAssn" (
    "media_course_assn_id" TEXT NOT NULL,
    "media_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,

    CONSTRAINT "MediaCourseAssn_pkey" PRIMARY KEY ("media_course_assn_id")
);

-- CreateTable
CREATE TABLE "FileCourseAssn" (
    "media_course_assn_id" TEXT NOT NULL,
    "media_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,

    CONSTRAINT "FileCourseAssn_pkey" PRIMARY KEY ("media_course_assn_id")
);

-- CreateTable
CREATE TABLE "Folder" (
    "folder_id" TEXT NOT NULL,
    "folder_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("folder_id")
);

-- CreateTable
CREATE TABLE "CourseMedia" (
    "course_media_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "media_url" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseMedia_pkey" PRIMARY KEY ("course_media_id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "course_id" TEXT NOT NULL,
    "title_ka" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "description_ka" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "max_students" INTEGER NOT NULL DEFAULT 50,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lecturer_id" TEXT,
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "Application" (
    "application_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "parent_name" TEXT NOT NULL,
    "parent_lastname" TEXT NOT NULL,
    "parent_pn" TEXT NOT NULL,
    "parent_email" TEXT NOT NULL,
    "parent_phone" TEXT NOT NULL,
    "relation" TEXT NOT NULL DEFAULT 'parent',
    "child_name" TEXT NOT NULL,
    "child_lastname" TEXT NOT NULL,
    "child_email" TEXT,
    "child_dob" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("application_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_folder_name_key" ON "Folder"("folder_name");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "Folder"("folder_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaCourseAssn" ADD CONSTRAINT "MediaCourseAssn_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media"("media_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaCourseAssn" ADD CONSTRAINT "MediaCourseAssn_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileCourseAssn" ADD CONSTRAINT "FileCourseAssn_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media"("media_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileCourseAssn" ADD CONSTRAINT "FileCourseAssn_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseMedia" ADD CONSTRAINT "CourseMedia_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_lecturer_id_fkey" FOREIGN KEY ("lecturer_id") REFERENCES "Lecturer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;
