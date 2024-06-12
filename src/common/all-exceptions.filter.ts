import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      console.log(response)
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const message =
        status === HttpStatus.INTERNAL_SERVER_ERROR
          ? 'Random error2'
          : (exception as any).response?.message || 'Random error2';
  
      response.status(status).json({
        statusCode: status,
        message,
      });
    }
  }
  