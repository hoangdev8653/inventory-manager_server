import { db } from "../configs/connectDB.js";

const getAllRepresentative = async () => {
  try {
    const result = await db.query("SELECT * FROM representatives");
    return result.rows;
  } catch (error) {
    next(error);
  }
};

const getRepresentativeById = async (id) => {
  try {
    const result = await db.query(
      `
      SELECT 
        r.id,
        r.full_name,
        r.position,
        r.phone_number,
        r.email,
        r.department_id,
        d.name AS department_name,
        d.address AS department_address
      FROM representatives r
      JOIN departments d ON r.department_id = d.id
      WHERE r.id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      throw new Error("Không tìm thấy người đại diện: " + id);
    }

    const row = result.rows[0];

    return {
      id: row.id,
      full_name: row.full_name,
      position: row.position,
      phone_number: row.phone_number,
      email: row.email,
      department: {
        id: row.department_id,
        name: row.department_name,
        address: row.department_address,
      },
    };
  } catch (error) {
    throw new Error("Lỗi khi lấy người đại diện: " + error.message);
  }
};

const createRepresentative = async ({
  full_name,
  position,
  phone_number,
  email,
  department_id,
}) => {
  try {
    const result = await db.query(
      "INSERT INTO representatives (full_name, position, phone_number, email, department_id ) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [full_name, position, phone_number, email, department_id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Lỗi Khi tạo đại diện: " + error.message);
  }
};

const deleteRepresentative = async (id) => {
  try {
    const check = await db.query(
      "DELETE FROM representatives WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      throw new Error("Không tìm thấy đại diện với ID: " + id);
    }
  } catch (error) {
    throw new Error("Lỗi khi xóa đại diện: " + error.message);
  }
};

export const representativeService = {
  getAllRepresentative,
  getRepresentativeById,
  createRepresentative,
  deleteRepresentative,
};
