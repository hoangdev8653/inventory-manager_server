import { StatusCodes } from "http-status-codes";
import { userService } from "../services/user.js";

const getAllUsers = async (req, res, next) => {
  try {
    const user = await userService.getAllUsers();
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: user });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.query.id;
    const user = await userService.getUserById(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: user });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password, full_name, department_id } = req.body;
    const user = await userService.register({
      email,
      password,
      full_name,
      department_id,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ status: 201, message: "Đăng kí thành công", content: user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await userService.login({
      email,
      password,
    });
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Đăng nhập thành công",
      content: user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const user = await userService.refreshToken({ refreshToken });
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Làm mới token thành công",
      content: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateRoleUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { role } = req.body;
    const user = await userService.updateRoleUser(userId, role);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.query.id;
    const user = await userService.deleteUser(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: user });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  getAllUsers,
  getUserById,
  register,
  login,
  refreshToken,
  updateRoleUser,
  deleteUser,
};
