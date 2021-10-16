import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
// import { Request } from 'express'

@Injectable()
export class BenchmarkInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp()
    const req: Request = ctx.getRequest()
    const now = Date.now()
    return next.handle().pipe(
      tap(() => {
        console.log('URL :', req.url, 'METHOD :', req.method)
        console.log(`EXECUTION TIME... ${Date.now() - now}ms`)
        console.log('------------------------------------')
      })
    )
  }
}
