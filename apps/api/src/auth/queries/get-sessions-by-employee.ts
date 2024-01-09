import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Prisma, Session } from '@prisma/client';

import { SessionRepository } from '../session.repository';

export class GetSessionsByEmployeeQuery {
  constructor(public readonly dto: Prisma.SessionFindManyArgs) {}
}

@QueryHandler(GetSessionsByEmployeeQuery)
export class GetSessionsByEmployeeHandler
  implements IQueryHandler<GetSessionsByEmployeeQuery>
{
  constructor(private repository: SessionRepository) {}

  async execute({ dto }: GetSessionsByEmployeeQuery): Promise<Session[]> {
    return await this.repository.findByEmployeeId(dto);
  }
}
