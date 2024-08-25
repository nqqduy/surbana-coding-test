import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorException } from './error.exception';

enum CommonErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR|400',
  AN_UNKNOWN_ERROR = 'AN_UNKNOWN_ERROR|500',
  PATH_NOT_FOUND = 'PATH_NOT_FOUND|404',
  UNAUTHORIZED = 'UNAUTHORIZED|401',
  FORBIDDEN = 'FORBIDDEN|403',
  GENERATE_FILE_ERROR = 'GENERATE_FILE_ERROR_500|500',
  INVALID_JSON_FORMAT = 'INVALID_JSON_FORMAT|400',
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor() {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let errorException: ErrorException;
    if (exception instanceof ErrorException) {
      errorException = exception;
    } else if (exception instanceof NotFoundException) {
      errorException = new ErrorException(
        CommonErrorCode.PATH_NOT_FOUND,
        'Path not found',
      );
    } else if (exception instanceof UnauthorizedException) {
      errorException = new ErrorException(
        CommonErrorCode.UNAUTHORIZED,
        'Unauthorized',
      );
    } else if (exception instanceof BadRequestException) {
      errorException = new ErrorException(
        CommonErrorCode.INVALID_JSON_FORMAT,
        'Invalid json format',
      );
    } else {
      errorException = new ErrorException(
        CommonErrorCode.AN_UNKNOWN_ERROR,
        'An unknown error',
      );
    }

    console.log(`Error: ${exception}`);

    response
      .status(errorException.httpStatusCode)
      .json(errorException.returnError());
  }
}
