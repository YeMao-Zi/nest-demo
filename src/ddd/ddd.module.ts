import { forwardRef, Module } from '@nestjs/common';
import { DddService } from './ddd.service';
import { DddController } from './ddd.controller';
import { AaaService } from 'src/aaa/aaa.service';
import { AaaModule } from 'src/aaa/aaa.module';

@Module({
  imports: [forwardRef(() => AaaModule)],
  controllers: [DddController],
  providers: [DddService],
  exports: [DddService],
})
export class DddModule {}
