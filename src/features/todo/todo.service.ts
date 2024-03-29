import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, FilterQuery } from 'mongoose';

import { Todo, TodoDocument } from '../../core/models/todo';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {}

  public async createTodo(dto: CreateTodoDto) {
    const document = await this.todoModel.create(dto);
    return document.populate('assignee', '-password');
  }

  public getTodos(skip = 0, limit = 30, filters?: FilterQuery<TodoDocument>) {
    const query = this.todoModel
      .find(filters)
      .populate('assignee', '-password')
      .skip(skip)
      .limit(limit);
    return query.exec();
  }

  public getTodoById(id: string) {
    return this.todoModel.findById(id).populate('assignee', '-password').exec();
  }

  public updateTodo(id: string, dto: UpdateTodoDto) {
    return this.todoModel
      .findByIdAndUpdate(id, { $set: dto }, { new: true })
      .populate('assignee', '-password')
      .exec();
  }

  public removeTodo(id: string) {
    return this.todoModel.findByIdAndDelete(id).exec();
  }
}
