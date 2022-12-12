import { VacationDTO } from "../dto/vacation.dto"
import { vacationTypes } from "../type/vacation"
import { VacationModel } from "../model/vacation";
import { Vacation } from "../database/connect"

export class VacationMapper {
    // TODO
    static mapToDto(vacation: Vacation | null): VacationDTO | null {
        if (vacation === null) return null;
        const dto: VacationDTO = {
            vacation_start: vacation.vacation_start,
            vacation_end: vacation.vacation_end
        }
        return dto;
    }

    static mapToModel() {

    }

}