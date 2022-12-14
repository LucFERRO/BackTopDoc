import { Router } from "express";
import { swaggerRouter } from "./swagger"

import { personController } from '../controller/person.controller'

export const router = Router();

router.use('/docs', swaggerRouter);

router.use('/persons', personController);

router.use(({ res: ApiException }: any) => {
    const message = 'Ressource not found.'
    return ApiException.status(404).json({ message })
})