import { Pool } from "pg";

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "inventory_manager",
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
