import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor() {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Response<T>>> {
    const statusCode = context.switchToHttp().getResponse().statusCode;
    return next.handle().pipe(
      map((data) => ({
        statusCode,
        message: data?.message ? data?.message : 'Berhasil',
        data,
      })),
    );
  }
}
