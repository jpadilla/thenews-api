var path = require('path');

var env = process.env.NODE_ENV || 'development',
  rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    secret: 'abc123',
    db: 'mongodb://localhost/thenews-scraper',
    root: rootPath
  },
  production: {}
}[env];