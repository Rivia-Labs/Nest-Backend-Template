import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import type { Response } from 'express';

import { ErrorResponse } from '../responses/error.response';

@Catch()
export class DefaultFilter implements ExceptionFilter {
  catch(err: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const responseBody = ErrorResponse.ofError(err);
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseBody);
  }
}
