const express = require('express');
const request = require('supertest');
const routes = require('../src/dataset/dataset.routes');
const config = require('../src/dataset/dataset.config');
const createResponder = require('../src/utils/responder.util');

const items = [
  { id: "1", field: "id", category: "string", type: "uuid" },
  { id: "2", field: "name", category: "person", type: "fullName" },
];

describe('dataset routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(routes);
    app.use('', (req, res) => {
      const responder = createResponder(req, res);

      responder.error(404, {
        errorCode: 'NOT_FOUND',
        errorMessage: 'Not Found Resource',
      });
    });
  });

  describe('GET /dataset/categories', () => {
    test('should return categories', async () => {
      const response = await request(app).get('/dataset/categories');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(config.categories);
    });
  });

  describe('GET /dataset/categories/:category/types', () => {
    test('should return types for a valid category', async () => {
      const response = await request(app).get('/dataset/categories/string/types');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(config.types['string']);
    });

    test('should return validation error for an invalid category', async () => {
      const response = await request(app).get('/dataset/categories/invalid/types');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        errorCode: 'VALIDATION_ERROR',
        errorMessage: `Category parameter must be one of: ${config.categories.map(({ code }) => code).join(', ')}`,
        path: '/dataset/categories/invalid/types',
        status: 400,
        timestamp: expect.any(String),
      });
    });
  });

  describe('POST /dataset', () => {
    test('should return empty array when "items" is an empty array', async () => {
      const response = await request(app)
        .post('/dataset')
        .send({ items: [], count: 1 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    test('should return an array of mock data objects with "id" and "name" items', async () => {
      const response = await request(app)
        .post('/dataset')
        .send({ items , count: 2 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { id: expect.any(String), name: expect.any(String) },
        { id: expect.any(String), name: expect.any(String) },
      ]);
    });

    test('should return validation error if "count" is missing', async () => {
      const response = await request(app)
        .post('/dataset')
        .send({ items });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        errorCode: 'VALIDATION_ERROR',
        errorMessage: 'Count is required',
        path: '/dataset',
        status: 400,
        timestamp: expect.any(String),
      });
    });

    test('should return validation error if "count" is not a number', async () => {
      const response = await request(app)
        .post('/dataset')
        .send({ items, count: true });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        errorCode: 'VALIDATION_ERROR',
        errorMessage: 'Count must be a number',
        path: '/dataset',
        status: 400,
        timestamp: expect.any(String),
      });
    });

    test('should return validation error if "count" is less than the minimum allowed (1)', async () => {
      const response = await request(app)
        .post('/dataset')
        .send({ items, count: 0 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        errorCode: 'VALIDATION_ERROR',
        errorMessage: 'Count must be at least 1',
        path: '/dataset',
        status: 400,
        timestamp: expect.any(String),
      });
    });

    test('should return validation error if "count" exceeds the maximum allowed (1000)', async () => {
      const response = await request(app)
        .post('/dataset')
        .send({ items, count: 1001 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        errorCode: 'VALIDATION_ERROR',
        errorMessage: 'Count must be at most 1000',
        path: '/dataset',
        status: 400,
        timestamp: expect.any(String),
      });
    });

    test('should return validation error if "items" is missing in the request body', async () => {
      const response = await request(app)
        .post('/dataset')
        .send({ count: 1 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        errorCode: 'VALIDATION_ERROR',
        errorMessage: 'Items is required',
        path: '/dataset',
        status: 400,
        timestamp: expect.any(String),
      });
    });

    test('should return validation error if "items" objects are missing "field"', async () => {
      const response = await request(app)
        .post('/dataset')
        .send({ items: [{ id: '1' }], count: 1 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        errorCode: 'VALIDATION_ERROR',
        errorMessage: 'Field is required',
        path: '/dataset',
        status: 400,
        timestamp: expect.any(String),
      });
    });

    test('should return validation error if "items" objects are missing "category"', async () => {
      const response = await request(app)
        .post('/dataset')
        .send({ items: [{ id: '1', field: "id" }], count: 1 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        errorCode: 'VALIDATION_ERROR',
        errorMessage: 'Category is required',
        path: '/dataset',
        status: 400,
        timestamp: expect.any(String),
      });
    });

    test('should return validation error if "items" objects are missing "type"', async () => {
      const response = await request(app)
        .post('/dataset')
        .send({ items: [{ id: '1', field: "id", category: "string" }], count: 1 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        errorCode: 'VALIDATION_ERROR',
        errorMessage: 'Type is required',
        path: '/dataset',
        status: 400,
        timestamp: expect.any(String),
      });
    });
  });

  describe('Errors', () => {
    test('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/unknown-route');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        errorCode: 'NOT_FOUND',
        errorMessage: 'Not Found Resource',
        path: '/unknown-route',
        status: 404,
        timestamp: expect.any(String),
      });
    });
  });
});