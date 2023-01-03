const { Router } = require('express')

import { authenticateToken } from '../middleware/authenticate'
import { authorization } from '../middleware/authorizations';
import { patientHandler } from "../core/initialisation";

export const patientController = Router();

/**
 * @swagger
 * tags:
 *      name: Patients
 *      description: Manage patients
 */

/**
 * @openapi
 * /api/patients:
 *   get:
 *      tags: [Patients]
 *      description: Get list of patients
 *      responses:
 *        200:
 *          description: Get all.
 */
patientController.get('/', patientHandler.getPatients)

/**
 * @openapi
 * /api/patients/{id}:
 *   get:
 *      tags: [Patients]
 *      description: Get patient by id.
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1000000
 *      responses:
 *        200:
 *          description: Get by id.
 */
patientController.get('/:id',
    // , authenticateToken
    patientHandler.getPatientById)

/**
 * @openapi
 * /api/patients:
 *   post:
 *      tags: [Patients]
 *      description: Create a new patient.
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: { "secu_number":"197059740706475","lastname": "lastname", "firstname": "firstname", "mail": "email@email.fr", "password": "string","birthdate": "01-01-2000", "phone_number" : "0123456789", "description": "description","avatar": "avatar" }
 *      responses:
 *        200:
 *          description: Create.
 */
patientController.post('/',
    // , authenticateToken
    patientHandler.createPatient)

/**
 * @openapi
 * /api/patients/{id}:
 *  put:
 *      tags: [Patients]
 *      description: Update a patient.
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1000000
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: { "secu_number":"197059740706475", "lastname": "lastname", "firstname": "firstname", "mail": "email@email.fr", "password": "string","birthdate": "01-01-2000", "phone_number" : "0123456789", "description": "description","avatar": "avatar" }
 *      responses:
 *        200:
 *          description: Update.
 */
 patientController.put('/:id',
 // , authenticateToken
 patientHandler.updatePatient)

/**
 * @openapi
 * /api/patients/{id}:
 *  delete:
 *      tags: [Patients]
 *      description: Delete a patient
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1000000
 *      responses:
 *        200:
 *          description: Delete.
 */
patientController.delete('/:id',
    // , authenticateToken
    patientHandler.deletePatient)






// const updatePatient = async (req: Request, res: Response) => {
//     const id = req.params.id;

//     const { name, siret, mail, city, zip_code, address, avatar, description, availabilities, phone_number, is_active, is_pending, role } = req.body;

//     if (!siretValidate.isSIRET(siret)) return res.status(400).json({ message: 'SIRET invalide' })

//     let patientInfo = { name, siret, availabilities };
//     let patientInfo = { mail, city, zip_code, address, avatar, phone_number, is_active, is_pending, role };

//     if (description) Object.assign(patientInfo, { description: description })
//     if (availabilities) Object.assign(patientInfo, { availabilities: availabilities })

//     if (req.body.password) {
//         let hashedPassword = await bcrypt.hash(req.body.password, 10);
//         patientInfo = Object.assign(patientInfo, { password: hashedPassword });
//     }

//     try {
//         await sequelize.transaction(async (t: any) => {
//             const updatedPatient: any = await Patient.update(
//                 patientInfo,
//                 {
//                     where: { patient_id: id },
//                     returning: true,
//                     plain: true,
//                     transaction: t,
//                 }
//             );

//             await Patient.update(patientInfo, {
//                 where: { patient_id: updatedPatient[1].patient_id },
//                 returning: true,
//                 plain: true,
//                 transaction: t,
//             });
//             return res.status(200).json(updatedPatient[1]);
//         });
//     } catch (error: any) {
//         let message = 'ERROR 500'
//         if (error.errors[0].path == 'mail') message = 'Email invalide'
//         if (error.errors[0].path == 'phone_number') message = 'Numéro de téléphone invalide'
//         if (error.errors[0].path == 'zip_code') message = 'Code postal invalide'
//         return res.status(500).json({ message, error });
//     }
// }

// const deletePatient = (req: Request, res: Response) => {
//     Patient.findByPk(req.params.id)
//         .then((patient: patientTypes) => {
//             if (patient === null) {
//                 const message = "Aucun recruteur trouvé.";
//                 return res.status(404).json({ message: message });
//             }

//             const deletedPatient = patient;
//             return Patient.destroy({
//                 where: { patient_id: patient.patient_id },
//             }).then(() => {
//                 const message = `Le recruteur ${deletedPatient.patient_id} a bien été supprimé.`;
//                 res.json({ message, data: deletedPatient });
//             });
//         })
//         .catch((error: ApiException) => {
//             res.status(500).json({ message: 'ERROR 500', error });
//         });
// }