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