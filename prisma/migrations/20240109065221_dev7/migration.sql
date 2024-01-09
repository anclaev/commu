/*
  Warnings:

  - You are about to drop the column `duty_number_id` on the `DutyMember` table. All the data in the column will be lost.
  - You are about to drop the `CombatPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DutyNumber` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrainingTheme` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DutyNumberToEmployee` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `position_id` to the `DutyMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CombatPost" DROP CONSTRAINT "CombatPost_department_id_fkey";

-- DropForeignKey
ALTER TABLE "DutyMember" DROP CONSTRAINT "DutyMember_duty_number_id_fkey";

-- DropForeignKey
ALTER TABLE "DutyNumber" DROP CONSTRAINT "DutyNumber_combat_post_id_fkey";

-- DropForeignKey
ALTER TABLE "DutyNumber" DROP CONSTRAINT "DutyNumber_department_id_fkey";

-- DropForeignKey
ALTER TABLE "Training" DROP CONSTRAINT "Training_theme_id_fkey";

-- DropForeignKey
ALTER TABLE "TrainingTheme" DROP CONSTRAINT "TrainingTheme_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "_DutyNumberToEmployee" DROP CONSTRAINT "_DutyNumberToEmployee_A_fkey";

-- DropForeignKey
ALTER TABLE "_DutyNumberToEmployee" DROP CONSTRAINT "_DutyNumberToEmployee_B_fkey";

-- AlterTable
ALTER TABLE "DutyMember" DROP COLUMN "duty_number_id",
ADD COLUMN     "position_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "CombatPost";

-- DropTable
DROP TABLE "DutyNumber";

-- DropTable
DROP TABLE "TrainingTheme";

-- DropTable
DROP TABLE "_DutyNumberToEmployee";

-- CreateTable
CREATE TABLE "Position" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EmployeeToPosition" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_name_key" ON "Post"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_EmployeeToPosition_AB_unique" ON "_EmployeeToPosition"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployeeToPosition_B_index" ON "_EmployeeToPosition"("B");

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DutyMember" ADD CONSTRAINT "DutyMember_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeToPosition" ADD CONSTRAINT "_EmployeeToPosition_A_fkey" FOREIGN KEY ("A") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeToPosition" ADD CONSTRAINT "_EmployeeToPosition_B_fkey" FOREIGN KEY ("B") REFERENCES "Position"("id") ON DELETE CASCADE ON UPDATE CASCADE;
