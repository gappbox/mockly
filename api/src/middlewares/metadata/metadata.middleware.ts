import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MetadataMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction): void {
    if (req.originalUrl === '/') {
      res.setHeader('X-App-CreatedBy', 'gappbox');
      res.setHeader('X-App-Name', 'mockly');
    }
    next();
  }
}