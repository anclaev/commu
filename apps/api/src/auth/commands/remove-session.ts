import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Session } from '@prisma/client';

import { SessionRepository } from '../session.repository';

export class RemoveSessionCommand {
  constructor(public readonly id: string) {}
}

@CommandHandler(RemoveSessionCommand)
export class RemoveSessionHandler
  implements ICommandHandler<RemoveSessionCommand>
{
  constructor(private repository: SessionRepository) {}

  async execute({ id }: RemoveSessionCommand): Promise<Session> {
    return await this.repository.remove(id);
  }
}
