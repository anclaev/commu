import { CallHandler, ExecutionContext } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { lastValueFrom, of } from 'rxjs';

import { SerializerInterceptor } from '../serializer.interceptor';

describe('SerializerInterceptor', () => {
  let interceptor: SerializerInterceptor;

  let testBody = {
    user: 'test',
    password: 'test',
  };

  beforeEach(() => {
    interceptor = new SerializerInterceptor();
  });

  it('should be return serialized value', async () => {
    const context = createMock<ExecutionContext>();
    const handler = createMock<CallHandler>({
      handle: () => of(testBody),
    });

    const bodyObservable = interceptor.intercept(context, handler);
    const body = await lastValueFrom(bodyObservable);

    expect(body).toEqual({ user: 'test' });
  });
});
