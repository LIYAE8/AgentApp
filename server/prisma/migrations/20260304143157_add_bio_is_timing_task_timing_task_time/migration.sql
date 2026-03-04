-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "isTimingTask" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "timingTaskTime" TEXT NOT NULL DEFAULT '00:00:00';

-- CreateIndex
CREATE INDEX "WordBook_translation_idx" ON "WordBook"("translation");
