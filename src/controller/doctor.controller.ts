const { Router } = require('express')

import { authenticateToken } from '../middleware/authenticate'
import { authorization } from '../middleware/authorizations';
import { doctorHandler } from "../core/initialisation";

export const doctorController = Router();

/**
 * @swagger
 * tags:
 *      name: Doctors
 *      description: Manage doctors
 */

/**
 * @openapi
 * /api/doctors:
 *   get:
 *      tags: [Doctors]
 *      description: Get list of doctors
 *      responses:
 *        200:
 *          description: Get all.
 */
doctorController.get('/', doctorHandler.getDoctors)

/**
 * @openapi
 * /api/doctors/{id}:
 *   get:
 *      tags: [Doctors]
 *      description: Get doctor by id.
 *      responses:
 *        200:
 *          description: Get by id.
 */
doctorController.get('/:id',
    // , authenticateToken
    doctorHandler.getDoctorById)

/**
 * @openapi
 * /api/doctors:
 *   post:
 *      tags: [Doctors]
 *      description: Create a new doctor.
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: { "activity":"activity","lastname": "lastname", "firstname": "firstname", "mail": "email@email.fr", "password": "string","birthdate": "01-01-2000", "phone_number" : "0123456789", "description": "description","avatar": "avatar" }
 *      responses:
 *        200:
 *          description: Create.
 */
doctorController.post('/',
    // , authenticateToken
    doctorHandler.createDoctor)










// const updateDoctor = async (req: Request, res: Response) => {
//     const id = req.params.id;

//     const { name, siret, mail, city, zip_code, address, avatar, description, availabilities, phone_number, is_active, is_pending, role } = req.body;

//     if (!siretValidate.isSIRET(siret)) return res.status(400).json({ message: 'SIRET invalide' })

//     let doctorInfo = { name, siret, availabilities };
//     let doctorInfo = { mail, city, zip_code, address, avatar, phone_number, is_active, is_pending, role };

//     if (description) Object.assign(doctorInfo, { description: description })
//     if (availabilities) Object.assign(doctorInfo, { availabilities: availabilities })

//     if (req.body.password) {
//         let hashedPassword = await bcrypt.hash(req.body.password, 10);
//         doctorInfo = Object.assign(doctorInfo, { password: hashedPassword });
//     }

//     try {
//         await sequelize.transaction(async (t: any) => {
//             const updatedDoctor: any = await Doctor.update(
//                 doctorInfo,
//                 {
//                     where: { doctor_id: id },
//                     returning: true,
//                     plain: true,
//                     transaction: t,
//                 }
//             );

//             await Doctor.update(doctorInfo, {
//                 where: { doctor_id: updatedDoctor[1].doctor_id },
//                 returning: true,
//                 plain: true,
//                 transaction: t,
//             });
//             return res.status(200).json(updatedDoctor[1]);
//         });
//     } catch (error: any) {
//         let message = 'ERROR 500'
//         if (error.errors[0].path == 'mail') message = 'Email invalide'
//         if (error.errors[0].path == 'phone_number') message = 'Numéro de téléphone invalide'
//         if (error.errors[0].path == 'zip_code') message = 'Code postal invalide'
//         return res.status(500).json({ message, error });
//     }
// }

// const deleteDoctor = (req: Request, res: Response) => {
//     Doctor.findByPk(req.params.id)
//         .then((doctor: doctorTypes) => {
//             if (doctor === null) {
//                 const message = "Aucun recruteur trouvé.";
//                 return res.status(404).json({ message: message });
//             }

//             const deletedDoctor = doctor;
//             return Doctor.destroy({
//                 where: { doctor_id: doctor.doctor_id },
//             }).then(() => {
//                 const message = `Le recruteur ${deletedDoctor.doctor_id} a bien été supprimé.`;
//                 res.json({ message, data: deletedDoctor });
//             });
//         })
//         .catch((error: ApiException) => {
//             res.status(500).json({ message: 'ERROR 500', error });
//         });
// }