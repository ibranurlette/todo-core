import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as reqIp from 'request-ip';
import { mainSwaggerApp } from './main.swagger';
import { seedSwaggerApp } from './seed.swagger';
import { ValidationPipe } from './commons/pipes/validation.pipe';
import { HttpExceptionFilter } from './commons/filters/http-exception.filter';
import { ValidationExceptionFilter } from './commons/filters/validation-exception.filter';
import { BenchmarkInterceptor } from './commons/interceptors/benchmark.interceptor';
import { TimeoutInterceptor } from './commons/interceptors/timeout.interceptor';
import { TransformInterceptor } from './commons/interceptors/transform.interceptor';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(reqIp.mw());
  app.setGlobalPrefix(`${process.env.API_VERSION}`);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.useGlobalInterceptors(new BenchmarkInterceptor());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());

  mainSwaggerApp(app);
  seedSwaggerApp(app);
  await app.listen(process.env.PORT);
}
bootstrap().then(() =>
  console.log(`server running on port : ${process.env.PORT}`),
);
