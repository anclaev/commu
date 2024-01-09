import { Injectable } from '@nestjs/common';

import { ENV } from 'shared/interfaces/env';

import { ConfigService as RootService } from '@nestjs/config';

/**
 * Service for config
 * @constructor
 */
@Injectable()
export class ConfigService extends RootService {
  /**
   * Config constructor
   */
  constructor() {
    super();
  }

  /**
   * Method for get typed value
   * @param {string} value ENV name
   * @returns {any} Environment variable
   */
  getValue<T>(value: keyof ENV) {
    return this.get<T>(value) as T;
  }
}
