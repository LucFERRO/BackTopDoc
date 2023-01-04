import { IRepositoryToken } from "../core/respository.interface";
import { TokenDTO } from "../dto/token.dto";
import { Token } from "../model/token.model";

export class TokenRepository implements IRepositoryToken<TokenDTO> {

    async findById(id: number): Promise<TokenDTO | null> {
        return Token.findByPk(id).then(token => token)
    }

    async findAll(): Promise<any> {
        // return Token.findAll().then((tokens: Token[]) => tokens.map((token : Token) => TokenMapper.mapToDto(token)))
        return Token.findAll().then((tokens: Token[]) => tokens)
    }

    async create(t: Partial<TokenDTO>, id: number): Promise<Partial<TokenDTO>> {

        //TODDO Pas ici?
        const token = await Token.findOne({ where: { person_id: id } })
        if (token !== null) Token.destroy({ where: { person_id: id } })

        return Token.create({
            person_id: id,
            token: t.token
        })
    }

    update(data: TokenDTO, id: number): Promise<number | boolean> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }


}