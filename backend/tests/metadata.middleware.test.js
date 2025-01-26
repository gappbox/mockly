const express = require('express');
const request = require('supertest');
const metadataMiddleware = require('../src/middlewares/metadata.middleware');
const { version } = require('../package.json');

describe('metadata middleware', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(metadataMiddleware);
    app.get('/', (req, res) => res.send('OK'));
  });

  test('should set the correct headers', async () => {
    const response = await request(app).get('/');

    expect(response.headers['x-app-createdby']).toBe('gappbox');
    expect(response.headers['x-app-name']).toBe('mockly');
    expect(response.headers['x-app-version']).toBe(version);
    expect(response.text).toBe('OK');
  });

  test('should call next() to pass control to the next middleware', async () => {
    const nextMiddleware = jest.fn((req, res) => res.send('Next middleware called'));
    app.get('/test', nextMiddleware);

    const response = await request(app).get('/test');
    expect(response.text).toBe('Next middleware called');
  });
});