/*
  Warnings:

  - You are about to drop the column `training_owner_id` on the `Training` table. All the data in the column will be lost.
  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MemberToTraining` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `combat_post_id` to the `DutyNumber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duty_id` to the `Training` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_duty_id_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_duty_number_id_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_member_id_fkey";

-- DropForeignKey
ALTER TABLE "ReviewOwner" DROP CONSTRAINT "ReviewOwner_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "Training" DROP CONSTRAINT "Training_training_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "TrainingOwner" DROP CONSTRAINT "TrainingOwner_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "_MemberToTraining" DROP CONSTRAINT "_MemberToTraining_A_fkey";

-- DropForeignKey
ALTER TABLE "_MemberToTraining" DROP CONSTRAINT "_MemberToTraining_B_fkey";

-- AlterTable
ALTER TABLE "DutyNumber" ADD COLUMN     "combat_post_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Training" DROP COLUMN "training_owner_id",
ADD COLUMN     "duty_id" TEXT NOT NULL,
ADD COLUMN     "owner_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Member";

-- DropTable
DROP TABLE "_MemberToTraining";

-- CreateTable
CREATE TABLE "CombatPost" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,

    CONSTRAINT "CombatPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DutyMember" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "employee_id" TEXT NOT NULL,
    "duty_number_id" TEXT NOT NULL,
    "duty_id" TEXT,

    CONSTRAINT "DutyMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DutyNumberToEmployee" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DutyMemberToTraining" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CombatPost_name_key" ON "CombatPost"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_DutyNumberToEmployee_AB_unique" ON "_DutyNumberToEmployee"("A", "B");

-- CreateIndex
CREATE INDEX "_DutyNumberToEmployee_B_index" ON "_DutyNumberToEmployee"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DutyMemberToTraining_AB_unique" ON "_DutyMemberToTraining"("A", "B");

-- CreateIndex
CREATE INDEX "_DutyMemberToTraining_B_index" ON "_DutyMemberToTraining"("B");

-- AddForeignKey
ALTER TABLE "DutyNumber" ADD CONSTRAINT "DutyNumber_combat_post_id_fkey" FOREIGN KEY ("combat_post_id") REFERENCES "CombatPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatPost" ADD CONSTRAINT "CombatPost_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DutyMember" ADD CONSTRAINT "DutyMember_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DutyMember" ADD CONSTRAINT "DutyMember_duty_number_id_fkey" FOREIGN KEY ("duty_number_id") REFERENCES "DutyNumber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DutyMember" ADD CONSTRAINT "DutyMember_duty_id_fkey" FOREIGN KEY ("duty_id") REFERENCES "Duty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "DutyMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewOwner" ADD CONSTRAINT "ReviewOwner_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "DutyMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "TrainingOwner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_duty_id_fkey" FOREIGN KEY ("duty_id") REFERENCES "Duty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingOwner" ADD CONSTRAINT "TrainingOwner_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "DutyMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DutyNumberToEmployee" ADD CONSTRAINT "_DutyNumberToEmployee_A_fkey" FOREIGN KEY ("A") REFERENCES "DutyNumber"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DutyNumberToEmployee" ADD CONSTRAINT "_DutyNumberToEmployee_B_fkey" FOREIGN KEY ("B") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DutyMemberToTraining" ADD CONSTRAINT "_DutyMemberToTraining_A_fkey" FOREIGN KEY ("A") REFERENCES "DutyMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DutyMemberToTraining" ADD CONSTRAINT "_DutyMemberToTraining_B_fkey" FOREIGN KEY ("B") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;
