import { AppointementDTO } from "../dto/appointement.dto"
import { appointementTypes } from "../type/appointement"
import { AppointementModel } from "../model/appointement";
import { Appointement } from "../database/connect"

export class AppointementMapper {
    // TODO
    static mapToDto(appointement: Appointement | null): AppointementDTO | null {
        if (appointement === null) return null;
        const dto: AppointementDTO = {
            appointement_date: appointement.appointement_date,
            appointement_duration_minutes: appointement.appointement_duration_minutes,
            appointement_reason: appointement.appointement_reason,
        }
        return dto;
    }

    static mapToModel() {

    }

}