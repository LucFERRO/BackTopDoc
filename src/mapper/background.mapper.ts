import { BackgroundDTO } from "../dto/background.dto"
import { backgroundTypes } from "../type/background"
import { BackgroundModel } from "../model/background";
import { Background } from "../database/connect"

export class BackgroundMapper {
    // TODO
    static mapToDto(background: Background | null): BackgroundDTO | null {
        if (background === null) return null;
        const dto: BackgroundDTO = {
            background_id: background.background_id,
        }
        return dto;
    }

    static mapToModel() {

    }

}