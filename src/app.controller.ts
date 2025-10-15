import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(ConfigService)
  private readonly configService: ConfigService;
  @Get()
  getHello() {
    // return this.appService.getHello();
    return this.configService.get<string>('MYSQL_SERVER_DATABASE');
  }
}
