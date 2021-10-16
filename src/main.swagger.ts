import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { OfficeAuthModule } from './modules/auth/office-auth.module';

export const mainSwaggerApp = (app: INestApplication): void => {
  const mainSwaggerConfig = new DocumentBuilder()
    .setTitle('TODO APP')
    .setDescription('All of about TODO APP API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const mainDoc = SwaggerModule.createDocument(app, mainSwaggerConfig, {
    include: [OfficeAuthModule],
  });
  SwaggerModule.setup('api-docs', app, mainDoc);
};
