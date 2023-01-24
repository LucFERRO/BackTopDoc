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
 *         required: false
 *         type: string
 *         default: 2023-01-25 9:30
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
appointementController.get('/', appointementHandler.findGlobal)

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
 * /api/appointements/doctor/{id}:
 *  get:
 *      tags: [Appointements]
 *      description: Get appointement of given doctor
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1000001
 *      responses:
 *        200:
 *          description: Get appointements of given doctor.
 */
appointementController.get('/doctor/:id', appointementHandler.doctorAppointementList)

/**
 * @openapi
 * /api/appointements/patient/{id}:
 *  get:
 *      tags: [Appointements]
 *      description: Get appointement of given patient
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1000003
 *      responses:
 *        200:
 *          description: Get appointements of given patient.
 */
appointementController.get('/patient/:id', appointementHandler.patientAppointementList)