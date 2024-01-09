import { Prisma } from '@prisma/client';
import { IBaseRepository } from '../interfaces/base.repository';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  protected _model: any;

  constructor(model: any) {
    this._model = model;
  }

  async findOne(data: any): Promise<T> {
    return await this._model.findUnique({
      where: {
        ...data,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: any;
    where?: any;
    orderBy?: any;
  }): Promise<T[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return await this._model.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create<T>(data: any): Promise<T> {
    return await this._model.create({
      data,
    });
  }

  async remove(id: string): Promise<T> {
    return await this._model.delete({
      where: { id },
    });
  }

  async update(id: string, data: any): Promise<T> {
    return await this._model.update({
      where: { id },
      data,
    });
  }

  async getOffsetPagination<F = {}>(params?: {
    skip?: number;
    take?: number;
    cursor?: number;
    where?: F;
    orderBy?: {
      [key: string]: 'asc' | 'desc';
    };
  }): Promise<T[]> {
    return this._model.findMany({
      ...params,
    });
  }
}
