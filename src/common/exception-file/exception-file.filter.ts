import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Catch()
export class ExceptionFileFilter<T extends Error> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const path = join(__dirname,'..','..','images',exception.message,'error.png');
    response
    .status(400)
    .sendFile(path);
  }
}
