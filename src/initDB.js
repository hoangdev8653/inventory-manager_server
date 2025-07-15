import { db } from "./configs/connectDB.js";

const createTables = async () => {
  try {
    await db.query(`
      CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS departments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        address TEXT
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT CHECK(role IN ('admin', 'user')) DEFAULT 'user',
        department_id UUID,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (department_id) REFERENCES departments(id)
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS representatives (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name TEXT NOT NULL,
        position TEXT NOT NULL,
        phone_number TEXT,
        email TEXT,
        department_id UUID NOT NULL,
        FOREIGN KEY (department_id) REFERENCES departments(id)
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS handover_records (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        so_ky_hieu VARCHAR(50) UNIQUE NOT NULL,
        cancu TEXT,
        handover_date DATE NOT NULL,
        ben_a_id UUID NOT NULL REFERENCES departments(id),
        ben_b_id UUID NOT NULL REFERENCES departments(id),
        daidien_a VARCHAR(100),
        chucvu_a VARCHAR(100),
        daidien_b VARCHAR(100),
        chucvu_b VARCHAR(100),
        note TEXT,
        signed_a_at TIMESTAMP,
        signed_b_at TIMESTAMP,
        signed_a_by UUID REFERENCES users(id),
        signed_b_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS handover_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        handover_record_id UUID NOT NULL REFERENCES handover_records(id),
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
