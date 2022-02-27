import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, MaxLength, MinLength } from 'class-validator';

import {
  Role,
  USER_USERNAME_MIN_LENGTH,
  USER_USERNAME_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
  USER_PASSWORD_MAX_LENGTH,
} from '../../../core/models/user';

export class CreateUserDto {
  @ApiProperty({
    minLength: USER_USERNAME_MIN_LENGTH,
    maxLength: USER_USERNAME_MAX_LENGTH,
    description: '使用者名稱',
  })
  @MinLength(USER_USERNAME_MIN_LENGTH)
  @MaxLength(USER_USERNAME_MAX_LENGTH)
  public readonly username: string;

  @ApiProperty({
    minLength: USER_PASSWORD_MIN_LENGTH,
    maxLength: USER_PASSWORD_MAX_LENGTH,
    description: '使用者的密碼',
  })
  @MinLength(USER_PASSWORD_MIN_LENGTH)
  @MaxLength(USER_PASSWORD_MAX_LENGTH)
  public readonly password: string;

  @ApiProperty({
    description: '使用者的電子信箱',
  })
  @IsEmail()
  public readonly email: string;

  @ApiProperty({
    enum: Role,
    enumName: 'RoleType',
    description: '使用者的角色',
  })
  @IsEnum(Role)
  public readonly role: Role;
}
