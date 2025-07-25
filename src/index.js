const { ENV_PRODUCTION } = require('./constants/env');

require('dotenv').config({ path: `.env${process.env.NODE_ENV === ENV_PRODUCTION ? '.production' : ''}` });

const connectDB = require('./db');
const app = require('./app');

const port = process.env.PORT || 5050;

connectDB().then(() => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on port ${port}`);
  });
});
