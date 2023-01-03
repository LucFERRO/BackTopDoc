import { Router } from "express";
import { swaggerRouter } from "./swagger"

import { authentificationController } from "../controller/authentification.controller";
import { patientController } from '../controller/patient.controller'
import { doctorController } from '../controller/doctor.controller'
import { personController } from "../controller/person.controller";

export const router = Router();

router.use('/docs', swaggerRouter);

router.use('/auth', authentificationController);
router.use('/patients', patientController);
router.use('/doctors', doctorController);

// A virer
router.use('/persons', personController);

router.use('*', (req, res) => {
    return res.status(404).json({ message: 'Ressource not found.' })
})