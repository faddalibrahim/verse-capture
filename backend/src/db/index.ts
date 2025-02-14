import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: 5432,
});

// Test connection
pool.query("SELECT NOW()", (err) => {
  if (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
  console.log("Connected to PostgreSQL");
});
