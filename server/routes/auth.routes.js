const express = require("express");
const authCtrl = require("../controllers/auth.controller.js");
const router = express.Router();

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     description: Inicia sesión con email y contraseña. Retorna un token JWT y los datos del usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: luis@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: tuContrasena123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     lastname:
 *                       type: string
 *                     email:
 *                       type: string
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: El correo y la contraseña no coinciden
 */
router.route("/auth/signin").post(authCtrl.signin);

/**
 * @swagger
 * /auth/signout:
 *   get:
 *     summary: Cerrar sesión
 *     tags: [Auth]
 *     description: Elimina la cookie del token JWT.
 *     responses:
 *       200:
 *         description: Sesión cerrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sesión cerrada
 */
router.route("/auth/signout").get(authCtrl.signout);

module.exports = router;
