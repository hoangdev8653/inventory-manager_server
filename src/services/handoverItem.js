import { db } from "../configs/connectDB.js";

const getAllHandoverItem = async () => {
  try {
    const result = await db.query("SELECT * FROM handover_items");
    return result.rows;
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách mục bàn giao: " + error.message);
  }
};

const getHandoverItemById = async (id) => {
  try {
    const result = await db.query(
      `SELECT
        hi.*,
        hr.so_ky_hieu,
        hr.cancu,
        hr.date,
        hr.daidien_a,
        hr.chucvu_a,
        hr.daidien_b,
        hr.chucvu_b,
        hr.note AS handover_note
      FROM handover_items hi
      LEFT JOIN handover_records hr ON hi.handover_record_id = hr.id
      WHERE hi.id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      throw new Error("Không tìm thấy mục bàn giao với ID: " + id);
    }
    const row = result.rows[0];
    console.log("🚀 Dữ liệu mục bàn giao:", row);

    return {
      id: row.id,
      stt: row.stt,
      ten_thiet_bi: row.ten_thiet_bi,
      so_luong: row.so_luong,
      so_serial: row.so_serial,
      ghi_chu: row.ghi_chu,
      handover_record: {
        id: row.handover_record_id,
        so_ky_hieu: row.so_ky_hieu,
        cancu: row.cancu,
        date: row.date,
        note: row.handover_note,
        daidien_a: row.daidien_a,
        chucvu_a: row.chucvu_a,
        daidien_b: row.daidien_b,
        chucvu_b: row.chucvu_b,
      },
    };
  } catch (error) {
    throw new Error("Lỗi khi lấy mục bàn giao: " + error.message);
  }
};

const createHandoverItem = async ({
  handover_record_id,
  stt,
  ten_thiet_bi,
  so_luong,
  so_serial,
  ghi_chu,
}) => {
  try {
    const result = await db.query(
      `INSERT INTO handover_items (
        handover_record_id, stt, ten_thiet_bi, so_luong, so_serial, ghi_chu
      ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [handover_record_id, stt, ten_thiet_bi, so_luong, so_serial, ghi_chu]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Lỗi khi tạo mục bàn giao: " + error.message);
  }
};

const updateHandoverItem = async (handoverItemData) => {
  try {
    const { id, handover_record_id, item_id, item_name, quantity, unit, note } =
      handoverItemData;

    const result = await db.query(
      `UPDATE handover_items SET
        handover_record_id = $2,
        item_id = $3,
        item_name = $4,
        quantity = $5,
        unit = $6,
        note = $7
      WHERE id = $1 RETURNING *`,
      [id, handover_record_id, item_id, item_name, quantity, unit, note]
    );
    if (result.rows.length === 0) {
      throw new Error("Không tìm thấy mục bàn giao với ID: " + id);
    }
    return result.rows[0];
  } catch (error) {
    throw new Error("Lỗi khi cập nhật mục bàn giao: " + error.message);
  }
};

const deleteHandoverItem = async (id) => {
  try {
    const result = await db.query(
      "DELETE FROM handover_items WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      throw new Error("Không tìm thấy mục bàn giao với ID: " + id);
    }
    return result.rows[0];
  } catch (error) {
    throw new Error("Lỗi khi xóa mục bàn giao: " + error.message);
  }
};

export const handoverItemService = {
  getAllHandoverItem,
  getHandoverItemById,
  createHandoverItem,
  updateHandoverItem,
  deleteHandoverItem,
};
