import { Module } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
import { Test1Service } from './test1.service';
import { Test2Service } from './test2.service';

@Module({
  controllers: [AaaController],
  providers: [AaaService, Test1Service, Test2Service],
  exports: [AaaService],
})
export class AaaModule {}
