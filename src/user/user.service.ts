import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

function md5(str: string) {
  return crypto.createHash('md5').update(str).digest('hex');
}

@Injectable()
export class UserService {
  private logger = new Logger();

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  async register(user: RegisterDto) {
    const findUser = await this.userRepository.findOne({
      where: { username: user.username },
    });

    if (findUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = new User();
    newUser.username = user.username;
    newUser.password = md5(user.password.toString());

    try {
      await this.userRepository.save(newUser);
      return { message: '注册成功' };
    } catch (error) {
      this.logger.error(error, UserService.name);
      throw new HttpException('注册失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(user: RegisterDto) {
    const findUser = await this.userRepository.findOne({
      where: { username: user.username },
    });

    if (!findUser) {
      throw new HttpException('用户不存在', HttpStatus.UNAUTHORIZED);
    }

    if (findUser.password !== md5(user.password.toString())) {
      throw new HttpException('密码错误', HttpStatus.UNAUTHORIZED);
    }

    return findUser;
  }
}
