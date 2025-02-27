/*
  Warnings:

  - You are about to drop the column `started` on the `ExecutionPhase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ExecutionPhase" DROP COLUMN "started",
ADD COLUMN     "startedAt" TIMESTAMP(3);
