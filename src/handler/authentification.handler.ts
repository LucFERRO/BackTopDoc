import { Request, Response } from "express";
import { AuthIService } from "../core/service.interface";
import { AuthentificationDTO } from "../dto/authentification.dto";
import { TokenDTO } from "../dto/token.dto";
import { Person } from "../model/person.model"
import { Token } from "../model/token.model"

export class AuthentificationHandler {

    private authentificationService: AuthIService<AuthentificationDTO, TokenDTO>

    constructor(service: AuthIService<AuthentificationDTO, TokenDTO>) {
        this.authentificationService = service
    }

    login = async (req: Request, res: Response) => {

        try {

            const person = await Person.findOne({ where: { mail: req.body.mail } })

            if (person == null) {
                return res.status(400).json({ message: 'Mail not in database.' });
            }

        } catch (error) {

            throw error

        }

    };

    refreshToken = async (req: Request, res: Response) => {

        const refreshToken = req.body.token
        if (refreshToken == null) return res.sendStatus(400)

        try {
            const result = await this.authentificationService.refreshToken({ token: refreshToken });

            // if (result === null) return res.status(403).json('Unauthorized')
            res.status(200).json(result)

        } catch (err) {
            if (err instanceof Error) {
                console.log('handler', err)
                res.status(403).json(err.message)
            }

            console.log('Unexpected error in handler', err);
        }

    };

}