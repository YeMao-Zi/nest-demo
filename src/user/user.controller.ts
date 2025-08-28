import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginGuard } from 'src/login.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

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
  @UseGuards(LoginGuard)
  info() {
    return 'info';
  }
}
