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

/**
 * @openapi
 * /api/plannings:
 *   post:
 *      tags: [Plannings]
 *      description: Create a new planning.
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: { "planningData": {"planning_name": "testCreate",
    "planning_start": "1999-12-31T23:00:00.000Z",
    "planning_end": "2099-12-31T23:00:00.000Z",
    "doctor_id": 1000001}, "workdaysData": [{"workday_number": 1,
        "workday_start": "1970-01-01T00:00:00.800Z",
        "workday_end": "1970-01-01T00:00:01.700Z",
        "slot_duration_minutes": 15},{"workday_number": 3,
        "workday_start": "1970-01-01T00:00:00.800Z",
        "workday_end": "1970-01-01T00:00:01.700Z",
        "slot_duration_minutes": 20},{"workday_number": 5,
        "workday_start": "1970-01-01T00:00:00.800Z",
        "workday_end": "1970-01-01T00:00:01.700Z",
        "slot_duration_minutes": 25}] }
 *      responses:
 *        200:
 *          description: Create.
 */
planningController.post('/',
    // , authenticateToken
    planningHandler.createPlanning)