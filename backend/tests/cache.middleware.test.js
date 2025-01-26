const express = require('express');
const request = require('supertest');
const cacheMiddleware = require('../src/middlewares/cache.middleware');

describe('cache middleware', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(cacheMiddleware);
    app.get('/static.js', (req, res) => res.send('Static file'));
    app.get('/index.html', (req, res) => res.send('HTML file'));
  });

  test('should set Cache-Control header for static assets', async () => {
    const response = await request(app).get('/static.js');

    expect(response.headers['cache-control']).toBe('public, max-age=2592000'); // 30 days in seconds
    expect(response.text).toBe('Static file');
  });

  test('should not set Cache-Control header for non-static assets', async () => {
    const response = await request(app).get('/index.html');

    expect(response.headers['cache-control']).toBeUndefined();
    expect(response.text).toBe('HTML file');
  });

  test('should call next() to pass control to the next middleware', async () => {
    const nextMiddleware = jest.fn((req, res) => res.send('Next middleware called'));
    app.get('/test', nextMiddleware);

    const response = await request(app).get('/test');
    expect(response.text).toBe('Next middleware called');
  });
});