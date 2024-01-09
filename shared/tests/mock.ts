import { Employee } from '@prisma/client';

export const mockEmployee: Omit<Employee, 'id'> = {
  login: 'test',
  name: 'test',
  password: 'test',
  personal_key: 'test',
  rank: 'Private',
  salary: 1000,
  surname: 'test',
};
