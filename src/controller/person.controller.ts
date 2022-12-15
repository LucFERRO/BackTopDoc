const { Router } = require('express')

import { personHandler } from '../handler/person.handler'
import { authenticateToken } from '../middleware/authenticate'
import { authorization } from '../middleware/authorizations';

export const personController = Router();

/**
 * @swagger
 * tags:
 *      name: Persons
 *      description: Manage persons
 */

/**
 * @openapi
 * /api/persons/{id}:
 *   get:
 *      tags: [Persons]
 *      description: Get person by id.
 *      responses:
 *        200:
 *          description: id.
 */
 personController.get('/', personHandler.getPersons)

/**
 * @openapi
 * /api/persons/{id}:
 *   get:
 *      tags: [Persons]
 *      description: Get person by id.
 *      responses:
 *        200:
 *          description: id.
 */
personController.get('/:id', personHandler.getPersonById)

/**
 * @openapi
 * /api/persons/{id}:
 *  get:
 *      tags: [Persons]
 *      description: Get an template by id
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1
 *      responses:
 *        200:
 *          description: Get person of given id.
 */
// personController.get('/:id'
    // , authenticateToken
    // , handlerPerson.getPersonById)

/**
 * @openapi
 * /api/persons:
 *  post:
 *      tags: [Persons]
 *      description: Add an person
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: { "mail": "email@email.fr","password":"string","is_active": "true","is_pending": "false","zip_code": "string", "city" : "string", "address" : "string", "phone_number" : "string", "role": "string" }
 *      responses:
 *        200:
 *          description: Create a new person.
 */
// personController.post('/', handlerPerson.createPerson)

/**
 * @openapi
 * /api/persons/{id}:
 *  put:
 *      tags: [Persons]
 *      description: Update an person
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: { "mail": "email@email.fr","password":"string","is_active": "false", "is_pending": "true", "zip_code": "string", "city" : "string", "phone_number" : "string", "role" : "string" }
 *      responses:
 *        200:
 *          description: Update person of given id.
 */
// personController.put('/:id',
    // authenticateToken, authorization,
    // handlerPerson.updatePerson)

/**
 * @openapi
 * /api/persons/{id}:
 *  delete:
 *      tags: [Persons]
 *      description: Delete an person.
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *      responses:
 *        200:
 *          description: Delete an person.
 */
// personController.delete('/:id',
    // authenticateToken, authorization,
    // handlerPerson.deletePerson)