import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { AppService } from './app.service';
import { AaaService } from './aaa/aaa.service';
import { createLogger, format, Logger, transports } from 'winston';
import * as chalk from 'chalk';
import * as dayjs from 'dayjs';

@Injectable()
export class MyLogger extends ConsoleLogger {
  @Inject(AppService)
  private appService: AppService;

  @Inject(AaaService)
  private aaaService: AaaService;

  private logger: Logger;
  constructor() {
    super();
    this.logger = createLogger({
      level: 'debug',
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.printf(({ context, level, message, time }: any) => {
              const appStr = chalk.green(`[NEST]`);
              const contextStr = chalk.yellow(`[${context}]`);
              return `${appStr} ${time} ${level}: ${message} ${contextStr}`;
            }),
          ),
        }),
        new transports.File({
          filename: 'logs/error.log',
          level: 'error',
          format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.json(),
          ),
        }),
      ],
    });
  }
  testLog() {
    super.log(
      'testLog:' + this.appService.getHello(),
      this.aaaService.findAll(),
    );
  }
  log(message: string, context?: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.info(message, { context, time });
  }

  error(message: string, context?: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.error(message, { context, time });
  }

  warn(message: string, context?: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.warn(message, { context, time });
  }

  debug(message: string, context?: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.debug(message, { context, time });
  }
}
