// db.js
const sql = require("mssql");

const config = {
  user: "sa",
  password: "1095#reyes",
  server: "localhost", // o "127.0.0.1"
  database: "testdb",
  port: 1433,
  options: {
    encrypt: false, // true si usas Azure
    trustServerCertificate: true, // necesario para localhost
  },
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

module.exports = {
  sql,
  pool,
  poolConnect,
};
