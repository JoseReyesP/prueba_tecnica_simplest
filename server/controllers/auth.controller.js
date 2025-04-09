const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const config = require("../../config/config.js");
const crypto = require("crypto");
const { sql, poolPromise } = require("../db/sqlserver");

// Iniciar sesión
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM Users WHERE email = @email");

    const user = result.recordset[0];

    if (!user) return res.status(401).json({ error: "Usuario no encontrado" });

    // Verifica contraseña
    const hashed_password = encryptPassword(password, user.salt);
    if (hashed_password !== user.hashed_password) {
      return res
        .status(401)
        .json({ error: "El correo y la contraseña no coinciden" });
    }

    const token = jwt.sign({ id: user.id }, config.jwtSecret);
    res.cookie("t", token, { expire: new Date() + 9999 });

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(401).json({ error: "No se pudo iniciar sesión" });
  }
};

// Cerrar sesión
const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({ message: "Sesión cerrada" });
};

// Middleware para proteger rutas
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  userProperty: "auth",
  algorithms: ["HS256"],
  getToken: function fromHeaderOrQuerystring(req) {
    console.log("Authorization header:", req.headers.authorization);
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    }
    return null;
  },
});

// Verificar autorización del usuario
const hasAuthorization = async (req, res, next) => {
  console.log("req.profile:", req.profile);
  console.log("req.auth:", req.auth);
  const authorized = req.profile && req.auth && req.profile.id === req.auth.id;
  if (!authorized) {
    return res.status(403).json({ error: "No estás autorizado" });
  }
  next();
};

// Función auxiliar
const encryptPassword = (password, salt) => {
  if (!password) return "";
  try {
    return crypto.createHmac("sha1", salt).update(password).digest("hex");
  } catch (err) {
    return err;
  }
};

module.exports = {
  signin,
  signout,
  requireSignin,
  hasAuthorization,
};
