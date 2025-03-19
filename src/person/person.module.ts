import { Global, Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { AaaModule } from 'src/aaa/aaa.module';
import { AaaService } from 'src/aaa/aaa.service';
@Module({
  imports: [],
  controllers: [PersonController],
  providers: [
    PersonService,
    AaaService,
    {
      provide: 'testPrivide',
      useFactory() {
        return {
          name: '张三',
          age: 18,
        };
      },
    },
  ],
  exports: [PersonService, 'testPrivide'],
})
export class PersonModule {}
