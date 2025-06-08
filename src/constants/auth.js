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

module.exports = { auth, tokenConfigs, tokenType };
