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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { JwtGuard, RoleGuard } from '../../common/guards';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@ApiTags('Todo')
@ApiBearerAuth()
@UseGuards(JwtGuard, RoleGuard)
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiCreatedResponse({
    description: '成功建立 todo',
  })
  @Post()
  async createTodo(@Body() dto: CreateTodoDto) {
    const todo = await this.todoService.createTodo(dto);
    return todo.toJSON();
  }

  @ApiOkResponse({
    description: '取得 todo 列表',
  })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  async getTodos(@Query('skip') skip: number, @Query('limit') limit: number) {
    const documents = await this.todoService.getTodos(skip, limit);
    const todos = documents.map((document) => document.toJSON());
    return todos;
  }

  @ApiOkResponse({
    description: '取得 todo',
  })
  @Get(':id')
  async getTodo(@Param('id') id: string) {
    const todo = await this.todoService.getTodoById(id);
    return todo ? todo.toJSON() : {};
  }

  @ApiOkResponse({
    description: '成功更新 todo',
  })
  @Patch(':id')
  async updateTodo(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    const todo = await this.todoService.updateTodo(id, dto);
    return todo.toJSON();
  }

  @ApiOkResponse({
    description: '成功刪除 todo',
  })
  @Delete(':id')
  async removeTodo(@Param('id') id: string) {
    await this.todoService.removeTodo(id);
    return {};
  }
}
