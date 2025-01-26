const createResponder = require('../utils/responder.util');

function errorMiddleware(err, req, res, next) {
  const status = err.status || 500;
  const errorCode = status === 500 ? 'INTERNAL_SERVER_ERROR' : 'UNKNOWN_ERROR';
  const errorMessage = err.message || 'Internal Server Error';
  const responder = createResponder(req, res);

  responder.error(status, {
    errorCode,
    errorMessage
  });
}

module.exports = errorMiddleware;