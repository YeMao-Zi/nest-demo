import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { MyLogger } from './MyLogger';
import { AaaService } from './aaa/aaa.service';

@Controller()
export class AppController {
  // 两种方式都可以
  // private logger = new Logger();
  @Inject(MyLogger)
  private logger: MyLogger;
  constructor(private readonly appService: AppService) {}

  @Inject(AaaService)
  private readonly aaaService: AaaService;
  @Get()
  getHello(): string {
    this.logger.debug('aaa', AppController.name);
    this.logger.error('bbb', AppController.name);
    this.logger.log('ccc', AppController.name);
    this.logger.warn('eee', AppController.name);
    this.logger.testLog();
    return this.appService.getHello() + this.aaaService.findAll();
  }
}
