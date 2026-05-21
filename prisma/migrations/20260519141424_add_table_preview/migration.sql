/*
  Warnings:

  - You are about to drop the column `image` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "preview" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "preview_id" TEXT NOT NULL,

    CONSTRAINT "preview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "preview" ADD CONSTRAINT "preview_preview_id_fkey" FOREIGN KEY ("preview_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
