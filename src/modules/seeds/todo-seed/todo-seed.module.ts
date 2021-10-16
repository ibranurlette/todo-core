import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/database/entities/todo/todo.entity';
import { TodoSeedController } from './todo-seed.controller';
import { TodoSeedService } from './todo-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoSeedController],
  providers: [TodoSeedService],
  exports: [],
})
export class TodoSeedModule {}
