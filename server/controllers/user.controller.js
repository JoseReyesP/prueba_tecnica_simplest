const crypto = require("crypto");
const { poolPromise, sql } = require("../db/sqlserver");

// Crear nuevo usuario
const create = async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;

    // Validaciones básicas
    if (!name || !lastname || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    // Verificar si el email ya existe
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM Users WHERE email = @email");

    if (result.recordset.length > 0) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    // Encriptar contraseña
    const salt = makeSalt();
    const hashed_password = encryptPassword(password, salt);

    await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("lastname", sql.NVarChar, lastname)
      .input("email", sql.NVarChar, email)
      .input("hashed_password", sql.NVarChar, hashed_password)
      .input("salt", sql.NVarChar, salt)
      .query(
        "INSERT INTO Users (name, lastname, email, hashed_password, salt) VALUES (@name, @lastname, @email, @hashed_password, @salt)"
      );

    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (err) {
    console.error("Error al crear usuario:", err);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

// Listar todos los usuarios
const list = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT id, name, lastname, email FROM Users");

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error("Error al listar usuarios:", err);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

// Obtener usuario by ID
const userByID = async (req, res, next, id) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Users WHERE id = @id");

    const user = result.recordset[0];

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    req.profile = user; // adjuntamos el usuario a req.profile
    next();
  } catch (err) {
    return res.status(500).json({ error: "Error al recuperar usuario" });
  }
};

// Obtener usuario por ID
const read = async (req, res) => {
  try {
    const { userId } = req.params;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, userId)
      .query("SELECT id, name, lastname, email FROM Users WHERE id = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(result.recordset[0]);
  } catch (err) {
    console.error("Error al obtener usuario:", err);
    res.status(500).json({ error: "Error al obtener usuario" });
  }
};

// Actualizar usuario
const update = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, lastname, email } = req.body;

    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, userId)
      .input("name", sql.NVarChar, name)
      .input("lastname", sql.NVarChar, lastname)
      .input("email", sql.NVarChar, email)
      .query(
        "UPDATE Users SET name = @name, lastname = @lastname, email = @email WHERE id = @id"
      );

    res.status(200).json({ message: "Usuario actualizado correctamente" });
  } catch (err) {
    console.error("Error al actualizar usuario:", err);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

// Eliminar usuario
const remove = async (req, res) => {
  try {
    const { userId } = req.params;

    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, userId)
      .query("DELETE FROM Users WHERE id = @id");

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};

// Helpers para contraseña
const makeSalt = () => {
  return Math.round(new Date().valueOf() * Math.random()) + "";
};

const encryptPassword = (password, salt) => {
  if (!password) return "";
  try {
    return crypto.createHmac("sha1", salt).update(password).digest("hex");
  } catch (err) {
    return err;
  }
};

module.exports = {
  userByID,
  create,
  list,
  read,
  update,
  remove,
};
