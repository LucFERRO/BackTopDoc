import { AuthIRepository } from "../core/respository.interface";
import { AuthentificationDTO } from "../dto/authentification.dto";
import { Person } from "../model/person.model";
import { Token } from "../model/token.model";
import { sequelize } from "../database/sequelize";
import { TokenMapper } from "../mapper/token.mapper";

export class AuthentificationRepository implements AuthIRepository<AuthentificationDTO> {
    login(t: AuthentificationDTO): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async refreshToken(token: any): Promise<any> {
    
        // const tokens = await Token.findAll()
    
        // let refreshTokens: any = []
    
        // tokens.map((token: any) => {
        //     refreshTokens.push(token.token)
        // })
    
        // if (!refreshTokens.includes(token)) return null
        // console.log('repository', tokens)
        
        return Token.findAll().then((tokens: Token[]) => tokens.map((token : Token) => TokenMapper.mapToDto(token)))
    }
}