-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "course_option_id" TEXT;

-- CreateTable
CREATE TABLE "CourseOptions" (
    "course_options_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "option_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseOptions_pkey" PRIMARY KEY ("course_options_id")
);

-- AddForeignKey
ALTER TABLE "CourseOptions" ADD CONSTRAINT "CourseOptions_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_course_option_id_fkey" FOREIGN KEY ("course_option_id") REFERENCES "CourseOptions"("course_options_id") ON DELETE SET NULL ON UPDATE CASCADE;
