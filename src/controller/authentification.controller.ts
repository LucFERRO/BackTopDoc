const { Router } = require('express')

import { authentificationHandler } from "../core/initialisation";

export const authentificationController = Router();

/**
 * @swagger
 * tags:
 *      name: Authentification
 *      description: Manage authentification
 */

/**
 * @openapi
 * /api/auth/login:
 *  post:
 *      tags: [Authentification]
 *      description: Login
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: {"mail": "luc@f.fr", "password": "1234"}
 *      responses:
 *        200:
 *          description: Login. Returns tokens if successful login.
 */
authentificationController.post('/login', authentificationHandler.login)

/**
 * @openapi
 * /api/auth/refresh:
 *  post:
 *      tags: [Authentification]
 *      description: Token
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsYXN0bmFtZSI6IkZFUlJPIiwiZmlyc3RuYW1lIjoiTHVjIiwiaWF0IjoxNjcxODA1MTY1LCJleHAiOjE2NzQzOTcxNjV9.3jMVk9CrZqwefFQqllf7Fc5MNwGeifuBzahEIA2C2es"}
 *      responses:
 *        200:
 *          description: Token. Refresh tokens.
 */
authentificationController.post('/refresh', authentificationHandler.refreshToken)