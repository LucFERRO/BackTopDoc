import { Router } from "express";
import handler from "../handler/person.handler";
import { swaggerRouter } from "./swagger"

import { personRouter } from '../APPECLATEE/persons/router'

1
export const router = Router();

router.use('/docs', swaggerRouter);
router.get('/person', handler.getPersons);

// app.get("/", (req: Request, res: Response) => {
//     res.send("SWAGGER : /api/docs")
// })