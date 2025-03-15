const postgres = require('postgres')

  
const connection = async () => {
  try {
    const connectionString = process.env.DATABASE_URL
    const sql = postgres(connectionString)

    console.log("Connected to PostgreSQL database"); // connected to db
    return sql;

  } catch (err) {
    console.error("Error connecting to PostgreSQL database :", err);
    return null;
  }
};

module.exports = connection;