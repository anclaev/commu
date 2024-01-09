export interface IBaseRepository<T> {
  findOne(id: string): Promise<T>;
  findAll(params: any): Promise<T[]>;
  create(data: any): Promise<T>;
  update(id, data: any): Promise<T>;
  remove(id: string): Promise<T>;
}
