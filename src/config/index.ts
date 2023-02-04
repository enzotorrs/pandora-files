let config: any

switch (process.env.NODE_ENV) {
  case 'development':
    config = require('./config.development');
    break;
  case 'production':
    config = require('./config.production');
    break;
  default:
    config = require('./config.development');
}

export default config;
