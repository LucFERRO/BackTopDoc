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


    createPlanning = async (req: Request, res: Response) => {

        const { planningData, workdaysData } = req.body

        try {
            const result = await this.planningService.create(planningData, workdaysData)
            return res.status(200).json(result)
        } catch (err) {
            return res.status(500).json({ message: 'Error in handler', err })
        }
    }

    updatePlanning = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)

        try {
            const result = await this.planningService.update(req.body, id)
            if (result) return res.status(200).json({ message: 'Planning successfully updated.' })
            return res.status(404).send()
        } catch (err) {
            return res.status(500).json({ message: 'Error in handler', err })
        }
    }

    deletePlanning = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)

        try {
            const result = await this.planningService.delete(id)
            if (result) return res.status(200).json({ message: 'Planning successfully deleted.' })
            return res.status(404).send()
        } catch (err) {
            return res.status(500).json({ message: 'Error in handler', err })
        }
    }

}