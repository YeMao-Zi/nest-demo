import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  @Inject()
  private readonly userService: UserService;

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.UNAUTHORIZED);
    }

    if (user.password !== pass) {
      throw new HttpException('密码错误', HttpStatus.UNAUTHORIZED);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }
}
