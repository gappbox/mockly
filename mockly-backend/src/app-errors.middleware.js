const errorMiddleware = (error, request, response, next) => {
  const status = error.status || 500;
  const errorMessage = error.message || 'Internal Server Error';
  const errorCode = status === 500 ? 'INTERNAL_SERVER_ERROR' : 'UNKNOWN_ERROR';

  response.status(status).json({
    errorCode,
    errorMessage,
    path: request.originalUrl,
    status: status,
    timestamp: new Date().toISOString(),
  });
};

module.exports = errorMiddleware;