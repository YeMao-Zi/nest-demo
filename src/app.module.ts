import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [AaaModule, BbbModule, PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
