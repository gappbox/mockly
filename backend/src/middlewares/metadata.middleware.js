const metadataMiddleware = (req, res, next) => {
  if (req.originalUrl === '/') {
    res.setHeader('X-App-CreatedBy', 'gappbox');
    res.setHeader('X-App-Name', 'mockly');
    res.setHeader('X-App-Version', require('../../package.json').version || 'unknown');
  }

  next();
};

module.exports = metadataMiddleware;