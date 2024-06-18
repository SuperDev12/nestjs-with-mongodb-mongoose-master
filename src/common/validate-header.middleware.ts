import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidateHeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // const customHeader = req.headers['x^dev_rathore'];

    // if (!customHeader) {
    //   throw new UnauthorizedException('Missing x^(dev_rathore) header');
    // }

    next();
  }
}
