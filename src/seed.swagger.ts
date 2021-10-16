import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdminSeedModule } from './modules/seeds/admin-seed/admin-seed.module';
import { TodoSeedModule } from './modules/seeds/todo-seed/todo-seed.module';

export const seedSwaggerApp = (app: INestApplication): void => {
  const mainSwaggerConfig = new DocumentBuilder()
    .setTitle('TODO APP - Seed')
    .setDescription('All of about TODO APP API Seed')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const mainDoc = SwaggerModule.createDocument(app, mainSwaggerConfig, {
    include: [AdminSeedModule, TodoSeedModule],
  });
  SwaggerModule.setup('api-seed-docs', app, mainDoc);
};
