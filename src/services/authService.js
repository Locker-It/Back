const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const auth = require('../constants/auth');
const errorMessages = require('../constants/errorMessages');
const { NUMERIC } = require('../constants/numeric');

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

  const token = jwt.sign(
    {
      [auth.TOKEN_PAYLOAD_KEY]: user._id,
      role: user.role,
    },
    process.env[auth.JWT_SECRET_KEY],
    {
      expiresIn: auth.TOKEN_EXPIRES_TIME,
    },
  );
  return token;
};

module.exports = {
  registerUser,
  loginUser,
};
