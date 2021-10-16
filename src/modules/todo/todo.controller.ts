import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  Put,
  Get,
  Query,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { TodoAuthGuard } from 'src/commons/guards/todo-auth.guard';
import { IReqQueryTodo, TodosListService } from './todo-list.service';
import { TodoService } from './todo.service';
import { TodoDto } from './dto/todo.dto';

@Controller('todo')
export class TodoController {
  constructor(
    private readonly todosListService: TodosListService,
    private readonly todoService: TodoService,
  ) {}

  @ApiOperation({ summary: 'list todo' })
  @ApiQuery({ name: 'id', type: 'string', required: false })
  @ApiQuery({ name: 'name', type: 'string', required: false })
  @ApiQuery({ name: 'is_done', type: 'boolean', required: false })
  @ApiQuery({
    name: 'begin_created_at',
    type: 'string',
    required: false,
  })
  @ApiQuery({
    name: 'end_created_at',
    type: 'string',
    required: false,
  })
  @ApiQuery({ name: 'sort_key', type: 'string', required: false })
  @ApiQuery({ name: 'sort_value', type: 'string', required: false })
  @ApiQuery({ name: 'limit', type: 'string', required: false })
  @ApiQuery({ name: 'page', type: 'string', required: false })
  // @ApiBearerAuth()
  // @UseGuards(TodoAuthGuard)
  @Get()
  async list(@Query() query: IReqQueryTodo) {
    return await this.todosListService.list(query);
  }

  @ApiOperation({ summary: 'create todo' })
  // @ApiBearerAuth()
  // @UseGuards(TodoAuthGuard)
  @Post()
  async create(@Body() args: TodoDto) {
    return await this.todoService.createTodo(args);
  }

  @ApiOperation({ summary: 'update todo' })
  // @ApiBearerAuth()
  // @UseGuards(TodoAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() args: TodoDto) {
    return await this.todoService.updateTodo(id, args);
  }

  @ApiOperation({ summary: 'delete todo' })
  // @ApiBearerAuth()
  // @UseGuards(TodoAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.todoService.removeTodo(id);
  }

  @ApiOperation({ summary: 'detail todo' })
  // @ApiBearerAuth()
  // @UseGuards(TodoAuthGuard)
  @Get(':id')
  async detail(@Param('id') id: string) {
    return await this.todoService.detailTodo(id);
  }

  @ApiOperation({ summary: 'update status todo' })
  // @ApiBearerAuth()
  // @UseGuards(TodoAuthGuard)
  @Patch(':id')
  async updateStatus(@Param('id') id: string) {
    return await this.todoService.updateStatusTodo(id);
  }
}
