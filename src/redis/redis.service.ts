import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private readonly redisClient: RedisClientType;

  async geoAdd(key: string, member: string, posLocation: [number, number]) {
    return this.redisClient.geoAdd(key, {
      member,
      longitude: posLocation[0],
      latitude: posLocation[1],
    });
  }

  async geoPos(key: string, member: string) {
    const res = await this.redisClient.geoPos(key, member);

    if (!res || !res[0]) {
      throw new BadRequestException('数据不存在');
    }
    return {
      name: member,
      longitude: res[0].longitude,
      latitude: res[0].latitude,
    };
  }

  async geoList(key: string) {
    const positions = await this.redisClient.zRange(key, 0, -1);
    const list: any[] = [];
    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i];
      const res = await this.geoPos(key, pos);
      list.push(res);
    }
    return list;
  }
}
