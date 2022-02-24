import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

import {
  TODO_TITLE_MIN_LENGTH,
  TODO_TITLE_MAX_LENGTH,
  TODO_DESCRIPTION_MAX_LENGTH,
} from './../../../core/models/todo';

export class CreateTodoDto {
  @MinLength(TODO_TITLE_MIN_LENGTH)
  @MaxLength(TODO_TITLE_MAX_LENGTH)
  public readonly title: string;

  @IsOptional()
  @MaxLength(TODO_DESCRIPTION_MAX_LENGTH)
  public readonly description?: string;

  @IsOptional()
  @IsBoolean()
  public readonly completed?: boolean;

  @IsNotEmpty()
  public readonly assignee: string;
}
