import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard, RoleGuard } from '../../common/guards';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@UseGuards(JwtGuard, RoleGuard)
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(@Body() dto: CreateTodoDto) {
    const todo = await this.todoService.createTodo(dto);
    return todo.toJSON();
  }

  @Get()
  async getTodos(@Query('skip') skip: number, @Query('limit') limit: number) {
    const documents = await this.todoService.getTodos(skip, limit);
    const todos = documents.map((document) => document.toJSON());
    return todos;
  }

  @Get(':id')
  async getTodo(@Param('id') id: string) {
    const todo = await this.todoService.getTodoById(id);
    return todo ? todo.toJSON() : {};
  }

  @Patch(':id')
  async updateTodo(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    const todo = await this.todoService.updateTodo(id, dto);
    return todo.toJSON();
  }

  @Delete(':id')
  async removeTodo(@Param('id') id: string) {
    await this.todoService.removeTodo(id);
    return {};
  }
}
