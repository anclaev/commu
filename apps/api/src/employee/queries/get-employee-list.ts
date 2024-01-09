import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Employee, Prisma } from '@prisma/client';

import { EmployeeRepository } from '../employee.repository';
import { GetEmployeeListDto } from '../dtos/get-employee-list';

export class GetEmployeeListQuery {
  constructor(public readonly dto: GetEmployeeListDto) {}
}

@QueryHandler(GetEmployeeListQuery)
export class GetEmployeeListHandler
  implements IQueryHandler<GetEmployeeListQuery>
{
  constructor(private repository: EmployeeRepository) {}

  async execute({ dto }: GetEmployeeListQuery): Promise<Employee[]> {
    const { skip, take, cursor, ...query } = dto;
    const where = {};

    for (let key in query) {
      where[key] = { contains: query[key] };
    }

    return await this.repository.getOffsetPagination<Prisma.EmployeeWhereInput>(
      {
        skip,
        take,
        cursor,
        where,
      }
    );
  }
}
