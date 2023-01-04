import { AuthentificationDTO } from "../dto/authentification.dto";
import { IRepositoryToken, IRepositoryPerson } from "../core/respository.interface";
import { AuthIService } from "../core/service.interface";
import { Person } from "../model/person.model";
import { PersonDTOFull } from "../dto/person.dto";
import { Token } from "../model/token.model";
import { TokenDTO } from "../dto/token.dto";
import { Payload } from "../dto/token.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export class AuthentificationService implements AuthIService<AuthentificationDTO, TokenDTO> {

    private tokenRepository: IRepositoryToken<Partial<TokenDTO>>
    private personRepository: IRepositoryPerson<Partial<PersonDTOFull>>

    constructor(_tokenRepository: IRepositoryToken<Partial<TokenDTO>>, _personRepository: IRepositoryPerson<Partial<PersonDTOFull>>) {
        this.tokenRepository = _tokenRepository;
        this.personRepository = _personRepository;
    }
    async login(credentials: AuthentificationDTO): Promise<any> {

        try {
            const user = await this.personRepository.findByMail(credentials.mail)

            // TODO 404
            if (!user) return 

            if (!await bcrypt.compare(credentials.password, user.password!)) {
                throw new Error('Invalid credentials')
            }
            const accessToken = jwt.sign(
                {
                    id: user.person_id,
                    lastname: user.lastname,
                    firstname: user.firstname
                },
                process.env.ACCESS_TOKEN_SECRET!,
                { expiresIn: "3600s" }
            );

            const refreshToken = jwt.sign(
                {
                    id: user.person_id,
                    lastname: user.lastname,
                    firstname: user.firstname
                },
                process.env.REFRESH_TOKEN_SECRET!
            );

            
            this.tokenRepository.create({
                person_id: user.person_id!,
                token: refreshToken
            },
            user.person_id!)

            return { refreshToken, accessToken }
            // res.status(200).json(DTO_login({ accessToken: accessToken, refreshToken: refreshToken, user: user }))

        } catch (err) {
            throw err
        }
    }

    async refreshToken(token: TokenDTO): Promise<Partial<TokenDTO>> {
        // Generate new refresh tokens
        // const test = jwt.sign({ id: 1000002, lastname: 'SinTo', firstname: 'Remy' }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "30d" })
        // console.log(test)

        try {
            const tokens = await this.tokenRepository.findAll()

            let refreshTokens: any = []

            tokens.map((token: any) => {
                refreshTokens.push(token.token)
            })

            if (!refreshTokens.includes(token.token)) throw new Error('Forbidden')

            const decoded = jwt.verify(token.token!, process.env.REFRESH_TOKEN_SECRET!) as Payload

            const accessToken = jwt.sign(
                {
                    id: decoded.person_id,
                    lastname: decoded.lastname,
                    firstname: decoded.firstname
                },
                process.env.ACCESS_TOKEN_SECRET!,
                { expiresIn: "3600s" }
            )

            return { person_id: parseInt(decoded.person_id), token: accessToken }

        } catch (err) {
            console.log('service', err)
            throw err
        }

    }

}