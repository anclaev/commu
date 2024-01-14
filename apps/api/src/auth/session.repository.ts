import { Prisma, Session } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { BaseRepository } from '@shared/classes/base.repository';
import { Injectable } from '@nestjs/common';
@Injectable()
export class SessionRepository extends BaseRepository<Session> {
  constructor(private prisma: PrismaService) {
    super(prisma.session);
  }

  async findByEmployeeId(dto: Prisma.SessionFindManyArgs): Promise<Session[]> {
    return await this._model.findMany(dto);
  }

  async removeById(id: string): Promise<Session> {
    return await this._model.delete({
      where: {
        id,
      },
    });
  }
}
