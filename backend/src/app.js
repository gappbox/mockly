const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();
const origin = 'http://localhost:5173';
const port = process.env.PORT || 5174;
const cacheMiddleware = require('./middlewares/cache.middleware');
const errorMiddleware = require('./middlewares/error.middleware');
const metadataMiddleware = require('./middlewares/metadata.middleware');
const notFoundMiddleware = require('./middlewares/not-found-middleware');
const securityMiddleware = require('./middlewares/security.middleware');
const datasetRoutes = require('./dataset/dataset.routes');

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin }));
}

app.use(metadataMiddleware);
app.use(cacheMiddleware);
app.use(securityMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', datasetRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
app.listen(port, () => console.log(`Application is running on port ${port}`));