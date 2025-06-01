const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const auth = require('../constants/auth');
const errorMessages = require('../constants/errorMessages');
const { NUMERIC } = require('../constants/numeric');

const generateAccessToken = (user) => jwt.sign(
    {
      [auth.TOKEN_PAYLOAD_KEY]: user._id,
      role: user.role,
    },
    process.env[auth.JWT_ACCESS_SECRET_KEY],
    {
      expiresIn: auth.ACCESS_TOKEN_EXPIRES_TIME,
    }
  );

const registerUser = async ({ name, email, username, password }) => {
  const existingUser = await userRepository.findByUsername(username);
  if (existingUser) {
    throw new Error(errorMessages.USERNAME_TAKEN);
  }

  const hashedPassword = await bcrypt.hash(password, NUMERIC.SALT_ROUNDS);
  const newUser = await userRepository.createUser({
    name,
    email,
    username,
    password: hashedPassword,
  });

  return newUser;
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

  const accessToken = generateAccessToken(user);

  const refreshToken = jwt.sign(
    {
      [auth.TOKEN_PAYLOAD_KEY]: user._id,
    },
    process.env[auth.JWT_REFRESH_SECRET_KEY],
    {
      expiresIn: auth.REFRESH_TOKEN_EXPIRES_TIME,
    },
  );

  await userRepository.updateUser(user._id, { refreshToken });

  return { accessToken, refreshToken };
};

const validateRefreshToken = async (token) => {
  const decoded = jwt.verify(
    token,
    process.env[auth.JWT_REFRESH_SECRET_KEY]
  );

  const userId = decoded[auth.TOKEN_PAYLOAD_KEY];
  const user = await userRepository.findById(userId);

  if (!user || !user.refreshTokens.includes(token)) {
    throw new Error(errorMessages.INVALID_TOKEN);
  }

  return user;
};

const refreshAccessToken = async (refreshToken) => {
  const user = await validateRefreshToken(refreshToken);
  return generateAccessToken(user);
};



module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
};
