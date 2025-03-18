import {
  Module,
  OnApplicationBootstrap,
  OnModuleInit,
  OnApplicationShutdown,
  OnModuleDestroy,
  Inject,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CccService } from './ccc.service';
import { CccController } from './ccc.controller';

@Module({
  controllers: [CccController],
  providers: [CccService],
})
export class CccModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    OnApplicationShutdown
{
  constructor(private readonly moduleRef: ModuleRef) {}

  @Inject(CccService)
  private readonly cccService: CccService;

  async onModuleReady() {
    console.log('CccModule onModuleReady');
  }
  onApplicationShutdown(signal?: string) {
    const cccService = this.moduleRef.get(CccService);
    console.log(
      this.cccService.findAll(),
      'CccModule OnApplicationShutdown',
      signal,
      cccService.findAll(),
    );
  }
  onModuleDestroy() {
    console.log('CccModule OnModuleDestroy');
  }
  onModuleInit() {
    console.log('CccModule onModuleInit');
  }
  onApplicationBootstrap() {
    console.log('CccModule onApplicationBootstrap');
  }
}
