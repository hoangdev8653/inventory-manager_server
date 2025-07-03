import { db } from "./configs/connectDB.js";

const createTables = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Tạo bảng thành công!");
  } catch (error) {
    console.error("❌ Lỗi tạo bảng:", error);
  } finally {
    await db.end();
  }
};

createTables();
