import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard, RoleGuard } from '../../common/guards';

import { UserService } from './user.service';

import { CreateUserDto } from './dto/create-user.dto';

@UseGuards(JwtGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    const { username, email } = dto;
    const exist = await this.userService.existUser(username, email);
    if (exist) {
      throw new ConflictException();
    }
    const document = await this.userService.createUser(dto);
    const user = document.toJSON();
    user.password = null;

    return user;
  }

  @Get()
  async getUsers(@Query('skip') skip: number, @Query('limit') limit: number) {
    const documents = await this.userService.getUsers(skip, limit);
    const users = documents.map((document) => {
      const user = document.toJSON();
      user.password = null;
      return user;
    });
    return users;
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    await this.userService.removeUser(id);
    return {};
  }
}
