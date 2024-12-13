import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create a new pool instance with connection details
const pool = new Pool({
  host: process.env.DB_HOST || "db", // Use 'db' as the hostname for Docker
  port: parseInt(process.env.DB_PORT || "5432", 10), // Parse port as an integer
  user: process.env.DB_USER || "user", // Default user
  password: process.env.DB_PASSWORD || "password", // Default password
  database: process.env.DB_NAME || "db", // Default database name
});

// Test connection
pool
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit process if connection fails
  });

export default pool;
