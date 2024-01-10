import { getJestProjects } from '@nx/jest';

export default {
  projects: getJestProjects(),
  collectCoverageFrom: '**/!(*mock|*spec).(t|j)s',
};
