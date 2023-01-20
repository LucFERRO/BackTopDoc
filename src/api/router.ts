import { Router } from "express";
import { swaggerRouter } from "./swagger"

import { authentificationController } from "../controller/authentification.controller";
import { patientController } from '../controller/patient.controller'
import { doctorController } from '../controller/doctor.controller'
import { personController } from "../controller/person.controller";
import { planningController } from "../controller/planning.controller";
import { appointementController } from "../controller/appointement.controller";
import { vacationController } from "../controller/vacation.controller";

export const router = Router()

router.use('/docs', swaggerRouter)

router.use('/auth', authentificationController)
router.use('/patients', patientController)
router.use('/doctors', doctorController)
router.use('/plannings', planningController)
router.use('/appointements', appointementController)
router.use('/vacations', vacationController)
// A virer ?
router.use('/persons', personController)
//

router.use('*', (req, res) => {
    return res.status(404).json({ message: 'Ressource not found.' })
})