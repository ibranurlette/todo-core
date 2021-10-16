import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { mainTodoData } from './data/main-todo.data';
import { Todo } from 'src/database/entities/todo/todo.entity';

@Injectable()
export class TodoSeedService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async seedMainTodo() {
    for (let i = 0; i < mainTodoData.length; i++) {
      const item = mainTodoData[i];
      const check = await this.todoRepository.findOne({
        where: { name: item.name },
      });

      if (check === undefined) {
        const todo = new Todo();
        todo.name = item.name;
        todo.description = item.description;
        todo.is_done = item.is_done;
        await todo.save();
      }
    }
  }
}
