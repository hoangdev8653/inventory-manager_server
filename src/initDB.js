import { db } from "./configs/connectDB.js";

const createTables = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        image TEXT DEFAULT '',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS departments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        address TEXT
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS handover_records (
        id SERIAL PRIMARY KEY,
        so_ky_hieu VARCHAR(50) NOT NULL,
        cancu TEXT,
        date DATE NOT NULL,
        ben_a_id INTEGER REFERENCES departments(id),
        ben_b_id INTEGER REFERENCES departments(id),
        daidien_a VARCHAR(100),
        chucvu_a VARCHAR(100),
        daidien_b VARCHAR(100),
        chucvu_b VARCHAR(100),
        note TEXT,
        signed_a_at TIMESTAMP,
        signed_b_at TIMESTAMP,
        signed_a_by INTEGER REFERENCES users(id),
        signed_b_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
      `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS handover_items (
        id SERIAL PRIMARY KEY,
        handover_record_id INTEGER REFERENCES handover_records(id),
        stt INTEGER,
        ten_thiet_bi VARCHAR(255),
        so_luong INTEGER,
        so_serial VARCHAR(100),
        ghi_chu TEXT
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
