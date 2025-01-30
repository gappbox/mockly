const createResponder = (req, res) => {
  const success = (status, payload) => {
    res.status(status).json(payload);
  };

  const error = (status, payload) => {
    res.status(status).json({
      ...payload,
      path: req.originalUrl,
      status,
      timestamp: new Date().toISOString(),
    });
  };

  return { success, error };
};

module.exports = createResponder;