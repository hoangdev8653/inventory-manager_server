import { db } from "../configs/connectDB.js";
import { hashPassword, passwordMatch } from "../utils/hashPassword.js";
import generateToken from "../utils/generateToken.js";
import verifyRefreshToken from "../middlewares/verifyRefreshToken.js";

const getAllUsers = async () => {
  try {
    const result = await db.query("SELECT * FROM users");
    return result.rows;
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách người dùng:", error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`❌ Lỗi khi lấy người dùng với ID ${id}:`, error);
    throw error;
  }
};

const register = async ({ email, password, username }) => {
  try {
    const check = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (check.rows.length > 0) {
      throw new Error("Email đã được sử dụng");
    }
    const hashedPassword = await hashPassword(password);
    const result = await db.query(
      "INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *",
      [email, hashedPassword, username]
    );
    return result.rows[0];
  } catch (error) {
    console.error("❌ Lỗi khi đăng ký người dùng:", error);
  }
};

const login = async ({ email, password }) => {
  try {
    const check = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (check.rows.length === 0) {
      throw new Error("Email không tồn tại");
    }
    const user = check.rows[0];
    const isPasswordValid = await passwordMatch(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Mật khẩu không chính xác");
    }
    const { accessToken, refreshToken } = generateToken(user.id);
    const result = await db.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    return { user, accessToken, refreshToken };
  } catch (error) {
    console.error("❌ Lỗi khi đăng nhập:", error);
    throw error;
  }
};

const refreshToken = async ({ refreshToken }) => {
  try {
    const { userId } = await verifyRefreshToken(refreshToken);
    const newToken = generateToken(userId);
    return newToken;
  } catch (error) {
    console.error("❌ Lỗi khi làm mới token:", error);
    throw error;
  }
};

export const userService = {
  getAllUsers,
  getUserById,
  register,
  login,
  refreshToken,
};
