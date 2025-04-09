const express = require("express");
const userCtrl = require("../controllers/user.controller");
const authCtrl = require("../controllers/auth.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints relacionados con los usuarios
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.route("/users").get(userCtrl.list);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.route("/users/:userId").get(userCtrl.read);

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
router
  .route("/users/:userId")
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update);

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado
 */
router
  .route("/users/:userId")
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 */
router.route("/users").post(userCtrl.create);

// Middleware para manejar userId param
router.param("userId", userCtrl.userByID);

module.exports = router;
