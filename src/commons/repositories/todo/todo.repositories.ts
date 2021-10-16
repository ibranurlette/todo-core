import { HttpException, HttpStatus } from '@nestjs/common';
import {
  ICreateTodo,
  IUpdateTodo,
} from 'src/commons/interfaces/todo/todo.interface';
import { Todo } from 'src/database/entities/todo/todo.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async createTodo(args: ICreateTodo): Promise<Todo> {
    const newTodo = this.create();

    newTodo.name = args.name;
    newTodo.description = args.description;

    try {
      await newTodo.save();
    } catch (e) {
      throw new HttpException(
        { message: 'Failed create new todo' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return newTodo;
  }

  async updateTodo(id: string, args: IUpdateTodo): Promise<Todo> {
    const todo = await this.findOne({
      where: { id },
    });
    if (!todo || todo.deleted_at) {
      throw new HttpException(
        { message: 'Data tidak ditemukan' },
        HttpStatus.NOT_FOUND,
      );
    }

    todo.name = args.name;
    todo.description = args.description;
    todo.is_done = args.is_done;

    try {
      await todo.save();
    } catch (error) {
      throw new HttpException(
        { message: 'Failed update todo' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return todo;
  }

  async removeTodo(id: string): Promise<Todo> {
    const todo = await this.findOne({
      where: { id },
    });
    if (!todo || todo.deleted_at) {
      throw new HttpException(
        { message: 'Data tidak ditemukan' },
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      await todo.remove();
    } catch (error) {
      throw new HttpException(
        { message: 'Failed remove todo' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return todo;
  }

  async detailTodo(id: string): Promise<Todo> {
    const todo = await this.findOne({
      where: { id },
    });
    if (!todo || todo.deleted_at) {
      throw new HttpException(
        { message: 'Data tidak ditemukan' },
        HttpStatus.NOT_FOUND,
      );
    }

    return todo;
  }
}
