/*
  Warnings:

  - You are about to alter the column `token` on the `refresh_tokens` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(64)`.

*/
-- AlterTable
ALTER TABLE "refresh_tokens" ALTER COLUMN "token" SET DATA TYPE VARCHAR(64);
