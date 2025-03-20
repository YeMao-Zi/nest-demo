import { Module, Global, forwardRef } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
import { DddService } from 'src/ddd/ddd.service';
import { DddModule } from 'src/ddd/ddd.module';

@Module({
  imports: [forwardRef(() => DddModule)],
  controllers: [AaaController],
  providers: [AaaService],
  exports: [AaaService],
})
export class AaaModule {}
