/*
  Warnings:

  - You are about to drop the `PasswordToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PasswordToken";

-- CreateTable
CREATE TABLE "password_tokens" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "token" VARCHAR(64) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "password_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "password_tokens_user_id_key" ON "password_tokens"("user_id");

-- CreateIndex
CREATE INDEX "password_tokens_token_idx" ON "password_tokens"("token");

-- AddForeignKey
ALTER TABLE "password_tokens" ADD CONSTRAINT "password_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
