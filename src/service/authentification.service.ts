import { AuthentificationDTO } from "../dto/authentification.dto";
import { IRepository } from "../core/respository.interface";
import { AuthIService } from "../core/service.interface";
import { Person } from "../model/person.model";
import { PersonDTO, PersonDTOFull } from "../dto/person.dto";
import { Token } from "../model/token.model";
import { TokenDTO } from "../dto/token.dto";
import { Payload } from "../dto/token.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export class AuthentificationService implements AuthIService<AuthentificationDTO, TokenDTO> {

    private tokenRepository: IRepository<TokenDTO>

    constructor(_tokenRepository: IRepository<TokenDTO>) {
        this.tokenRepository = _tokenRepository;
    }
    async login(t: AuthentificationDTO): Promise<any> {

        try {

            

            // const user = await User.findOne({ where: { mail: req.body.mail } })

            // let message: string = "";
        
            // if (user == null) {
            //     message = "Aucun utilisateur ne correspond à ce mail.";
            //     return res.status(400).json({ userFound: false, message: message });
            // }
        
            // if (!await bcrypt.compare(req.body.password, user.password)) {
            //     message = "Identifiants incorrects.";
            //     return res.status(401).json({ successfullLogin: false, message: message });
            // } else {
            //     const accessToken = jwt.sign(
            //         { id: user.user_id, name: user.mail, role: user.role },
            //         process.env.ACCESS_TOKEN_SECRET,
            //         { expiresIn: "3600s" }
            //     );
            //     const refreshToken = jwt.sign(
            //         { id: user.user_id, name: user.mail, role: user.role },
            //         process.env.REFRESH_TOKEN_SECRET
            //     );
        
            //     const token = await Token.findOne({ where: { user_id: user.user_id } })
        
            //     if (token !== null) Token.destroy({ where: { user_id: user.user_id } })
        
            //     Token.create({
            //         user_id: user.user_id,
            //         refreshToken: refreshToken
            //     })
        
            //     return res.status(200).json(DTO_login({ accessToken: accessToken, refreshToken: refreshToken, user: user }))
            // }



            // if (!await bcrypt.compare(req.body.password, person.password)) {
            //     return res.status(401).json({ message: 'Wrong credentials.' });
            // } else {
            //     const accessToken = jwt.sign(
            //         { id: person.person_id, name: person.mail },
            //         process.env.ACCESS_TOKEN_SECRET,
            //         { expiresIn: "3600s" }
            //     );
            //     const refreshToken = jwt.sign(
            //         { id: person.person_id, name: person.mail },
            //         process.env.REFRESH_TOKEN_SECRET
            //     );
        
            //     // const token = await Token.findOne({ where: { person_id: person.person_id } })
        
            //     // if (token !== null) Token.destroy({ where: { person_id: person.person_id } })
        
            //     // Token.create({
            //     //     person_id: person.person_id,
            //     //     token: token
            //     // })
        
            //     return res.status(200).json({ accessToken: accessToken, token: token })
            // }




    
        } catch(err) {
            throw err
        }
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

            if (!refreshTokens.includes(token.token)) throw new Error('Forbidden')

            const decoded = jwt.verify(token.token, process.env.REFRESH_TOKEN_SECRET!) as Payload

            const accessToken = jwt.sign({ lastname: decoded.lastname, firstname: decoded.firstname }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "3600s" })

            return { token: accessToken }

        } catch (err) {
            console.log('service', err)
            throw err
        }

    }

}