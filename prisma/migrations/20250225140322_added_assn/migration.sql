-- CreateTable
CREATE TABLE "LecturerCourseAssn" (
    "lecturer_course_assn_id" TEXT NOT NULL,
    "lecturer_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,

    CONSTRAINT "LecturerCourseAssn_pkey" PRIMARY KEY ("lecturer_course_assn_id")
);

-- AddForeignKey
ALTER TABLE "LecturerCourseAssn" ADD CONSTRAINT "LecturerCourseAssn_lecturer_id_fkey" FOREIGN KEY ("lecturer_id") REFERENCES "Lecturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LecturerCourseAssn" ADD CONSTRAINT "LecturerCourseAssn_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;
