import { TokenDTO } from "../dto/token.dto"
import { tokenTypes } from "../type/token"
import { TokenModel } from "../model/token";
import { Token } from "../database/connect"

export class TokenMapper {
    // TODO
    static mapToDto(token: Token | null): TokenDTO | null {
        if (token === null) return null;
        const dto: TokenDTO = {
            token: token.token,
        }
        return dto;
    }

    static mapToModel() {

    }

}