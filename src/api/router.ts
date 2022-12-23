import { Router } from "express";
import { swaggerRouter } from "./swagger"

import { authentificationController } from "../controller/authentification.controller";
import { patientController } from '../controller/patient.controller'
import { doctorController } from '../controller/doctor.controller'

export const router = Router();

router.use('/docs', swaggerRouter);

router.use('/auth', authentificationController);
router.use('/patients', patientController);
router.use('/doctors', doctorController);

router.use(({ res: ApiException }: any) => {
    const message = 'Ressource not found.'
    return ApiException.status(404).json({ message })
})