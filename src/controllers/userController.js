const { StatusCodes } = require('http-status-codes');
const userService = require('../services/userService');
const {
  USER_NOT_FOUND,
  INVALID_INPUT,
  MISSING_REFRESH_TOKEN,
  EMAIL_EXISTS,
} = require('../constants/errorMessages');
const {
  USER_REGISTERED_SUCCESS,
  USER_LOGOUT_SUCCESS,
} = require('../constants/userStatuses');
const authService = require('../services/authService');
const {
  REFRESH_TOKEN,
  ACCESS_TOKEN,
  REFRESH_TOKEN_COOKIE_OPTIONS,
  ACCESS_TOKEN_COOKIE_OPTIONS,
} = require('../constants/auth');
const { isDuplicateEmailError } = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: INVALID_INPUT });
  }
};

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(StatusCodes.OK).json(users);
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: USER_NOT_FOUND });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: USER_NOT_FOUND });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: USER_NOT_FOUND });
  }
};

const registerUser = async (req, res) => {
  try {
    await authService.registerUser(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json({ message: USER_REGISTERED_SUCCESS });
  } catch (error) {
    if (isDuplicateEmailError(error)) {
      return res.status(StatusCodes.CONFLICT).json({ error: EMAIL_EXISTS });
    }
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { accessToken, refreshToken, user } = await authService.loginUser(
      req.body,
    );

    res.cookie(REFRESH_TOKEN, refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
    res.cookie(ACCESS_TOKEN, accessToken, ACCESS_TOKEN_COOKIE_OPTIONS);

    return res.status(StatusCodes.OK).json({
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const refreshTokenController = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: MISSING_REFRESH_TOKEN });
    }
    const accessToken = await authService.refreshAccessToken(refreshToken);
    return res.status(StatusCodes.OK).json({ accessToken });
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: MISSING_REFRESH_TOKEN });
    }

    await authService.logout(refreshToken);

    res.clearCookie(REFRESH_TOKEN, REFRESH_TOKEN_COOKIE_OPTIONS);
    res.clearCookie(ACCESS_TOKEN, ACCESS_TOKEN_COOKIE_OPTIONS);
    return res.status(StatusCodes.OK).json({ message: USER_LOGOUT_SUCCESS });
  } catch (error) {
    if (error.message === USER_NOT_FOUND) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
    }
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: error.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await userService.getCurrentUser(req.user.userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: USER_NOT_FOUND });
    }
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  refreshToken: refreshTokenController,
  logoutUser,
  getCurrentUser,
};
