import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const STATIC_EXTENSIONS = ['js','css','png','jpg','jpeg','gif','svg','woff','woff2','ttf','otf','eot','ico'];
const REG_EXP = new RegExp(`\\.(${STATIC_EXTENSIONS.join('|')})$`);
const MAX_AGE = 60 * 60 * 24 * 30;

@Injectable()
export class CacheMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction): void {
    const isStaticFile = REG_EXP.test(req.originalUrl);
    const cacheControl = isStaticFile ? `public, max-age=${MAX_AGE}` : 'no-store';

    res.setHeader('Cache-Control', cacheControl);
    next();
  }
}