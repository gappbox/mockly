function cacheMiddleware(req, res, next) {
  if (/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|otf|eot|ico)$/.test(req.originalUrl)) {
    res.setHeader('Cache-Control', `public, max-age=${60 * 60 * 24 * 30}`);
  }

  next();
}

module.exports = cacheMiddleware;