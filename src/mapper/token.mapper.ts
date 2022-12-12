import { TokenDTO } from "../dto/token.dto"
import { tokenTypes } from "../type/token"

export class TokenMapper {
    static mapToDto(token: tokenTypes | null): TokenDTO | null {
        if (token === null) return null;
        const dto: TokenDTO = {
            token: token.token,
        }
        return dto;
    }

    static mapToModel() {

    }

}