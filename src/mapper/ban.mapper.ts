import { BanDTO } from "../dto/ban.dto"
import { banTypes } from "../type/ban"

export class BanMapper {
    static mapToDto(ban: banTypes | null): BanDTO | null {
        if (ban === null) return null;
        const dto: BanDTO = {
            ban_reason: ban.ban_reason,
            ban_date: ban.ban_date,
        }
        return dto;
    }

    static mapToModel() {

    }

}