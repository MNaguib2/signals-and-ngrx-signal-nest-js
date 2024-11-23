import { Injectable, NestMiddleware } from '@nestjs/common'; //RequestMethod
import { Request, Response, NextFunction } from 'express';
// import { RouteInfo } from '@nestjs/common/interfaces';
// import { request } from 'http';
import { MyLogger } from './Logger';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const header = Object.assign({}, req.headers);
    delete header['authorization'];
    new MyLogger().url_http(`${req.originalUrl}`, JSON.stringify(header));
    if (next) {
      next();
    }
  }
}
