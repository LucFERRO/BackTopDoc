const { Router } = require('express')

import { vacationHandler } from "../core/initialisation";

export const vacationController = Router();

/**
 * @swagger
 * tags:
 *      name: Vacations
 *      description: Manage vacations
 */

/**
 * @openapi
 * /api/vacations:
 *  get:
 *      tags: [Vacations]
 *      description: Get all vacations
 *      responses:
 *        200:
 *          description: Get person of given mail.
 */
vacationController.get('/', vacationHandler.getAllVacations)

/**
 * @openapi
 * /api/vacations/{id}:
 *  get:
 *      tags: [Vacations]
 *      description: Get vacations of given doctor
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1000001
 *      responses:
 *        200:
 *          description: Get vacations of given doctor.
 */
vacationController.get('/:id', vacationHandler.getVacations)