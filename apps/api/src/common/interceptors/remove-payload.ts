import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

/**
 * Interceptor for excluding private information
 */
@Injectable()
export class RemovePayloadInterceptor implements NestInterceptor {
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
