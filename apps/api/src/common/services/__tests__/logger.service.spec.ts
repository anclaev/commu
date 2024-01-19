import { Test, TestingModule } from '@nestjs/testing';

import { CommonModule } from '../../common.module';
import { LoggerService } from '../logger.service';

describe('LoggerService', () => {
  let loggerService: LoggerService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
    }).compile();

    loggerService = moduleFixture.get(LoggerService);
  });

  describe('ctx', () => {
    it('should be return current context', async () => {
      expect(loggerService.ctx).toBe('Commu');
    });
  });

  describe('setCtx()', () => {
    it('should be set new context', () => {
      loggerService.setContext('test');
      expect(loggerService.ctx).toBe('test');
    });
  });
});
