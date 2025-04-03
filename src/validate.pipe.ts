import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
  Inject,
  Optional,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidatePipe implements PipeTransform {
  @Optional()
  @Inject('testPrivide')
  private testPrivide: { name: string; age: number };

  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype, type } = metadata;
    if (!metatype) {
      return value;
    }
    // 校验 post 请求参数
    if (type === 'body') {
      const object = plainToInstance(metatype, value);
      const errors = await validate(object);
      if (errors.length > 0) {
        throw new BadRequestException('参数验证失败');
      }
      return value;
    }
    // 校验 get 请求参数
    if (Number.isNaN(parseInt(value))) {
      throw new BadRequestException(`参数${metadata.data}错误`);
    }
    if (typeof parseInt(value) === 'number') {
      return parseInt(value);
    } else {
      throw new BadRequestException(`参数${metadata.data}格式错误`);
      // throw new HttpException(
      //   `参数${metadata.data}格式错误`,
      //   HttpStatus.BAD_REQUEST,
      // );
    }
  }
}
