import { IRepository } from "../core/respository.interface";
import { TokenDTO } from "../dto/token.dto";
import { Token } from "../model/token.model";
import { TokenMapper } from "../mapper/token.mapper";

export class TokenRepository implements IRepository<TokenDTO> {

    async findById(id: number): Promise<TokenDTO | null> {
        return Token.findByPk(id).then(token => TokenMapper.mapToDto(token))
    }

    async findAll(): Promise<any> {
        // return Token.findAll().then((tokens: Token[]) => tokens.map((token : Token) => TokenMapper.mapToDto(token)))
        return Token.findAll().then((tokens: Token[]) => tokens)
    }

    async create(t: TokenDTO): Promise<TokenDTO> {

        //TODDO
        // Changer les 1 en HARD
        const token = await Token.findOne({ where: { token_id: 1 } })
        
        if (token !== null) Token.destroy({ where: { token_id: 1 } })

        return Token.create({
            token_id: 1,
            token: token.token
        })
    }

    update(data: TokenDTO, id: number): Promise<number | boolean> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }


}