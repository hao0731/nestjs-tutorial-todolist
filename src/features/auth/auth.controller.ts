import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { LocalGuard } from '../../common/guards';

import { UserPayload } from './decorators/payload.decorator';

import { IUserPayload } from './models/payload.model';
import { SignInDto } from './dto/signin.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @ApiBody({ type: SignInDto })
  @ApiOkResponse({
    description: '登入成功，取得 JWT',
  })
  @UseGuards(LocalGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@UserPayload() payload: IUserPayload) {
    return this.jwtService.sign(payload);
  }
}
