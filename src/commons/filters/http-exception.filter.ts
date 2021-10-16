import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    const r: any = exception.getResponse()

    console.log('errors http', r.errors || null)

    response.status(status).json({
      success: false,
      statusCode: r.statusCode || status,
      messageTitle: r.messageTitle || 'Something wrong',
      message: r.message || 'Something wrong',
      errors: r.errors || null,
      data: r.data || null,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method
    })
  }
}
