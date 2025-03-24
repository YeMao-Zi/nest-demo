import { Module, DynamicModule } from '@nestjs/common';
import { BbbService } from './bbb.service';
import { BbbController } from './bbb.controller';
import { ConfigurableModuleClass } from './bbb.module-definition';

@Module({})
export class BbbModule {
  static register(options: Record<string, any>): DynamicModule {
    const providers = [
      BbbService,
      {
        provide: 'bbbOptions',
        useValue: options,
      },
    ];
    return {
      // global: true,
      module: BbbModule,
      controllers: [BbbController],
      providers: providers,
      exports: [BbbService, 'bbbOptions'],
    };
  }
}
// @Module({
//   controllers: [BbbController],
//   exports: [BbbService, 'bbbOptions'],
// })
// export class BbbModule extends ConfigurableModuleClass {}
