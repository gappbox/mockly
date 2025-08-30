import type { Request, Response, NextFunction } from 'express';
import { CacheMiddleware } from './cache.middleware';

describe('CacheMiddleware', () => {
  let middleware: CacheMiddleware;
  let next: NextFunction;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    middleware = new CacheMiddleware();
    next = jest.fn();
    req = {};
    res = { setHeader: jest.fn() };
  });

  it('should set public max-age for static files', () => {
    req.originalUrl = '/assets/app.js';
    middleware.use(req as Request, res as Response, next);

    expect(res.setHeader).toHaveBeenCalledWith('Cache-Control', expect.stringContaining('public, max-age='));
    expect(next).toHaveBeenCalled();
  });

  it('should set no-store for non-static files', () => {
    req.originalUrl = '/index.html';
    middleware.use(req as Request, res as Response, next);

    expect(res.setHeader).toHaveBeenCalledWith('Cache-Control', 'no-store');
    expect(next).toHaveBeenCalled();
  });

  it('should call next()', () => {
    middleware.use(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });
});