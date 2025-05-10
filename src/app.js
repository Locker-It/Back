const express = require('express');
const api = require('./routes/apiRouter');
const setupSwagger = require('./config/swagger');
const { IS_DEV } = require('./constants/env');

const app = express();

app.use(express.json());

if (IS_DEV) {
    setupSwagger(app);
}

  app.use('/api/v1', api)

module.exports = app;
 const a =
