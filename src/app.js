const express = require('express');
const api = require('./routes/apiRouter');
const setupSwagger = require('./config/swagger');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
    setupSwagger(app);
}

app.use('/api/v1', api)

module.exports = app;
