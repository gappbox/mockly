const { version } = require('../package.json');

const headersMiddleware = (_, response, next) => {
  response.set('X-App-CreatedBy', 'gappbox');
  response.set('X-App-Name', 'mockly');
  response.set('X-App-Version', version);
  next();
};

module.exports = headersMiddleware;