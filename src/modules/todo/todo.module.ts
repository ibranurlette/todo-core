import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoRepository } from 'src/commons/repositories/todo/todo.repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosListService } from './todo-list.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoRepository])],
  controllers: [TodoController],
  providers: [TodosListService, TodoService],
})
export class TodoModule {}
