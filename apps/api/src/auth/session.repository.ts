import { Prisma, Session } from '@prisma/client';

import { BaseRepository } from '@shared/classes/base.repository';

export class SessionRepository extends BaseRepository<Session> {
  async findByEmployeeId(dto: Prisma.SessionFindManyArgs): Promise<Session[]> {
    return await this._model.findMany(dto);
  }
}
