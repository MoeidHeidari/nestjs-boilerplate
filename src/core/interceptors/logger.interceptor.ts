import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { LoggerService } from '../services/common'
////////////////////////////////////////////////////////////////////////
/**
 * Logs the requests
 */
@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  //==================================================================================================
  /**
   * logs requests for the service
   */
  private readonly logger: LoggerService = new LoggerService(LoggerInterceptor.name);

  //==================================================================================================
  /**
   * intercept handler
   * @param context context
   * @param next next call
   * @returns handler
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    const contextType = context.getType();

    return next.handle().pipe(
      tap(
        () => {
          if (contextType === 'http') {
            this.logHttpRequest(context, startTime);
          }
        },
        (error: Error) => {
          if (contextType === 'http') {
            this.logHttpRequest(context, startTime);
          } else {
            const reqTime = Date.now() - startTime;
            this.logger.log(`[${error.name}] ${error.message} ${reqTime}ms`);
          }
        }
      )
    );
  }

  //==================================================================================================
  /**
   * logs the HTTP requests
   * @param context context
   * @param startTime start time
   * @returns nothing
   */
  private logHttpRequest(context: ExecutionContext, startTime: number) {
    if (context.getType() !== 'http') return;
    const reqTime = Date.now() - startTime;
    const controllerName = context.getClass().name;
    const handlerName = context.getHandler().name;
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const { url, method } = request;
    const { statusCode } = response;
    this.logger.log(
      `[HTTP] ${method.toUpperCase()} ${url} ${statusCode} [${controllerName}:${handlerName}] ${reqTime}ms`
    );
  }
}
