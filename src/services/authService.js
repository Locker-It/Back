const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const { auth, tokenConfigs, tokenType } = require('../constants/auth');
const errorMessages = require('../constants/errorMessages');
const { NUMERIC } = require('../constants/numeric');

const generateToken = (user, type) => {
  const config = tokenConfigs[type];
  if (!config) throw new Error(errorMessages.INVALID_TOKEN_TYPE);

  const payload = config.payload(user);
  const secret = process.env[config.secretKey];
  return jwt.sign(payload, secret, { expiresIn: config.expiresIn });
};

const registerUser = async ({ name, email, username, password }) => {
  const existingUser = await userRepository.findByUsername(username);
  if (existingUser) {
    throw new Error(errorMessages.USERNAME_TAKEN);
  }

  const hashedPassword = await bcrypt.hash(password, NUMERIC.SALT_ROUNDS);
  return userRepository.createUser({
    name,
    email,
    username,
    password: hashedPassword,
  });
};

const loginUser = async ({ username, password }) => {
  const user = await userRepository.findByUsername(username);
  if (!user) {
    throw new Error(errorMessages.USER_NOT_FOUND);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error(errorMessages.INVALID_CREDENTIALS);
  }

  const accessToken = generateToken(user, tokenType.ACCESS);
  const refreshToken = generateToken(user, tokenType.REFRESH);

  await userRepository.addRefreshToken(user._id, refreshToken);

  return { accessToken, refreshToken };
};

const validateRefreshToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env[auth.JWT_REFRESH_SECRET_KEY]);
    const userId = decoded[auth.TOKEN_PAYLOAD_KEY];
    const user = await userRepository.getUserById(userId);

    if (
      !user ||
      !Array.isArray(user.refreshTokens) ||
      !user.refreshTokens.includes(token)
    ) {
      throw new Error(errorMessages.INVALID_TOKEN);
    }

    return user;
  } catch (err) {
    throw new Error(errorMessages.INVALID_TOKEN);
  }
};

const refreshAccessToken = async (refreshToken) => {
  const user = await validateRefreshToken(refreshToken);
  return generateToken(user, tokenType.ACCESS);
};

const logout = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env[auth.JWT_REFRESH_SECRET_KEY],);
    const userId = decoded[auth.TOKEN_PAYLOAD_KEY];
    const user = await userRepository.getUserById(userId);

    if (!user) {
      throw new Error(errorMessages.USER_NOT_FOUND);
    }

    await userRepository.removeRefreshToken(userId, refreshToken);
  } catch (err) {
    if (err.name === errorMessages.JSON_WEB_TOKEN_ERROR || err.name === errorMessages.TOKEN_EXPIRED_ERROR) {
      throw new Error(errorMessages.INVALID_TOKEN);
    }
    throw err;
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logout,
};
