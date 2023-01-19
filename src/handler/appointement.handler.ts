import { Request, Response } from "express";
import { AppointementIService } from "../core/service.interface";

export class AppointementHandler {

    private appointementService: AppointementIService

    constructor(service: AppointementIService) {
        this.appointementService = service
    }

    findAllOfGivenPerson = async (req: Request, res: Response) => {

        const date = req.query.date as string
        const doctor_id = parseInt(req.query.doctor as string)
        const patient_id = parseInt(req.query.patient as string)

        let data: any = { appointement_date: date }

        if (doctor_id) data = { ...data, doctor_id: doctor_id }
        if (patient_id) data = { ...data, patient_id: patient_id }


        try {
            const result = await this.appointementService.findAllOfGivenPerson(data)
            if (!result) throw new Error('not in db')
            res.status(200).json(result)

        } catch (err: any) {
            res.status(500).json(err.message)
        }

    }

    create = async (req: Request, res: Response) => {

        const { appointement_date, doctor_id, patient_id, appointement_duration_minutes, appointement_reason } = req.body

        const data = { appointement_date, doctor_id, patient_id, appointement_duration_minutes, appointement_reason }

        try {
            const result = await this.appointementService.create(data)
            if (!result) return res.status(409).send('409')
            res.status(200).json(result)
        } catch (err: any) {
            res.status(500).json(err.message)
        }
    }

}