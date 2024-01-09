-- CreateEnum
CREATE TYPE "Rank" AS ENUM ('Private', 'Corporal', 'LanceSergeant', 'Sergeant', 'StaffSergeant', 'SergeantMajor', 'WarrantOfficer', 'SeniorWarrantOfficer', 'Lieutenant', 'SeniorLieutenant', 'Captain', 'Major', 'LieutenantColonel', 'Colonel');

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "salary" INTEGER NOT NULL,
    "personal_key" TEXT,
    "rank" "Rank" NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "short_name" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DutyNumber" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,

    CONSTRAINT "DutyNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "employee_id" TEXT NOT NULL,
    "duty_number_id" TEXT NOT NULL,
    "duty_id" TEXT,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "member_id" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewOwner" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,

    CONSTRAINT "ReviewOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingTheme" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "TrainingTheme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Training" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "theme_id" TEXT NOT NULL,
    "training_owner_id" TEXT NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingOwner" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "TrainingOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Duty" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "Duty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MemberToTraining" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_login_key" ON "Employee"("login");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewOwner_reviewId_key" ON "ReviewOwner"("reviewId");

-- CreateIndex
CREATE UNIQUE INDEX "_MemberToTraining_AB_unique" ON "_MemberToTraining"("A", "B");

-- CreateIndex
CREATE INDEX "_MemberToTraining_B_index" ON "_MemberToTraining"("B");

-- AddForeignKey
ALTER TABLE "DutyNumber" ADD CONSTRAINT "DutyNumber_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_duty_number_id_fkey" FOREIGN KEY ("duty_number_id") REFERENCES "DutyNumber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_duty_id_fkey" FOREIGN KEY ("duty_id") REFERENCES "Duty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewOwner" ADD CONSTRAINT "ReviewOwner_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewOwner" ADD CONSTRAINT "ReviewOwner_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingTheme" ADD CONSTRAINT "TrainingTheme_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "TrainingTheme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_training_owner_id_fkey" FOREIGN KEY ("training_owner_id") REFERENCES "TrainingOwner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingOwner" ADD CONSTRAINT "TrainingOwner_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToTraining" ADD CONSTRAINT "_MemberToTraining_A_fkey" FOREIGN KEY ("A") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToTraining" ADD CONSTRAINT "_MemberToTraining_B_fkey" FOREIGN KEY ("B") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;
