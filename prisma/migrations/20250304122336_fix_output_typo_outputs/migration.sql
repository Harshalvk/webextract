/*
  Warnings:

  - You are about to drop the column `output` on the `ExecutionPhase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ExecutionPhase" DROP COLUMN "output",
ADD COLUMN     "outputs" TEXT;
