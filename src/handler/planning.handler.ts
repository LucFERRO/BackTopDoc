import { Request, Response } from "express";
import { PlanningIService } from "../core/service.interface";
import { Planning } from "../model/planning.model";
import { Workday } from "../model/workday.model";

export class PlanningHandler {

    private planningService: PlanningIService

    constructor(planningService: PlanningIService) {
        this.planningService = planningService
    }

    findAllOfGivenDoctor = async (req: Request, res: Response) => {
        let requestedId: number = parseInt(req.params.id)
        try {
            const result = await this.planningService.findAllOfGivenDoctor(requestedId);
            res.status(200).json(result)
        } catch (err) {
            res.status(500).json(err)
        }
    }

}