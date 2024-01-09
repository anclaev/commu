import { Employee } from '@prisma/client';

export const mockEmployee: Omit<Employee, 'id'> = {
  login: 'test2',
  name: 'test',
  password: 'test',
  role: 'User',
  personal_key: 'test',
  rank: 'Private',
  salary: 1000,
  surname: 'test',
  created_at: new Date(),
};
