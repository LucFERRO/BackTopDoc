import { Request, Response } from "express";
import { PersonIService } from "../core/service.interface";

export class PersonHandler {

    private personService: PersonIService

    constructor(service: PersonIService) {
        this.personService = service
    }

    getPersonByMail = async (req: Request, res: Response) => {
        const mailFilter = req.query.mail as string
    
        if (!mailFilter) res.status(400).json('not found')
    
        try {
            const result = await this.personService.findByMail(mailFilter)
            if (!result) throw new Error('not in db')
            res.status(200).json(result)
    
        } catch (err : any) {
            res.status(500).json(err.message)
        }
    
    }

}