import { db } from "../configs/connectDB.js";

const getAllHandoverRecord = async () => {
  try {
    const result = await db.query(
      `
      SELECT
        hr.*,

        -- Thông tin bên A, B
        da.name AS ben_a_name,
        da.address AS ben_a_address,
        db.name AS ben_b_name,
        db.address AS ben_b_address,

        -- Thông tin người ký A, B (từ bảng users)
        ua.full_name AS signed_a_full_name,
        ua.email AS signed_a_email,
        ua.role AS signed_a_role,
        ua.department_id AS signed_a_department_id,

        ub.full_name AS signed_b_full_name,
        ub.email AS signed_b_email,
        ub.role AS signed_b_role,
        ub.department_id AS signed_b_department_id,

        -- Thông tin đại diện A
        ra.full_name AS rep_a_full_name,
        ra.position AS rep_a_position,
        ra.phone_number AS rep_a_phone,
        ra.email AS rep_a_email,

        -- Thông tin đại diện B
        rb.full_name AS rep_b_full_name,
        rb.position AS rep_b_position,
        rb.phone_number AS rep_b_phone,
        rb.email AS rep_b_email

      FROM handover_records hr
      LEFT JOIN departments da ON hr.ben_a_id = da.id
      LEFT JOIN departments db ON hr.ben_b_id = db.id
      LEFT JOIN users ua ON hr.signed_a_by = ua.id
      LEFT JOIN users ub ON hr.signed_b_by = ub.id
      LEFT JOIN representatives ra ON hr.representative_a_id = ra.id
      LEFT JOIN representatives rb ON hr.representative_b_id = rb.id
      ORDER BY hr.created_at DESC
      `
    );

    return result.rows.map((row) => ({
      id: row.id,
      so_ky_hieu: row.so_ky_hieu,
      cancu: row.cancu,
      date: row.date,
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

      signed_a_by: row.signed_a_by && {
        id: row.signed_a_by,
        full_name: row.signed_a_full_name,
        email: row.signed_a_email,
        role: row.signed_a_role,
        department_id: row.signed_a_department_id,
      },
      signed_b_by: row.signed_b_by && {
        id: row.signed_b_by,
        full_name: row.signed_b_full_name,
        email: row.signed_b_email,
        role: row.signed_b_role,
        department_id: row.signed_b_department_id,
      },

      representative_a: row.representative_a_id && {
        id: row.representative_a_id,
        full_name: row.rep_a_full_name,
        position: row.rep_a_position,
        phone_number: row.rep_a_phone,
        email: row.rep_a_email,
      },
      representative_b: row.representative_b_id && {
        id: row.representative_b_id,
        full_name: row.rep_b_full_name,
        position: row.rep_b_position,
        phone_number: row.rep_b_phone,
        email: row.rep_b_email,
      },
    }));
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

        -- Thông tin bên A, B
        da.name AS ben_a_name,
        da.address AS ben_a_address,
        db.name AS ben_b_name,
        db.address AS ben_b_address,

        -- Thông tin người ký A, B (từ bảng users)
        ua.full_name AS signed_a_full_name,
        ua.email AS signed_a_email,
        ua.role AS signed_a_role,
        ua.department_id AS signed_a_department_id,


        ub.full_name AS signed_b_full_name,
        ub.email AS signed_b_email,
        ub.role AS signed_b_role,
        ub.department_id AS signed_b_department_id,

        -- Thông tin đại diện A
        ra.full_name AS rep_a_full_name,
        ra.position AS rep_a_position,
        ra.phone_number AS rep_a_phone,
        ra.email AS rep_a_email,

        -- Thông tin đại diện B
        rb.full_name AS rep_b_full_name,
        rb.position AS rep_b_position,
        rb.phone_number AS rep_b_phone,
        rb.email AS rep_b_email

      FROM handover_records hr
      LEFT JOIN departments da ON hr.ben_a_id = da.id
      LEFT JOIN departments db ON hr.ben_b_id = db.id
      LEFT JOIN users ua ON hr.signed_a_by = ua.id
      LEFT JOIN users ub ON hr.signed_b_by = ub.id
      LEFT JOIN representatives ra ON hr.representative_a_id = ra.id
      LEFT JOIN representatives rb ON hr.representative_b_id = rb.id
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
        full_name: row.signed_a_full_name,
        email: row.signed_a_email,
        role: row.signed_a_role,
        department_id: row.signed_a_department_id,
      },
      signed_b_by: {
        id: row.signed_b_by,
        full_name: row.signed_b_full_name,
        email: row.signed_b_email,
        role: row.signed_b_role,
        department_id: row.signed_b_department_id,
      },

      representative_a: {
        id: row.representative_a_id,
        full_name: row.rep_a_full_name,
        position: row.rep_a_position,
        phone_number: row.rep_a_phone,
        email: row.rep_a_email,
      },
      representative_b: {
        id: row.representative_b_id,
        full_name: row.rep_b_full_name,
        position: row.rep_b_position,
        phone_number: row.rep_b_phone,
        email: row.rep_b_email,
      },
    };
  } catch (error) {
    throw new Error("Lỗi khi lấy biên bản bàn giao: " + error.message);
  }
};

const createHandoverRecord = async ({
  so_ky_hieu,
  cancu,
  handover_date,
  ben_a_id,
  ben_b_id,
  representative_a_id,
  representative_b_id,
  note,
}) => {
  try {
    // console.log(representative_a_id);
    // console.log(representative_b_id);

    const result = await db.query(
      `INSERT INTO handover_records (
        so_ky_hieu,
        cancu,
        handover_date,
        ben_a_id,
        ben_b_id,
        representative_a_id,
        representative_b_id,
        note
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        so_ky_hieu,
        cancu,
        handover_date,
        ben_a_id,
        ben_b_id,
        representative_a_id,
        representative_b_id,
        note,
      ]
    );

    const handover = result.rows[0];

    const userResult = await db.query(
      `SELECT id, full_name, department_id FROM users 
       WHERE department_id = $1 OR department_id = $2`,
      [handover.ben_a_id, handover.ben_b_id]
    );

    const usersToNotify = userResult.rows;
    console.log(usersToNotify);

    const signedUsers = [handover.signed_a_by, handover.signed_b_by];
    console.log(signedUsers);

    for (const user of usersToNotify) {
      if (signedUsers.includes(user.id)) continue;

      let roleInDocument = "";
      if (user.department_id === handover.ben_a_id) {
        roleInDocument = "bên A";
      } else if (user.department_id === handover.ben_b_id) {
        roleInDocument = "bên B";
      }

      const message = `Bạn được yêu cầu ký biên bản số ${handover.so_ky_hieu} với tư cách đại diện ${roleInDocument}.`;

      const notification = await db.query(
        `INSERT INTO notifications (user_id, handover_id, message, is_read)
         VALUES ($1, $2, $3, false)`,
        [user.id, handover.id, message]
      );
      console.log(notification);
    }

    return handover;
  } catch (error) {
    console.error("Chi tiết lỗi tạo biên bản:", error);
    throw new Error(`Lỗi tạo biên bản bàn giao: ${error.message}`);
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
