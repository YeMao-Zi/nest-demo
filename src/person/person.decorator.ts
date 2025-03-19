import { createParamDecorator } from '@nestjs/common';

// 实现获取请求头装饰器
export const Myheaders = createParamDecorator((key, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  return key ? request.headers[key.toLowerCase()] : request.headers;
});
