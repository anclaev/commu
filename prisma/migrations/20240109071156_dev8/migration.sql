-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Supervisor', 'Administrator');

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'User';

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiration" TIMESTAMP(3) NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "refresh" TEXT NOT NULL,
    "browser" TEXT,
    "device" TEXT,
    "os" TEXT,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_fingerprint_key" ON "Session"("fingerprint");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
