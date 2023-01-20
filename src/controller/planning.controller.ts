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
 * /api/plannings/{id}/slots:
 *  get:
 *      tags: [Plannings]
 *      description: Get appointement slots of given doctor
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1000001
 *      responses:
 *        200:
 *          description: Get time slots of given doctor.
 */
planningController.get('/:id/slots', planningHandler.availableSlots)

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
        "workday_start": "8:00",
        "workday_end": "17:00",
        "slot_duration_minutes": 15, "lunch_break_start": "12:00", "lunch_break_end":"13:00"},{"workday_number": 3,
        "workday_start": "8:00",
        "workday_end": "17:00",
        "slot_duration_minutes": 20, "lunch_break_start": "12:00", "lunch_break_end":"13:00"},{"workday_number": 5,
        "workday_start": "8:00",
        "workday_end": "17:00",
        "slot_duration_minutes": 25, "lunch_break_start": "12:00", "lunch_break_end":"13:00"}] }
 *      responses:
 *        200:
 *          description: Create.
 */
planningController.post('/',
    // , authenticateToken
    planningHandler.createPlanning)

/**
 * @openapi
 * /api/plannings/{id}/final:
 *  get:
 *      tags: [Plannings]
 *      description: Get availabilities of given doctor
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1000001
 *      responses:
 *        200:
 *          description: Get availabilities of given doctor.
 */
planningController.get('/:id/final', planningHandler.availabilities)