const path = require('path');

module.exports = {
  SWAGGER_ROUTE: '/api-docs',
  SWAGGER_DOC_PATH: path.resolve(__dirname, '../docs/openapi.yaml'),
};
