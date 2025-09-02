import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import {
  RequireLogin,
  RequirePermission,
} from 'src/decorators/custom-decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('initData')
  async initData() {
    return await this.userService.initData();
  }

  @Post('login')
  async login(
    @Body(ValidationPipe) user: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const findUser = await this.userService.login(user);

    if (findUser) {
      const token = await this.jwtService.signAsync({
        user: {
          id: findUser.id,
          username: findUser.username,
          roles: findUser.roles,
        },
      });
      res.setHeader('Authorization', 'Bearer ' + token);
    }
    return findUser;
  }

  @Post('register')
  async register(@Body(ValidationPipe) user: RegisterDto) {
    return await this.userService.register(user);
  }

  @Get('info')
  @RequireLogin()
  @RequirePermission(['查询 bbb'])
  info() {
    return 'info';
  }
}
