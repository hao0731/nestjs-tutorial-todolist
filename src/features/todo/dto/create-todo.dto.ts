import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    minLength: TODO_TITLE_MIN_LENGTH,
    maxLength: TODO_TITLE_MAX_LENGTH,
    description: 'todo 的標題',
  })
  @MinLength(TODO_TITLE_MIN_LENGTH)
  @MaxLength(TODO_TITLE_MAX_LENGTH)
  public readonly title: string;

  @ApiProperty({
    maxLength: TODO_DESCRIPTION_MAX_LENGTH,
    required: false,
    description: 'todo 的詳細內容',
  })
  @IsOptional()
  @MaxLength(TODO_DESCRIPTION_MAX_LENGTH)
  public readonly description?: string;

  @ApiProperty({
    required: false,
    description: 'todo 是否完成',
  })
  @IsOptional()
  @IsBoolean()
  public readonly completed?: boolean;

  @ApiProperty({
    description: '被指派任務的 user 的 id',
  })
  @IsNotEmpty()
  public readonly assignee: string;
}
