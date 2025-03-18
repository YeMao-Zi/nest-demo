import { Controller, Get,Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Inject('testPrivide')
  private testPrivide: { name: string; age: number };
  @Get()
  getHello(): string {
    console.log(this.testPrivide,'testPrivide')
    return this.appService.getHello();
  }
}
