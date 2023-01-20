import { Request, Response } from "express";
import { VacationIService } from "../core/service.interface";

export class VacationHandler {

    private vacationService: VacationIService

    constructor(_vacationService: VacationIService) {
        this.vacationService = _vacationService
    }

    getAllVacations = async (req: Request, res: Response) => {
        try {
            const result = await this.vacationService.findAll()
            if (!result) throw new Error('not in db')
            res.status(200).json(result)
    
        } catch (err : any) {
            res.status(500).json(err.message)
        }
    
    }

    getVacations = async (req: Request, res: Response) => {
        let doctor_id = parseInt(req.params.id)
        try {
            const result = await this.vacationService.findVacations(doctor_id)
            if (!result) throw new Error('not in db')
            res.status(200).json(result)
    
        } catch (err : any) {
            res.status(500).json(err.message)
        }
    
    }

}