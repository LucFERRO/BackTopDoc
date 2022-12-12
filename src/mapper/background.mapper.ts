import { BackgroundDTO } from "../dto/background.dto"
import { backgroundTypes } from "../type/background"

export class BackgroundMapper {
    static mapToDto(background: backgroundTypes | null): BackgroundDTO | null {
        if (background === null) return null;
        const dto: BackgroundDTO = {
            background_id: background.background_id,
        }
        return dto;
    }

    static mapToModel() {

    }

}