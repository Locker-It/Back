const { IS_DEV } = require('./env');
const { HOME } = require('./apiPaths');

const auth = {
  TOKEN_PAYLOAD_KEY: 'userId',
  ACCESS_TOKEN_EXPIRES_TIME: '1h',
  JWT_ACCESS_SECRET_KEY: 'JWT_ACCESS_SECRET',
  REFRESH_TOKEN_EXPIRES_TIME: '7d',
  JWT_REFRESH_SECRET_KEY: 'JWT_REFRESH_SECRET',
  BEARER: 'Bearer',
};

const tokenConfigs = {
  access: {
    payload: (user) => ({
      [auth.TOKEN_PAYLOAD_KEY]: user._id,
      username: user.username,
      role: user.role,
    }),
    secretKey: auth.JWT_ACCESS_SECRET_KEY,
    expiresIn: auth.ACCESS_TOKEN_EXPIRES_TIME,
  },
  refresh: {
    payload: (user) => ({ [auth.TOKEN_PAYLOAD_KEY]: user._id }),
    secretKey: auth.JWT_REFRESH_SECRET_KEY,
    expiresIn: auth.REFRESH_TOKEN_EXPIRES_TIME,
  },
};

const tokenType = {
  ACCESS: 'access',
  REFRESH: 'refresh',
};
const COOKIE_NAMES = {
  REFRESH_TOKEN: 'refreshToken',
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN_COOKIE_SAME_SITE: 'Strict',
};

const REFRESH_TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !IS_DEV,
  sameSite: COOKIE_NAMES.REFRESH_TOKEN_COOKIE_SAME_SITE,
  path: HOME,
};

module.exports = {
  auth,
  tokenConfigs,
  tokenType,
  COOKIE_NAMES,
  REFRESH_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN: COOKIE_NAMES.REFRESH_TOKEN,
  ACCESS_TOKEN: COOKIE_NAMES.ACCESS_TOKEN,
};
