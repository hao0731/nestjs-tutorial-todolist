import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';

import { User, UserDocument, Role } from '../../core/models/user';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService implements OnApplicationBootstrap {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async onApplicationBootstrap() {
    await this.createDefaultAdmin();
  }

  public async createUser(dto: CreateUserDto) {
    const { password } = dto;
    const hash = await bcrypt.hash(password, 12);
    return this.userModel.create({ ...dto, password: hash });
  }

  private async createDefaultAdmin() {
    const { username, password, email } = this.configService.get('admin');
    const dto: CreateUserDto = {
      username,
      password,
      email,
      role: Role.ADMIN,
    };
    const exist = await this.userModel
      .exists({
        $and: [{ username }, { role: Role.ADMIN }],
      })
      .exec();
    if (exist) {
      return;
    }
    await this.createUser(dto);
  }
}
