import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LocalGuard } from '../../common/guards';

import { UserPayload } from './decorators/payload.decorator';

import { IUserPayload } from './models/payload.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  async signin(@UserPayload() payload: IUserPayload) {
    return this.jwtService.sign(payload);
  }
}
