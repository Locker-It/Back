const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const api = require('./routes/apiRouter');
const setupSwagger = require('./config/swagger');
const { IS_DEV } = require('./constants/env');


dotenv.config();

const app = express();
const corsOptions = {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());

if (IS_DEV) {
    setupSwagger(app);
}

app.use('/api/v1', api)

module.exports = app;
