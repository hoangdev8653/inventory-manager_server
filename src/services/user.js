import { db } from "../configs/connectDB.js";
import { hashPassword, passwordMatch } from "../utils/hashPassword.js";
import generateToken from "../utils/generateToken.js";
import verifyRefreshToken from "../middlewares/verifyRefreshToken.js";

const getAllUsers = async () => {
  try {
    const result = await db.query(`
      SELECT 
        u.id,
        u.full_name,
        u.email,
        u.password,
        u.role,
        u.created_at,
        u.department_id,
        d.name AS department_name,
        d.address AS department_address
      FROM users u
      JOIN departments d ON u.department_id = d.id
    `);

    const formatted = result.rows.map((row) => ({
      id: row.id,
      full_name: row.full_name,
      email: row.email,
      password: row.password,
      role: row.role,
      created_at: row.created_at,
      department: {
        id: row.department_id,
        name: row.department_name,
        address: row.department_address,
      },
    }));

    return formatted;
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

const register = async ({ email, password, full_name, department_id }) => {
  try {
    const check = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (check.rows.length > 0) {
      throw new Error("Email đã được sử dụng");
    }
    const hashedPassword = await hashPassword(password);
    const result = await db.query(
      "INSERT INTO users (email, password, full_name, department_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, hashedPassword, full_name, department_id]
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

const updateRole = async (id, role) => {
  try {
    const check = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (check.rows.length === 0) {
      throw new Error("User không tồn tại");
    }
    const user = await db.query("UPDATE users SET role = $1 WHERE id = $2", [
      role,
      id,
    ]);
    return user;
  } catch (error) {
    console.error("❌ Không thể cập nhật role:", error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const check = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (check.rows.length === 0) {
      throw new Error("User không tồn tại");
    }
    const user = await db.query("DELETE FROM users WHERE id = $1", [id]);
    return user;
  } catch (error) {
    console.error("❌ Không thể xóa user:", error);
    throw error;
  }
};
export const userService = {
  getAllUsers,
  getUserById,
  register,
  login,
  refreshToken,
  updateRole,
  deleteUser,
};
