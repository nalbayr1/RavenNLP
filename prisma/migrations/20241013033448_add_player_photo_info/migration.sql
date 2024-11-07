/*
  Warnings:

  - You are about to drop the column `age` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "age",
DROP COLUMN "height",
DROP COLUMN "position",
DROP COLUMN "weight",
ALTER COLUMN "photo" SET DEFAULT 'N/A';
