const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5174;
const errorMiddleware = require('./app-errors.middleware');
const headersMiddleware = require('./app-headers.middleware');
const routes = require('./app.routes');

if (process.env.NODE_ENV === 'development') {
  app.use(cors({origin: 'http://localhost:5173'}));
}

app.use(headersMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', routes);
app.use(errorMiddleware);
app.disable('x-powered-by');
app.listen(port, () => console.log(`Application is running on port ${port}`));