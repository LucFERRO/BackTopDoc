import { Request, Response } from "express";
import { sequelize } from "../database/sequelize";
import { IService } from "../core/service.interface";
import { PatientDTO } from "../dto/patient.dto";
const bcrypt = require("bcrypt");

export class PatientHandler {

    private patientService: IService<PatientDTO>

    constructor(service: IService<PatientDTO>) {
        this.patientService = service
    }

    getPatients = async (req: Request, res: Response) => {
        try {
            const result = await this.patientService.findAll();
            res.status(200).json(result)

        } catch (err) {
            res.status(500).json(err)
        }

    }

    getPatientById = async (req: Request, res: Response) => {
        let requestedId: number = parseInt(req.params.id)
        try {
            const result = await this.patientService.findById(requestedId);
            if (result === null) return res.status(404).json({ message: "Requested patient_id does not exist." })
            res.status(200).json(result)
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'ERROR 500', err });
        }
    };

    createPatient = async (req: Request, res: Response) => {
        try {
            if (!req.body.password) return res.status(400).json({
                message: "Password required.",
            });
            const result = await this.patientService.create(req.body)
            return res.status(200).json(result)
        } catch (err) {
            return res.status(500).json({ message: 'Error in handler', err })
        }
    }

    updatePatient = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)

        try {
            const result = await this.patientService.update(req.body, id)
            if (result) return res.status(200).json({message: 'Patient successfully updated.'})
            return res.status(404).send()
        } catch (err) {
            return res.status(500).json({ message: 'Error in handler', err })
        }
    }

    deletePatient = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)

        try {
            const result = await this.patientService.delete(id)
            if (result) return res.status(200).json({message: 'Patient successfully deleted.'})
            return res.status(404).send()
        } catch (err) {
            return res.status(500).json({ message: 'Error in handler', err })
        }
    }

}