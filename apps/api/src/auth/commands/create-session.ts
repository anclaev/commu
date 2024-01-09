import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Session } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

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
    private jwt: JwtService,
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
          id: dto.payload.id,
        },
      })
    );

    if (alreadySessions.length >= this.maxSessions) {
      // login delete existing session
    }

    const expiresIn = `${this.config.getValue('SESSION_EXPIRATION')}s`;

    const refresh = this.jwt.sign(dto.payload, {
      secret: this.config.getValue('JWT_REFRESH_SECRET'),
      expiresIn,
    });

    return await this.repository.create<Session>({
      employee: dto.payload.id,
      expiration: new Date() + expiresIn,
      fingerprint: dto.fingerprint.hash,
      refresh,
    });
  }
}
