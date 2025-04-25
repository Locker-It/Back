require('dotenv').config();

const connectDB = require('./db');
const app = require('./app');

const port = process.env.PORT || 5050;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
  });
});
