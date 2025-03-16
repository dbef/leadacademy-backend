/*
  Warnings:

  - A unique constraint covering the columns `[student_email,student_pn,student_name,student_class,course_id]` on the table `Application` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Application_student_email_key";

-- DropIndex
DROP INDEX "Application_student_pn_key";

-- CreateIndex
CREATE UNIQUE INDEX "Application_student_email_student_pn_student_name_student_c_key" ON "Application"("student_email", "student_pn", "student_name", "student_class", "course_id");
