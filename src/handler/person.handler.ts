import { Request, Response } from "express";
import { PersonRepository } from "../repository/person.repository";
import { PersonService } from "../service/person.service";

const personService = new PersonService(new PersonRepository);

async function getPersons(req: Request, res: Response) {
    try {
        const result = await personService.findById(1);
        if (result === null) return res.status(404).send()
        res.status(200).json(result)

    } catch(err) {
        res.status(500).json(err)
    }

}

const handler = {getPersons}

export default handler;