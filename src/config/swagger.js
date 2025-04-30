const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { SWAGGER_ROUTE, SWAGGER_DOC_PATH } = require('./swagger.config');

const swaggerDocument = YAML.load(SWAGGER_DOC_PATH);

function setupSwagger(app) {
  app.use(SWAGGER_ROUTE, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = setupSwagger;
