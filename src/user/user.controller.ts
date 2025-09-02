import {
  Controller,
  Get,
  Post,
  Body,
  // Res,
  ValidationPipe,
  Query,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
// import { Response } from 'express';
import {
  RequireLogin,
  RequirePermission,
} from 'src/decorators/custom-decorator';
import { Role } from './entities/role.entity';

interface User {
  id: number;
  userName: string;
  roles: Role[];
}
interface JwtPayload {
  user: User;
  iat: number;
  exp: number;
}

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private logger = new Logger();

  @Get('initData')
  async initData() {
    return await this.userService.initData();
  }

  @Post('login')
  async login(@Body(ValidationPipe) user: LoginDto) {
    const findUser = await this.userService.login(user);

    const access_token = this.jwtService.sign(
      {
        user: {
          id: findUser.id,
          username: findUser.username,
          roles: findUser.roles,
        },
      },
      {
        expiresIn: '30m',
      },
    );

    const refresh_token = this.jwtService.sign(
      {
        user: {
          id: findUser.id,
        },
      },
      {
        expiresIn: '7d',
      },
    );
    // res.setHeader('Authorization', 'Bearer ' + token);

    return {
      access_token,
      refresh_token,
    };
  }

  @Get('refresh')
  async refresh(@Query('refreshToken') refreshToken: string) {
    try {
      const info = this.jwtService.verify<JwtPayload>(refreshToken);
      const findUser = await this.userService.findUserById(info.user.id);
      const access_token = this.jwtService.sign(
        {
          user: {
            id: findUser.id,
            username: findUser.username,
            roles: findUser.roles,
          },
        },
        {
          expiresIn: '30m',
        },
      );

      const refresh_token = this.jwtService.sign(
        {
          user: {
            id: findUser.id,
          },
        },
        {
          expiresIn: '7d',
        },
      );

      return { access_token, refresh_token };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'token 已失效，请重新登录',
        HttpStatus.UNAUTHORIZED,
      );
    }
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
