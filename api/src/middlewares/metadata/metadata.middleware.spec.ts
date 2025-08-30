import type { Request, Response, NextFunction } from 'express';
import { MetadataMiddleware } from './metadata.middleware';

describe('MetadataMiddleware', () => {
  let middleware: MetadataMiddleware;
  let next: jest.MockedFunction<NextFunction>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    middleware = new MetadataMiddleware();
    next = jest.fn();
    req = { originalUrl: '/' };
    res = { setHeader: jest.fn() };
  });

  it('should set X-App-CreatedBy header', () => {
    middleware.use(req as Request, res as Response, next);

    expect(res.setHeader).toHaveBeenCalledWith('X-App-CreatedBy', 'gappbox');
  });

  it('should set X-App-Name header', () => {
    middleware.use(req as Request, res as Response, next);

    expect(res.setHeader).toHaveBeenCalledWith('X-App-Name', 'mockly');
  });

  it('should call next()', () => {
    middleware.use(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
  });

  it('should not set headers on non-root paths', () => {
    req.originalUrl = '/api/users';
    middleware.use(req as Request, res as Response, next);

    expect(res.setHeader).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});