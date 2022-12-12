import { BanDTO } from "../dto/ban.dto"
import { banTypes } from "../type/ban"
import { BanModel } from "../model/ban";
import { Ban } from "../database/connect"

export class BanMapper {
    // TODO
    static mapToDto(ban: Ban | null): BanDTO | null {
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