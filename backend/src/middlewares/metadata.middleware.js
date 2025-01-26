function metadataMiddleware(_, res, next) {
  res.setHeader('X-App-CreatedBy', 'gappbox');
  res.setHeader('X-App-Name', 'mockly');
  res.setHeader('X-App-Version', require('../../package.json').version || 'unknown');
  next();
}

module.exports = metadataMiddleware;