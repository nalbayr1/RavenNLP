-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "age" TEXT,
ADD COLUMN     "height" TEXT,
ADD COLUMN     "position" TEXT,
ADD COLUMN     "weight" TEXT,
ALTER COLUMN "photo" DROP DEFAULT;
