import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { Employee } from '@prisma/client';

import { BaseRepository } from 'shared/classes/base.repository';

/**
 * Employee repository
 */
@Injectable()
export class EmployeeRepository extends BaseRepository<Employee> {
  /**
   * Repository constructor
   * @param {PrismaService} prisma Prisma service
   */
  constructor(private prisma: PrismaService) {
    super(prisma.employee);
  }
}
