const { Router } = require('express')

import { appointementHandler } from "../core/initialisation";

export const appointementController = Router();

/**
 * @swagger
 * tags:
 *      name: Appointements
 *      description: Manage appointements
 */

/**
 * @openapi
 * /api/appointements?date={date}&doctor={doctor}&patient={patient}:
 *  get:
 *      tags: [Appointements]
 *      description: Get appointements of given person
 *      parameters:
 *       - name: date
 *         in: path
 *         required: true
 *         type: string
 *         default: 2000-01-01 14:30
  *       - name: doctor
 *         in: path
 *         required: false
 *         type: string
 *         default: 1000001
  *       - name: patient
 *         in: path
 *         required: false
 *         type: string
 *         default: 1000000
 *      responses:
 *        200:
 *          description: Get appointements of given person.
 */
appointementController.get('/', appointementHandler.findAllOfGivenPerson)

/**
 * @openapi
 * /api/appointements:
 *   post:
 *      tags: [Appointements]
 *      description: Create a new appointement.
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: { "appointement_date": "2023-01-19T10:30:00.000Z", "doctor_id": 1000001, "patient_id": 1000000, "appointement_duration_minutes": 30, "appointement_reason":"test create appointement" }
 *      responses:
 *        200:
 *          description: Create.
 */
appointementController.post('/', appointementHandler.create)

/**
 * @openapi
 * /api/appointements/test/{id}:
 *  get:
 *      tags: [Appointements]
 *      description: Get appointement slots of given appointement
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1
 *      responses:
 *        200:
 *          description: Get appointement slots of given appointement.
 */
// appointementController.get('/test/:id', appointementHandler.appointementDetail)