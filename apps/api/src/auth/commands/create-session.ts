import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Session } from '@prisma/client';

import { ConfigService } from '../../common/services/config.service';

import { GetSessionsByEmployeeQuery } from '../queries/get-sessions-by-employee';
import { SessionRepository } from '../session.repository';
import { CreateSessionDto } from '../dtos/create-session';

export class CreateSessionCommand {
  constructor(public readonly dto: CreateSessionDto) {}
}

@CommandHandler(CreateSessionCommand)
export class CreateSessionHandler
  implements ICommandHandler<CreateSessionCommand>
{
  private maxSessions: number;

  constructor(
    private repository: SessionRepository,
    private config: ConfigService,
    private queryBus: QueryBus
  ) {
    this.maxSessions = config.getValue('MAX_SESSIONS') || 3;
  }

  async execute({ dto }: CreateSessionCommand): Promise<Session> {
    const alreadySessions = await this.queryBus.execute<
      GetSessionsByEmployeeQuery,
      Session[]
    >(
      new GetSessionsByEmployeeQuery({
        where: {
          employee_id: dto.payload.id,
        },
      })
    );

    if (alreadySessions.length >= this.maxSessions) {
      const oldSessionId = alreadySessions
        .sort((a, b) => {
          return (
            new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
          );
        })
        .reverse()[0].id;

      await this.repository.remove(oldSessionId);
    }

    const session = await this.repository.create<Session>({
      id: dto.payload.session,
      employee_id: String(dto.payload.id),
      expiration: dto.expiration,
      fingerprint: dto.fingerprint.hash,
      refresh: dto.refresh,
    });

    return session;
  }
}
