import { Test, TestingModule } from '@nestjs/testing';

import { CommonModule } from '../../common.module';
import { ConfigService } from '../config.service';

describe('ConfigService', () => {
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
    }).compile();

    configService = moduleFixture.get(ConfigService);
  });

  describe('getValue', () => {
    it('should be return value', async () => {
      expect(configService.get('NODE_ENV')).toBe('test');
    });
    it('should be undefined error', async () => {
      expect(configService.get('TEST')).toBeUndefined();
    });
  });
});
