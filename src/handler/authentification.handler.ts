import { Request, Response } from "express";
import { AuthIService } from "../core/service.interface";
import { AuthentificationDTO } from "../dto/authentification.dto";
import { TokenDTO } from "../dto/token.dto";
import { Person } from "../model/person.model"
import { Token } from "../model/token.model"

export class AuthentificationHandler {

    private authentificationService : AuthIService<AuthentificationDTO,TokenDTO>

    constructor(service : AuthIService<AuthentificationDTO,TokenDTO>) {
        this.authentificationService = service
    }

    login = async (req: Request, res: Response) => {

        try {
            
            const person = await Person.findOne({ where: { mail: req.body.mail } })
    
            if (person == null) {
                return res.status(400).json({ message: 'Mail not in database.' });
            }
        
            if (!await bcrypt.compare(req.body.password, person.password)) {
                return res.status(401).json({ message: 'Wrong credentials.' });
            } else {
                const accessToken = jwt.sign(
                    { id: person.person_id, name: person.mail },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "3600s" }
                );
                const refreshToken = jwt.sign(
                    { id: person.person_id, name: person.mail },
                    process.env.REFRESH_TOKEN_SECRET
                );
        
                // const token = await Token.findOne({ where: { person_id: person.person_id } })
        
                // if (token !== null) Token.destroy({ where: { person_id: person.person_id } })
        
                // Token.create({
                //     person_id: person.person_id,
                //     token: token
                // })
        
                return res.status(200).json({ accessToken: accessToken, token: token })


            }

        } catch (error) {
            
            throw error

        }

    };
    
    refreshToken = async (req: Request, res: Response) => {
    
        const refreshToken = req.body.token
        if (refreshToken == null) return res.sendStatus(400)

        try {
            const result = await this.authentificationService.refreshToken({token: refreshToken});
            
            if (result === null) return res.status(403).json()
            res.status(200).json(result)

        } catch (err) {
            console.log('error 403 or 500 in handler')
            res.status(500).json(err)
        }

    };
    
}