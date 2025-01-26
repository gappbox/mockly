const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5174;
const createResponder = require('./utils/responder.util');
const cacheMiddleware = require('./middlewares/cache.middleware');
const errorMiddleware = require('./middlewares/error.middleware');
const metadataMiddleware = require('./middlewares/metadata.middleware');
const securityMiddleware = require('./middlewares/security.middleware');
const datasetRoutes = require('./dataset/dataset.routes');

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: 'http://localhost:5173' }));
}

app.use(metadataMiddleware);
app.use(securityMiddleware);
app.use(cacheMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', datasetRoutes);
app.use(errorMiddleware);
app.use('', (req, res) => {
  const responder = createResponder(req, res);

  responder.error(404, {
    errorCode: 'NOT_FOUND',
    errorMessage: 'Not Found Resource',
  });
});
app.disable('x-powered-by');
app.listen(port, () => console.log(`Application is running on port ${port}`));