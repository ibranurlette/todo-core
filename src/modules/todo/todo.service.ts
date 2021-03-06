import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepository } from 'src/commons/repositories/todo/todo.repositories';
import { TodoDto } from './dto/todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {}

  async createTodo(args: TodoDto) {
    return await this.todoRepository.createTodo(args);
  }

  async updateTodo(id: string, args: TodoDto) {
    return await this.todoRepository.updateTodo(id, args);
  }

  async removeTodo(id: string) {
    return await this.todoRepository.removeTodo(id);
  }
  async detailTodo(id: string) {
    return await this.todoRepository.detailTodo(id);
  }
  async updateStatusTodo(id: string) {
    return await this.todoRepository.updateStatusTodo(id);
  }
}
