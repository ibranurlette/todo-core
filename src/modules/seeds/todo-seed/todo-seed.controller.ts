import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { TodoSeedService } from './todo-seed.service';

@ApiTags('Seeds Todo')
@Controller(`seeds/todo`)
export class TodoSeedController {
  constructor(private readonly todoSeedService: TodoSeedService) {}

  @ApiOperation({ summary: 'Seed Main Todo' })
  @Get('main-todo')
  async seedMainTodo() {
    return await this.todoSeedService.seedMainTodo();
  }
}
