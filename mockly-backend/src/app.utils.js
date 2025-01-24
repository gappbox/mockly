const createResponder = (request, response) => ({
  error: (status, payload) => {
    response.status(status).json({
      ...payload,
      path: request.originalUrl,
      status,
      timestamp: new Date().toISOString(),
    });
  },

  success: (status, payload) => {
    response.status(status).json(payload);
  },
});

module.exports = {
  createResponder,
};