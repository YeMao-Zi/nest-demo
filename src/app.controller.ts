import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { RedisService } from './redis/redis.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(RedisService)
  private redisService: RedisService;
  @Get()
  async getHello() {
    return await this.appService.getHello();
  }

  @Get('addPos')
  async addPos(
    @Query('name') posName: string,
    @Query('longitude') longitude: number,
    @Query('latitude') latitude: number,
  ) {
    if (!posName || !longitude || !latitude) {
      throw new BadRequestException('位置信息不全');
    }
    try {
      await this.redisService.geoAdd('positions', posName, [
        longitude,
        latitude,
      ]);
    } catch (error) {
      throw new BadRequestException(error);
    }
    return {
      message: '添加成功',
      statusCode: 200,
    };
  }

  @Get('getPos')
  async getPos(@Query('name') posName: string) {
    if (!posName) {
      throw new BadRequestException('位置信息不全');
    }
    try {
      const pos = await this.redisService.geoPos('positions', posName);
      return {
        message: '查询成功',
        statusCode: 200,
        data: pos,
      };
    } catch (error) {}
  }

  @Get('geoList')
  async geoList() {
    try {
      const pos = await this.redisService.geoList('positions');
      return {
        message: '查询成功',
        statusCode: 200,
        data: pos,
      };
    } catch (error) {}
  }
}
