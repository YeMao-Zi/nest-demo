import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { AppService } from './app.service';
import { AaaService } from './aaa/aaa.service';

@Injectable()
export class MyLogger extends ConsoleLogger {
  @Inject(AppService)
  private appService: AppService;

  @Inject(AaaService)
  private aaaService: AaaService;
  constructor() {
    super();
  }
  testLog() {
    console.log(
      'testLog:' + this.appService.getHello(),
      this.aaaService.findAll(),
    );
  }
  log(message: string, context?: string) {
    super.log(message, context);
  }

  error(message: string, context?: string) {
    super.error(message, context);
  }

  warn(message: string, context?: string) {
    super.warn(message, context);
  }

  debug(message: string, context?: string) {
    super.debug(message, context);
  }
}
