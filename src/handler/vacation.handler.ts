import { Request, Response } from "express";
import { IService } from "../core/service.interface";
import { VacationDTO } from "../dto/vacation.dto";

export class VacationHandler {

    private vacationService: IService<VacationDTO>

    constructor(_vacationService: IService<VacationDTO>) {
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

}