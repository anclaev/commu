import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Session } from '@prisma/client';
import { UUID } from 'crypto';

import { SessionRepository } from '../session.repository';

export class GetSessionByIdQuery {
  constructor(public readonly dto: { id: UUID }) {}
}

@QueryHandler(GetSessionByIdQuery)
export class GetSessionByIdHandler
  implements IQueryHandler<GetSessionByIdQuery>
{
  constructor(private repository: SessionRepository) {}

  async execute({ dto }: GetSessionByIdQuery): Promise<Session> {
    return await this.repository.findOne({
      id: dto.id,
    });
  }
}
