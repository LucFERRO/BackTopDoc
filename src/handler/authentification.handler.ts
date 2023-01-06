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
            const { mail, password } = req.body
            const result = await this.authentificationService.login({ mail, password })

            if (!result) {
                return res.status(404).json({ message: 'Mail not in database.' });
            }
            res.status(200).json(result)

        } catch (err: any) {
            res.status(401).json(err.message)
        }

    };

    refreshToken = async (req: Request, res: Response) => {

        const refreshToken = req.body.token
        if (refreshToken == null) return res.sendStatus(400)

        try {
            const result = await this.authentificationService.refreshToken(req.body);
            res.status(200).json(result)

        } catch (err) {
            if (err instanceof Error) {
                res.status(403).json(err.message)
            }

            console.log('Unexpected error in handler', err);
        }

    };

}