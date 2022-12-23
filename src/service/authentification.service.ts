import { AuthentificationDTO } from "../dto/authentification.dto";
import { AuthIRepository, IRepository } from "../core/respository.interface";
import { AuthIService } from "../core/service.interface";
import { Person } from "../model/person.model";
import { PersonDTO, PersonDTOFull } from "../dto/person.dto";
import { Token } from "../model/token.model";
import { TokenDTO } from "../dto/token.dto";
import { Payload } from "../dto/token.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export class AuthentificationService implements AuthIService<AuthentificationDTO, TokenDTO> {

    private authentificationRepository: AuthIRepository<AuthentificationDTO>;
    private tokenRepository: IRepository<TokenDTO>

    constructor(_authentificationRepository: AuthIRepository<AuthentificationDTO>, _tokenRepository: IRepository<TokenDTO>) {
        this.authentificationRepository = _authentificationRepository;
        this.tokenRepository = _tokenRepository;
    }
    async login(t: AuthentificationDTO): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async refreshToken(token: TokenDTO): Promise<TokenDTO> {
        // Generate new refresh tokens
        // const test = jwt.sign({lastname: 'FERRO', firstname: 'Luc'}, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "30d" })
        // console.log(test)

        try {
            const tokens = await this.tokenRepository.findAll()

            let refreshTokens: any = []

            tokens.map((token: any) => {
                refreshTokens.push(token.token)
            })

            if (!refreshTokens.includes(token.token)) throw new Error

            const decoded = jwt.verify(token.token, process.env.REFRESH_TOKEN_SECRET!) as Payload

            const accessToken = jwt.sign({ lastname: decoded.lastname, firstname: decoded.firstname }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "3600s" })

            return { token: accessToken }

        } catch (error) {
            throw error
        }

    }

}