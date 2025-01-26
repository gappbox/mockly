const express = require('express');
const request = require('supertest');
const securityMiddleware = require('../src/middlewares/security.middleware');

describe('security middleware', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(securityMiddleware);
    app.get('/', (req, res) => res.send('OK'));
  });

  test('should set the correct security headers', async () => {
    const response = await request(app).get('/');

    expect(response.headers['cache-control']).toBe('no-store');
    expect(response.headers['content-security-policy']).toBe("default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';");
    expect(response.headers['cross-origin-embedder-policy']).toBe('require-corp');
    expect(response.headers['cross-origin-opener-policy']).toBe('same-origin');
    expect(response.headers['cross-origin-resource-policy']).toBe('same-origin');
    expect(response.headers['expect-ct']).toBe('max-age=86400, enforce');
    expect(response.headers['permissions-policy']).toBe('geolocation=(), microphone=(), camera=()');
    expect(response.headers['referrer-policy']).toBe('no-referrer');
    expect(response.headers['strict-transport-security']).toBe('max-age=31536000; includeSubDomains');
    expect(response.headers['vary']).toBe('Sec-Fetch-Dest, Sec-Fetch-Mode, Sec-Fetch-Site');
    expect(response.headers['x-content-type-options']).toBe('nosniff');
    expect(response.headers['x-frame-options']).toBe('SAMEORIGIN');
    expect(response.headers['x-xss-protection']).toBe('1; mode=block');
    expect(response.text).toBe('OK');
  });

  test('should call next() to pass control to the next middleware', async () => {
    const nextMiddleware = jest.fn((req, res) => res.send('Next middleware called'));
    app.get('/test', nextMiddleware);

    const response = await request(app).get('/test');
    expect(response.text).toBe('Next middleware called');
  });
});