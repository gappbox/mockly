import type { Request, Response, NextFunction } from 'express';
import { HeadersMiddleware } from './headers.middleware';

describe('HeadersMiddleware', () => {
  let middleware: HeadersMiddleware;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    middleware = new HeadersMiddleware();
    next = jest.fn();
    req = {};
    res = {
      setHeader: jest.fn(),
      removeHeader: jest.fn(),
    };
  });

  it('should set Content-Security-Policy header', () => {
    middleware.use(req as Request, res as Response, next);
    expect(res.setHeader).toHaveBeenCalledWith('Content-Security-Policy', expect.stringContaining("default-src 'self'"));
  });

  it('should set Cross-Origin-Embedder-Policy header', () => {
    middleware.use(req as Request, res as Response, next);
    expect(res.setHeader).toHaveBeenCalledWith('Cross-Origin-Embedder-Policy', 'require-corp');
  });

  it('should set Cross-Origin-Opener-Policy header', () => {
    middleware.use(req as Request, res as Response, next);
    expect(res.setHeader).toHaveBeenCalledWith('Cross-Origin-Opener-Policy', 'same-origin');
  });

  it('should set Cross-Origin-Resource-Policy header', () => {
    middleware.use(req as Request, res as Response, next);
    expect(res.setHeader).toHaveBeenCalledWith('Cross-Origin-Resource-Policy', 'same-origin');
  });

  it('should set Expect-CT header', () => {
    middleware.use(req as Request, res as Response, next);
    expect(res.setHeader).toHaveBeenCalledWith('Expect-CT', 'max-age=86400, enforce');
  });

  it('should set Permissions-Policy header', () => {
    middleware.use(req as Request, res as Response, next);
    expect(res.setHeader).toHaveBeenCalledWith('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  });

  it('should set Referrer-Policy header', () => {
    middleware.use(req as Request, res as Response, next);
    expect(res.setHeader).toHaveBeenCalledWith('Referrer-Policy', 'no-referrer');
  });

  it('should set Strict-Transport-Security header', () => {
    middleware.use(req as Request, res as Response, next);
    expect(res.setHeader).toHaveBeenCalledWith('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  });

  it('should set Vary header', () => {
    middleware.use(req as Request, res as Response, next);
    expect(res.setHeader).toHaveBeenCalledWith('Vary', 'Sec-Fetch-Dest, Sec-Fetch-Mode, Sec-Fetch-Site');
  });

  it('should set X-Content-Type-Options header', () => {
    middleware.use(req as Request, res as Response, next);
    expect(res.setHeader).toHaveBeenCalledWith('X-Content-Type-Options', 'nosniff');
  });

  it('should set X-Frame-Options header', () => {
    middleware.use(req as Request, res as Response, next);
    expect(res.setHeader).toHaveBeenCalledWith('X-Frame-Options', 'SAMEORIGIN');
  });

  it('should set X-XSS-Protection header', () => {
    middleware.use(req as Request, res as Response, next);
    expect(res.setHeader).toHaveBeenCalledWith('X-XSS-Protection', '1; mode=block');
  });

  it('should remove x-powered-by header', () => {
    middleware.use(req as Request, res as Response, next);
    expect(res.removeHeader).toHaveBeenCalledWith('x-powered-by');
  });

  it('should call next()', () => {
    middleware.use(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });
});