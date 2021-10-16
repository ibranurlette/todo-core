import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoRepository } from 'src/commons/repositories/todo/todo.repositories';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TodoRepository])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
