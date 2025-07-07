import { Pool } from "pg";

const db = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: "huyhoang123",
  port: 5432,
});

export async function ConnectDB() {
  try {
    await db.connect();
    console.log("✅ Kết nối PostgreSQL thành công!");
  } catch (err) {
    console.error("❌ Kết nối PostgreSQL thất bại:", err);
  }
}

export { db };

export default ConnectDB;
