import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { AaaExpertion } from './aaa.exceptions';

@Catch(AaaExpertion)
export class AaaFilter implements ExceptionFilter {
  catch(exception: AaaExpertion, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    response.status(500).json({
      aaa: exception.aaa,
      bbb: exception.bbb,
    });
  }
}
