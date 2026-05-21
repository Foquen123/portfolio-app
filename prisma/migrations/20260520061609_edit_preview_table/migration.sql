/*
  Warnings:

  - You are about to drop the column `preview_id` on the `preview` table. All the data in the column will be lost.
  - Added the required column `project_id` to the `preview` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "preview" DROP CONSTRAINT "preview_preview_id_fkey";

ALTER TABLE "preview" RENAME COLUMN "preview_id" TO "project_id";

ALTER TABLE "preview" ADD COLUMN     "index" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "preview" ADD CONSTRAINT "preview_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
