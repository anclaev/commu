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
  }) {
    const { skip, take, cursor, where, orderBy } = params;

    return await this._model.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: any): Promise<T> {
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
}