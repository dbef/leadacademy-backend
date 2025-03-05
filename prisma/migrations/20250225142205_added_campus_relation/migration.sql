-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "campuse_id" TEXT;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_campuse_id_fkey" FOREIGN KEY ("campuse_id") REFERENCES "Campus"("campus_id") ON DELETE SET NULL ON UPDATE CASCADE;
