import dotenv from "dotenv";
import app from "./app.js";
import pool from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    const connection = await pool.getConnection();

    console.log("MySQL Connected Successfully");

    connection.release();
  } catch (error) {
    console.log("Database connection failed");
    console.log(error);
  }
});
