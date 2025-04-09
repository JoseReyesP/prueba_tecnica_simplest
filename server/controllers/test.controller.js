// controllers/test.controller.js
const { poolPromise } = require("../db/sqlserver");

const testConnection = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM usuarios");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error al consultar la base de datos:", err);
    res.status(500).send("Error en la base de datos");
  }
};

module.exports = { testConnection };
