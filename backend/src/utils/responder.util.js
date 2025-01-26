function createResponder(req, res) {
  return {
    success: (status, payload) => {
      res.status(status).json(payload);
    },
    error: (status, payload) => {
      res.status(status).json({
        ...payload,
        path: req.originalUrl,
        status,
        timestamp: new Date().toISOString(),
      });
    },
  };
}

module.exports = createResponder;