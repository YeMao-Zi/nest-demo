import { Global, Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
@Module({
  controllers: [PersonController],
  providers: [
    PersonService,
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
