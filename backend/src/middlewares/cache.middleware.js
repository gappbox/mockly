const STATIC_EXTENSIONS = ['js','css','png','jpg','jpeg','gif','svg', 'woff','woff2','ttf','otf','eot','ico'];
const REG_EXP = new RegExp(`\\.(${STATIC_EXTENSIONS.join('|')})$`);
const MAX_AGE = 60 * 60 * 24 * 30;

const cacheMiddleware = (req, res, next) => {
  const isStaticFile = REG_EXP.test(req.originalUrl);
  const cacheControl = isStaticFile ? `public, max-age=${MAX_AGE}` : 'no-store';

  res.setHeader('Cache-Control', cacheControl);
  next();
};

module.exports = cacheMiddleware;