import {
  Controller,
  Get,
  Inject,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Inject('testPrivide')
  private testPrivide: { name: string; age: number };
  @Get()
  @UseGuards(LoginGuard)
  @SetMetadata('roles', ['admin'])
  getHello(): string {
    console.log(this.testPrivide, 'testPrivide');
    return this.appService.getHello();
  }
}
