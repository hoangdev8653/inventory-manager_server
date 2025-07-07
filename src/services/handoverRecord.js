import { db } from "../configs/connectDB.js";

const getAllHandoverRecord = async () => {
  try {
    const result = await db.query("SELECT * FROM handover_records");
    return result.rows;
  } catch (error) {
    throw new Error(
      "Lỗi khi lấy danh sách biên bản bàn giao: " + error.message
    );
  }
};

const getHandoverRecordById = async (id) => {
  try {
    const result = await db.query(
      `
    SELECT
      hr.*,
      da.name AS ben_a_name,
      da.address AS ben_a_address,
      db.name AS ben_b_name,
      db.address AS ben_b_address,
      ua.username AS signed_a_username,
      ua.email AS signed_a_email,
      ua.image AS signed_a_image,
      ub.username AS signed_b_username,
      ub.email AS signed_b_email,
      ub.image AS signed_b_image
    FROM handover_records hr
    LEFT JOIN departments da ON hr.ben_a_id = da.id
    LEFT JOIN departments db ON hr.ben_b_id = db.id
    LEFT JOIN users ua ON hr.signed_a_by = ua.id
    LEFT JOIN users ub ON hr.signed_b_by = ub.id
    WHERE hr.id = $1
  `,
      [id]
    );

    if (result.rows.length === 0) throw new Error("Không tìm thấy biên bản");

    const row = result.rows[0];
    return {
      id: row.id,
      so_ky_hieu: row.so_ky_hieu,
      cancu: row.cancu,
      date: row.date,
      daidien_a: row.daidien_a,
      chucvu_a: row.chucvu_a,
      daidien_b: row.daidien_b,
      chucvu_b: row.chucvu_b,
      note: row.note,
      signed_a_at: row.signed_a_at,
      signed_b_at: row.signed_b_at,
      created_at: row.created_at,
      ben_a: {
        id: row.ben_a_id,
        name: row.ben_a_name,
        address: row.ben_a_address,
      },
      ben_b: {
        id: row.ben_b_id,
        name: row.ben_b_name,
        address: row.ben_b_address,
      },
      signed_a_by: {
        id: row.signed_a_by,
        username: row.signed_a_username,
        email: row.signed_a_email,
        image: row.signed_a_image,
      },
      signed_b_by: {
        id: row.signed_b_by,
        username: row.signed_b_username,
        email: row.signed_b_email,
        image: row.signed_b_image,
      },
    };
  } catch (error) {
    throw new Error("Lỗi khi lấy biên bản bàn giao: " + error.message);
  }
};

const createHandoverRecord = async (handoverRecordData) => {
  try {
    const {
      so_ky_hieu,
      cancu,
      date,
      ben_a_id,
      ben_b_id,
      daidien_a,
      chucvu_a,
      daidien_b,
      chucvu_b,
      note,
      signed_a_at,
      signed_b_at,
      signed_a_by,
      signed_b_by,
    } = handoverRecordData;

    const result = await db.query(
      `INSERT INTO handover_records (
        so_ky_hieu, cancu, date, ben_a_id, ben_b_id, 
        daidien_a, chucvu_a, daidien_b, chucvu_b, 
        note, signed_a_at, signed_b_at, signed_a_by, signed_b_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
      [
        so_ky_hieu,
        cancu,
        date,
        ben_a_id,
        ben_b_id,
        daidien_a,
        chucvu_a,
        daidien_b,
        chucvu_b,
        note,
        signed_a_at,
        signed_b_at,
        signed_a_by,
        signed_b_by,
      ]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Lỗi khi tạo biên bản bàn giao: " + error.message);
  }
};

const updateHandoverRecord = async (id, handoverRecordData) => {
  try {
    const {
      so_ky_hieu,
      cancu,
      date,
      ben_a_id,
      ben_b_id,
      daidien_a,
      chucvu_a,
      daidien_b,
      chucvu_b,
      note,
      signed_a_at,
      signed_b_at,
      signed_a_by,
      signed_b_by,
    } = handoverRecordData;

    const result = await db.query(
      `UPDATE handover_records SET 
        so_ky_hieu = $1, cancu = $2, date = $3, 
        ben_a_id = $4, ben_b_id = $5, 
        daidien_a = $6, chucvu_a = $7, 
        daidien_b = $8, chucvu_b = $9, 
        note = $10, signed_a_at = $11, 
        signed_b_at = $12, signed_a_by = $13, 
        signed_b_by = $14 
       WHERE id = $15 RETURNING *`,
      [
        so_ky_hieu,
        cancu,
        date,
        ben_a_id,
        ben_b_id,
        daidien_a,
        chucvu_a,
        daidien_b,
        chucvu_b,
        note,
        signed_a_at,
        signed_b_at,
        signed_a_by,
        signed_b_by,
        id,
      ]
    );
    if (result.rows.length === 0) {
      throw new Error("Không tìm thấy biên bản bàn giao với ID: " + id);
    }
    return result.rows[0];
  } catch (error) {
    throw new Error("Lỗi khi cập nhật biên bản bàn giao: " + error.message);
  }
};

const deleteHandoverRecord = async (id) => {
  try {
    const result = await db.query(
      "DELETE FROM handover_records WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      throw new Error("Không tìm thấy biên bản bàn giao với ID: " + id);
    }
    return result.rows[0];
  } catch (error) {
    throw new Error("Lỗi khi xóa biên bản bàn giao: " + error.message);
  }
};

export const handoverRecordService = {
  getAllHandoverRecord,
  getHandoverRecordById,
  createHandoverRecord,
  updateHandoverRecord,
  deleteHandoverRecord,
};
