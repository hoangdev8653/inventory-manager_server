import { db } from "../configs/connectDB.js";

const getAllNotification = async () => {
  try {
    const result = await db.query("SELECT * FROM notifications");
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getNotificationById = async (id) => {
  try {
    const result = await db.query("SELECT * FROM notifications WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getNotificationByUser = async (userId) => {
  try {
    const notification = await db.query(
      "SELECT * FROM notifications WHERE user_id = $1",
      [userId]
    );
    if (notification.rows.length < 0) {
      throw new Error("Không tìm thấy ID");
    }
    return notification.rows[0];
  } catch (error) {
    throw error;
  }
};

const createNotification = async ({ user_id, handover_id, message }) => {
  try {
    const result = await db.query(
      "INSERT INTO notifications (user_id, handover_id, message) VALUES ($1, $2, $3) RETURNING *",
      [user_id, handover_id, message]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const updateStatusNotification = async (id) => {
  try {
    const result = await db.query(
      "UPDATE notifications SET is_read = true WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      throw new Error("Không tìm thấy ID");
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteNotification = async (id) => {
  try {
    const result = await db.query(
      "DELETE FROM notifications WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      throw new Error("Không tìm thấy thông báo");
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const notificationService = {
  getAllNotification,
  getNotificationById,
  getNotificationByUser,
  createNotification,
  updateStatusNotification,
  deleteNotification,
};
