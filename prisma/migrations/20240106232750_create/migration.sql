-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
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
    "departmentId" TEXT,

    CONSTRAINT "DutyNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Duty" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "employeeId" TEXT NOT NULL,
    "dutyNumberId" TEXT NOT NULL,

    CONSTRAINT "Duty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DutyNumberToEmployee" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DutyNumberToEmployee_AB_unique" ON "_DutyNumberToEmployee"("A", "B");

-- CreateIndex
CREATE INDEX "_DutyNumberToEmployee_B_index" ON "_DutyNumberToEmployee"("B");

-- AddForeignKey
ALTER TABLE "DutyNumber" ADD CONSTRAINT "DutyNumber_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Duty" ADD CONSTRAINT "Duty_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Duty" ADD CONSTRAINT "Duty_dutyNumberId_fkey" FOREIGN KEY ("dutyNumberId") REFERENCES "DutyNumber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DutyNumberToEmployee" ADD CONSTRAINT "_DutyNumberToEmployee_A_fkey" FOREIGN KEY ("A") REFERENCES "DutyNumber"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DutyNumberToEmployee" ADD CONSTRAINT "_DutyNumberToEmployee_B_fkey" FOREIGN KEY ("B") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
