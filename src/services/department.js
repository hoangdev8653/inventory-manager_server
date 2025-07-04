import { db } from "../configs/connectDB.js";

const getAllDepartments = async () => {
  try {
    const result = await db.query("SELECT * FROM departments");
    return result.rows;
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách phòng ban: " + error.message);
  }
};

const getDepartmentById = async (id) => {
  try {
    const result = await db.query("SELECT * FROM departments WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      throw new Error("Không tìm thấy phòng ban với ID: " + id);
    }
    return result.rows[0];
  } catch (error) {
    throw new Error("Lỗi khi lấy phòng ban: " + error.message);
  }
};

const createDepartment = async ({ name, address }) => {
  try {
    const result = await db.query(
      "INSERT INTO departments (name, address) VALUES ($1, $2) RETURNING *",
      [name, address]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Lỗi khi tạo phòng ban: " + error.message);
  }
};

const updateDepartment = async ({ id, name, address }) => {
  try {
    const result = await db.query(
      "UPDATE departments SET name = $1, address = $2 WHERE id = $3 RETURNING *",
      [name, address, id]
    );
    if (result.rows.length === 0) {
      throw new Error("Không tìm thấy phòng ban với ID: " + id);
    }
    return result.rows[0];
  } catch (error) {
    throw new Error("Lỗi khi cập nhật phòng ban: " + error.message);
  }
};

const deleteDepartment = async (id) => {
  try {
    const result = await db.query(
      "DELETE FROM departments WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      throw new Error("Không tìm thấy phòng ban với ID: " + id);
    }
    return result.rows[0];
  } catch (error) {
    throw new Error("Lỗi khi xóa phòng ban: " + error.message);
  }
};
export const departmentService = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
