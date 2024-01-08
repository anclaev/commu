import { Injectable } from '@nestjs/common';
import { ENV } from 'shared/interfaces';

import { ConfigService as RootService } from '@nestjs/config';

@Injectable()
export class ConfigService extends RootService {
  constructor() {
    super();
  }

  getValue<T>(value: keyof ENV) {
    return this.get<T>(value) as T;
  }
}
