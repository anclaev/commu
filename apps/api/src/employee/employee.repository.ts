import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';

/**
 * Employee repository
 */
@Injectable()
export class EmployeeRepository {
  /**
   * Repository constructor
   * @param {PrismaService} prisma Prisma service
   */
  constructor(private prisma: PrismaService) {}
}
