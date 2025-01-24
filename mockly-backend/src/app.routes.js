const express = require('express');
const router = express.Router();
const {
  createMocks,
  loadCategories,
  loadTypes,
  loadTypeOptions,
} = require('./app.controller');

router.get('/categories', loadCategories);
router.get('/categories/:category/types', loadTypes);
router.get('/categories/:category/types/:type/options', loadTypeOptions);
router.post('/mocks', createMocks);

router.use('', (request, response) => response.status(404).json({
  errorCode: 'NOT_FOUND',
  errorMessage: 'Not Found Resource',
  path: request.originalUrl,
  status: 404,
  timestamp: new Date().toISOString(),
}));

module.exports = router;