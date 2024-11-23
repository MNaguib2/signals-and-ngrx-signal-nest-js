import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError) // this code can use global or private in every controller
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = 400;

    if (exception.code === 11000) {
      const duplicateField = Object.keys(exception['keyValue'])[0];
      response.status(status).json({
        statusCode: status,
        message: `${duplicateField} already exists`,
      });
    } else {
      response.status(status).json({
        statusCode: status,
        message: 'Database error',
      });
    }
  }
}
