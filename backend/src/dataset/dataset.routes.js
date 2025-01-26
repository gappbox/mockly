const express = require('express');
const router = express.Router();
const {
  createMocks,
  loadCategories,
  loadTypes,
} = require('./dataset.controller');

router.get('/dataset/categories', loadCategories);
router.get('/dataset/categories/:category/types', loadTypes);
router.post('/dataset', createMocks);

module.exports = router;