import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

/**
 * Interceptor for serialize response
 */
@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  /**
   * Interseptor`s executor
   * @param {any} _ Context
   * @param {CallHandler} next Call handler
   * @returns {Observable} Next stream
   */
  intercept(_: any, next: CallHandler<any>): Observable<any> {
    return next.handle().pipe(
      map((value) => {
        if (value !== null && value.password) value.password = undefined;
        return value;
      })
    );
  }
}
