import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const r: any = exception.getResponse();

    console.log('errors validation', r.errors || null);

    response.status(status).json({
      success: false,
      statusCode: status,
      messageTitle: r.messageTitle || 'Form Isian Ditolak',
      message: r.message || 'Bad Request',
      errors: r.errors || null,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    });
  }
}
