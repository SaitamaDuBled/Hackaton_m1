const express = require("express");
const ChatController = require("../controllers/Chat.controller");

const router = express.Router();

/**
 * @swagger
 * /Chats/all:
 *   get:
 *     summary: Obtenir toutes les Messages
 *     tags: [Chats]
 *     responses:
 *       200:
 *         description: Liste de toutes les Chatés récupérée avec succès.
 *       500:
 *         description: Erreur serveur.
 */
router.get("/all", ChatController.getAllChats);
//router.get("/all", subject.findAll);

/**
 * @swagger
 * /Chats/{id}:
 *   get:
 *     summary: Obtenir un message par ID
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du message
 *     responses:
 *       200:
 *         description: Chaté récupérée avec succès.
 *       404:
 *         description: Chaté non trouvée.
 */
router.get("/:id", ChatController.getChatById);

/**
 * @swagger
 * /Chats/add:
 *   post:
 *     summary: Ajouter un nouveaux message
 *     tags: [Chats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Salut les potos"
 *               zone:
 *                 type: integer
 *                 example: 3
 *               user_pseudo:
 *                 type: string
 *                 example: "kévin"
 *               date_time:
 *                  type: date
 *                  example: False
 *     responses:
 *       201:
 *         description: Message ajoutée avec succès.
 */
router.post("/add", ChatController.addChat);

/**
 * @swagger
 * /Chats/{id}:
 *   put:
 *     summary: Modifier jour un Message
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Salut les potos"
 *               zone:
 *                 type: integer
 *                 example: 3
 *               user_pseudo:
 *                 type: string
 *                 example: "kévin"
 *               is_admin:
 *                  type: boolean
 *                  example: False
 *               date_time:
 *                  type: date
 *                  example: False             
 *     responses:
 *       200:
 *         description: Message mise à jour avec succès.
 */
router.put("/:id", ChatController.updateChat);

/**
 * @swagger
 * /Chats/{id}:
 *   delete:
 *     summary: Supprimer un Message par ID
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du message
 *     responses:
 *       200:
 *         description: Méssage supprimée avec succès.
 */
router.delete("/:id", ChatController.deleteChat);

module.exports = (app) => {
    /**
     * @swagger
     * tags:
     *   name: Chats
     *   description: Gestion des Messages
     */
    app.use("/Chats", router);
};
