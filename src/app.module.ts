import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ormConfig } from './database/orm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OfficeAuthModule } from './modules/auth/office-auth.module';
import { OfficeJwtStrategy } from './commons/strategies/office-jwt.strategy';
import { AdminSeedModule } from './modules/seeds/admin-seed/admin-seed.module';
import { TodoSeedModule } from './modules/seeds/todo-seed/todo-seed.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    ScheduleModule.forRoot(),
    AdminSeedModule,
    TodoSeedModule,
    OfficeAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, OfficeJwtStrategy],
})
export class AppModule {}
