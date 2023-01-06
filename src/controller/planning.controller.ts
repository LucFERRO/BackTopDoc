const { Router } = require('express')

import { planningHandler } from "../core/initialisation";

export const planningController = Router();

/**
 * @swagger
 * tags:
 *      name: Plannings
 *      description: Manage plannings
 */

/**
 * @openapi
 * /api/plannings/{id}:
 *  get:
 *      tags: [Plannings]
 *      description: Get plannings of given doctor
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1000001
 *      responses:
 *        200:
 *          description: Get plannings of given doctor.
 */
planningController.get('/:id', planningHandler.findAllOfGivenDoctor)