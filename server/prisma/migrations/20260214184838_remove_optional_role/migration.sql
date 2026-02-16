/*
  Warnings:

  - A unique constraint covering the columns `[role_id,permission_id]` on the table `role_permission` will be added. If there are existing duplicate values, this will fail.
  - Made the column `role_id` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "role_permission_role_id_permission_id_key" ON "role_permission"("role_id", "permission_id");
