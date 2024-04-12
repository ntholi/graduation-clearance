/*
  Warnings:

  - You are about to alter the column `unitPrice` on the `requisition_items` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - Added the required column `date` to the `requisitions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "requisition_items" ALTER COLUMN "unitPrice" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "requisitions" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
