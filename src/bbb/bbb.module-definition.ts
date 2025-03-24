import { ConfigurableModuleBuilder } from '@nestjs/common';

// 使用 builder 构建动态模块
export interface BBBModuleOptions {
  name: string;
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<BBBModuleOptions>().build();
