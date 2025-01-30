const createResponder = require('../utils/responder.util');

const notFoundMiddleware = (req, res) => {
  const responder = createResponder(req, res);

  responder.error(404, {
    errorCode: 'NOT_FOUND',
    errorMessage: 'Not Found Resource',
  });
};

module.exports = notFoundMiddleware;