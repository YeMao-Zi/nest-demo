import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
// import {
//   RequireLogin,
//   RequirePermission,
// } from 'src/decorators/custom-decorator';
import { Request } from 'express';
import { User } from './entities/user.entity';

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
  @UseGuards(AuthGuard('local'))
  login(@Req() req: Request) {
    const findUser = req.user! as User;
    const token = this.jwtService.sign(
      {
        user: {
          id: findUser.id,
          username: findUser.username,
          roles: findUser.roles,
        },
      },
      {
        expiresIn: '7d',
      },
    );
    return { token };
  }

  @Get('githubLogin')
  @UseGuards(AuthGuard('github'))
  githubLogin() {
    // 这里不会被执行，因为会被重定向到 GitHub 的授权页面
  }

  @Get('githubCallback')
  @UseGuards(AuthGuard('github'))
  githubCallback(@Req() req: Request) {
    const findUser = req.user! as User;
    return findUser;
  }

  @Post('register')
  async register(@Body(ValidationPipe) user: RegisterDto) {
    return await this.userService.register(user);
  }

  @Get('info')
  // @RequireLogin()
  // @RequirePermission(['新增 aaa'])
  @UseGuards(AuthGuard('jwt'))
  info(@Req() req: Request) {
    return req.user;
  }
}
