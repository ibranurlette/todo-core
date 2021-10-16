import { Controller, Post, Body, UseGuards, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { TodoAuthGuard } from 'src/commons/guards/todo-auth.guard';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiOperation({ summary: 'create todo' })
  @ApiBearerAuth()
  @UseGuards(TodoAuthGuard)
  @Post()
  async create(@Body() args: CreateTodoDto) {
    return await this.todoService.createTodo(args);
  }

  @ApiOperation({ summary: 'update todo' })
  @ApiBearerAuth()
  @UseGuards(TodoAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() args: UpdateTodoDto) {
    return await this.todoService.updateTodo(id, args);
  }

  // @Get()
  // findAll() {
  //   return this.todoService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.todoService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
  //   return this.todoService.update(+id, updateTodoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.todoService.remove(+id);
  // }
}
